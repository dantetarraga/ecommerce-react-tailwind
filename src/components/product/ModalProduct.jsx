import { useState } from 'react'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { IoCloseSharp } from 'react-icons/io5'
import ReactStars from 'react-stars'
import { toast } from 'sonner'
import useCart from '../../hooks/useCart'

const ModalProduct = ({ product, onClose }) => {
  const { dispatch, cart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleIncrementQuantity = () => setQuantity((prevQuantity) => prevQuantity + 1)
  const handleDecrementQuantity = () => setQuantity((prevQuantity) => prevQuantity > 1 ? prevQuantity - 1 : 1)

  const handleAddToCart = () => {
    const existProduct = cart.some((item) => item.id === product.id)

    if (!existProduct) dispatch({ type: 'ADD_TO_CART', payload: product, quantity })
    else { dispatch({ type: 'UPDATE_PRODUCT_QUANTITY', payload: { id: product.id, quantity } }) }

    toast.success('Product added to cart successfully', {
      duration: 3000,
      className: 'bg-green-500 text-white'
    })
    onClose()
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      onClick={onClose}
    >
      <div
        className='bg-white p-8 rounded-lg w-[1000px] h-[450px] relative overflow-y-auto'
        onClick={(event) => event.stopPropagation()}
      >
        <button onClick={onClose} className='absolute top-0 right-0 hover:bg-gray-100 rounded-full p-2'>
          <IoCloseSharp className='text-2xl' />
        </button>

        <main className='flex flex-col md:flex-row gap-5 h-full'>
          <img
            src={product.image}
            alt={product.title}
            className='h-full self-center w-[80px] md:w-[350px] object-contain'
          />
          <div className='flex flex-col justify-between'>
            <header>
              <div className='flex justify-between items-center'>
                <h2 className='p-2 text-lg md:text-xl font-bold '>{product.title}</h2>
                <p className='p-2 bg-green-100 opacity-80 rounded text-green-800 font-semibold w-fit text-nowrap'>In Stock</p>
              </div>

              <div className='flex items-center gap-2 [&>p]:text-gray-400'>
                <ReactStars count={5} size={30} color2='#ffd700' value={product.rating.rate} edit={false} />
                <p>{product.rating.rate}{' '}</p>
                <p>({product.rating.count} Reviews)</p>
              </div>
            </header>

            <p className='mb-4 text-sm md:text-lg'>{product.description}</p>
            <p className='font-bold text-sm md:text-lg'>Price: ${product.price}</p>

            <div className='flex items-center justify-center gap-4 my-2'>
              <div className='flex items-center border border-gray-300 rounded-md overflow-hidden'>
                <button className='p-2 md:px-4 md:py-4 text-gray-700 hover:bg-gray-200 focus:outline-none' onClick={handleDecrementQuantity}>
                  -
                </button>

                <span className='p-2 md:px-4 md:py-4 text-gray-700'>{quantity}</span>

                <button className='p-2 md:px-4 md:py-4 text-gray-700 hover:bg-gray-200 focus:outline-none' onClick={handleIncrementQuantity}>
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className='flex items-center justify-center gap-5 flex-grow p-2 md:px-4 md:py-4 text-white  rounded-md  focus:outline-none hover:bg-gray-800 bg-black'
              >
                {/* {!existProductToCart ? 'Add to Cart' : 'Added to Cart'} */}
                Add to Cart
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
