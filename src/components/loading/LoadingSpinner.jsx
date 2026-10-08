const LoadingSpinner = ({ fullPage = true }) => {
  return (
    <div role='status' className={`flex justify-center items-center ${fullPage ? 'min-h-[50vh]' : 'py-10'}`}>
      <div className='w-10 h-10 border-[3px] border-accent-500 border-t-transparent rounded-full animate-spin' />
      <span className='sr-only'>Loading...</span>
    </div>
  )
}

export default LoadingSpinner
