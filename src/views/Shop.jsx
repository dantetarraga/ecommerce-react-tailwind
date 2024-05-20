import { useLoaderData } from 'react-router-dom'
import { getAllProducts } from '../services/products'

export const shopLoader = async () => {
  const products = await getAllProducts()

  return { products }
}

export const Shop = () => {
  const { products } = useLoaderData()

  console.log(products)

  return (
    <main>
      {products.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </main>
  )
}
