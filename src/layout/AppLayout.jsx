import React, { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import LoadingSpinner from '../components/loading/LoadingSpinner'

const Header = lazy(() => import('../components/Header'))
const Footer = lazy(() => import('../components/Footer'))

const AppLayout = () => {
  return (
    <div className='container mx-auto flex flex-col h-screen'>
      <Header />

      <main className='flex-grow flex flex-col'>
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer className='items-end' />
    </div>
  )
}

export default AppLayout
