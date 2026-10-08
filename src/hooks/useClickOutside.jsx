import { useEffect } from 'react'

const useClickOutside = (ref, onClickOutside, isActive = true) => {
  useEffect(() => {
    if (!isActive) return

    const handlePointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) onClickOutside()
    }
    const handleKeyDown = (event) => { if (event.key === 'Escape') onClickOutside() }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [ref, onClickOutside, isActive])
}

export default useClickOutside
