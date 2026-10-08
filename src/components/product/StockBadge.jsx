export const LOW_STOCK_THRESHOLD = 5

const BASE = 'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap'

const StockBadge = ({ stock, hideInStock = false }) => {
  if (stock === 0) {
    return <span data-testid='stock-status' className={`${BASE} bg-ink text-white`}>Out of stock</span>
  }

  if (stock <= LOW_STOCK_THRESHOLD) {
    return <span data-testid='stock-status' className={`${BASE} bg-accent-100 text-accent-700`}>Only {stock} left</span>
  }

  if (hideInStock) return null

  return (
    <span data-testid='stock-status' className={`${BASE} bg-emerald-50 text-emerald-700`}>
      <span className='h-1.5 w-1.5 rounded-full bg-emerald-500' aria-hidden='true' />
      In stock
    </span>
  )
}

export default StockBadge
