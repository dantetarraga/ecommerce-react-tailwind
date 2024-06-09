import React, { useEffect, useState } from 'react'
import { FaRegTrashCan } from 'react-icons/fa6'
import useCart from '../../hooks/useCart'
import ModalDeleteProduct from './ModalDeleteProduct'

const TbodyProduct = ({ product }) => {
  const { dispatch } = useCart()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (show) document.addEventListener('keydown', handleEscape, false)
    return () => document.removeEventListener('keydown', handleEscape, false)
  }, [show])

  // const handleRemoveFrontCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id })
  const handleIncrementQuantity = (id) => dispatch({ type: 'INCREMENT', payload: id })
  const handleDecrementQuantity = (id) => dispatch({ type: 'DECREMENT', payload: id })

  const handleOpenModal = () => setShow(true)
  const handleCloseModal = () => setShow(false)
  const handleEscape = (event) => { if (event.keyCode === 27) handleCloseModal() }

  return (
    <tr className='border-b [&>*]:text-center'>
      <td>
        <div className='font-bold text-sm flex items-center gap-4 p-4'>
          <img src={product.image} alt={product.title} className='w-16 h-16' />
          <p className='text-wrap w-[150px] md:w-[300px]'>{product.title}</p>
        </div>
      </td>

      <td>
        <div className='flex items-center border border-gray-300 rounded-md overflow-hidden'>
          <button
            className='flex-1 p-2 text-gray-700 hover:bg-gray-200 focus:outline-none'
            onClick={() => handleDecrementQuantity(product.id)}
          >
            -
          </button>
          <span className='flex-2 p-2'>{product.quantity}</span>
          <button
            className='flex-1 p-2 text-gray-700 hover:bg-gray-200 focus:outline-none'
            onClick={() => handleIncrementQuantity(product.id)}
          >
            +
          </button>
        </div>
      </td>

      <td>${product.price.toFixed(2)}</td>
      <td>${product.price * product.quantity}</td>
      <td>
        <div
          className='cursor-pointer rounded-full hover:bg-gray-100 p-3 w-10 h-10 flex items-center justify-center'
          onClick={handleOpenModal}
        >
          <FaRegTrashCan
            className='text-xl text-red-500'
          />
        </div>
      </td>
      {show && (<ModalDeleteProduct product={product} onClose={handleCloseModal} />)}
    </tr>
  )
}

export default TbodyProduct
