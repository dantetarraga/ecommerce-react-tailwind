import { useEffect, useState } from 'react'
import { HiOutlineSquares2X2 } from 'react-icons/hi2'
import { useLoaderData, useSearchParams } from 'react-router-dom'
import Pagination from '../components/Pagination'
import ProductCard from '../components/product/ProductCard'
import usePagination from '../hooks/usePagination'
import { getAllProducts } from '../services/products'

export const shopLoader = async () => {
  const products = await getAllProducts()

  return { products }
}

export const Shop = () => {
  const { products } = useLoaderData()
  const [searchParams] = useSearchParams()
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [categoryfilters, setCategoryFilters] = useState([])
  const [priceFilter, setPriceFilter] = useState([])
  const itemsPerPage = 10

  useEffect(() => {
    const category = searchParams.get('category') ? searchParams.get('category').split('-') : []
    const price = searchParams.get('price') ? searchParams.get('price').split('-') : []

    setCategoryFilters(category)
    setPriceFilter(price)
  }, [searchParams])

  useEffect(() => {
    const filtered = products.filter(product => {
      return [
        categoryfilters.length > 0 ? categoryfilters.includes(product.category) : true,
        !!(product.price >= priceFilter[0] && product.price <= priceFilter[1])
      ].every(condition => condition)
    })
    setFilteredProducts(filtered)
  }, [categoryfilters, priceFilter])

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

  return (
    <section>
      <div className='flex items-center gap-5 mb-5'>
        <HiOutlineSquares2X2 className='text-3xl text-black self-center' />
        <p>Showing {indexOfFirstItem + 1} - {indexOfLastItem} of {totalProducts} results</p>
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
  )
}
