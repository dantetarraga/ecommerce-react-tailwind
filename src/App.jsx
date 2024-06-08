import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import LoadingSpinner from './components/loading/LoadingSpinner'
import router from './router/Router'

function App () {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} fallbackElement={<LoadingSpinner />} />
    </>
  )
}

export default App
