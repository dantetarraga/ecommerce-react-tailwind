import { IoIosArrowRoundForward } from 'react-icons/io'

const HeroBanner = () => {
  return (
    <div className='relative w-full bg-red-200'>
      <img className='rounded-md hero' src='/banner.jpg' alt='Banner' loading='lazy' />
      <div className='absolute top-1/2 left-[10%] transform -translate-y-1/2'>
        <h1 className='text-xl md:text-4xl font-bold text-white'>Apparel Express</h1>
        <p className='text-white text-sm md:text-lg w-[150px] md:w-fit'>Your one-stop shop for all your clothing needs</p>
        <p className='text-white text-sm md:text-lg'>UPTO 40% OFF</p>
        <button className='text-xs flex items-center py-2 px-5 md:px-10 bg-black rounded-md md:text-sm cursor-pointer text-white mt-5'>
          <span className='mr-2'>Shop Now{' '}</span>
          <IoIosArrowRoundForward className='text-sm md:text-2xl' />
        </button>
      </div>
    </div>
  )
}

export default HeroBanner
