import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Fake Store API does not persist changes, so admin edits are kept here and merged over the API data
const productStore = create(
  persist(
    (set) => ({
      created: [],
      updated: {},
      deleted: [],
      addProduct: (product) => set((state) => ({ created: [...state.created, product] })),
      updateProduct: (id, changes) => set((state) => ({
        updated: { ...state.updated, [id]: { ...state.updated[id], ...changes } }
      })),
      deleteProduct: (id) => set((state) => ({ deleted: [...state.deleted, id] })),
      resetCatalog: () => set({ created: [], updated: {}, deleted: [] })
    }),
    {
      name: 'product-storage'
    }
  )
)

export default productStore
