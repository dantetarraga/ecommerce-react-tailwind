const ProductSkeleton = () => {
  const skeleton = Array.from({ length: 10 }, (_, index) => (
    <div key={index} className='flex flex-col gap-5'>
      <div className='w-full h-[300px] bg-gray-300 animate-pulse' />
      <div className='w-1/2 h-5 bg-gray-300 animate-pulse' />
      <div className='w-1/4 h-5 bg-gray-300 animate-pulse' />
    </div>
  ))

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-10'>
      {
        skeleton.map((item) => (
          <div key={Math.random()} className=''>
            {item}
          </div>
        ))
      }
    </div>
  )
}

export default ProductSkeleton
