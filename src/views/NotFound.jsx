import { useEffect } from 'react'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'

const NotFound = () => {
  useEffect(() => {
    document.title = 'Page not found | E-commerce'
  }, [])

  return (
    <EmptyState
      testId='not-found'
      title='404 · Page not found'
      description='The page you are looking for does not exist or was moved.'
      action={<Button to='/'>Back to home</Button>}
    />
  )
}

export default NotFound
