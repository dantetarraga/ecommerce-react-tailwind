import { useEffect, useRef, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'

const slides = [
  {
    image: 'jewelery.jpg',
    title: 'Jewelery',
    discount: 'Up to 50% off'
  },
  {
    image: 'electronics.jpg',
    title: 'Watches',
    discount: 'Up to 30% off'
  },
  {
    image: 'women-clothing.jpg',
    title: 'Shoes',
    discount: 'Up to 40% off'
  }
]

const Carousel = () => {
  const [currentSlide, setCurrenSlide] = useState(0)
  const refSlide = useRef(null)

  const goToNextSlide = () =>
    setCurrenSlide((prevSlide) => (currentSlide === slides.length - 1 ? 0 : prevSlide + 1))

  const goToPrevSlide = () =>
    setCurrenSlide((prevSlide) => (currentSlide === 0 ? slides.length - 1 : prevSlide - 1))

  const startAutoSlide = () => (refSlide.current = setInterval(goToNextSlide, 3000))

  useEffect(() => {
    startAutoSlide()

    return () => clearInterval(refSlide.current)
  }, [currentSlide])

  return (
    <div className='max-w-full mx-auto'>
      <div className='relative overflow-hidden'>
        <div
          className='flex transition-transform duration-500 ease-in-out h-[400px]'
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className='w-full flex-shrink-0 rounded-md object-cover'
            />
          ))}
        </div>
        <button
          onClick={goToPrevSlide}
          className='absolute top-1/2 transform -translate-y-1/2 left-5 p-2 rounded-full shadow-md bg-gray-300 opacity-50 hover:opacity-100'
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={goToNextSlide}
          className='absolute top-1/2 transform -translate-y-1/2 right-5 bg-gray-300 opacity-50 hover:opacity-100 p-2 rounded-full shadow-md text-wrap'
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  )
}

export default Carousel
