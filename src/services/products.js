export const getAllProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products')
  return await response.json()
}

export const getAllCategories = async () => {
  const response = await fetch('https://fakestoreapi.com/products/categories')
  return await response.json()
}
