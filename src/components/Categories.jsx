const CATEGORIES = [
  { label: 'electronics', value: 'electronics' },
  { label: 'jewelery', value: 'jewelery' },
  { label: "men's clothing", value: 'mens-clothing' },
  { label: "women's clothing", value: 'women-clothing' }
]

const Categories = () => {
  return (
    <div className='w-full space-y-10'>
      <h3 className='font-primary text-2xl font-medium'>Show by Categories</h3>

      <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5'>
        {
          CATEGORIES.map((category, index) => (
            <div key={index} className='relative flex justify-center'>
              <img
                className='object-cover rounded-lg'
                src={`../../public/${category.value}.jpg`}
                alt=''
              />
              <button className='absolute bottom-8 py-2 px-10 bg-white rounded-md capitalize'>
                {category.label}
              </button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Categories
