import useCart from '../hooks/useCart'

const Cart = () => {
  const { cart } = useCart()
  console.log(cart)

  return (
    <section>
      <h3>Checkout</h3>

      <table className='table-auto'>
        <thead className='min-w-full border-b border-gray-200'>
          <tr className='w-full border-b [&>*]:px-8 [&>*]:py-4'>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>

        <tbody>
          {cart.map((product) => (
            <tr key={product.id} className='border-b [&>*]:text-center'>
              <td className='font-bold text-sm flex items-center gap-4 p-4'>
                <img src={product.image} alt={product.title} className='w-16 h-16' />
                <p>{product.title}</p>
              </td>
              <td className='px-4 py-2 rounded-sm'>
                <div className='flex items-center border border-gray-300 rounded-md overflow-hidden'>
                  <button
                    className='px-2 py-1 text-gray-700 hover:bg-gray-200 focus:outline-none'
                  >
                    -
                  </button>
                  <span className='px-4'>{product.quantity}</span>
                  <button
                    className='px-2 py-1 text-gray-600 hover:bg-slate-100 bg-white'
                  >
                    +
                  </button>
                </div>
              </td>
              <td>${product.price.toFixed(2)}</td>
              <td>${product.price * product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default Cart
