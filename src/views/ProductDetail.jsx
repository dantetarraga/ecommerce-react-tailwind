import { useEffect, useState } from 'react'
import { HiOutlineArrowPath, HiOutlineShieldCheck, HiOutlineTruck } from 'react-icons/hi2'
import { Link, useParams } from 'react-router-dom'
import LoadingSpinner from '../components/loading/LoadingSpinner'
import AddToCartControls from '../components/product/AddToCartControls'
import StockBadge from '../components/product/StockBadge'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import Rating from '../components/ui/Rating'
import { getCategoryShopUrl } from '../data/categories'
import { getProductById } from '../services/products'
import productStore from '../store/productStore'
import { FREE_SHIPPING_THRESHOLD } from '../utils/pricing'
import { formatPrice, mergeProducts } from '../utils/products'

const BENEFITS = [
  { icon: HiOutlineTruck, text: `Free standard shipping on orders over $${FREE_SHIPPING_THRESHOLD}` },
  { icon: HiOutlineArrowPath, text: '30 days to exchange your product' },
  { icon: HiOutlineShieldCheck, text: 'Secure payment with credit card' }
]

const ProductDetail = () => {
  const { id } = useParams()
  const created = productStore((state) => state.created)
  const updated = productStore((state) => state.updated)
  const deleted = productStore((state) => state.deleted)
  const [apiProduct, setApiProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const productId = Number(id)
  const localProduct = created.find((product) => product.id === productId)
  const [product] = mergeProducts(apiProduct ? [apiProduct] : [], { created: localProduct ? [localProduct] : [], updated, deleted })

  useEffect(() => {
    if (localProduct || !Number.isInteger(productId) || productId <= 0) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    getProductById(productId)
      .then(setApiProduct)
      .catch(setError)
      .finally(() => setIsLoading(false))
  }, [productId])

  useEffect(() => {
    document.title = `${product?.title ?? 'Product'} | E-commerce`
  }, [product?.title])

  if (isLoading) return <LoadingSpinner />

  if (error) {
    return <p data-testid='product-error' className='container py-20 text-center text-red-600'>The product could not be loaded. Please try again later.</p>
  }

  if (!product) {
    return (
      <EmptyState
        testId='product-not-found'
        title='Product not found'
        description='The product you are looking for does not exist or is no longer available.'
        action={<Button to='/shop'>Back to shop</Button>}
      />
    )
  }

  return (
    <section data-testid='product-detail' className='container py-6 md:py-10'>
      <nav className='mb-6 text-sm text-gray-500' aria-label='Breadcrumb'>
        <ol className='flex flex-wrap items-center gap-2'>
          <li><Link to='/' className='hover:text-ink'>Home</Link></li>
          <li aria-hidden='true'>/</li>
          <li><Link to='/shop' className='hover:text-ink'>Shop</Link></li>
          <li aria-hidden='true'>/</li>
          <li><Link to={getCategoryShopUrl(product.category)} className='capitalize hover:text-ink'>{product.category}</Link></li>
        </ol>
      </nav>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16'>
        <div className='flex items-center justify-center rounded-3xl bg-surface-muted p-10 md:p-16 aspect-square'>
          <img src={product.image} alt={product.title} className='max-h-full w-full object-contain mix-blend-multiply' />
        </div>

        <div className='flex flex-col gap-5'>
          <p className='eyebrow'>{product.category}</p>
          <h1 className='font-display text-3xl md:text-4xl font-semibold leading-tight tracking-tight' data-testid='product-detail-title'>{product.title}</h1>
          <Rating rate={product.rating.rate} count={product.rating.count} size='text-base' />

          <p className='text-3xl font-bold' data-testid='product-detail-price'>{formatPrice(product.price)}</p>

          <div className='flex items-center gap-3'>
            <StockBadge stock={product.stock} />
            {product.stock > 0 && <p className='text-sm text-gray-500' data-testid='stock-quantity'>{product.stock} units available</p>}
          </div>

          <p className='text-gray-600 leading-relaxed'>{product.description}</p>

          <div className='border-t border-line pt-5'>
            <AddToCartControls key={product.id} product={product} />
          </div>

          <ul className='mt-2 space-y-3 rounded-2xl bg-surface-muted p-5 text-sm'>
            {BENEFITS.map(({ icon: Icon, text }) => (
              <li key={text} className='flex items-center gap-3'>
                <Icon className='text-xl text-accent-700 shrink-0' aria-hidden='true' />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
