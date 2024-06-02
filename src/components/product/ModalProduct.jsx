import { useEffect, useState } from 'react'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { IoCloseSharp } from 'react-icons/io5'
import ReactStars from 'react-stars'
import useCart from '../../hooks/useCart'

const ModalProduct = ({ product, onClose }) => {
  const { dispatch, cart } = useCart()
  const [existProductToCart, setExistProductToCart] = useState(false)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const existProduct = cart.find((item) => item.id === product.id)

    if (existProduct) setExistProductToCart(true)
  }, [cart])

  const handleIncrementQuantity = () => setQuantity((prevQuantity) => prevQuantity + 1)
  const handleDecrementQuantity = () => setQuantity((prevQuantity) => prevQuantity > 1 ? prevQuantity - 1 : 1)

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product, quantity })
    onClose()
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      onClick={onClose}
    >
      <div
        className='bg-white p-8 rounded-lg w-[1000px] h-[450px] relative'
        onClick={(event) => event.stopPropagation()}
      >
        <button onClick={onClose} className='absolute top-0 right-0 hover:bg-gray-100 rounded-full p-2'>
          <IoCloseSharp className='text-2xl' />
        </button>

        <main className='flex gap-5 h-full'>
          <img
            src={product.image}
            alt={product.title}
            className='h-full w-[350px] object-contain mb-4'
          />
          <div className='flex flex-col justify-between'>
            <header>
              <div className='flex justify-between items-center'>
                <h2 className='p-2 text-xl font-bold '>{product.title}</h2>
                <p className='p-2 bg-green-100 opacity-80 rounded text-green-800 font-semibold w-fit text-nowrap'>In Stock</p>
              </div>

              <div className='flex items-center gap-2 [&>p]:text-gray-400'>
                <ReactStars count={5} size={30} color2='#ffd700' value={product.rating.rate} edit={false} />
                <p>{product.rating.rate}{' '}</p>
                <p>({product.rating.count} Reviews)</p>
              </div>
            </header>

            <p className='mb-4'>{product.description}</p>
            <p className='font-bold text-lg'>Price: ${product.price}</p>

            <div className='flex items-center justify-center gap-4'>
              <div className='flex items-center border border-gray-300 rounded-md overflow-hidden'>
                <button className='px-3 py-4 text-gray-700 hover:bg-gray-200 focus:outline-none' onClick={handleDecrementQuantity}>
                  -
                </button>

                <span className='px-4 py-4 text-gray-700'>{quantity}</span>

                <button className='px-3 py-4 text-gray-700 hover:bg-gray-200 focus:outline-none' onClick={handleIncrementQuantity}>
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={existProductToCart}
                className={`flex items-center justify-center gap-5 flex-grow px-4 py-4 text-white  rounded-md  focus:outline-none ${existProductToCart ? 'bg-gray-400' : 'hover:bg-gray-800 bg-black'}`}
              >
                {!existProductToCart ? 'Add to Cart' : 'Added to Cart'}
                <HiOutlineShoppingBag className='text-xl' />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ModalProduct
