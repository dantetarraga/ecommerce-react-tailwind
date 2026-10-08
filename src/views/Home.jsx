import { useEffect } from 'react'
import BrandMarquee from '../components/home/BrandMarquee'
import CategoryGrid from '../components/home/CategoryGrid'
import Deals from '../components/home/Deals'
import FeaturedProducts from '../components/home/FeaturedProducts'
import HeroBanner from '../components/home/HeroBanner'
import Perks from '../components/home/Perks'

const Home = () => {
  useEffect(() => {
    document.title = 'Apparel Express | Ecommerce'
  }, [])

  return (
    <>
      <HeroBanner />
      <BrandMarquee />
      <CategoryGrid />
      <FeaturedProducts />
      <Deals />
      <Perks />
    </>
  )
}

export default Home
