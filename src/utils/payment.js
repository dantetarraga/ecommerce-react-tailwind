import { isErrorUser } from './qa'
import { sleep } from './sleep'

const PROCESSING_DELAY = 1500

// Simulated gateway: any other card that passes validation is approved
export const TEST_CARDS = {
  4242424242424242: { approved: true, description: 'Approved' },
  4000000000000002: { approved: false, message: 'Your card was declined.', description: 'Declined' },
  4000000000009995: { approved: false, message: 'Your card has insufficient funds.', description: 'Insufficient funds' }
}

export const onlyDigits = (value) => value.replace(/\D/g, '')

export const processPayment = async ({ cardNumber }) => {
  await sleep(PROCESSING_DELAY)

  if (isErrorUser()) throw new Error('Internal server error. Your order could not be processed.')

  const card = TEST_CARDS[onlyDigits(cardNumber)]
  if (card && !card.approved) throw new Error(card.message)

  return { transactionId: `TX-${Date.now().toString(36).toUpperCase()}` }
}
