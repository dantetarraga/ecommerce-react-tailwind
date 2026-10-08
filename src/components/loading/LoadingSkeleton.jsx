const LoadingSkeleton = () => {
  return (
    <div role='status' className='animate-pulse space-y-3'>
      <div className='h-4 bg-surface-sunken rounded w-3/4' />
      <div className='h-4 bg-surface-sunken rounded w-1/2' />
      <div className='h-4 bg-surface-sunken rounded w-5/6' />
      <div className='h-4 bg-surface-sunken rounded w-2/3' />
      <span className='sr-only'>Loading...</span>
    </div>
  )
}

export default LoadingSkeleton
