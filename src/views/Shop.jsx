import { HiOutlineSquares2X2 } from 'react-icons/hi2'
import { useLoaderData } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard'
import { getAllProducts } from '../services/products'

export const shopLoader = async () => {
  const products = await getAllProducts()

  return { products }
}

export const Shop = () => {
  const { products } = useLoaderData()
  const totalProducts = products.length

  return (
    <section>
      <div className='flex items-center gap-5 mb-5'>
        <HiOutlineSquares2X2 className='text-3xl text-black self-center' />
        <p>Showing 1 - 16 of {totalProducts} results</p>
      </div>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-10'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </section>
  )
}
