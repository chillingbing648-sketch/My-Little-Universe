import { useEffect, useState } from 'react'
import { settings } from '../data/giftData'

// Combines the visitor's OS-level "reduce motion" preference with the
// site owner's own settings.reducedParticles override.
export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (settings.reducedParticles) return true
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (settings.reducedParticles) return
    if (!window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  return reduced
}
