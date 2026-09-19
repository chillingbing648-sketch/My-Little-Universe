import { useState } from 'react'

export default function SmartImage({ src, alt = '', label, className = '' }) {
  const [failed, setFailed] = useState(!src)

  if (failed) {
    return (
      <div className={`image-frame image-placeholder ${className}`}>
        {label || 'A photo goes here'}
      </div>
    )
  }

  return (
    <div className={`image-frame ${className}`}>
      <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
    </div>
  )
}
