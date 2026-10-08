import { HiOutlineChatBubbleLeftRight, HiOutlineCreditCard, HiOutlineCurrencyDollar, HiOutlineTruck } from 'react-icons/hi2'

const PERKS = [
  { icon: HiOutlineTruck, title: 'Free shipping', description: 'On orders over $150' },
  { icon: HiOutlineCurrencyDollar, title: 'Money guarantee', description: '30 days for an exchange' },
  { icon: HiOutlineChatBubbleLeftRight, title: 'Online support', description: '24 hours a day, 7 days a week' },
  { icon: HiOutlineCreditCard, title: 'Flexible payment', description: 'Pay with multiple credit cards' }
]

const Perks = () => (
  <section aria-label='Store benefits' className='container py-10'>
    <ul className='grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10'>
      {PERKS.map(({ icon: Icon, title, description }) => (
        <li key={title} className='flex flex-col sm:flex-row items-start gap-3 sm:gap-4'>
          <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-50 text-accent-700'>
            <Icon className='text-2xl' aria-hidden='true' />
          </span>
          <div>
            <h3 className='font-semibold'>{title}</h3>
            <p className='text-sm text-gray-500'>{description}</p>
          </div>
        </li>
      ))}
    </ul>
  </section>
)

export default Perks
