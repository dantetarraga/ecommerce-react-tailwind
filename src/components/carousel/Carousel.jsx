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
  },
  {
    image: 'mens-clothing.jpg',
    title: 'Clothing',
    discount: 'Up to 60% off'
  }
]

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef(null)
  const carouselRef = useRef(null)
  const slideWidth = 300
  const gap = 20

  useEffect(() => {
    intervalRef.current = carouselRef.current
  }, [carouselRef.current, currentSlide])

  useEffect(() => {
    startAutoSlide()

    return () => clearInterval(intervalRef.current)
  }, [currentSlide])

  const goToNextSlide = () => {
    nextSlide()
    setCurrentSlide((prevSlide) => (currentSlide === slides.length - 1 ? 0 : prevSlide + 1))
  }

  const goToPrevSlide = () =>
    setCurrentSlide((prevSlide) => (currentSlide === 0 ? slides.length - 1 : prevSlide - 1))

  const startAutoSlide = () => (intervalRef.current = setInterval(goToNextSlide, 3000))

  const nextSlide = () => {
    if (carouselRef.current) {
      const firstSlide = carouselRef.current?.children[0]
      carouselRef.current.style.transition = 'transform 0.5s ease-in-out'
      carouselRef.current.style.transform = `translateX(-${slideWidth + gap}px)`

      console.log(currentSlide)

      setTimeout(() => {
        carouselRef.current.style.transition = 'none'
        carouselRef.current.style.transform = 'translateX(0)'
        carouselRef.current.appendChild(firstSlide)
      }, 3000)
    }
  }

  return (
    <div className='min-w-full'>
      <div className='relative overflow-hidden'>
        <div
          ref={carouselRef}
          className='flex h-[400px] gap-5'
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className={`flex-shrink-0 rounded-md object-cover ${index === currentSlide ? 'h-full' : 'h-[80%]'} w-[300px] transition-all ease-in-out duration-500`}
              // style={{ transform: `translateX(calc(-${currentSlide * (slideWidth + gap)}px))` }}
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
