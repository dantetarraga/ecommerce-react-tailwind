import { HiOutlineShoppingBag } from 'react-icons/hi2'
import { IoIosHeartEmpty } from 'react-icons/io'
import { IoSearchOutline } from 'react-icons/io5'
import Logo from '../assets/logo.png'

const Header = () => {
  return (
    <div className='flex items-center py-5'>
      <div className='basis-0 flex-grow cursor-pointer'>
        <img className='w-[100px] h-auto' src={Logo} alt='Apparel Express logo' />
      </div>

      <nav className=''>
        <ul className='flex gap-5 text-sm font-semibold [&>li]:cursor-pointer'>
          <li>Home</li>
          <li>Shop</li>
          <li>Our Story</li>
          <li>Blog</li>
          <li>Contact Us</li>
        </ul>

      </nav>

      <nav className='[&>button]:text-white flex items-center justify-end basis-0 flex-grow gap-7'>
        <ul className='flex gap-5 text-xl [&>li]:cursor-pointer'>
          <li>
            <IoSearchOutline />
          </li>
          <li>
            <IoIosHeartEmpty />
          </li>
          <li>
            <HiOutlineShoppingBag />
          </li>
        </ul>
        <button className='py-2 px-10 bg-black rounded-md text-sm cursor-pointer'>Login</button>
      </nav>
    </div>
  )
}

export default Header
