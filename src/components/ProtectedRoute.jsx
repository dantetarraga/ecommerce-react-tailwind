import { HiOutlineLockClosed } from 'react-icons/hi2'
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Button from './ui/Button'
import EmptyState from './ui/EmptyState'

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    const redirect = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/login?redirect=${redirect}`} replace />
  }

  if (role && user.role !== role) {
    return (
      <EmptyState
        testId='access-denied'
        icon={HiOutlineLockClosed}
        title='403 · Access denied'
        description='You do not have permission to access this page.'
        action={<Button to='/'>Back to home</Button>}
      />
    )
  }

  return children
}

export default ProtectedRoute
