import { Link } from 'react-router-dom'
import Logo from '../assets/logo.webp'
import { CATEGORIES, getCategoryShopUrl } from '../data/categories'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className='mt-20 border-t border-line bg-surface-muted'>
      <div className='container grid grid-cols-2 md:grid-cols-4 gap-10 py-14'>
        <div className='col-span-2 md:col-span-1 space-y-4'>
          <img src={Logo} className='h-12 w-auto' alt='Apparel Express' loading='lazy' />
          <p className='text-sm text-gray-500 max-w-xs'>Your one-stop shop for clothing, jewelry and electronics.</p>
        </div>

        <div>
          <h3 className='font-semibold mb-4'>Shop</h3>
          <ul className='space-y-2 text-sm text-gray-600'>
            {CATEGORIES.map(({ value, label }) => (
              <li key={value}><Link to={getCategoryShopUrl(value)} className='hover:text-ink'>{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className='font-semibold mb-4'>Account</h3>
          <ul className='space-y-2 text-sm text-gray-600'>
            <li><Link to='/login' className='hover:text-ink'>Login</Link></li>
            <li><Link to='/register' className='hover:text-ink'>Create account</Link></li>
            <li><Link to='/orders' className='hover:text-ink'>My Orders</Link></li>
            <li><Link to='/cart' className='hover:text-ink'>Cart</Link></li>
          </ul>
        </div>

        <div>
          <h3 className='font-semibold mb-4'>Help</h3>
          <ul className='space-y-2 text-sm text-gray-600'>
            <li>Free shipping over $150</li>
            <li>30 days money guarantee</li>
            <li>Support 24/7</li>
          </ul>
        </div>
      </div>

      <div className='border-t border-line'>
        <p className='container py-6 text-xs text-gray-500'>&copy; {year} Apparel Express - Dante Tárraga. Demo store for QA practice.</p>
      </div>
    </footer>
  )
}

export default Footer
