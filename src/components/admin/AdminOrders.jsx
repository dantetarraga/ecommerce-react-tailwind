import { HiOutlineClipboardDocumentList } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import orderStore, { ORDER_STATUSES } from '../../store/orderStore'
import { formatPrice } from '../../utils/products'
import OrderStatusBadge from '../order/OrderStatusBadge'
import EmptyState from '../ui/EmptyState'

const AdminOrders = () => {
  const orders = orderStore((state) => state.orders)
  const updateOrderStatus = orderStore((state) => state.updateOrderStatus)

  const handleStatusChange = (order, status) => {
    updateOrderStatus(order.id, status)
    toast.success(`Order ${order.id} marked as ${status}`)
  }

  if (orders.length === 0) {
    return <EmptyState testId='admin-no-orders' icon={HiOutlineClipboardDocumentList} title='No orders yet' description='Orders placed by customers will appear here.' />
  }

  return (
    <div className='table-wrapper'>
      <table className='data-table' data-testid='admin-orders-table'>
        <thead>
          <tr>
            <th scope='col'>Order</th>
            <th scope='col'>Customer</th>
            <th scope='col'>Date</th>
            <th scope='col'>Total</th>
            <th scope='col'>Status</th>
            <th scope='col'>Change status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} data-testid={`admin-order-${order.id}`}>
              <td><Link to={`/order/${order.id}`} className='font-mono font-semibold underline underline-offset-4'>{order.id}</Link></td>
              <td>{order.customerName} <span className='text-gray-400'>({order.username})</span></td>
              <td>{new Date(order.createdAt).toLocaleString('en-US')}</td>
              <td className='font-semibold'>{formatPrice(order.total)}</td>
              <td><OrderStatusBadge status={order.status} /></td>
              <td>
                <select
                  aria-label={`Change status of ${order.id}`}
                  data-testid='order-status-select'
                  value={order.status}
                  onChange={(e) => handleStatusChange(order, e.target.value)}
                  className='input h-9 w-36 py-0 cursor-pointer'
                >
                  {ORDER_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminOrders
