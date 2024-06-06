import React, { lazy } from 'react'
import { Outlet } from 'react-router-dom'

const Header = lazy(() => import('../components/Header'))
const Footer = lazy(() => import('../components/Footer'))

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
