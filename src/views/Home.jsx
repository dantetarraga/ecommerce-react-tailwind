import InfiniteCarousel from '../components/carousel/InfiniteCarousel'
import Deals from '../components/Deals'
import Footer from '../components/Footer'
import HeroBanner from '../components/HeroBanner'

const Home = () => {
  return (
    <div className='space-y-5'>
      <HeroBanner />
      <InfiniteCarousel />
      <Deals />
      <Footer />
    </div>
  )
}

export default Home
