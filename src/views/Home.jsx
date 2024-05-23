import Categories from '../components/category/Categories'
import HeroBanner from '../components/HeroBanner'

const Home = () => {
  return (
    <div className='space-y-5'>
      <HeroBanner />
      {/* <InfiniteCarousel /> */}
      {/* <Deals /> */}
      <Categories />
    </div>
  )
}

export default Home
