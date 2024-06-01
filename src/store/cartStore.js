import { create } from 'zustand'

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
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
            ? { ...item, quantity: item.quantity - 1 }
            : item

        ).filter((item) => item.quantity > 0)
      }
    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      }
    default:
      return state
  }
}

const cartStore = create((set, get) => ({
  cart: [],
  dispatch: (action) => set((state) => cartReducer(state, action)),
  getTotalItems: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),
  getTotalPrice: () => get().cart.reduce((acc, item) => acc + item.quantity * item.price, 0)
}))

export default cartStore
