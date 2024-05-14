import formatTime from '../utils/formatTime'

const Countdown = ({ label, value }) => {
  return (
    <div className='flex flex-col justify-center items-center gap-2'>
      <div className='bg-white rounded-lg p-3 text-center shadow-md font-numbers'>
        <p className='text-xl font-bold'>{formatTime(value)}</p>
      </div>
      <p className='text-sm font-primary'>{label}</p>
    </div>
  )
}

export default Countdown
