import { useEffect, useState } from 'react'
import { HiCheck, HiLockClosed } from 'react-icons/hi2'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import OrderSummary from '../components/cart/OrderSummary'
import ErrorBanner from '../components/form/ErrorBanner'
import FormInput from '../components/form/FormInput'
import Button from '../components/ui/Button'
import useAuth from '../hooks/useAuth'
import useCart from '../hooks/useCart'
import useProducts from '../hooks/useProducts'
import { createCart } from '../services/carts'
import orderStore from '../store/orderStore'
import productStore from '../store/productStore'
import { onlyDigits, processPayment } from '../utils/payment'
import { calculateTotals, SHIPPING_METHODS } from '../utils/pricing'
import { formatPrice } from '../utils/products'
import { validatePayment, validateShipping } from '../utils/validators'

const STEPS = ['Shipping', 'Payment', 'Review']

const formatCardNumber = (value) => onlyDigits(value).slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ')
const formatExpiry = (value) => {
  const digits = onlyDigits(value).slice(0, 4)
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
}
const FORMATTERS = { cardNumber: formatCardNumber, expiry: formatExpiry, cvv: (value) => onlyDigits(value).slice(0, 3) }

const ReviewCard = ({ title, onEdit, children }) => (
  <div className='rounded-2xl border border-line p-5 text-sm'>
    <div className='mb-2 flex items-center justify-between'>
      <h3 className='font-semibold'>{title}</h3>
      {onEdit && <button onClick={onEdit} className='text-sm font-semibold underline underline-offset-4'>Edit</button>}
    </div>
    <div className='space-y-0.5 text-gray-600'>{children}</div>
  </div>
)

const Checkout = () => {
  const { user } = useAuth()
  const { cart, coupon, dispatch } = useCart()
  const { products, isLoading: isLoadingProducts } = useProducts()
  const addOrder = orderStore((state) => state.addOrder)
  const updateProduct = productStore((state) => state.updateProduct)
  const navigate = useNavigate()

  const [step, setStep] = useState(0)
  const [shipping, setShipping] = useState({
    fullName: `${user.name.firstname} ${user.name.lastname}`.trim(),
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  })
  const [shippingMethod, setShippingMethod] = useState('standard')
  const [payment, setPayment] = useState({ cardName: '', cardNumber: '', expiry: '', cvv: '' })
  const [errors, setErrors] = useState({})
  const [orderError, setOrderError] = useState('')
  const [isPlacing, setIsPlacing] = useState(false)

  const totals = calculateTotals({ items: cart, couponCode: coupon, shippingMethod })

  useEffect(() => {
    document.title = 'Checkout | E-commerce'
  }, [])

  if (cart.length === 0 && !isPlacing) return <Navigate to='/cart' replace />

  const handleChange = (setValues) => (e) => {
    const { name, value } = e.target
    const format = FORMATTERS[name]
    setValues((prevValues) => ({ ...prevValues, [name]: format ? format(value) : value }))
    setErrors((prevErrors) => ({ ...prevErrors, [name]: null }))
  }

  const handleNext = (e) => {
    e.preventDefault()
    const validationErrors = step === 0 ? validateShipping(shipping) : validatePayment(payment)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) setStep(step + 1)
  }

  const goToStep = (nextStep) => {
    setErrors({})
    setOrderError('')
    setStep(nextStep)
  }
  const handleBack = () => goToStep(step - 1)

  const handlePlaceOrder = async () => {
    setIsPlacing(true)
    setOrderError('')

    try {
      const unavailable = cart.find((item) => {
        const product = products.find(({ id }) => id === item.id)
        return !product || item.quantity > product.stock
      })
      if (unavailable) throw new Error(`There is not enough stock for "${unavailable.title}". Please update your cart.`)

      const { transactionId } = await processPayment(payment)
      const apiCart = await createCart({
        userId: user.id,
        products: cart.map((item) => ({ productId: item.id, quantity: item.quantity }))
      }).catch(() => { throw new Error('The order could not be registered. Please try again.') })

      const order = {
        id: `ORD-${Date.now().toString(36).toUpperCase()}`,
        apiCartId: apiCart.id,
        transactionId,
        username: user.username,
        customerName: shipping.fullName.trim(),
        items: cart.map(({ id, title, price, image, quantity }) => ({ id, title, price, image, quantity })),
        couponCode: coupon,
        ...totals,
        shippingMethod,
        shippingAddress: {
          address: shipping.address.trim(),
          city: shipping.city.trim(),
          postalCode: shipping.postalCode.trim(),
          phone: shipping.phone.trim()
        },
        cardLast4: onlyDigits(payment.cardNumber).slice(-4),
        status: 'Pending',
        createdAt: new Date().toISOString()
      }

      addOrder(order)
      cart.forEach((item) => {
        const product = products.find(({ id }) => id === item.id)
        updateProduct(item.id, { stock: product.stock - item.quantity })
      })
      navigate(`/order/${order.id}`, { replace: true })
      dispatch({ type: 'CLEAR_CART' })
      toast.success('Your order has been placed successfully')
    } catch (error) {
      setOrderError(error.message)
      setIsPlacing(false)
    }
  }

  return (
    <section className='container py-6 md:py-10'>
      <div className='mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
        <div>
          <Link to='/cart' className='text-sm text-gray-500 hover:text-ink'>&larr; Back to cart</Link>
          <h1 className='mt-2 font-display text-4xl md:text-5xl font-semibold tracking-tight'>Checkout</h1>
        </div>

        <ol className='flex items-center gap-2 text-sm' data-testid='checkout-steps'>
          {STEPS.map((label, index) => (
            <li
              key={label}
              data-testid={`step-${label.toLowerCase()}`}
              aria-current={index === step ? 'step' : undefined}
              className={`flex items-center gap-2 ${index <= step ? 'text-ink font-semibold' : 'text-gray-400'}`}
            >
              <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs ${index < step ? 'bg-accent-500 text-ink' : index === step ? 'bg-ink text-white' : 'bg-surface-sunken'}`}>
                {index < step ? <HiCheck /> : index + 1}
              </span>
              <span className={index === step ? '' : 'hidden sm:inline'}>{label}</span>
              {index < STEPS.length - 1 && <span className='mx-1 h-px w-6 md:w-10 bg-line' aria-hidden='true' />}
            </li>
          ))}
        </ol>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-start'>
        <div className='rounded-3xl border border-line bg-white p-6 md:p-10'>
          {step === 0 && (
            <form onSubmit={handleNext} noValidate data-testid='shipping-form' className='flex flex-col gap-5'>
              <h2 className='text-xl font-bold'>Shipping information</h2>
              <FormInput id='fullName' label='Full name' autoComplete='name' value={shipping.fullName} onChange={handleChange(setShipping)} error={errors.fullName} />
              <FormInput id='address' label='Address' autoComplete='street-address' value={shipping.address} onChange={handleChange(setShipping)} error={errors.address} />
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                <FormInput id='city' label='City' autoComplete='address-level2' value={shipping.city} onChange={handleChange(setShipping)} error={errors.city} />
                <FormInput id='postalCode' label='Postal code' inputMode='numeric' autoComplete='postal-code' value={shipping.postalCode} onChange={handleChange(setShipping)} error={errors.postalCode} />
              </div>
              <FormInput id='phone' label='Phone' type='tel' autoComplete='tel' value={shipping.phone} onChange={handleChange(setShipping)} error={errors.phone} />

              <fieldset className='flex flex-col gap-3'>
                <legend className='label mb-3'>Shipping method</legend>
                {Object.entries(SHIPPING_METHODS).map(([method, { label, price }]) => (
                  <label
                    key={method}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 text-sm transition-colors ${shippingMethod === method ? 'border-ink bg-surface-muted' : 'border-line hover:border-gray-400'}`}
                  >
                    <input
                      type='radio'
                      name='shippingMethod'
                      value={method}
                      data-testid={`shipping-${method}`}
                      checked={shippingMethod === method}
                      onChange={() => setShippingMethod(method)}
                      className='h-4 w-4 accent-ink'
                    />
                    <span className='flex-grow font-medium'>{label}</span>
                    <span className='font-semibold'>{formatPrice(price)}</span>
                  </label>
                ))}
              </fieldset>

              <Button type='submit' size='lg' data-testid='continue-to-payment' className='sm:self-end'>
                Continue to payment
              </Button>
            </form>
          )}

          {step === 1 && (
            <form onSubmit={handleNext} noValidate data-testid='payment-form' className='flex flex-col gap-5'>
              <div className='flex items-center justify-between'>
                <h2 className='text-xl font-bold'>Payment</h2>
                <span className='flex items-center gap-1.5 text-xs text-gray-500'><HiLockClosed aria-hidden='true' /> Secure payment</span>
              </div>
              <FormInput id='cardName' label='Name on card' autoComplete='cc-name' value={payment.cardName} onChange={handleChange(setPayment)} error={errors.cardName} />
              <FormInput id='cardNumber' label='Card number' inputMode='numeric' autoComplete='cc-number' placeholder='4242 4242 4242 4242' value={payment.cardNumber} onChange={handleChange(setPayment)} error={errors.cardNumber} />
              <div className='grid grid-cols-2 gap-5'>
                <FormInput id='expiry' label='Expiration (MM/YY)' inputMode='numeric' autoComplete='cc-exp' placeholder='MM/YY' value={payment.expiry} onChange={handleChange(setPayment)} error={errors.expiry} />
                <FormInput id='cvv' label='CVV' type='password' inputMode='numeric' autoComplete='cc-csc' value={payment.cvv} onChange={handleChange(setPayment)} error={errors.cvv} />
              </div>

              <div className='flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-2'>
                <Button variant='outline' size='lg' data-testid='back-button' onClick={handleBack}>Back</Button>
                <Button type='submit' size='lg' data-testid='continue-to-review'>Review order</Button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div data-testid='review-step' className='flex flex-col gap-5'>
              <h2 className='text-xl font-bold'>Review your order</h2>

              <ErrorBanner message={orderError} testId='order-error' />

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <ReviewCard title='Ship to' onEdit={isPlacing ? undefined : () => goToStep(0)}>
                  <p className='text-ink'>{shipping.fullName}</p>
                  <p>{shipping.address}, {shipping.city} {shipping.postalCode}</p>
                  <p>{shipping.phone}</p>
                  <p>{SHIPPING_METHODS[shippingMethod].label}</p>
                </ReviewCard>
                <ReviewCard title='Payment' onEdit={isPlacing ? undefined : () => goToStep(1)}>
                  <p className='text-ink'>{payment.cardName}</p>
                  <p>Card ending in {onlyDigits(payment.cardNumber).slice(-4)}</p>
                </ReviewCard>
              </div>

              <ul className='divide-y divide-line rounded-2xl border border-line' data-testid='review-items'>
                {cart.map((item) => (
                  <li key={item.id} className='flex items-center gap-4 p-4 text-sm'>
                    <img src={item.image} alt='' className='h-12 w-12 object-contain' />
                    <p className='flex-1 line-clamp-2'>{item.title}</p>
                    <p className='text-gray-500'>x{item.quantity}</p>
                    <p className='w-20 text-right font-semibold'>{formatPrice(item.price * item.quantity)}</p>
                  </li>
                ))}
              </ul>

              <div className='flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-2'>
                <Button variant='outline' size='lg' data-testid='review-back-button' onClick={handleBack} disabled={isPlacing}>Back</Button>
                <Button size='lg' data-testid='place-order' onClick={handlePlaceOrder} disabled={isPlacing || isLoadingProducts}>
                  {isPlacing ? 'Processing payment...' : `Place order · ${formatPrice(totals.total)}`}
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className='lg:sticky lg:top-32'>
          <OrderSummary totals={totals} couponCode={coupon} />
        </div>
      </div>
    </section>
  )
}

export default Checkout
