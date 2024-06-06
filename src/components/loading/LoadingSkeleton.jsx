const LoadingSkeleton = () => {
  return (
    <div className='animate-pulse flex space-x-4'>
      <div className='flex-1 space-y-4 py-1'>
        <div className='h-4 bg-gray-300 rounded w-3/4' />
        <div className='h-4 bg-gray-300 rounded w-1/2' />
        <div className='h-4 bg-gray-300 rounded w-5/6' />
        <div className='h-4 bg-gray-300 rounded w-5/6' />
      </div>
    </div>
  )
}

export default LoadingSkeleton
