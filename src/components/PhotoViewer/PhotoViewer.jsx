import { useEffect, useRef } from 'react'

export default function PhotoViewer({ images, index, onClose, onChange }) {
  const touchStart = useRef(null)
  const current = images[index]

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onChange((index + 1) % images.length)
      if (e.key === 'ArrowLeft') onChange((index - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, images.length, onChange, onClose])

  if (!current) return null

  function onTouchStart(e) {
    touchStart.current = e.touches[0].clientX
  }
  function onTouchEnd(e) {
    if (touchStart.current == null) return
    const delta = e.changedTouches[0].clientX - touchStart.current
    if (Math.abs(delta) > 50) {
      onChange(delta < 0 ? (index + 1) % images.length : (index - 1 + images.length) % images.length)
    }
    touchStart.current = null
  }

  return (
    <div
      className="photo-viewer"
      role="dialog"
      aria-modal="true"
      aria-label={current.caption || 'Photo'}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button className="icon-btn photo-viewer__close" onClick={onClose} aria-label="Close photo">
        ✕
      </button>
      {images.length > 1 && (
        <button
          className="icon-btn photo-viewer__nav photo-viewer__nav--prev"
          onClick={() => onChange((index - 1 + images.length) % images.length)}
          aria-label="Previous photo"
        >
          ‹
        </button>
      )}
      <figure className="photo-viewer__figure scale-in" key={index}>
        {current.src ? (
          <img src={current.src} alt={current.caption || ''} />
        ) : (
          <div className="image-placeholder" style={{ width: '70vw', maxWidth: 480, aspectRatio: '4/3' }}>
            A photo goes here
          </div>
        )}
        {current.caption && <figcaption>{current.caption}</figcaption>}
      </figure>
      {images.length > 1 && (
        <button
          className="icon-btn photo-viewer__nav photo-viewer__nav--next"
          onClick={() => onChange((index + 1) % images.length)}
          aria-label="Next photo"
        >
          ›
        </button>
      )}
    </div>
  )
}
