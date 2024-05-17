import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '../layout/AppLayout'
import Home from '../views/Home'

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
        // element: <Shop />
        element: <div>Shop</div>
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
