const Checkbox = ({ id, label, error, className = '', ...props }) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <label htmlFor={id} className='flex items-center gap-2.5 text-sm cursor-pointer select-none'>
      <input
        id={id}
        type='checkbox'
        className='h-4 w-4 rounded border-line accent-ink cursor-pointer'
        {...props}
      />
      {label}
    </label>
    {error && <p data-testid={`error-${id}`} className='text-xs font-medium text-red-600'>{error}</p>}
  </div>
)

export default Checkbox
