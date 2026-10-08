import { isSlowUser } from '../utils/qa'
import { sleep } from '../utils/sleep'

export const BASE_URL = 'https://fakestoreapi.com'
const SLOW_USER_DELAY = 3000

export class HttpError extends Error {
  constructor (message, status) {
    super(message)
    this.status = status
  }
}

export const request = async (path, { method = 'GET', body } = {}) => {
  if (isSlowUser()) await sleep(SLOW_USER_DELAY)

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined
  })

  const text = await response.text()
  if (!response.ok) throw new HttpError(text || `Request failed with status ${response.status}`, response.status)

  // Fake Store API answers 200 with an empty body when a resource does not exist
  return text ? JSON.parse(text) : null
}
