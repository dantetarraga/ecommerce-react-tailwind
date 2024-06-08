import CategoryCard from './CategoryCard'

const CATEGORIES = [
  { label: 'electronics', value: 'electronics' },
  { label: 'jewelery', value: 'jewelery' },
  { label: "men's clothing", value: 'mens-clothing' },
  { label: "women's clothing", value: 'women-clothing' }
]

const Categories = ({ categories }) => {
  return (
    <div className='w-full border-t-2 border-gray-200 py-10'>
      <h2 className='text-center capitalize font-primary text-xl md:text-4xl font-medium mb-10'>Show by Categories</h2>

      <div className='h-[400px] grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5'>
        {
          CATEGORIES.map((category, index) => (
            <CategoryCard key={index} label={category.label} imageURL={category.value} />
          ))
        }
      </div>
    </div>
  )
}

export default Categories
