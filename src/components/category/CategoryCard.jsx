import { useNavigate } from 'react-router-dom'

const CategoryCard = ({ label, imageURL }) => {
  const navigate = useNavigate()

  const handleShopNavigation = () => navigate('/shop')

  return (
    <div className='relative flex flex-shrink-0 justify-center rounded-lg overflow-hidden items-center'>
      <img
        className='object-cover h-full w-full rounded-lg'
        src={`../../public/${imageURL}.jpg`}
        alt={`${label} category`}
        loading='lazy'
      />
      <button
        className='absolute h-10 md:inset-auto md:bottom-8 py-2 px-10 rounded-md capitalize font-primary w-fit text-center transition-all duration-300 ease-in-out border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#212121] cursor-pointer'
        onClick={handleShopNavigation}
      >
        {label}
      </button>
    </div>
  )
}

export default CategoryCard
