import { useSearchParams } from 'react-router-dom'
import { PRICE_MAX, PRICE_MIN } from '../components/InputRange'

const CATEGORY_SEPARATOR = ','

// The URL is the single source of truth for the shop filters, so they survive reloads and can be shared
const useShopFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const categories = searchParams.get('category')?.split(CATEGORY_SEPARATOR).filter(Boolean) ?? []
  const priceParam = searchParams.get('price')?.split('-').map(Number)
  const price = priceParam?.length === 2 && priceParam.every(Number.isFinite) ? priceParam : [PRICE_MIN, PRICE_MAX]
  const search = searchParams.get('q')?.trim() ?? ''
  const sort = searchParams.get('sort') ?? 'default'
  const hasActiveFilters = categories.length > 0 || price[0] !== PRICE_MIN || price[1] !== PRICE_MAX || !!search

  const updateParams = (changes) => {
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams)
      Object.entries(changes).forEach(([key, value]) => {
        if (value) params.set(key, value)
        else params.delete(key)
      })
      return params
    }, { replace: true })
  }

  const toggleCategory = (category) => {
    const nextCategories = categories.includes(category)
      ? categories.filter((item) => item !== category)
      : [...categories, category]
    updateParams({ category: nextCategories.join(CATEGORY_SEPARATOR) })
  }

  const setPrice = ([min, max]) => {
    const isDefault = min === PRICE_MIN && max === PRICE_MAX
    updateParams({ price: isDefault ? null : `${min}-${max}` })
  }

  const setSearch = (value) => updateParams({ q: value.trim() })
  const setSort = (value) => updateParams({ sort: value === 'default' ? null : value })
  const clearFilters = () => updateParams({ category: null, price: null, q: null })

  return { categories, price, search, sort, hasActiveFilters, toggleCategory, setPrice, setSearch, setSort, clearFilters }
}

export default useShopFilters
