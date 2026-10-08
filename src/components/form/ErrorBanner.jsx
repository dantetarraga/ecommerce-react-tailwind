import { HiOutlineExclamationCircle } from 'react-icons/hi2'

const ErrorBanner = ({ message, testId = 'error-message' }) => {
  if (!message) return null

  return (
    <div role='alert' data-testid={testId} className='flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
      <HiOutlineExclamationCircle className='mt-0.5 shrink-0 text-lg' aria-hidden='true' />
      <p>{message}</p>
    </div>
  )
}

export default ErrorBanner
