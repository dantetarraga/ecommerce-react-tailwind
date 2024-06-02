import React from 'react'
import useCart from '../../hooks/useCart'

const ModalDeleteProduct = ({ product, onClose }) => {
  const { dispatch } = useCart()

  const handleDelete = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product.id })
    onClose()
  }

  return (
    <div
      className='fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50'
      onClick={onClose}
    >
      <div
        className='bg-white p-6 rounded-md shadow-lg w-96 flex flex-col gap-4'
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className='text-xl font-bold'>Confirm Delete</h2>
        <p className='mb-4'>Are you sure you want to delete {product.title} to cart?</p>
        <div className='flex justify-between'>
          <button
            className='px-4 py-2 bg-gray-300 text-black rounded-md'
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className='px-4 py-2 bg-red-600 text-white rounded-md'
            onClick={handleDelete}
          >
            Yes, Delete
          </button>
        </div>
      </div>

    </div>
  )
}

export default ModalDeleteProduct
