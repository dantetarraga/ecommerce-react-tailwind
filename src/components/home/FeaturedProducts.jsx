import { HiArrowRight } from 'react-icons/hi2'
import useProducts from '../../hooks/useProducts'
import ProductSkeleton from '../loading/ProductSkeleton'
import ProductCard from '../product/ProductCard'
import Button from '../ui/Button'

const FEATURED_COUNT = 4

const FeaturedProducts = () => {
  const { products, isLoading, error } = useProducts()
  const featured = [...products]
    .filter(({ stock }) => stock > 0)
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, FEATURED_COUNT)

  if (error) return null

  return (
    <section className='container py-10 md:py-16' data-testid='featured-products'>
      <div className='mb-8 flex items-end justify-between gap-4'>
        <div className='space-y-2'>
          <p className='eyebrow'>Best rated</p>
          <h2 className='section-title'>Customer favorites</h2>
        </div>
        <Button to='/shop' variant='outline' size='sm' className='hidden sm:inline-flex'>
          Shop all <HiArrowRight />
        </Button>
      </div>

      {isLoading
        ? <ProductSkeleton count={FEATURED_COUNT} />
        : (
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6'>
            {featured.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
          )}
    </section>
  )
}

export default FeaturedProducts
