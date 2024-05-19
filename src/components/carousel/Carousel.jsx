import { useEffect, useRef, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'

const initialSlides = [
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
    title: 'Women Clothing',
    discount: 'Up to 40% off'
  },
  {
    image: 'mens-clothing.jpg',
    title: 'Mens Clothing',
    discount: 'Up to 60% off'
  }
]

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides] = useState([...initialSlides])
  const carouselRef = useRef(null)

  useEffect(() => {
    startAutoSlide()

    return () => clearInterval(carouselRef.current)
  }, [currentSlide])

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1))
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (currentSlide === 0 ? slides.length - 1 : prevSlide - 1))
  }

  const startAutoSlide = () => {
    carouselRef.current = setInterval(goToNextSlide, 3000)
  }

  return (
    <div className='min-w-full'>
      <div className='relative overflow-hidden'>
        <div
          ref={carouselRef}
          className='flex h-[400px] transition-all'
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className='flex-shrink-0 rounded-md object-cover h-full w-[100%] transition-all duration-1000 ease-in-out'
              style={{ transform: `translateX(calc(-${currentSlide * 100}%))` }}
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
