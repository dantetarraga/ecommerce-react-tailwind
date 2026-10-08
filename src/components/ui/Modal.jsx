import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { IoCloseSharp } from 'react-icons/io5'

const SIZES = {
  sm: 'sm:max-w-md',
  md: 'sm:max-w-2xl',
  lg: 'sm:max-w-4xl'
}

const Modal = ({ title, onClose, size = 'md', testId, children }) => {
  const dialogRef = useRef(null)
  const onCloseRef = useRef(onClose)
  const titleId = useId()
  onCloseRef.current = onClose

  useEffect(() => {
    const handleKeyDown = (event) => { if (event.key === 'Escape') onCloseRef.current() }
    const previousOverflow = document.body.style.overflow

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/50 backdrop-blur-sm sm:p-4 animate-fade-in'
      onMouseDown={onClose}
    >
      <div
        ref={dialogRef}
        role='dialog'
        aria-modal='true'
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        data-testid={testId}
        onMouseDown={(event) => event.stopPropagation()}
        className={`relative w-full ${SIZES[size]} max-h-[92vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl shadow-lift animate-slide-up focus:outline-none focus-visible:ring-0`}
      >
        <button
          onClick={onClose}
          aria-label='Close'
          data-testid='close-modal'
          className='absolute top-3 right-3 z-10 rounded-full p-2 text-ink hover:bg-surface-muted'
        >
          <IoCloseSharp className='text-xl' />
        </button>

        {title && <h2 id={titleId} className='px-6 pt-6 pr-14 font-display text-2xl font-semibold'>{title}</h2>}
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal
