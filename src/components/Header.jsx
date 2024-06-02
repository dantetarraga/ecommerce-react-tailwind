import { HiOutlineShoppingBag } from 'react-icons/hi2'
import { IoSearchOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'
import useCart from '../hooks/useCart'

const Header = () => {
  const { cart } = useCart()

  return (
    <div className='container mx-auto flex items-center py-5'>
      <div className='basis-0 flex-grow cursor-pointer'>
        <img
          className='w-[100px] h-auto'
          src={Logo}
          alt='Apparel Express logo'
        />
      </div>

      <nav className=''>
        <ul className='flex gap-10 text-sm font-semibold [&>li]:cursor-pointer'>
          <Link to='/'>Home</Link>
          <Link to='/shop'>Shop</Link>
          <Link to='/contact-us'>Contact Us</Link>
        </ul>
      </nav>

      <nav className='[&>button]:text-white flex items-center justify-end basis-0 flex-grow gap-7'>
        <ul className='flex gap-5 text-xl [&>li]:cursor-pointer'>
          <li className='relative'>
            <IoSearchOutline className='text-2xl' />
          </li>

          <li className='relative'>
            <Link to='/cart'>
              <HiOutlineShoppingBag className=' text-2xl' />
              {cart.length > 0 && (
                <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
                  {cart.length}
                </span>
              )}
            </Link>
          </li>
        </ul>
        <button className='py-2 px-10 bg-black rounded-md text-sm cursor-pointer'>
          Login
        </button>
      </nav>
    </div>
  )
}

export default Header
