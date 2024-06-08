import { Suspense, useEffect, useState } from 'react'
import { HiOutlineSquares2X2 } from 'react-icons/hi2'
import { Await, defer, useLoaderData, useSearchParams } from 'react-router-dom'
import ProductSkeleton from '../components/loading/ProductSkeleton'
import Pagination from '../components/Pagination'
import ProductCard from '../components/product/ProductCard'
import usePagination from '../hooks/usePagination'
import { getAllProducts } from '../services/products'

export const shopLoader = async () => {
  const products = getAllProducts()
  return defer({ products })
}

export const Shop = () => {
  const { products } = useLoaderData()
  const [searchParams] = useSearchParams([])
  const [filteredProducts, setFilteredProducts] = useState(products._data || [])
  const [categoryfilters, setCategoryFilters] = useState([])
  const [priceFilter, setPriceFilter] = useState([])
  const itemsPerPage = 10
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
  } = usePagination(filteredProducts, itemsPerPage)

  useEffect(() => {
    const category = searchParams.get('category') ? searchParams.get('category').split('-') : []
    const price = searchParams.get('price') ? searchParams.get('price').split('-') : []

    setCategoryFilters(category)
    setPriceFilter(price)
  }, [searchParams])

  useEffect(() => {
    if (!products._data) return
    setFilteredProducts(products._data)
    const filtered = products._data.filter(product => {
      return [
        categoryfilters.length > 0 ? categoryfilters.includes(product.category) : true,
        !!(product.price >= priceFilter[0] && product.price <= priceFilter[1])
      ].every(condition => condition)
    })
    setFilteredProducts(filtered)
  }, [products, categoryfilters, priceFilter])

  return (
    <Suspense fallback={<ProductSkeleton />}>
      <Await resolve={products}>
        {(() => (
          <section>
            <div className='flex items-center gap-5 mb-5'>
              <HiOutlineSquares2X2 className='text-3xl text-black self-center' />
              {
                itemsPerPage > totalProducts
                  ? (
                    <p>Showing {1} - {totalProducts} of {' '}
                      {totalProducts} results
                    </p>
                    )
                  : (
                    <p> Showing {' '}{indexOfFirstItem + 1} - {indexOfLastItem} of {' '}
                      {totalProducts} results
                    </p>
                    )
              }
            </div>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-10'>
              {currentItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              goToNextPage={goToNextPage}
              goToPrevPage={goToPrevPage}
              goToPage={goToPage}
            />
          </section>
        ))}
      </Await>
    </Suspense>
  )
}
