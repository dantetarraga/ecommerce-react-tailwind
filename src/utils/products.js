// Fake Store API has no stock, so it is derived from the product data: products 7 and 14 start out of stock
export const getInitialStock = (product) => product.id % 7 === 0 ? 0 : (product.rating.count % 15) + 1

export const mergeProducts = (apiProducts, { created, updated, deleted }) =>
  [...apiProducts.map((product) => ({ ...product, stock: getInitialStock(product) })), ...created]
    .filter((product) => !deleted.includes(product.id))
    .map((product) => updated[product.id] ? { ...product, ...updated[product.id] } : product)

export const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'rating-desc', label: 'Best rated' }
]

const comparators = {
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'name-asc': (a, b) => a.title.localeCompare(b.title),
  'name-desc': (a, b) => b.title.localeCompare(a.title),
  'rating-desc': (a, b) => b.rating.rate - a.rating.rate
}

export const sortProducts = (products, sort) => {
  const comparator = comparators[sort]
  return comparator ? [...products].sort(comparator) : products
}

export const formatPrice = (value) => `$${Number(value).toFixed(2)}`
