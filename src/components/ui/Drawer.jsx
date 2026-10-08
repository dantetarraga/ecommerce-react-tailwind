import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { HiXMark } from 'react-icons/hi2'

const Drawer = ({ label, onClose, header, footer, children, testId }) => {
  const panelRef = useRef(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    const handleKeyDown = (event) => { if (event.key === 'Escape') onCloseRef.current() }
    const previousOverflow = document.body.style.overflow

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return createPortal(
    <div className='fixed inset-0 z-50' role='dialog' aria-modal='true' aria-label={label} data-testid={testId}>
      <div className='absolute inset-0 bg-ink/50 animate-fade-in' onClick={onClose} />
      <div ref={panelRef} tabIndex={-1} className='absolute inset-y-0 left-0 flex w-80 max-w-[85vw] flex-col bg-white shadow-lift animate-slide-in-left focus:outline-none focus-visible:ring-0'>
        <div className='flex items-center justify-between gap-4 p-4 pl-6'>
          {header ?? <span />}
          <button aria-label={`Close ${label.toLowerCase()}`} onClick={onClose} className='rounded-full p-2 hover:bg-surface-muted'>
            <HiXMark className='text-2xl' />
          </button>
        </div>
        <div className='flex-1 overflow-y-auto px-6 pb-6'>{children}</div>
        {footer && <div className='border-t border-line p-4'>{footer}</div>}
      </div>
    </div>,
    document.body
  )
}

export default Drawer
