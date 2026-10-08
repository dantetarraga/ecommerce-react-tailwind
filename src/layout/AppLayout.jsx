import { Suspense } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import LoadingSpinner from '../components/loading/LoadingSpinner'

const AppLayout = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <a href='#main' className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white'>
        Skip to content
      </a>
      <Header />

      <main id='main' className='flex flex-1 flex-col'>
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
      <ScrollRestoration />
    </div>
  )
}

export default AppLayout
