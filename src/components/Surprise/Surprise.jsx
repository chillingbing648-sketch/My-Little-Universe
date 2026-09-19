import { useState } from 'react'
import { giftData } from '../../data/giftData'
import { EmptySection } from '../Timeline/Timeline'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function Surprise() {
  const pool = giftData.surprises
  const reduced = useReducedMotion()
  const [current, setCurrent] = useState(null)
  const [key, setKey] = useState(0)
  const [anticipating, setAnticipating] = useState(false)

  if (!pool?.length) return <EmptySection title="Want To See Something?" />

  function pickNext() {
    let next = pool[Math.floor(Math.random() * pool.length)]
    if (pool.length > 1) {
      while (current && next.title === current.title) {
        next = pool[Math.floor(Math.random() * pool.length)]
      }
    }
    setCurrent(next)
    setKey((k) => k + 1)
  }

  function reveal() {
    if (anticipating) return
    if (reduced) {
      pickNext()
      return
    }
    setAnticipating(true)
    setTimeout(() => {
      pickNext()
      setAnticipating(false)
    }, 480)
  }

  return (
    <div className="screen screen--center surprise">
      <div className="screen__inner">
        <p className="eyebrow">Want to see something?</p>
        {!current && <h1 className="heading-l">Tap below.</h1>}

        {current && (
          <div className="surprise__card-wrap">
            <div className="panel surprise__card scale-in glow-blush" key={key}>
              <p className="pill-tag">{current.type}</p>
              <h2 className="heading-l">{current.title}</h2>
              <p className="body-text">{current.content}</p>
            </div>
          </div>
        )}

        <button
          className={`btn btn--primary surprise__btn ${anticipating ? 'is-anticipating' : ''}`}
          onClick={reveal}
          disabled={anticipating}
          style={{ marginTop: '1.6em' }}
        >
          <span className="surprise__btn-icon" aria-hidden="true">✨</span>
          {anticipating ? 'Looking…' : 'Surprise me'}
        </button>
      </div>
    </div>
  )
}
