const EmptyState = ({ icon: Icon, title, description, action, testId }) => (
  <div data-testid={testId} className='flex flex-col items-center justify-center text-center gap-4 py-20 px-4'>
    {Icon && (
      <div className='flex h-20 w-20 items-center justify-center rounded-full bg-accent-50 text-accent-600'>
        <Icon className='text-4xl' aria-hidden='true' />
      </div>
    )}
    <h2 className='font-display text-2xl md:text-3xl font-semibold'>{title}</h2>
    {description && <p className='max-w-md text-gray-500'>{description}</p>}
    {action}
  </div>
)

export default EmptyState
