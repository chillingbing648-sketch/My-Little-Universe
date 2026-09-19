import { useState } from 'react'
import { giftData } from '../../data/giftData'
import { EmptySection } from '../Timeline/Timeline'

export default function Unsaid() {
  const items = giftData.unsaidThings
  const [flipped, setFlipped] = useState(() => new Set())

  if (!items?.length) return <EmptySection title="Things I Probably Don't Say Enough" />

  function toggle(i) {
    setFlipped((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  return (
    <div className="screen unsaid">
      <div className="screen__inner">
        <p className="eyebrow">A small confession</p>
        <h1 className="heading-l">Things I Probably Don't Say Enough</h1>
        <p className="body-text body-text--soft">Tap a card.</p>

        <div className="unsaid__grid">
          {items.map((text, i) => {
            const isFlipped = flipped.has(i)
            return (
              <button
                key={i}
                className={`unsaid__card lift-on-hover ${isFlipped ? 'is-flipped' : ''}`}
                onClick={() => toggle(i)}
                aria-pressed={isFlipped}
                aria-label={isFlipped ? text : 'Reveal a thought'}
              >
                <span className="unsaid__card-inner">
                  <span className="unsaid__card-face unsaid__card-face--back">✧</span>
                  <span className="unsaid__card-face unsaid__card-face--front">{text}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
