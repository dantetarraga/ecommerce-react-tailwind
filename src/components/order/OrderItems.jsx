import { formatPrice } from '../../utils/products'

const OrderItems = ({ items }) => (
  <ul className='divide-y divide-line'>
    {items.map((item) => (
      <li key={item.id} className='flex items-center gap-4 py-4 text-sm'>
        <div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-line bg-white p-2'>
          <img src={item.image} alt='' className='max-h-full object-contain' />
        </div>
        <p className='flex-1 line-clamp-2'>{item.title}</p>
        <p className='text-gray-500'>x{item.quantity}</p>
        <p className='w-20 text-right font-semibold'>{formatPrice(item.price * item.quantity)}</p>
      </li>
    ))}
  </ul>
)

export default OrderItems
