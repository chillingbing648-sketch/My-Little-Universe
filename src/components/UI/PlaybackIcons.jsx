export function PlayIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 1.5v11l9-5.5-9-5.5z" fill="currentColor" />
    </svg>
  )
}

export function PauseIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="2.5" y="1.5" width="3" height="11" fill="currentColor" />
      <rect x="8.5" y="1.5" width="3" height="11" fill="currentColor" />
    </svg>
  )
}
