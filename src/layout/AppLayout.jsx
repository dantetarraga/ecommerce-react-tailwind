import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const AppLayout = () => {
  return (
    <div className='container mx-auto'>
      <Header />

      <main className='w-full'>
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
