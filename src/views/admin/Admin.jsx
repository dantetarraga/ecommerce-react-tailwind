import { useEffect } from 'react'
import { HiOutlineArchiveBox, HiOutlineBanknotes, HiOutlineExclamationTriangle, HiOutlineShoppingCart } from 'react-icons/hi2'
import { useSearchParams } from 'react-router-dom'
import AdminOrders from '../../components/admin/AdminOrders'
import AdminProducts from '../../components/admin/AdminProducts'
import AdminUsers from '../../components/admin/AdminUsers'
import LoadingSpinner from '../../components/loading/LoadingSpinner'
import useProducts from '../../hooks/useProducts'
import orderStore from '../../store/orderStore'
import { formatPrice } from '../../utils/products'

const TABS = [
  { key: 'products', label: 'Products' },
  { key: 'orders', label: 'Orders' },
  { key: 'users', label: 'Users' }
]

const StatCard = ({ icon: Icon, label, value, testId }) => (
  <div className='flex items-center gap-4 rounded-2xl border border-line bg-white p-5'>
    <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-50 text-accent-700'>
      <Icon className='text-2xl' aria-hidden='true' />
    </span>
    <div className='min-w-0'>
      <p className='text-sm text-gray-500'>{label}</p>
      <p className='truncate text-2xl font-bold' data-testid={testId}>{value}</p>
    </div>
  </div>
)

const Admin = () => {
  const { products, isLoading, error } = useProducts()
  const orders = orderStore((state) => state.orders)
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = TABS.some(({ key }) => key === searchParams.get('tab')) ? searchParams.get('tab') : 'products'

  useEffect(() => {
    document.title = 'Admin | E-commerce'
  }, [])

  const revenue = orders
    .filter(({ status }) => status !== 'Cancelled')
    .reduce((acc, order) => acc + order.total, 0)

  return (
    <section className='container py-6 md:py-10 flex flex-col gap-8'>
      <div>
        <p className='eyebrow'>Administration</p>
        <h1 className='mt-2 font-display text-4xl md:text-5xl font-semibold tracking-tight'>Admin panel</h1>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
        <StatCard icon={HiOutlineArchiveBox} label='Products' value={products.length} testId='stat-products' />
        <StatCard icon={HiOutlineExclamationTriangle} label='Out of stock' value={products.filter(({ stock }) => stock === 0).length} testId='stat-out-of-stock' />
        <StatCard icon={HiOutlineShoppingCart} label='Orders' value={orders.length} testId='stat-orders' />
        <StatCard icon={HiOutlineBanknotes} label='Revenue' value={formatPrice(revenue)} testId='stat-revenue' />
      </div>

      <div role='tablist' aria-label='Admin sections' className='flex gap-1 rounded-full bg-surface-muted p-1 w-fit'>
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            role='tab'
            aria-selected={activeTab === key}
            data-testid={`tab-${key}`}
            onClick={() => setSearchParams({ tab: key })}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${activeTab === key ? 'bg-white shadow-card' : 'text-gray-500 hover:text-ink'}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div role='tabpanel'>
        {activeTab === 'products' && (
          isLoading
            ? <LoadingSpinner fullPage={false} />
            : error
              ? <p className='text-red-600'>Products could not be loaded. Please try again later.</p>
              : <AdminProducts products={products} />
        )}
        {activeTab === 'orders' && <AdminOrders />}
        {activeTab === 'users' && <AdminUsers />}
      </div>
    </section>
  )
}

export default Admin
