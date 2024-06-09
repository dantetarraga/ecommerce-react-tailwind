import { useNavigate } from 'react-router-dom'
import useCountdown from '../hooks/useCountdown'
import Carousel from './carousel/Carousel'
import Countdown from './Countdown'

const Deals = () => {
  const { days, hours, minutes, seconds } = useCountdown()
  const navigate = useNavigate()

  const handleShopNavigation = () => navigate('/shop')

  return (
    <section className='border-t-2 border-gray-200 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-5 py-10 px-5 md:px-0'>
      <div className='flex w-full justify-center items-center'>
        <div className='flex flex-col gap-5'>
          <h2 className='capitalize font-primary text-xl md:text-5xl font-medium'>deals of the month</h2>
          <p className='text-[#8A8A8A] inline-block md:w-[500px] text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius itaque repudiandae exercitationem, sapiente corporis placeat. Reiciendis earum aliquid omnis necessitatibus quia dolores neque ut soluta iste.
          </p>
          <button
            className='bg-black text-white text-xs px-10 py-2 rounded-md w-[150px]'
            onClick={handleShopNavigation}
          >
            Buy Now
          </button>

          <div className='flex flex-col gap-3 pt-5 items-center md:items-start'>
            <h3 className='text-xl'>Hurry, Before it's Too Late!</h3>

            <div className='flex gap-4'>
              <Countdown value={days} label='Days' />
              <Countdown value={hours} label='Hr' />
              <Countdown value={minutes} label='Mins' />
              <Countdown value={seconds} label='Sec' />
            </div>
          </div>
        </div>
      </div>

      <div className='w-full h-[400px]'>
        <Carousel />
      </div>
    </section>
  )
}

export default Deals
