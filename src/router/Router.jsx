import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { shopLayoutLoader } from '../layout/ShopLayout'
import Cart from '../views/Cart'
// import { shopLoader } from '../views/Shop'
// import Home from '../views/Home'

// const Shop = lazy(() => import('../views/Shop'))
const ShopLayout = lazy(() => import('../layout/ShopLayout'))
const Home = lazy(() => import('../views/Home'))
const AppLayout = lazy(() => import('../layout/AppLayout'))

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'shop',
        loader: shopLayoutLoader,
        element: <ShopLayout />,
        children: [
          {
            index: true,
            async lazy () {
              const { Shop, shopLoader } = await import('../views/Shop')
              return { Component: Shop, loader: shopLoader }
            }
          }
        ]
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'contact-us',
        // element: <ContactUs />
        element: <div>Contact Us</div>
      }
    ]
  }
])

export default router
