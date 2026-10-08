import { useState } from 'react'
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2'

const PasswordInput = ({ id, label, error, hint, ...props }) => {
  const [isVisible, setIsVisible] = useState(false)
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined

  return (
    <div className='flex flex-col gap-1.5'>
      <label htmlFor={id} className='label'>{label}</label>
      <div className='relative'>
        <input
          id={id}
          name={id}
          type={isVisible ? 'text' : 'password'}
          data-testid={`input-${id}`}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={`input pr-11 ${error ? 'input-error' : ''}`}
          {...props}
        />
        <button
          type='button'
          onClick={() => setIsVisible(!isVisible)}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          aria-pressed={isVisible}
          data-testid={`toggle-${id}`}
          className='absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-2 text-gray-500 hover:text-ink'
        >
          {isVisible ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
        </button>
      </div>
      {hint && !error && <p id={`${id}-hint`} className='text-xs text-gray-500'>{hint}</p>}
      {error && <p id={`${id}-error`} data-testid={`error-${id}`} className='text-xs font-medium text-red-600'>{error}</p>}
    </div>
  )
}

export default PasswordInput
