import React from 'react'
import Deals from './components/Deals'
import Header from './components/Header'
import HeroBanner from './components/HeroBanner'
import InfiniteCarousel from './components/carousel/InfiniteCarousel'

function App () {
  return (
    <div className='container mx-auto space-y-5'>
      <Header />
      <HeroBanner />
      {/* <Categories /> */}
      <InfiniteCarousel />
      <Deals />
      <footer className='bg-[#333] text-white text-center py-4'>
        <p>&copy; 2021 All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
