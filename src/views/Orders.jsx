import { useEffect, useMemo, useState } from 'react'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../components/loading/LoadingSpinner'
import OrderStatusBadge from '../components/order/OrderStatusBadge'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import useAuth from '../hooks/useAuth'
import useProducts from '../hooks/useProducts'
import { getUserCarts } from '../services/carts'
import orderStore from '../store/orderStore'
import { formatPrice } from '../utils/products'

const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

// Users that come from Fake Store API also have a purchase history there
const ApiOrderHistory = ({ userId }) => {
  const { products, isLoading: isLoadingProducts } = useProducts()
  const [carts, setCarts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getUserCarts(userId)
      .then(setCarts)
      .catch(setError)
      .finally(() => setIsLoading(false))
  }, [userId])

  if (isLoading || isLoadingProducts) return <LoadingSpinner fullPage={false} />
  if (error) return <p data-testid='api-orders-error' className='text-red-600'>Your previous orders could not be loaded.</p>
  if (carts.length === 0) return null

  return (
    <div className='flex flex-col gap-4' data-testid='api-orders'>
      <h2 className='text-xl font-bold'>Previous orders</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {carts.map((cart) => {
          const items = cart.products.map(({ productId, quantity }) => ({
            quantity,
            product: products.find(({ id }) => id === productId)
          }))
          const total = items.reduce((acc, { product, quantity }) => acc + (product?.price ?? 0) * quantity, 0)

          return (
            <article key={cart.id} className='rounded-2xl border border-line bg-white p-5 text-sm flex flex-col gap-2'>
              <div className='flex justify-between font-semibold'>
                <p>Order #{cart.id} · {formatDate(cart.date)}</p>
                <p>{formatPrice(total)}</p>
              </div>
              {items.map(({ product, quantity }, index) => (
                <p key={index} className='text-gray-500 line-clamp-1'>{quantity} x {product?.title ?? 'Product no longer available'}</p>
              ))}
            </article>
          )
        })}
      </div>
    </div>
  )
}

const Orders = () => {
  const { user } = useAuth()
  const allOrders = orderStore((state) => state.orders)
  const orders = useMemo(() => allOrders.filter(({ username }) => username === user.username), [allOrders, user.username])

  useEffect(() => {
    document.title = 'My Orders | E-commerce'
  }, [])

  return (
    <section className='container py-6 md:py-10 flex flex-col gap-8'>
      <h1 className='font-display text-4xl md:text-5xl font-semibold tracking-tight'>My orders</h1>

      {orders.length === 0
        ? (
          <EmptyState
            testId='no-orders'
            icon={HiOutlineShoppingBag}
            title='No orders yet'
            description='When you place an order it will appear here.'
            action={<Button to='/shop'>Start shopping</Button>}
          />
          )
        : (
          <div className='table-wrapper'>
            <table className='data-table' data-testid='orders-table'>
              <thead>
                <tr>
                  <th scope='col'>Order</th>
                  <th scope='col'>Date</th>
                  <th scope='col'>Items</th>
                  <th scope='col'>Total</th>
                  <th scope='col'>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} data-testid={`order-row-${order.id}`}>
                    <td><Link to={`/order/${order.id}`} className='font-mono font-semibold underline underline-offset-4'>{order.id}</Link></td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td>{order.items.reduce((acc, item) => acc + item.quantity, 0)}</td>
                    <td className='font-semibold'>{formatPrice(order.total)}</td>
                    <td><OrderStatusBadge status={order.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}

      {user.source === 'api' && <ApiOrderHistory userId={user.id} />}
    </section>
  )
}

export default Orders
