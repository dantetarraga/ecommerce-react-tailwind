import { Suspense, useEffect, useState } from 'react'
import { FaBoxOpen } from 'react-icons/fa'
import { IoMenuSharp } from 'react-icons/io5'
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlinePayment } from 'react-icons/md'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { SlEarphones } from 'react-icons/sl'
import { Await, defer, Outlet, useLoaderData, useSearchParams } from 'react-router-dom'
import InputRange from '../components/InputRange'
import LoadingSkeleton from '../components/loading/LoadingSkeleton'
import { getAllCategories } from '../services/products'

export const shopLayoutLoader = async () => {
  const categories = getAllCategories()
  return defer({ categories })
}

const ShopLayout = () => {
  const [, setSearchParams] = useSearchParams()
  const { categories } = useLoaderData([])
  const [filters, setFilters] = useState([])
  const [priceRange, setPriceRange] = useState([5, 170])
  const [isDragged, setIsDragged] = useState(false)
  const [isOpenCategories, setIsOpenCategories] = useState(true)
  const [isOpenPrice, setIsOpenPrice] = useState(true)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    if (filters.length === 0) setSearchParams({ price: priceRange.join('-') })
    else setSearchParams({ category: filters.join('-'), price: priceRange.join('-') })
  }, [filters])

  useEffect(() => {
    if (isDragged) return

    if (filters.length === 0) setSearchParams({ price: priceRange.join('-') })
    else setSearchParams({ price: priceRange.join('-'), category: filters.join('-') })
  }, [isDragged])

  const handleFilterChange = (e) => {
    const { value } = e.target

    if (filters.includes(value)) setFilters((prevFilters) => prevFilters.filter((filter) => filter !== value))
    else setFilters((prevFilters) => [...prevFilters, value])
  }

  const formatCategories = (selectedCategories) => {
    if (selectedCategories.length === 0 || selectedCategories.length === categories._data?.length) return 'All'

    return selectedCategories.map((category) => category).join(' - ')
  }

  const handleTogleCategories = () => setIsOpenCategories(!isOpenCategories)
  const handleToglePrice = () => setIsOpenPrice(!isOpenPrice)
  const handleShowMenu = () => setShowMenu(!showMenu)

  return (
    <section className='mx-5 md:mx-0 h-full flex flex-col'>
      <div className='flex items-center mb-10 pt-5 gap-4'>
        <button className='block md:hidden' onClick={() => setShowMenu(true)}>
          <IoMenuSharp className='text-3xl text-black' />
        </button>
        <p className='font-bold'>
          Product Categories {'>'} <span className='capitalize text-sm text-gray-400'>{formatCategories(filters)}</span>
        </p>
      </div>
      <div className='flex gap-10'>
        <aside className='bg-white py-0 md:py-0 fixed top-0 left-0 md:static right-0 z-10'>

          <div className={`${!showMenu && 'hidden'} bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm`} onClick={() => setShowMenu(false)} />

          <section className={`${showMenu ? 'w-80 p-10' : 'w-0'} bg-white md:static min-h-screen fixed top-0 left-0 md:p-5 space-y-10 md:w-[300px] md:block transition-all duration-300`}>
            <div className={`${!showMenu && 'hidden'} md:block`}>
              <div>
                <div className='flex mb-5 text-xl justify-between items-center'>
                  <button className='block md:hidden' onClick={handleShowMenu}>
                    <IoMenuSharp className='text-3xl text-black' />
                  </button>
                  <p className='font-bold'>
                    Product Categories
                  </p>
                  <button className='flex items-center w-5 h-5 rounded-full hover:bg-slate-200' onClick={handleTogleCategories}>
                    {isOpenCategories ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                  </button>
                </div>
                {
                  isOpenCategories && (
                    <ul
                      className={`space-y-2 overflow-hidden transition-all duration-300 ${isOpenCategories ? 'max-h-96' : 'max-h-0'}`}
                    >
                      <Suspense fallback={<LoadingSkeleton />}>
                        <Await resolve={categories}>
                          {
                          (categories) => (
                            (categories.length > 0 && categories.map((category) => (
                              <div key={category} className='flex items-center'>
                                <input
                                  type='checkbox'
                                  id={category}
                                  value={category} onChange={handleFilterChange}
                                  className='w-4 h-4 accent-black rounded'
                                />
                                <label htmlFor={category} className='capitalize ms-2 text-sm font-medium text-gray-900'>{category}</label>
                              </div>)
                            )))
                          }
                        </Await>
                      </Suspense>
                    </ul>
                  )
              }
              </div>

              <div className='text-xl mt-5'>
                <div className='flex justify-between items-center'>
                  <p className='capitalize font-bold'>filter by price</p>
                  <button className='flex items-center' onClick={handleToglePrice}>
                    {isOpenPrice ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                  </button>
                </div>
                {
                  isOpenPrice && (
                    <div className='flex flex-col'>
                      <p className='text-lg my-5'>
                        Price: ${priceRange[0]} - ${priceRange[1]}
                      </p>

                      <InputRange values={priceRange} setValues={setPriceRange} setIsDragged={setIsDragged} />
                    </div>
                  )
                }
              </div>
            </div>
          </section>
        </aside>

        <main className='w-full'>
          <Outlet />
        </main>

      </div>

      <footer className='flex md:justify-between md:items-end flex-grow mb-20 mt-10 [&>*]:space-y-2 gap-5'>
        <div className=''>
          <FaBoxOpen className='text-4xl text-black' />
          <p className='font-bold'>Free Shipping</p>
          <p className=''>Free shipping for order above $150</p>
        </div>
        <div>
          <RiMoneyDollarCircleLine className='text-4xl text-black' />
          <p className='font-bold'>Money Guarantee</p>
          <p>Within 30 days for an exchange</p>
        </div>
        <div>
          <SlEarphones className='text-4xl text-black' />
          <p className='font-bold'>Online Support</p>
          <p>24 hours a day, 7 days a week</p>
        </div>
        <div>
          <MdOutlinePayment className='text-4xl text-black' />
          <p className='font-bold'>flexible Payment</p>
          <p>Pay with multiple credit cards</p>
        </div>
      </footer>
    </section>
  )
}

export default ShopLayout
