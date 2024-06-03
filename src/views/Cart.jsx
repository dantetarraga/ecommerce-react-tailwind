import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import TbodyProduct from '../components/product/TbodyProduct'
import useCart from '../hooks/useCart'

const Cart = () => {
  const { cart, getTotalPrice, dispatch } = useCart()
  const [products, setPrducts] = useState(cart)
  const navigate = useNavigate()

  const DELIVERY_CHARGE = 5.00
  const grandTotalPrice = DELIVERY_CHARGE + getTotalPrice()

  useEffect(() => {
    document.title = 'Cart | E-commerce'
  }, [])

  useEffect(() => {
    setPrducts(cart)
  }, [cart])

  const handleNavigateToShop = () => navigate('/shop')
  const handleProceedToCheckout = async () => {
    toast.success('Your order has been placed successfully', {
      duration: 3000,
      className: 'bg-green-500 text-white'
    })
    navigate('/shop')

    await new Promise((resolve) => setTimeout(resolve, 1000))
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <section className='h-full'>
      {cart.length === 0
        ? (
          <div className='flex items-center justify-center flex-col h-full'>
            <p className='text-4xl font-bold'>There are no products in the cart...</p>
            <img src='../../public/shoppingCartEmpty.jpg' className='w-60 h-60' alt='Shopping Cart' />
            <button
              className='mt-5 p-4 bg-black text-gray-200 text-sm rounded-md hover:bg-gray-800'
              onClick={handleNavigateToShop}
            >
              <p>Continue Shopping</p>
            </button>
          </div>
          )
        : (
          <>
            <h1 className='text-2xl font-bold my-5'>Checkout</h1>

            <main className='grid grid-cols-[2fr_1fr] gap-5'>
              <table className='table-auto'>
                <thead className='min-w-full border-b border-gray-200'>
                  <tr className='w-full border-b [&>*]:px-8 [&>*]:py-4'>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                    <th />
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <TbodyProduct key={product.id} product={product} />
                  ))}
                </tbody>
              </table>

              <section className='flex gap-5 flex-col border px-8 [&>*]:flex [&>*]:justify-between'>
                <div className='p-4 border-b-2 border-gray-200 font-bold text-black'>
                  <p>Subtotal</p>
                  <p>{getTotalPrice().toFixed()}</p>
                </div>

                <div className='p-4 border-b-2 border-gray-200 '>
                  <p>Delivery charge</p>
                  <p>${DELIVERY_CHARGE.toFixed(2)}</p>
                </div>

                <div className='p-4 font-bold text-black'>
                  <p>Grand Total</p>
                  <p>${grandTotalPrice.toFixed()}</p>
                </div>

                <button
                  className='mb-4 p-4 bg-black text-gray-200 text-sm rounded-md w-full hover:bg-gray-800 flex justify-center items-center'
                  onClick={handleProceedToCheckout}
                >
                  <p className='text-center w-full'>Proceed to Checkout</p>
                </button>
              </section>
            </main>
          </>
          )}

    </section>
  )
}

export default Cart
