import { useState } from 'react'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import { toast } from 'sonner'
import useCart from '../../hooks/useCart'
import Button from '../ui/Button'
import QuantityStepper from '../ui/QuantityStepper'

const AddToCartControls = ({ product, onAdded }) => {
  const { dispatch, isProductInCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const isOutOfStock = product.stock === 0
  const isInCart = isProductInCart(product)

  const handleIncrementQuantity = () => {
    if (quantity >= product.stock) {
      toast.error(`Only ${product.stock} units available`)
      return
    }
    setQuantity((prevQuantity) => prevQuantity + 1)
  }
  const handleDecrementQuantity = () => setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1))

  const handleAddToCart = () => {
    if (!isInCart) dispatch({ type: 'ADD_TO_CART', payload: product, quantity })
    else dispatch({ type: 'UPDATE_PRODUCT_QUANTITY', payload: { id: product.id, quantity } })

    toast.success(isInCart ? 'Cart quantity updated' : 'Product added to cart', { description: product.title })
    onAdded?.()
  }

  return (
    <div className='flex flex-wrap items-center gap-3'>
      <QuantityStepper
        value={isOutOfStock ? 0 : quantity}
        onDecrement={handleDecrementQuantity}
        onIncrement={handleIncrementQuantity}
        disableDecrement={quantity <= 1}
        disabled={isOutOfStock}
        testIds={{ decrement: 'quantity-decrement', value: 'quantity-value', increment: 'quantity-increment' }}
      />

      <Button
        onClick={handleAddToCart}
        data-testid='add-to-cart-detail'
        disabled={isOutOfStock}
        size='lg'
        className='flex-1 min-w-[180px]'
      >
        <HiOutlineShoppingBag className='text-lg' />
        {isOutOfStock ? 'Out of stock' : isInCart ? 'Update cart' : 'Add to cart'}
      </Button>
    </div>
  )
}

export default AddToCartControls
