import { request } from './http'

export const getAllProducts = () => request('/products')

export const getAllCategories = () => request('/products/categories')

export const getProductById = (id) => request(`/products/${id}`)

export const createProduct = (product) => request('/products', { method: 'POST', body: product })

export const updateProduct = (id, product) => request(`/products/${id}`, { method: 'PUT', body: product })

export const deleteProduct = (id) => request(`/products/${id}`, { method: 'DELETE' })
