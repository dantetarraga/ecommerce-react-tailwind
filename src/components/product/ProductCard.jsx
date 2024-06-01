import { useEffect, useState } from 'react'
import { CiShoppingCart } from 'react-icons/ci'
import { IoEyeOutline } from 'react-icons/io5'
import useCart from '../../hooks/useCart'
import ModalProduct from './ModalProduct'

const ProductCard = ({ product }) => {
  const [show, setShow] = useState(false)
  const { addToCart } = useCart()

  const handleOpenModal = () => setShow(true)
  const handleCloseModal = () => setShow(false)

  const handleEscape = (event) => { if (event.keyCode === 27) handleCloseModal() }

  useEffect(() => {
    if (show) document.addEventListener('keydown', handleEscape, false)
    return () => document.removeEventListener('keydown', handleEscape, false)
  }, [handleEscape, show])

  return (
    <div className='shadow-lg p-5 flex flex-col relative bg-gray-100 h-[400px]'>
      <img src={product.image} className='mb-5 object-cover h-[200px] self-center' alt={product.title} />

      <main className='px-5 py-5 flex flex-col space-y-2 border-t-2 border-gray-300 flex-grow '>
        <div className='flex justify-between'>
          <h3 className='capitalize font-semibold text-base'>{product.category}</h3>
          <p className='font-semibold text-lg'>$ {product.price}</p>
        </div>
        <p className='text-sm'>{product.title}</p>
      </main>

      <div className='absolute top-2 right-3 flex flex-col gap-5 [&>*]:cursor-pointer'>
        <button className='flex place-items-center hover:bg-slate-100 bg-white rounded-full p-2'>
          <CiShoppingCart
            onClick={() => addToCart(product)}
            className='text-2xl text-black'
          />
        </button>
        <button
          className='flex place-items-center hover:bg-slate-100 bg-white rounded-full p-2'
          onClick={handleOpenModal}
        >
          <IoEyeOutline className='text-2xl text-black' />
        </button>
      </div>

      {show
        ? (
          <ModalProduct
            product={product}
            onClose={handleCloseModal}
          />
          )
        : null}
    </div>
  )
}

export default ProductCard
