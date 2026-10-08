const ProductSkeleton = ({ count = 8 }) => {
  return (
    <div role='status' className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6'>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className='flex flex-col gap-3 animate-pulse'>
          <div className='aspect-[4/5] w-full rounded-2xl bg-surface-sunken' />
          <div className='h-3 w-1/3 rounded bg-surface-sunken' />
          <div className='h-4 w-4/5 rounded bg-surface-sunken' />
          <div className='h-4 w-1/4 rounded bg-surface-sunken' />
        </div>
      ))}
      <span className='sr-only'>Loading products...</span>
    </div>
  )
}

export default ProductSkeleton
