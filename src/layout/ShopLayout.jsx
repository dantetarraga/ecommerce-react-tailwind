import { useState } from 'react'
import { defer, Link, Outlet, useLoaderData } from 'react-router-dom'
import ProductFilters from '../components/shop/ProductFilters'
import Button from '../components/ui/Button'
import Drawer from '../components/ui/Drawer'
import { CATEGORIES } from '../data/categories'
import useShopFilters from '../hooks/useShopFilters'
import { getAllCategories } from '../services/products'

export const shopLayoutLoader = async () => {
  const categories = getAllCategories()
  return defer({ categories })
}

// Filters live in the search params, so changing them must not fetch the data again
export const shouldRevalidateShop = ({ currentUrl, nextUrl }) => currentUrl.pathname !== nextUrl.pathname

const getTitle = (selectedCategories) => {
  if (selectedCategories.length !== 1) return 'All products'
  return CATEGORIES.find(({ value }) => value === selectedCategories[0])?.label ?? selectedCategories[0]
}

const ShopLayout = () => {
  const { categories } = useLoaderData()
  const { categories: selectedCategories } = useShopFilters()
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  return (
    <section className='container py-6 md:py-10'>
      <header className='mb-8 space-y-2'>
        <nav aria-label='Breadcrumb' className='text-sm text-gray-500'>
          <Link to='/' className='hover:text-ink'>Home</Link> <span aria-hidden='true'>/</span> Shop
        </nav>
        <h1 className='font-display text-4xl md:text-5xl font-semibold tracking-tight capitalize' data-testid='shop-title'>
          {getTitle(selectedCategories)}
        </h1>
      </header>

      <div className='flex gap-10'>
        <aside className='hidden lg:block w-64 shrink-0' aria-label='Product filters'>
          <div className='sticky top-32'>
            <ProductFilters categories={categories} />
          </div>
        </aside>

        {isFiltersOpen && (
          <Drawer
            label='Product filters'
            onClose={() => setIsFiltersOpen(false)}
            footer={<Button fullWidth onClick={() => setIsFiltersOpen(false)} data-testid='show-results'>Show results</Button>}
          >
            <ProductFilters categories={categories} />
          </Drawer>
        )}

        <div className='min-w-0 flex-1'>
          <Outlet context={{ openFilters: () => setIsFiltersOpen(true) }} />
        </div>
      </div>
    </section>
  )
}

export default ShopLayout
