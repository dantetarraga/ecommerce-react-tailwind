import { Suspense, useEffect, useState } from 'react'
import { HiChevronDown } from 'react-icons/hi2'
import { Await } from 'react-router-dom'
import useShopFilters from '../../hooks/useShopFilters'
import Checkbox from '../form/Checkbox'
import InputRange from '../InputRange'
import LoadingSkeleton from '../loading/LoadingSkeleton'

const FilterSection = ({ title, children }) => (
  <details open className='group border-b border-line py-5'>
    <summary className='flex cursor-pointer list-none items-center justify-between font-semibold [&::-webkit-details-marker]:hidden'>
      {title}
      <HiChevronDown className='transition-transform group-open:rotate-180' aria-hidden='true' />
    </summary>
    <div className='pt-4'>{children}</div>
  </details>
)

const ProductFilters = ({ categories }) => {
  const { categories: selectedCategories, price, hasActiveFilters, toggleCategory, setPrice, clearFilters } = useShopFilters()
  // Local state keeps the slider smooth while dragging; the URL is updated when the drag ends
  const [priceRange, setPriceRange] = useState(price)

  useEffect(() => {
    setPriceRange(price)
  }, [price[0], price[1]])

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between pb-2'>
        <h2 className='text-lg font-bold'>Filters</h2>
        {hasActiveFilters && (
          <button onClick={clearFilters} data-testid='clear-filters' className='text-sm font-semibold text-accent-700 hover:underline'>
            Clear all
          </button>
        )}
      </div>

      <FilterSection title='Categories'>
        <Suspense fallback={<LoadingSkeleton />}>
          <Await resolve={categories} errorElement={<p className='text-sm text-red-600'>Categories could not be loaded.</p>}>
            {(categories) => (
              <ul className='space-y-3'>
                {categories.map((category) => (
                  <li key={category}>
                    <Checkbox
                      id={`category-${category}`}
                      data-testid={`filter-category-${category.replace(/\W+/g, '-')}`}
                      label={<span className='capitalize'>{category}</span>}
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </Await>
        </Suspense>
      </FilterSection>

      <FilterSection title='Price'>
        <div className='px-2'>
          <InputRange values={priceRange} onChange={setPriceRange} onFinalChange={setPrice} />
        </div>
        <div className='mt-4 flex items-center justify-between text-sm' data-testid='price-range-label'>
          <span className='rounded-lg border border-line px-3 py-1.5'>${priceRange[0]}</span>
          <span className='text-gray-400'>to</span>
          <span className='rounded-lg border border-line px-3 py-1.5'>${priceRange[1]}</span>
        </div>
      </FilterSection>
    </div>
  )
}

export default ProductFilters
