const FormInput = ({ id, label, error, hint, className = '', as: Component = 'input', children, ...props }) => {
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className='label'>{label}</label>
      <Component
        id={id}
        name={id}
        data-testid={`input-${id}`}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className={`input ${error ? 'input-error' : ''}`}
        {...props}
      >
        {children}
      </Component>
      {hint && !error && <p id={`${id}-hint`} className='text-xs text-gray-500'>{hint}</p>}
      {error && <p id={`${id}-error`} data-testid={`error-${id}`} className='text-xs font-medium text-red-600'>{error}</p>}
    </div>
  )
}

export default FormInput
