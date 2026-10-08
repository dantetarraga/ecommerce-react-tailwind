import { TEST_USERS } from '../data/testUsers'
import authStore from '../store/authStore'
import { sleep } from '../utils/sleep'
import { request } from './http'

const SLOW_LOGIN_DELAY = 3000
export const INVALID_CREDENTIALS = 'Username and password do not match any user'
export const LOCKED_OUT = 'Sorry, this user has been locked out.'
export const CONNECTION_ERROR = 'Unable to connect to the server. Please try again later.'

export const getApiUsers = () => request('/users')

export const getLocalUsers = () => [...TEST_USERS, ...authStore.getState().registeredUsers]

const toSessionUser = (user, token) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  name: user.name,
  role: user.role,
  source: user.source,
  token
})

export const loginUser = async ({ username, password }) => {
  if (username === 'slow_user') await sleep(SLOW_LOGIN_DELAY)

  const localUser = getLocalUsers().find((user) => user.username === username)
  if (localUser) {
    if (localUser.password !== password) throw new Error(INVALID_CREDENTIALS)
    if (localUser.locked) throw new Error(LOCKED_OUT)
    return toSessionUser(localUser, `local-${crypto.randomUUID()}`)
  }

  let token
  try {
    ({ token } = await request('/auth/login', { method: 'POST', body: { username, password } }))
  } catch (error) {
    if (error.status === 400 || error.status === 401) throw new Error(INVALID_CREDENTIALS)
    throw new Error(CONNECTION_ERROR)
  }

  const apiUsers = await getApiUsers().catch(() => [])
  const apiUser = apiUsers.find((user) => user.username === username)

  return toSessionUser({
    id: apiUser?.id,
    username,
    email: apiUser?.email,
    name: apiUser?.name ?? { firstname: username, lastname: '' },
    role: 'customer',
    source: 'api'
  }, token)
}

export const registerUser = async ({ firstname, lastname, username, email, password }) => {
  let apiUsers
  try {
    apiUsers = await getApiUsers()
  } catch {
    throw new Error(CONNECTION_ERROR)
  }

  const allUsers = [...getLocalUsers(), ...apiUsers]
  if (allUsers.some((user) => user.username.toLowerCase() === username.toLowerCase())) {
    throw new Error('Username is already taken')
  }
  if (allUsers.some((user) => user.email?.toLowerCase() === email.toLowerCase())) {
    throw new Error('Email is already registered')
  }

  const name = { firstname, lastname }
  const { id: apiId } = await request('/users', { method: 'POST', body: { username, email, password, name } })

  const user = {
    id: `local-${Date.now()}`,
    apiId,
    username,
    email,
    password,
    name,
    role: 'customer',
    source: 'local',
    locked: false,
    createdAt: new Date().toISOString()
  }
  authStore.getState().addRegisteredUser(user)

  return user
}
