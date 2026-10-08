import { FaRegStar, FaStar, FaStarHalfStroke } from 'react-icons/fa6'

const MAX_STARS = 5

const Rating = ({ rate, count, size = 'text-sm' }) => {
  const stars = Array.from({ length: MAX_STARS }, (_, index) => {
    if (rate >= index + 1) return FaStar
    if (rate >= index + 0.5) return FaStarHalfStroke
    return FaRegStar
  })

  return (
    <div className='flex items-center gap-2' data-testid='product-rating'>
      <div className={`flex text-accent-500 ${size}`} role='img' aria-label={`Rated ${rate} out of ${MAX_STARS}`}>
        {stars.map((Star, index) => <Star key={index} aria-hidden='true' />)}
      </div>
      {count !== undefined && <span className='text-xs text-gray-500'>{rate} ({count})</span>}
    </div>
  )
}

export default Rating
