import { IoIosArrowRoundForward } from 'react-icons/io'
import Banner from '../assets/images/banner.jpg'

const HeroBanner = () => {
  return (
    <div className='relative w-full'>
      <img className='rounded-md' src={Banner} alt='' />
      <div className='absolute top-1/2 left-[10%] transform -translate-y-1/2'>
        <h1 className='text-4xl font-bold text-white'>Apparel Express</h1>
        <p className='text-white text-lg'>Your one-stop shop for all your clothing needs</p>
        <p className='text-white text-lg'>UPTO 40% OFF</p>
        <button className='flex py-2 px-10 bg-black rounded-md text-sm cursor-pointer text-white mt-5'>
          Shop Now{' '}
          <IoIosArrowRoundForward className='text-2xl' />
        </button>
      </div>
    </div>
  )
}

export default HeroBanner
