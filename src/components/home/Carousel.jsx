import { useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { CATEGORIES, getCategoryShopUrl } from '../../data/categories'

const DISCOUNTS = ['Up to 40% off', 'Up to 60% off', 'Up to 50% off', 'Up to 30% off']
const SLIDE_INTERVAL = 4000

const SLIDES = CATEGORIES.map((category, index) => ({ ...category, discount: DISCOUNTS[index] }))

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const goToNextSlide = () => setCurrentSlide((slide) => (slide + 1) % SLIDES.length)
  const goToPrevSlide = () => setCurrentSlide((slide) => (slide - 1 + SLIDES.length) % SLIDES.length)

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(goToNextSlide, SLIDE_INTERVAL)
    return () => clearInterval(interval)
  }, [isPaused])

  return (
    <div
      className='relative overflow-hidden rounded-3xl'
      aria-roledescription='carousel'
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className='flex transition-transform duration-700 ease-in-out' style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {SLIDES.map((slide, index) => (
          <Link
            key={slide.value}
            to={getCategoryShopUrl(slide.value)}
            aria-hidden={index !== currentSlide}
            tabIndex={index === currentSlide ? 0 : -1}
            className='relative h-[360px] md:h-[440px] w-full shrink-0'
          >
            <img src={slide.image} alt={slide.label} loading='lazy' className='h-full w-full object-cover' />
            <div className='absolute bottom-5 left-5 rounded-2xl bg-white/95 px-5 py-3'>
              <p className='text-xs text-gray-500'>{slide.label}</p>
              <p className='font-display text-xl font-semibold'>{slide.discount}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className='absolute bottom-5 right-5 flex gap-2'>
        <button onClick={goToPrevSlide} aria-label='Previous slide' className='flex h-10 w-10 items-center justify-center rounded-full bg-white/90 hover:bg-white'>
          <FaAngleLeft />
        </button>
        <button onClick={goToNextSlide} aria-label='Next slide' className='flex h-10 w-10 items-center justify-center rounded-full bg-white/90 hover:bg-white'>
          <FaAngleRight />
        </button>
      </div>

      <div className='absolute top-5 left-1/2 flex -translate-x-1/2 gap-2'>
        {SLIDES.map((slide, index) => (
          <button
            key={slide.value}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
            className={`h-1.5 rounded-full transition-all ${index === currentSlide ? 'w-8 bg-white' : 'w-3 bg-white/60'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
