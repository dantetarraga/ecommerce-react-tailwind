const ModalProduct = ({ product, onClose }) => {
  console.log(product)
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-8 rounded-lg'>
        <div className='flex justify-end'>
          <button onClick={onClose}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <img
          src={product.image}
          alt={product.title}
          className='h-64 w-full object-cover mb-4'
        />
        <h2 className='text-xl font-bold mb-2'>{product.title}</h2>
        <p className='mb-4'>{product.description}</p>
        <p className='font-bold text-lg'>Price: ${product.price}</p>
      </div>
    </div>
  )
}

export default ModalProduct
