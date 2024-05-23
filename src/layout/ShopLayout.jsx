import { useState } from 'react'
import { FaBoxOpen } from 'react-icons/fa'
import { MdKeyboardArrowDown, MdOutlinePayment } from 'react-icons/md'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { SlEarphones } from 'react-icons/sl'
import { Outlet, useLoaderData } from 'react-router-dom'
import InputRange from '../components/InputRange'
import { getAllCategories } from '../services/products'

export const shopLayoutLoader = async () => {
  const categories = await getAllCategories()

  return { categories }
}

const ShopLayout = () => {
  const { categories } = useLoaderData()
  const [priceRange, setPriceRange] = useState([0, 5])

  return (
    <section className='h-full flex flex-col'>
      <p className='mt-5 mb-10 font-bold'>Product Categories {'>'} All Products</p>

      <div className='flex gap-10'>
        <aside className='space-y-10 w-[300px]'>
          <div>
            <div className='flex mb-5 text-xl justify-between '>
              <p className='font-bold'>
                Product Categories
              </p>
              <button className='flex items-center'>
                <MdKeyboardArrowDown />
              </button>
            </div>
            <ul className='space-y-2'>
              {categories.map((category) => (
                <div key={category} className='flex items-center'>
                  <input type='checkbox' id={category} value={category} className='w-4 h-4 accent-black rounded' />
                  <label htmlFor={category} className='capitalize ms-2 text-sm font-medium text-gray-900'>{category}</label>
                </div>
              ))}
            </ul>
          </div>

          <div className='text-xl'>
            <div className='flex justify-between items-center'>
              <p className='capitalize font-bold'>filter by price</p>
              <button className='flex items-center'>
                <MdKeyboardArrowDown />
              </button>
            </div>
            <div className='flex flex-col'>
              <p className='text-lg my-5'>
                Price: ${priceRange[0]} - ${priceRange[1]}
              </p>

              <InputRange values={priceRange} setValues={setPriceRange} />
            </div>
          </div>

        </aside>

        <main className='w-full'>
          <Outlet />
        </main>

      </div>

      <footer className='flex justify-between items-end flex-grow mb-20 mt-10 [&>*]:space-y-2'>
        <div>
          <FaBoxOpen className='text-5xl text-black' />
          <p className='font-bold'>Free Shipping</p>
          <p>Free shipping for order above $150</p>
        </div>
        <div>
          <RiMoneyDollarCircleLine className='text-5xl text-black' />
          <p className='font-bold'>Money Guarantee</p>
          <p>Within 30 days for an exchange</p>
        </div>
        <div>
          <SlEarphones className='text-5xl text-black' />
          <p className='font-bold'>Online Support</p>
          <p>24 hours a day, 7 days a week</p>
        </div>
        <div>
          <MdOutlinePayment className='text-5xl text-black' />
          <p className='font-bold'>flexible Payment</p>
          <p>Pay with multiple credit cards</p>
        </div>
      </footer>
    </section>
  )
}

export default ShopLayout
