import { useEffect, useRef, useState } from 'react'
import StarField from '../UI/StarField'
import { giftData } from '../../data/giftData'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const STAGE_DELAYS_MS = [400, 1400, 2600, 3600]

export default function Opening({ onEnter }) {
  const reduced = useReducedMotion()
  const [stage, setStage] = useState(reduced ? STAGE_DELAYS_MS.length : 0)
  const [transitioning, setTransitioning] = useState(false)
  const starRef = useRef(null)
  const [starOffset, setStarOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (reduced) return
    const timers = STAGE_DELAYS_MS.map((delay, i) =>
      setTimeout(() => setStage(i + 1), delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [reduced])

  function handlePointerMove(e) {
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setStarOffset({ x: x * 14, y: y * 14 })
  }

  function handleEnter() {
    setTransitioning(true)
    setTimeout(onEnter, reduced ? 0 : 900)
  }

  return (
    <div
      className={`opening screen screen--center ${transitioning ? 'opening--leaving' : ''}`}
      onPointerMove={handlePointerMove}
    >
      <StarField density={1.1} respondToPointer={!reduced} />

      <div
        ref={starRef}
        className={`opening__you-star ${stage >= 2 ? 'is-visible' : ''}`}
        style={{ transform: `translate(${starOffset.x}px, ${starOffset.y}px)` }}
      >
        <span className="opening__you-star-glow" aria-hidden="true" />
        <span className="opening__you-star-label">{giftData.opening.starLabel}</span>
      </div>

      <div className="screen__inner opening__copy">
        <p className={`heading-xl opening__line ${stage >= 1 ? 'is-visible' : ''}`}>
          {giftData.opening.line1}
        </p>
        <p className={`body-text opening__line opening__subline ${stage >= 3 ? 'is-visible' : ''}`}>
          {giftData.opening.line2}
          <br />
          {giftData.opening.line3}
        </p>

        <button
          className={`btn btn--primary opening__enter ${stage >= 4 ? 'is-visible' : ''}`}
          onClick={handleEnter}
        >
          {giftData.opening.enterLabel} <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  )
}
