import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const MIN_QUANTITY = 1

const clampQuantity = (quantity, stock) => Math.max(MIN_QUANTITY, Math.min(quantity, stock ?? quantity))

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: clampQuantity(action.quantity || 1, action.payload.stock) }]
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload)
      }
    case 'INCREMENT':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: clampQuantity(item.quantity + 1, item.stock) }
            : item
        )
      }
    case 'DECREMENT':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: clampQuantity(item.quantity - 1, item.stock) }
            : item
        )
      }
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
        coupon: null
      }
    case 'UPDATE_PRODUCT_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: clampQuantity(action.payload.quantity, item.stock) }
            : item
        )
      }
    case 'APPLY_COUPON':
      return {
        ...state,
        coupon: action.payload
      }
    case 'REMOVE_COUPON':
      return {
        ...state,
        coupon: null
      }
    default:
      return state
  }
}

const cartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      coupon: null,
      dispatch: (action) => set((state) => cartReducer(state, action)),
      getTotalItems: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),
      getTotalPrice: () => get().cart.reduce((acc, item) => acc + item.quantity * item.price, 0)
    }),
    {
      name: 'cart-storage'
    }
  )
)

export default cartStore
