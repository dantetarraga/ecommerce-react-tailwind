const CategoryCard = ({ label, imageURL }) => {
  return (
    <div className='relative flex flex-shrink-0 justify-center rounded-lg overflow-hidden'>
      <img
        className='object-cover w-full rounded-lg'
        src={`../../public/${imageURL}.webp`}
        alt=''
      />
      <button className='absolute bottom-8 py-2 px-10 rounded-md capitalize font-primary w-fit text-center transition-all duration-300 ease-in-out border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#212121] cursor-pointer'>
        {label}
      </button>
    </div>
  )
}

export default CategoryCard
