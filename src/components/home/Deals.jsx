import { HiArrowRight } from 'react-icons/hi2'
import useCountdown from '../../hooks/useCountdown'
import formatTime from '../../utils/formatTime'
import Button from '../ui/Button'
import Carousel from './Carousel'

const CountdownUnit = ({ value, label }) => (
  <div className='flex flex-col items-center gap-1'>
    <span className='flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-white text-xl md:text-2xl font-bold tabular-nums shadow-card'>
      {formatTime(value)}
    </span>
    <span className='text-xs text-gray-500'>{label}</span>
  </div>
)

const Deals = () => {
  const { days, hours, minutes, seconds } = useCountdown()

  return (
    <section className='container py-10 md:py-16'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center rounded-3xl bg-surface-muted p-6 md:p-12'>
        <div className='flex flex-col gap-6'>
          <p className='eyebrow'>Limited time</p>
          <h2 className='section-title'>Deals of the month</h2>
          <p className='text-gray-600 max-w-md'>
            Hand-picked favorites at their best price of the season. Use the coupon <strong className='font-mono'>SAVE10</strong> at checkout for an extra 10% off.
          </p>

          <div aria-label='Time left for the deals' className='flex gap-3'>
            <CountdownUnit value={days} label='Days' />
            <CountdownUnit value={hours} label='Hours' />
            <CountdownUnit value={minutes} label='Mins' />
            <CountdownUnit value={seconds} label='Secs' />
          </div>

          <Button to='/shop' size='lg' className='w-fit'>
            Buy now <HiArrowRight />
          </Button>
        </div>

        <Carousel />
      </div>
    </section>
  )
}

export default Deals
