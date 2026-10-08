import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const ORDER_STATUSES = ['Pending', 'Shipped', 'Delivered', 'Cancelled']

const orderStore = create(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      updateOrderStatus: (id, status) => set((state) => ({
        orders: state.orders.map((order) => order.id === id ? { ...order, status } : order)
      }))
    }),
    {
      name: 'order-storage'
    }
  )
)

export default orderStore
