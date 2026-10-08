import { request } from './http'

export const createCart = ({ userId, products }) => request('/carts', {
  method: 'POST',
  body: { userId, date: new Date().toISOString(), products }
})

export const getUserCarts = (userId) => request(`/carts/user/${userId}`)
