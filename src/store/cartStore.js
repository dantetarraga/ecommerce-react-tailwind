import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: action.quantity || 1 }]
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
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
    case 'DECREMENT':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 0 }
            : item
        )
      }
    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      }
    case 'UPDATE_PRODUCT_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }
    default:
      return state
  }
}

const cartStore = create(
  persist(
    (set, get) => ({
      cart: [],
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
