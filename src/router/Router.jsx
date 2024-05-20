import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '../layout/AppLayout'
import ShopLayout, { shopLayoutLoader } from '../layout/ShopLayout'
import Home from '../views/Home'
import { Shop, shopLoader } from '../views/Shop'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/shop',
        loader: shopLayoutLoader,
        element: <ShopLayout />,
        children: [
          {
            index: true,
            element: <Shop />,
            loader: shopLoader
          }
        ]
      },
      {
        path: '/dels',
        // element: <Dels />
        element: <div>Dels</div>
      },
      {
        path: '/contact-us',
        // element: <ContactUs />
        element: <div>Contact Us</div>
      }
    ]
  }
])

export default router
