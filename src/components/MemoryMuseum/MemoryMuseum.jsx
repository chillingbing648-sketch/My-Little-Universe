import { useRef, useState } from 'react'
import { giftData } from '../../data/giftData'
import SmartImage from '../UI/SmartImage'
import PhotoViewer from '../PhotoViewer/PhotoViewer'
import { EmptySection } from '../Timeline/Timeline'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function MemoryMuseum() {
  const exhibits = giftData.exhibits
  const [index, setIndex] = useState(0)
  const [viewerOpen, setViewerOpen] = useState(false)

  if (!exhibits?.length) return <EmptySection title="Our Memory Museum" />

  const exhibit = exhibits[index]
  const images = exhibits.map((e) => ({ src: e.image, caption: e.title }))
  const rotate = index % 2 === 0 ? -2.2 : 2.4

  function go(delta) {
    setIndex((i) => (i + delta + exhibits.length) % exhibits.length)
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  return (
    <div className="screen museum" onKeyDown={onKeyDown} tabIndex={-1}>
      <div className="screen__inner">
        <p className="eyebrow">Memory museum</p>
        <h1 className="heading-l">Our Memory Museum</h1>

        <div className="museum__exhibit fade-up" key={exhibit.id}>
          <p className="museum__number">Exhibit {String(index + 1).padStart(3, '0')}</p>
          <h2 className="heading-l">{exhibit.title}</h2>
          <PolaroidPhoto
            image={exhibit.image}
            alt={exhibit.title}
            rotate={rotate}
            onClick={() => setViewerOpen(true)}
          />
          <p className="body-text body-text--soft">{exhibit.date}</p>
          <p className="body-text">{exhibit.story}</p>
          <div className="stack gap-s" style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {exhibit.location && <span className="pill-tag">📍 {exhibit.location}</span>}
            {exhibit.song && <span className="pill-tag">🎵 {exhibit.song}</span>}
            {exhibit.mood && <span className="pill-tag">☁️ {exhibit.mood}</span>}
          </div>
        </div>

        <div className="timeline__controls">
          <button className="btn btn--ghost" onClick={() => go(-1)}>
            ‹ Previous
          </button>
          <span className="body-text--soft">
            {index + 1} / {exhibits.length}
          </span>
          <button className="btn btn--ghost" onClick={() => go(1)}>
            Next ›
          </button>
        </div>
      </div>

      {viewerOpen && (
        <PhotoViewer
          images={images}
          index={index}
          onChange={setIndex}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </div>
  )
}

function PolaroidPhoto({ image, alt, rotate, onClick }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  function onMove(e) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    ref.current.style.setProperty('--tilt-x', `${(-y * 7).toFixed(2)}deg`)
    ref.current.style.setProperty('--tilt-y', `${(x * 7).toFixed(2)}deg`)
  }
  function onLeave() {
    if (!ref.current) return
    ref.current.style.setProperty('--tilt-x', '0deg')
    ref.current.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <div className="museum__polaroid-wrap">
      <button
        ref={ref}
        className="museum__photo-btn polaroid"
        style={{ '--rotate': `${rotate}deg` }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
        aria-label={`View photo: ${alt}`}
      >
        <SmartImage src={image} alt={alt} label="A photo from this exhibit" />
      </button>
    </div>
  )
}
