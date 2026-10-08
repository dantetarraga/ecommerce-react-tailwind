import { HiArrowUpRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { CATEGORIES, getCategoryShopUrl } from '../../data/categories'

const CategoryGrid = () => {
  return (
    <section className='container py-10 md:py-16'>
      <div className='mb-8 flex items-end justify-between gap-4'>
        <div className='space-y-2'>
          <p className='eyebrow'>Categories</p>
          <h2 className='section-title'>Shop by category</h2>
        </div>
        <Link to='/shop' className='hidden sm:inline text-sm font-semibold underline underline-offset-4'>View all products</Link>
      </div>

      <ul className='grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6'>
        {CATEGORIES.map(({ value, label, image, tagline }) => (
          <li key={value}>
            <Link
              to={getCategoryShopUrl(value)}
              data-testid={`category-${label.toLowerCase()}`}
              className='group relative block aspect-[3/4] overflow-hidden rounded-2xl md:rounded-3xl'
            >
              <img
                src={image}
                alt=''
                loading='lazy'
                className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent' />
              <div className='absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 md:p-6 text-white'>
                <div>
                  <h3 className='font-display text-xl md:text-2xl font-semibold'>{label}</h3>
                  <p className='hidden md:block text-sm text-white/80'>{tagline}</p>
                </div>
                <span className='flex h-9 w-9 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform group-hover:rotate-45'>
                  <HiArrowUpRight />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default CategoryGrid
