import { HiOutlineSquares2X2 } from 'react-icons/hi2'
import { useLoaderData } from 'react-router-dom'
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
  const totalProducts = products.length
  const itemsPerPage = 10

  const {
    currentItems,
    currentPage,
    goToNextPage,
    goToPrevPage,
    goToPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem
  } = usePagination(products, itemsPerPage)

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
