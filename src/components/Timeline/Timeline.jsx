import { useState } from 'react'
import { giftData } from '../../data/giftData'
import SmartImage from '../UI/SmartImage'

export default function Timeline() {
  const entries = giftData.timeline
  const [index, setIndex] = useState(0)
  const entry = entries[index]

  function go(delta) {
    setIndex((i) => Math.max(0, Math.min(entries.length - 1, i + delta)))
  }

  if (!entries?.length) return <EmptySection title="Where It All Started" />

  return (
    <div className="screen timeline">
      <div className="screen__inner">
        <p className="eyebrow">The beginning</p>
        <h1 className="heading-l">Where It All Started</h1>

        <div className="timeline__page fade-up" key={index}>
          <p className="timeline__date">{entry.date}</p>
          <h2 className="heading-l timeline__title">{entry.title}</h2>
          {entry.image && (
            <SmartImage src={entry.image} alt={entry.title} label="A photo from this memory" />
          )}
          <p className="body-text timeline__desc">{entry.description}</p>
          {(entry.location || entry.song) && (
            <div className="stack gap-s" style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {entry.location && <span className="pill-tag">{entry.location}</span>}
              {entry.song && <span className="pill-tag">{entry.song}</span>}
            </div>
          )}
        </div>

        <div className="timeline__controls">
          <button className="btn btn--ghost" onClick={() => go(-1)} disabled={index === 0}>
            ‹ Earlier
          </button>
          <div className="timeline__dots" role="tablist" aria-label="Memories">
            {entries.map((_, i) => (
              <button
                key={i}
                className={`timeline__dot ${i === index ? 'is-active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to memory ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>
          <button
            className="btn btn--ghost"
            onClick={() => go(1)}
            disabled={index === entries.length - 1}
          >
            Later ›
          </button>
        </div>
      </div>
    </div>
  )
}

export function EmptySection({ title, hint }) {
  return (
    <div className="screen screen--center">
      <div className="screen__inner">
        <h1 className="heading-l">{title}</h1>
        <p className="body-text body-text--soft">
          {hint || 'Nothing here yet — add some content to giftData.js.'}
        </p>
      </div>
    </div>
  )
}
