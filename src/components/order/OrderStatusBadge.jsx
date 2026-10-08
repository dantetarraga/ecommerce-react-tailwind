const STATUS_STYLES = {
  Pending: 'bg-accent-100 text-accent-700',
  Shipped: 'bg-sky-100 text-sky-800',
  Delivered: 'bg-emerald-100 text-emerald-800',
  Cancelled: 'bg-red-100 text-red-700'
}

const OrderStatusBadge = ({ status }) => (
  <span data-testid='order-status' className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}>
    {status}
  </span>
)

export default OrderStatusBadge
