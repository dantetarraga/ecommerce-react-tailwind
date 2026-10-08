import { FREE_SHIPPING_THRESHOLD } from '../../utils/pricing'
import { formatPrice } from '../../utils/products'

const SummaryRow = ({ label, value, testId, className = '' }) => (
  <div className={`flex justify-between gap-4 ${className}`}>
    <dt>{label}</dt>
    <dd data-testid={testId} className='tabular-nums'>{value}</dd>
  </div>
)

const OrderSummary = ({ totals, couponCode, children }) => {
  const { subtotal, discount, shipping, total } = totals
  const missingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal
  const freeShippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)

  return (
    <section data-testid='order-summary' aria-label='Order summary' className='rounded-3xl bg-surface-muted p-6 md:p-8 flex flex-col gap-5 h-fit'>
      <h2 className='text-lg font-bold'>Order summary</h2>

      {missingForFreeShipping > 0
        ? (
          <div className='space-y-2'>
            <p data-testid='free-shipping-hint' className='text-sm'>
              Add <strong>{formatPrice(missingForFreeShipping)}</strong> more to get free standard shipping.
            </p>
            <div className='h-1.5 rounded-full bg-surface-sunken overflow-hidden' aria-hidden='true'>
              <div className='h-full rounded-full bg-accent-500 transition-all' style={{ width: `${freeShippingProgress}%` }} />
            </div>
          </div>
          )
        : <p className='text-sm font-medium text-emerald-700'>Your order qualifies for free standard shipping.</p>}

      <dl className='flex flex-col gap-3 text-sm'>
        <SummaryRow label='Subtotal' value={formatPrice(subtotal)} testId='summary-subtotal' />
        {couponCode && (
          <SummaryRow label={`Discount (${couponCode})`} value={`-${formatPrice(discount)}`} testId='summary-discount' className='text-emerald-700' />
        )}
        <SummaryRow label='Delivery charge' value={shipping === 0 ? 'FREE' : formatPrice(shipping)} testId='summary-shipping' />
        <SummaryRow label='Grand Total' value={formatPrice(total)} testId='summary-total' className='border-t border-line pt-4 text-lg font-bold' />
      </dl>

      {children}
    </section>
  )
}

export default OrderSummary
