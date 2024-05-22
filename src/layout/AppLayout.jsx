import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const AppLayout = () => {
  return (
    <div className='container mx-auto'>
      <Header />

      <main className='w-full'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout
