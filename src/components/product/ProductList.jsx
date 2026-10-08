import { useEffect, useMemo, useRef, useState } from 'react'
import { HiAdjustmentsHorizontal, HiMagnifyingGlass, HiXMark } from 'react-icons/hi2'
import { useOutletContext } from 'react-router-dom'
import { useMergedProducts } from '../../hooks/useProducts'
import usePagination from '../../hooks/usePagination'
import useShopFilters from '../../hooks/useShopFilters'
import debounce from '../../utils/debounce'
import { SORT_OPTIONS, sortProducts } from '../../utils/products'
import { isProblemUser } from '../../utils/qa'
import { PRICE_MAX, PRICE_MIN } from '../InputRange'
import Pagination from '../Pagination'
import Button from '../ui/Button'
import EmptyState from '../ui/EmptyState'
import ProductCard from './ProductCard'

const ITEMS_PER_PAGE = 12
const SEARCH_DELAY = 400

const matchesSearch = (product, search) => {
  if (!search) return true
  // problem_user: search is case sensitive
  if (isProblemUser()) return product.title.includes(search) || product.description.includes(search)

  const term = search.toLowerCase()
  return product.title.toLowerCase().includes(term) || product.description.toLowerCase().includes(term)
}

const FilterChip = ({ label, onRemove }) => (
  <button
    onClick={onRemove}
    data-testid='filter-chip'
    className='inline-flex items-center gap-1.5 rounded-full bg-surface-muted px-3 py-1.5 text-xs font-semibold capitalize hover:bg-surface-sunken'
  >
    {label}
    <HiXMark aria-label='Remove filter' />
  </button>
)

const ProductList = ({ apiProducts }) => {
  const products = useMergedProducts(apiProducts)
  const { openFilters } = useOutletContext()
  const { categories, price, search, sort, hasActiveFilters, toggleCategory, setPrice, setSearch, setSort, clearFilters } = useShopFilters()
  const [searchInput, setSearchInput] = useState(search)

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => [
      categories.length > 0 ? categories.includes(product.category) : true,
      product.price >= price[0] && product.price <= price[1],
      matchesSearch(product, search)
    ].every(Boolean))

    // problem_user: sorting by lowest price has no effect
    if (isProblemUser() && sort === 'price-asc') return filtered
    return sortProducts(filtered, sort)
  }, [products, categories.join(), price[0], price[1], search, sort])

  const totalProducts = filteredProducts.length
  const {
    currentItems,
    currentPage,
    goToNextPage,
    goToPrevPage,
    goToPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem
  } = usePagination(filteredProducts, ITEMS_PER_PAGE)

  const setSearchRef = useRef(setSearch)
  setSearchRef.current = setSearch
  const debouncedSearch = useMemo(() => debounce((value) => setSearchRef.current(value), SEARCH_DELAY), [])

  useEffect(() => {
    if (!search) setSearchInput('')
  }, [search])

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value)
    debouncedSearch(e.target.value)
  }

  const handleClearFilters = () => {
    setSearchInput('')
    clearFilters()
  }

  const isPriceFiltered = price[0] !== PRICE_MIN || price[1] !== PRICE_MAX

  return (
    <section aria-label='Products'>
      <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-center'>
        <div className='relative flex-1'>
          <HiMagnifyingGlass className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400' aria-hidden='true' />
          <input
            type='search'
            aria-label='Search products'
            data-testid='search-input'
            placeholder='Search products...'
            value={searchInput}
            onChange={handleSearchChange}
            className='input h-11 rounded-full pl-11'
          />
        </div>

        <div className='flex gap-3'>
          <Button variant='outline' onClick={openFilters} className='lg:hidden flex-1' data-testid='open-filters'>
            <HiAdjustmentsHorizontal className='text-lg' /> Filters
          </Button>
          <select
            aria-label='Sort products'
            data-testid='sort-select'
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className='input h-11 flex-1 sm:w-52 rounded-full cursor-pointer'
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className='mb-6 flex flex-wrap items-center gap-2'>
        <p data-testid='results-count' className='mr-2 text-sm text-gray-500'>
          {totalProducts === 0
            ? 'Showing 0 results'
            : `Showing ${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, totalProducts)} of ${totalProducts} results`}
        </p>
        {categories.map((category) => (
          <FilterChip key={category} label={category} onRemove={() => toggleCategory(category)} />
        ))}
        {isPriceFiltered && <FilterChip label={`$${price[0]} - $${price[1]}`} onRemove={() => setPrice([PRICE_MIN, PRICE_MAX])} />}
        {search && <FilterChip label={`"${search}"`} onRemove={() => { setSearchInput(''); setSearch('') }} />}
      </div>

      {totalProducts === 0
        ? (
          <EmptyState
            testId='no-results'
            icon={HiMagnifyingGlass}
            title='No products match your search'
            description='Try another keyword or remove some filters.'
            action={hasActiveFilters && <Button onClick={handleClearFilters}>Clear filters</Button>}
          />
          )
        : (
          <div data-testid='product-list' className='grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6'>
            {currentItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToNextPage={goToNextPage}
          goToPrevPage={goToPrevPage}
          goToPage={goToPage}
        />
      )}
    </section>
  )
}

export default ProductList
