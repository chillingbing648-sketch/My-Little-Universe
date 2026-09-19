import { useCallback, useEffect, useState } from 'react'

const VALID = new Set([
  'opening',
  'universe',
  'beginning',
  'museum',
  'unsaid',
  'letter',
  'openwhen',
  'quiz',
  'soundtrack',
  'surprise',
  'future',
  'final',
])

function readHash() {
  const raw = window.location.hash.replace('#', '')
  return VALID.has(raw) ? raw : 'opening'
}

// A tiny router: the current section lives in the URL hash, so refreshing
// the page (or sharing a link to a section) never breaks the experience.
export function useHashRoute() {
  const [route, setRoute] = useState(readHash)

  useEffect(() => {
    const onHashChange = () => setRoute(readHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = useCallback((next) => {
    if (!VALID.has(next)) return
    window.location.hash = next
    setRoute(next)
  }, [])

  return [route, navigate]
}
