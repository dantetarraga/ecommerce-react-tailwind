import React, { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import LoadingSpinner from './components/loading/LoadingSpinner'
import router from './router/Router'

function App () {
  return (
    <>
      <Toaster />
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  )
}

export default App
