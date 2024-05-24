import { create } from 'zustand'

const cartStore = create((set) => ({
  items: [],
  addToCart: (item) => set((state) => ({ items: [...state.items, item] })),
  removeFromCart: (item) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== item.id)
    }))

}))
