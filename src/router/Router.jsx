import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { shopLayoutLoader } from '../layout/ShopLayout'

const AppLayout = lazy(() => import('../layout/AppLayout'))
const Cart = lazy(() => import('../views/Cart'))
const Home = lazy(() => import('../views/Home'))
const ShopLayout = lazy(() => import('../layout/ShopLayout'))

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
      }
    ]
  }
])

export default router
