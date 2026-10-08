import { useState } from 'react'
import { HiCheck, HiOutlineEye, HiOutlineShoppingBag } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import useCart from '../../hooks/useCart'
import { formatPrice } from '../../utils/products'
import { isProblemUser } from '../../utils/qa'
import Button from '../ui/Button'
import Rating from '../ui/Rating'
import ModalProduct from './ModalProduct'
import StockBadge from './StockBadge'

// problem_user: every product shows the same picture
const PROBLEM_USER_IMAGE = 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png'

const ProductCard = ({ product }) => {
  const [showQuickView, setShowQuickView] = useState(false)
  const { dispatch, isProductInCart } = useCart()
  const isInCart = isProductInCart(product)
  const isOutOfStock = product.stock === 0
  const detailUrl = `/product/${product.id}`

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
    toast.success('Product added to cart', { description: product.title })
  }

  const getButtonContent = () => {
    if (isOutOfStock) return 'Out of stock'
    if (isInCart) return <><HiCheck /> Added to cart</>
    return <><HiOutlineShoppingBag /> Add to cart</>
  }

  return (
    <article data-testid={`product-card-${product.id}`} className='group flex flex-col'>
      <div className='relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-white'>
        <Link to={detailUrl} tabIndex={-1} aria-hidden='true'>
          <img
            src={isProblemUser() ? PROBLEM_USER_IMAGE : product.image}
            alt={product.title}
            loading='lazy'
            data-testid='product-image'
            className={`h-full w-full object-contain p-6 md:p-8 transition-transform duration-500 group-hover:scale-105 ${isOutOfStock ? 'opacity-50' : ''}`}
          />
        </Link>

        <div className='absolute left-3 top-3'>
          <StockBadge stock={product.stock} hideInStock />
        </div>

        <button
          aria-label={`Quick view ${product.title}`}
          data-testid='quick-view'
          onClick={() => setShowQuickView(true)}
          className='absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-card transition md:opacity-0 md:translate-y-1 md:group-hover:opacity-100 md:group-hover:translate-y-0 focus-visible:opacity-100'
        >
          <HiOutlineEye className='text-lg' />
        </button>
      </div>

      <div className='flex flex-1 flex-col gap-1.5 pt-4'>
        <p className='text-xs font-medium uppercase tracking-wider text-gray-500'>{product.category}</p>
        <Link to={detailUrl} className='line-clamp-2 text-sm font-semibold leading-snug hover:underline' data-testid='product-title'>
          {product.title}
        </Link>
        <Rating rate={product.rating.rate} count={product.rating.count} size='text-xs' />
        <p className='mt-auto pt-1 text-lg font-bold' data-testid='product-price'>{formatPrice(product.price)}</p>
      </div>

      <Button
        onClick={handleAddToCart}
        data-testid='add-to-cart'
        variant={isInCart ? 'outline' : 'primary'}
        size='sm'
        fullWidth
        className='mt-3'
        disabled={isInCart || isOutOfStock}
      >
        {getButtonContent()}
      </Button>

      {showQuickView && <ModalProduct product={product} onClose={() => setShowQuickView(false)} />}
    </article>
  )
}

export default ProductCard
