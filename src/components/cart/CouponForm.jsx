import { useState } from 'react'
import { HiOutlineTag } from 'react-icons/hi2'
import { toast } from 'sonner'
import useCart from '../../hooks/useCart'
import { COUPONS, validateCoupon } from '../../utils/pricing'
import Button from '../ui/Button'

const CouponForm = ({ subtotal }) => {
  const { coupon, dispatch } = useCart()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  // A coupon stops applying if the subtotal later drops below its minimum
  const couponError = coupon ? validateCoupon(coupon, subtotal).error : null

  const handleApply = (e) => {
    e.preventDefault()
    const result = validateCoupon(code, subtotal)

    if (result.error) {
      setError(result.error)
      return
    }

    dispatch({ type: 'APPLY_COUPON', payload: result.code })
    setCode('')
    setError('')
    toast.success(`Coupon ${result.code} applied`)
  }

  const handleRemove = () => dispatch({ type: 'REMOVE_COUPON' })

  if (coupon) {
    return (
      <div data-testid='applied-coupon' className='flex flex-col gap-1 rounded-2xl border border-dashed border-accent-400 bg-accent-50 p-4'>
        <div className='flex items-center justify-between gap-3'>
          <p className='flex items-center gap-2 text-sm'>
            <HiOutlineTag className='text-lg text-accent-700 shrink-0' aria-hidden='true' />
            <span><span className='font-mono font-bold'>{coupon}</span> · {COUPONS[coupon]?.description}</span>
          </p>
          <button data-testid='remove-coupon' onClick={handleRemove} className='text-sm font-semibold text-red-600 hover:underline'>Remove</button>
        </div>
        {couponError && <p data-testid='coupon-warning' className='text-xs font-medium text-red-600'>{couponError}. The discount is not applied.</p>}
      </div>
    )
  }

  return (
    <form onSubmit={handleApply} noValidate className='flex flex-col gap-2'>
      <label htmlFor='coupon' className='label'>Have a coupon?</label>
      <div className='flex gap-2'>
        <input
          id='coupon'
          data-testid='coupon-input'
          value={code}
          onChange={(e) => { setCode(e.target.value); setError('') }}
          placeholder='Enter code'
          aria-invalid={!!error}
          aria-describedby={error ? 'coupon-error' : undefined}
          className={`input h-11 rounded-full uppercase placeholder:normal-case ${error ? 'input-error' : ''}`}
        />
        <Button type='submit' data-testid='apply-coupon' variant='secondary'>Apply</Button>
      </div>
      {error && <p id='coupon-error' data-testid='coupon-error' className='text-xs font-medium text-red-600'>{error}</p>}
    </form>
  )
}

export default CouponForm
