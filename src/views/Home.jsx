import Deals from '../components/Deals'
import Footer from '../components/Footer'
import HeroBanner from '../components/HeroBanner'
import InfiniteCarousel from '../components/carousel/InfiniteCarousel'

const Home = () => {
  return (
    <div className='space-y-5'>
      <HeroBanner />
      {/* <Categories /> */}
      <InfiniteCarousel />
      <Deals />
      <Footer />
    </div>
  )
}

export default Home
