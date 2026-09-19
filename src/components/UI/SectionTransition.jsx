import { useReducedMotion } from '../../hooks/useReducedMotion'

// Wraps whatever section is currently showing. Keyed by the route in App.jsx,
// so every time the destination changes, React remounts this wrapper and the
// enter animation (plus a brief light/particle flash) plays automatically —
// "universe movement → light transition → destination reveal" without a
// router or extra dependencies.
export default function SectionTransition({ children }) {
  const reduced = useReducedMotion()

  if (reduced) return <>{children}</>

  return (
    <div className="section-transition">
      <div className="section-transition__flash" aria-hidden="true" />
      {children}
    </div>
  )
}
