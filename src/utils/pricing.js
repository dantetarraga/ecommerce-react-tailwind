import { isProblemUser } from './qa'

export const FREE_SHIPPING_THRESHOLD = 150
export const SHIPPING_METHODS = {
  standard: { label: 'Standard (3-5 business days)', price: 5 },
  express: { label: 'Express (1-2 business days)', price: 15 }
}

export const COUPONS = {
  SAVE10: { type: 'percent', value: 10, description: '10% off your subtotal' },
  WELCOME5: { type: 'fixed', value: 5, minSubtotal: 50, description: '$5 off on orders of $50 or more' },
  FREESHIP: { type: 'shipping', description: 'Free standard shipping' },
  SUMMER2024: { type: 'percent', value: 20, expired: true, description: '20% off (expired)' }
}

const round = (value) => Math.round(value * 100) / 100

export const getSubtotal = (items) => round(items.reduce(
  (acc, item) => acc + item.price * (isProblemUser() ? 1 : item.quantity),
  0
))

export const validateCoupon = (rawCode, subtotal) => {
  const code = rawCode.trim().toUpperCase()
  if (!code) return { error: 'Please enter a coupon code' }

  const coupon = COUPONS[code]
  if (!coupon) return { error: 'Invalid coupon code' }
  if (coupon.expired) return { error: 'This coupon has expired' }
  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
    return { error: `This coupon requires a minimum subtotal of $${coupon.minSubtotal.toFixed(2)}` }
  }

  return { code, coupon }
}

export const getDiscount = (couponCode, subtotal) => {
  if (!couponCode) return 0

  const { coupon } = validateCoupon(couponCode, subtotal)
  if (!coupon) return 0
  if (coupon.type === 'percent') return round(subtotal * coupon.value / (isProblemUser() ? 1000 : 100))
  if (coupon.type === 'fixed') return Math.min(coupon.value, subtotal)

  return 0
}

export const getShipping = ({ subtotal, couponCode, shippingMethod = 'standard' }) => {
  if (subtotal === 0) return 0
  if (shippingMethod === 'express') return SHIPPING_METHODS.express.price

  const hasFreeShippingCoupon = COUPONS[couponCode]?.type === 'shipping'
  if (hasFreeShippingCoupon || subtotal >= FREE_SHIPPING_THRESHOLD) return 0

  return SHIPPING_METHODS.standard.price
}

export const calculateTotals = ({ items, couponCode, shippingMethod }) => {
  const subtotal = getSubtotal(items)
  const discount = getDiscount(couponCode, subtotal)
  const shipping = getShipping({ subtotal, couponCode, shippingMethod })

  return {
    subtotal,
    discount,
    shipping,
    total: round(subtotal - discount + shipping)
  }
}
