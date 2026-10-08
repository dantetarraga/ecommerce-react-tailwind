import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import { shopLayoutLoader, shouldRevalidateShop } from '../layout/ShopLayout'

const AppLayout = lazy(() => import('../layout/AppLayout'))
const Admin = lazy(() => import('../views/admin/Admin'))
const Cart = lazy(() => import('../views/Cart'))
const Checkout = lazy(() => import('../views/Checkout'))
const Home = lazy(() => import('../views/Home'))
const Login = lazy(() => import('../views/Login'))
const NotFound = lazy(() => import('../views/NotFound'))
const Orders = lazy(() => import('../views/Orders'))
const OrderSuccess = lazy(() => import('../views/OrderSuccess'))
const ProductDetail = lazy(() => import('../views/ProductDetail'))
const Register = lazy(() => import('../views/Register'))
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
        shouldRevalidate: shouldRevalidateShop,
        element: <ShopLayout />,
        children: [
          {
            index: true,
            async lazy () {
              const { Shop, shopLoader } = await import('../views/Shop')
              return { Component: Shop, loader: shopLoader, shouldRevalidate: shouldRevalidateShop }
            }
          }
        ]
      },
      {
        path: 'product/:id',
        element: <ProductDetail />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'checkout',
        element: <ProtectedRoute><Checkout /></ProtectedRoute>
      },
      {
        path: 'order/:orderId',
        element: <ProtectedRoute><OrderSuccess /></ProtectedRoute>
      },
      {
        path: 'orders',
        element: <ProtectedRoute><Orders /></ProtectedRoute>
      },
      {
        path: 'admin',
        element: <ProtectedRoute role='admin'><Admin /></ProtectedRoute>
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

export default router
