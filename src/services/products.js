export const getAllProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products')
  const data = await response.json()
  return data
}

export const getAllCategories = async () => {
  const response = await fetch('https://fakestoreapi.com/products/categories')
  const data = await response.json()
  return data
}
