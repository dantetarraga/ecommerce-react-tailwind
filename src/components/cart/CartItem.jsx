import { useState } from 'react'
import { HiOutlineTrash } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import useCart from '../../hooks/useCart'
import { MIN_QUANTITY } from '../../store/cartStore'
import { formatPrice } from '../../utils/products'
import { isProblemUser } from '../../utils/qa'
import QuantityStepper from '../ui/QuantityStepper'
import ModalDeleteProduct from './ModalDeleteProduct'

const CartItem = ({ product }) => {
  const { dispatch } = useCart()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const detailUrl = `/product/${product.id}`

  const handleIncrementQuantity = () => {
    if (product.quantity >= product.stock) {
      toast.error(`Only ${product.stock} units available`)
      return
    }
    dispatch({ type: 'INCREMENT', payload: product.id })
  }
  const handleDecrementQuantity = () => dispatch({ type: 'DECREMENT', payload: product.id })

  // problem_user: the line subtotal ignores the quantity
  const lineSubtotal = product.price * (isProblemUser() ? 1 : product.quantity)

  return (
    <li data-testid={`cart-item-${product.id}`} className='flex gap-4 py-6 first:pt-0'>
      <Link to={detailUrl} className='flex h-24 w-24 md:h-32 md:w-32 shrink-0 items-center justify-center rounded-2xl border border-line bg-white p-3'>
        <img src={product.image} alt={product.title} className='max-h-full w-full object-contain' />
      </Link>

      <div className='flex min-w-0 flex-1 flex-col gap-3'>
        <div className='flex items-start justify-between gap-4'>
          <div className='min-w-0'>
            <p className='text-xs uppercase tracking-wider text-gray-500'>{product.category}</p>
            <Link to={detailUrl} className='line-clamp-2 font-semibold hover:underline'>{product.title}</Link>
            <p className='mt-1 text-sm text-gray-500' data-testid='cart-price'>{formatPrice(product.price)} each</p>
          </div>
          <p className='font-bold whitespace-nowrap' data-testid='cart-line-subtotal'>{formatPrice(lineSubtotal)}</p>
        </div>

        <div className='mt-auto flex items-center justify-between gap-4'>
          <QuantityStepper
            size='sm'
            value={product.quantity}
            onDecrement={handleDecrementQuantity}
            onIncrement={handleIncrementQuantity}
            disableDecrement={product.quantity <= MIN_QUANTITY}
            testIds={{ decrement: 'cart-decrement', value: 'cart-quantity', increment: 'cart-increment' }}
          />
          <button
            aria-label={`Remove ${product.title}`}
            data-testid='cart-remove'
            onClick={() => setShowDeleteModal(true)}
            className='inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600'
          >
            <HiOutlineTrash className='text-lg' />
            <span className='hidden sm:inline'>Remove</span>
          </button>
        </div>
      </div>

      {showDeleteModal && <ModalDeleteProduct product={product} onClose={() => setShowDeleteModal(false)} />}
    </li>
  )
}

export default CartItem
