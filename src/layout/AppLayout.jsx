import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const AppLayout = () => {
  return (
    <div className='container mx-auto flex flex-col h-screen'>
      <Header />

      <main className='flex-grow flex flex-col'>
        <Outlet />
      </main>

      <Footer className='items-end' />
    </div>
  )
}

export default AppLayout
