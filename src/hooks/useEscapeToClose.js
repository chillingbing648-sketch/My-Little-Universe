import { useEffect } from 'react'

export function useEscapeToClose(active, onClose) {
  useEffect(() => {
    if (!active) return
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, onClose])
}
