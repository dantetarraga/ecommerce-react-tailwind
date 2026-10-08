import { onlyDigits } from './payment'

const NAME_REGEX = /^[a-zA-ZÀ-ÿñÑ' ]+$/
const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const URL_REGEX = /^https?:\/\/\S+\.\S+$/

const removeEmpty = (errors) => Object.fromEntries(Object.entries(errors).filter(([, error]) => error))

const validateLength = (value, label, min, max) => {
  const length = value.trim().length
  if (!length) return `${label} is required`
  if (length < min) return `${label} must be at least ${min} characters`
  if (length > max) return `${label} must be at most ${max} characters`
  return null
}

const validateName = (value, label) => {
  const error = validateLength(value, label, 2, 30)
  if (error) return error
  if (!NAME_REGEX.test(value.trim())) return `${label} can only contain letters`
  return null
}

export const isLuhnValid = (number) => {
  const digits = onlyDigits(number).split('').reverse().map(Number)
  const sum = digits.reduce((acc, digit, index) => {
    if (index % 2 === 0) return acc + digit
    const doubled = digit * 2
    return acc + (doubled > 9 ? doubled - 9 : doubled)
  }, 0)
  return digits.length > 0 && sum % 10 === 0
}

export const validateLogin = ({ username, password }) => removeEmpty({
  username: !username.trim() && 'Username is required',
  password: !password && 'Password is required'
})

export const validateRegister = (values) => {
  const { password } = values
  let passwordError = null
  if (!password) passwordError = 'Password is required'
  else if (password.length < 8 || password.length > 20) passwordError = 'Password must be between 8 and 20 characters'
  else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
    passwordError = 'Password must contain an uppercase letter, a lowercase letter and a number'
  }

  let usernameError = validateLength(values.username, 'Username', 4, 20)
  if (!usernameError && !USERNAME_REGEX.test(values.username)) {
    usernameError = 'Username can only contain letters, numbers and underscores'
  }

  return removeEmpty({
    firstname: validateName(values.firstname, 'First name'),
    lastname: validateName(values.lastname, 'Last name'),
    username: usernameError,
    email: !values.email.trim() ? 'Email is required' : !EMAIL_REGEX.test(values.email.trim()) && 'Enter a valid email address',
    password: passwordError,
    confirmPassword: !values.confirmPassword ? 'Please confirm your password' : values.confirmPassword !== password && 'Passwords do not match',
    terms: !values.terms && 'You must accept the terms and conditions'
  })
}

export const validateShipping = (values) => removeEmpty({
  fullName: validateLength(values.fullName, 'Full name', 3, 50),
  address: validateLength(values.address, 'Address', 5, 100),
  city: validateLength(values.city, 'City', 2, 50),
  postalCode: !values.postalCode.trim() ? 'Postal code is required' : !/^\d{5}$/.test(values.postalCode.trim()) && 'Postal code must have 5 digits',
  phone: !values.phone.trim() ? 'Phone is required' : !/^9\d{8}$/.test(values.phone.trim()) && 'Phone must have 9 digits and start with 9'
})

export const getExpiryError = (expiry, now = new Date()) => {
  if (!expiry.trim()) return 'Expiration date is required'

  const match = expiry.trim().match(/^(\d{2})\/(\d{2})$/)
  if (!match) return 'Use the format MM/YY'

  const month = Number(match[1])
  const year = 2000 + Number(match[2])
  if (month < 1 || month > 12) return 'Invalid month'

  const firstDayAfterExpiry = new Date(year, month, 1)
  if (firstDayAfterExpiry <= now) return 'Your card has expired'
  if (year > now.getFullYear() + 10) return 'Expiration date is too far in the future'

  return null
}

export const validatePayment = (values) => {
  const cardDigits = onlyDigits(values.cardNumber)
  let cardNumberError = null
  if (!cardDigits) cardNumberError = 'Card number is required'
  else if (cardDigits.length !== 16) cardNumberError = 'Card number must have 16 digits'
  else if (!isLuhnValid(cardDigits)) cardNumberError = 'Card number is invalid'

  return removeEmpty({
    cardName: validateName(values.cardName, 'Name on card'),
    cardNumber: cardNumberError,
    expiry: getExpiryError(values.expiry),
    cvv: !values.cvv ? 'CVV is required' : !/^\d{3}$/.test(values.cvv) && 'CVV must have 3 digits'
  })
}

export const validateProduct = (values) => {
  const price = Number(values.price)
  let priceError = null
  if (values.price === '') priceError = 'Price is required'
  else if (Number.isNaN(price)) priceError = 'Price must be a number'
  else if (price <= 0) priceError = 'Price must be greater than 0'
  else if (price > 10000) priceError = 'Price must be at most 10000'
  else if (!/^\d+(\.\d{1,2})?$/.test(values.price)) priceError = 'Price can have at most 2 decimals'

  const stock = Number(values.stock)
  let stockError = null
  if (values.stock === '') stockError = 'Stock is required'
  else if (!Number.isInteger(stock)) stockError = 'Stock must be a whole number'
  else if (stock < 0 || stock > 999) stockError = 'Stock must be between 0 and 999'

  return removeEmpty({
    title: validateLength(values.title, 'Title', 3, 100),
    price: priceError,
    category: !values.category && 'Category is required',
    stock: stockError,
    description: validateLength(values.description, 'Description', 10, 500),
    image: !values.image.trim() ? 'Image URL is required' : !URL_REGEX.test(values.image.trim()) && 'Enter a valid image URL (http or https)'
  })
}
