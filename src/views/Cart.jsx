import { useEffect } from 'react'
import { HiArrowRight, HiOutlineShoppingBag } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import CartItem from '../components/cart/CartItem'
import CouponForm from '../components/cart/CouponForm'
import OrderSummary from '../components/cart/OrderSummary'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import useCart from '../hooks/useCart'
import { calculateTotals } from '../utils/pricing'

const Cart = () => {
  const { cart, coupon, totalItems, dispatch } = useCart()
  const totals = calculateTotals({ items: cart, couponCode: coupon })

  useEffect(() => {
    document.title = 'Cart | E-commerce'
  }, [])

  if (cart.length === 0) {
    return (
      <EmptyState
        testId='empty-cart'
        icon={HiOutlineShoppingBag}
        title='Your cart is empty'
        description='Looks like you have not added anything yet. Explore the shop and find something you love.'
        action={<Button to='/shop' size='lg' data-testid='continue-shopping'>Continue shopping</Button>}
      />
    )
  }

  return (
    <section className='container py-6 md:py-10'>
      <div className='mb-8 flex items-end justify-between gap-4'>
        <div>
          <h1 className='font-display text-4xl md:text-5xl font-semibold tracking-tight'>Shopping cart</h1>
          <p className='mt-1 text-gray-500'>{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
        </div>
        <button data-testid='clear-cart' onClick={() => dispatch({ type: 'CLEAR_CART' })} className='text-sm font-semibold text-red-600 hover:underline'>
          Clear cart
        </button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-start'>
        <ul className='divide-y divide-line' data-testid='cart-table'>
          {cart.map((product) => <CartItem key={product.id} product={product} />)}
        </ul>

        <div className='flex flex-col gap-4 lg:sticky lg:top-32'>
          <OrderSummary totals={totals} couponCode={coupon}>
            <CouponForm subtotal={totals.subtotal} />
            <Button to='/checkout' size='lg' fullWidth data-testid='checkout-button'>
              Proceed to checkout <HiArrowRight />
            </Button>
          </OrderSummary>
          <Link to='/shop' className='text-center text-sm font-semibold underline underline-offset-4'>Continue shopping</Link>
        </div>
      </div>
    </section>
  )
}

export default Cart
