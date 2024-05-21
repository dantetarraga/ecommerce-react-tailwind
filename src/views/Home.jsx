import InfiniteCarousel from '../components/carousel/InfiniteCarousel'
import Categories from '../components/category/Categories'
import Deals from '../components/Deals'
import Footer from '../components/Footer'
import HeroBanner from '../components/HeroBanner'

const Home = () => {
  return (
    <div className='space-y-5'>
      <HeroBanner />
      <InfiniteCarousel />
      <Deals />
      <Categories />
      <Footer />
    </div>
  )
}

export default Home
