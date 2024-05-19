import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '../layout/AppLayout'
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
        loader: shopLoader,
        element: <Shop />
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
