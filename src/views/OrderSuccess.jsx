import { useEffect } from 'react'
import { HiCheck } from 'react-icons/hi2'
import { useParams } from 'react-router-dom'
import OrderItems from '../components/order/OrderItems'
import OrderStatusBadge from '../components/order/OrderStatusBadge'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import useAuth from '../hooks/useAuth'
import orderStore from '../store/orderStore'
import { SHIPPING_METHODS } from '../utils/pricing'
import { formatPrice } from '../utils/products'

const OrderSuccess = () => {
  const { orderId } = useParams()
  const { user, isAdmin } = useAuth()
  const order = orderStore((state) => state.orders.find(({ id }) => id === orderId))

  useEffect(() => {
    document.title = 'Order confirmed | E-commerce'
  }, [])

  if (!order || (!isAdmin && order.username !== user.username)) {
    return (
      <EmptyState
        testId='order-not-found'
        title='Order not found'
        description='We could not find this order in your account.'
        action={<Button to='/orders'>Go to My Orders</Button>}
      />
    )
  }

  return (
    <section data-testid='order-confirmation' className='container max-w-3xl py-10 md:py-16'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <span className='flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-700'>
          <HiCheck aria-hidden='true' />
        </span>
        <h1 className='font-display text-4xl font-semibold tracking-tight'>Thank you for your order!</h1>
        <p className='text-gray-500'>
          Your order number is <span data-testid='order-number' className='font-mono font-bold text-ink'>{order.id}</span>
        </p>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className='mt-10 rounded-3xl border border-line bg-white p-6 md:p-8'>
        <OrderItems items={order.items} />

        <dl className='mt-4 space-y-2 border-t border-line pt-4 text-sm'>
          <div className='flex justify-between'><dt>Subtotal</dt><dd>{formatPrice(order.subtotal)}</dd></div>
          <div className='flex justify-between'><dt>Discount {order.couponCode && `(${order.couponCode})`}</dt><dd>-{formatPrice(order.discount)}</dd></div>
          <div className='flex justify-between'><dt>Shipping ({SHIPPING_METHODS[order.shippingMethod].label})</dt><dd>{order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}</dd></div>
          <div className='flex justify-between border-t border-line pt-3 text-lg font-bold'><dt>Total</dt><dd data-testid='order-total'>{formatPrice(order.total)}</dd></div>
        </dl>
      </div>

      <p className='mt-6 text-center text-sm text-gray-500'>
        Shipping to {order.customerName}, {order.shippingAddress.address}, {order.shippingAddress.city}. Paid with card ending in {order.cardLast4}.
      </p>

      <div className='mt-8 flex flex-col sm:flex-row justify-center gap-3'>
        <Button to='/orders' variant='outline' size='lg' data-testid='view-orders'>View my orders</Button>
        <Button to='/shop' size='lg'>Continue shopping</Button>
      </div>
    </section>
  )
}

export default OrderSuccess
