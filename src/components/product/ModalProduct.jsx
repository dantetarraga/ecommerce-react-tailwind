import { HiArrowRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/products'
import Modal from '../ui/Modal'
import Rating from '../ui/Rating'
import AddToCartControls from './AddToCartControls'
import StockBadge from './StockBadge'

const ModalProduct = ({ product, onClose }) => {
  return (
    <Modal onClose={onClose} size='lg' testId='product-modal'>
      <div className='grid md:grid-cols-2'>
        <div className='flex items-center justify-center bg-surface-muted p-8 md:p-12 md:rounded-l-3xl'>
          <img src={product.image} alt={product.title} className='h-56 md:h-80 w-full object-contain mix-blend-multiply' />
        </div>

        <div className='flex flex-col gap-4 p-6 md:p-10'>
          <p className='text-xs font-medium uppercase tracking-wider text-gray-500'>{product.category}</p>
          <h2 className='font-display text-2xl font-semibold leading-tight pr-8'>{product.title}</h2>
          <Rating rate={product.rating.rate} count={product.rating.count} />
          <div className='flex items-center gap-3'>
            <p className='text-2xl font-bold'>{formatPrice(product.price)}</p>
            <StockBadge stock={product.stock} />
          </div>
          <p className='text-sm text-gray-600 line-clamp-4'>{product.description}</p>

          <AddToCartControls product={product} onAdded={onClose} />

          <Link to={`/product/${product.id}`} className='inline-flex items-center gap-1 text-sm font-semibold underline underline-offset-4'>
            View full details <HiArrowRight />
          </Link>
        </div>
      </div>
    </Modal>
  )
}

export default ModalProduct
