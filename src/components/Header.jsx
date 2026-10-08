import { useCallback, useEffect, useRef, useState } from 'react'
import { HiBars3, HiOutlineShoppingBag, HiOutlineUserCircle } from 'react-icons/hi2'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import Logo from '../assets/logo.webp'
import { ROLE_LABELS } from '../data/testUsers'
import useAuth from '../hooks/useAuth'
import useCart from '../hooks/useCart'
import useClickOutside from '../hooks/useClickOutside'
import Button from './ui/Button'
import Drawer from './ui/Drawer'

const navLinkClass = ({ isActive }) =>
  `relative py-1 text-sm font-semibold transition-colors hover:text-ink ${isActive ? 'text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-accent-500' : 'text-ink-soft'}`

const UserMenu = ({ user, isAdmin, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const close = useCallback(() => setIsOpen(false), [])
  useClickOutside(menuRef, close, isOpen)

  return (
    <div className='relative' ref={menuRef}>
      <button
        data-testid='user-menu-button'
        aria-expanded={isOpen}
        aria-haspopup='menu'
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 text-sm font-semibold hover:bg-surface-muted'
      >
        <span className='flex h-8 w-8 items-center justify-center rounded-full bg-accent-100 text-accent-700 uppercase'>
          {user.name.firstname.charAt(0)}
        </span>
        <span className='hidden md:inline capitalize' data-testid='user-name'>{user.name.firstname}</span>
      </button>

      {isOpen && (
        <div role='menu' data-testid='user-menu' className='absolute right-0 mt-2 w-60 card shadow-lift z-40 overflow-hidden animate-fade-in'>
          <div className='px-4 py-3 border-b border-line'>
            <p className='font-semibold truncate'>{user.username}</p>
            <p className='text-xs text-gray-500' data-testid='user-role'>{ROLE_LABELS[user.role]}</p>
          </div>
          <div className='py-1 text-sm'>
            <Link role='menuitem' to='/orders' onClick={close} className='block px-4 py-2 hover:bg-surface-muted'>My Orders</Link>
            {isAdmin && <Link role='menuitem' to='/admin' onClick={close} className='block px-4 py-2 hover:bg-surface-muted'>Admin panel</Link>}
            <button role='menuitem' data-testid='logout-button' onClick={() => { close(); onLogout() }} className='w-full text-left px-4 py-2 text-red-600 hover:bg-red-50'>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const Header = () => {
  const { cart } = useCart()
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const handleLogout = () => {
    logout()
    toast.success('You have been logged out')
    navigate('/login')
  }

  const links = [
    { to: '/', label: 'Home', testId: 'nav-home', end: true },
    { to: '/shop', label: 'Shop', testId: 'nav-shop' },
    isAuthenticated && { to: '/orders', label: 'My Orders', testId: 'nav-orders' },
    isAdmin && { to: '/admin', label: 'Admin', testId: 'nav-admin' }
  ].filter(Boolean)

  return (
    <header className='sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur'>
      <div className='bg-ink text-white text-xs text-center py-2 px-4'>
        Free standard shipping on orders over $150
      </div>

      <div className='container flex h-16 md:h-20 items-center gap-4'>
        <button
          className='md:hidden -ml-2 rounded-full p-2 hover:bg-surface-muted'
          aria-label='Open menu'
          aria-expanded={isMobileMenuOpen}
          data-testid='mobile-menu-button'
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <HiBars3 className='text-2xl' />
        </button>

        <Link to='/' className='shrink-0' aria-label='Apparel Express home'>
          <img className='h-10 md:h-12 w-auto' src={Logo} alt='Apparel Express' width='92' height='48' />
        </Link>

        <nav aria-label='Main' className='hidden md:flex flex-1 justify-center gap-8'>
          {links.map(({ to, label, testId, end }) => (
            <NavLink key={to} to={to} end={end} className={navLinkClass} data-testid={testId}>{label}</NavLink>
          ))}
        </nav>

        <div className='flex flex-1 md:flex-none items-center justify-end gap-2'>
          <Link to='/cart' aria-label={`Cart, ${cart.length} products`} data-testid='cart-link' className='relative rounded-full p-2 hover:bg-surface-muted'>
            <HiOutlineShoppingBag className='text-2xl' />
            {cart.length > 0 && (
              <span data-testid='cart-badge' className='absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-500 px-1 text-[11px] font-bold text-ink'>
                {cart.length}
              </span>
            )}
          </Link>

          {isAuthenticated
            ? <UserMenu user={user} isAdmin={isAdmin} onLogout={handleLogout} />
            : (
              <Button to='/login' size='sm' data-testid='login-nav-button'>
                <HiOutlineUserCircle className='text-lg' />
                Login
              </Button>
              )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <Drawer
          label='Menu'
          testId='mobile-menu'
          onClose={() => setIsMobileMenuOpen(false)}
          header={<img className='h-10 w-auto' src={Logo} alt='Apparel Express' />}
        >
          <nav aria-label='Mobile' className='flex flex-col gap-1'>
            {links.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => `rounded-xl px-4 py-3 font-semibold ${isActive ? 'bg-accent-50 text-ink' : 'hover:bg-surface-muted'}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </Drawer>
      )}
    </header>
  )
}

export default Header
