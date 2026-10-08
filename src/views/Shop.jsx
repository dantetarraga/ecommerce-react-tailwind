import { Suspense, useEffect } from 'react'
import { Await, defer, useLoaderData } from 'react-router-dom'
import ProductSkeleton from '../components/loading/ProductSkeleton'
import ProductList from '../components/product/ProductList'
import { getAllProducts } from '../services/products'

export const shopLoader = async () => {
  const products = getAllProducts()
  return defer({ products })
}

export const Shop = () => {
  const { products } = useLoaderData()

  useEffect(() => {
    document.title = 'Shop | E-commerce'
  }, [])

  return (
    <Suspense fallback={<ProductSkeleton />}>
      <Await
        resolve={products}
        errorElement={<p data-testid='products-error' className='text-red-600'>Products could not be loaded. Please try again later.</p>}
      >
        {(apiProducts) => <ProductList apiProducts={apiProducts} />}
      </Await>
    </Suspense>
  )
}
