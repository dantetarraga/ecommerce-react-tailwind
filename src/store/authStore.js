import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const authStore = create(
  persist(
    (set) => ({
      user: null,
      registeredUsers: [],
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      addRegisteredUser: (user) => set((state) => ({ registeredUsers: [...state.registeredUsers, user] })),
      toggleUserLock: (username) => set((state) => ({
        registeredUsers: state.registeredUsers.map((user) =>
          user.username === username ? { ...user, locked: !user.locked } : user
        )
      }))
    }),
    {
      name: 'auth-storage'
    }
  )
)

export default authStore
