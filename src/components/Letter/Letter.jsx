import { useState } from 'react'
import { giftData } from '../../data/giftData'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function Letter() {
  const { letter } = giftData
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState('closed') // closed | opening | open

  function handleOpen() {
    if (phase !== 'closed') return
    if (reduced) {
      setPhase('open')
      return
    }
    setPhase('opening')
    setTimeout(() => setPhase('open'), 850)
  }

  return (
    <div className="screen screen--center letter">
      {phase !== 'open' ? (
        <div className="screen__inner fade-in">
          <p className="eyebrow">Something to read</p>
          <h1 className="heading-l">A letter for you.</h1>
          <button
            className={`envelope ${reduced ? '' : 'envelope--idle'} ${phase === 'opening' ? 'is-opening' : ''}`}
            onClick={handleOpen}
            aria-label="Open the letter"
          >
            <span className="envelope__paper-peek" aria-hidden="true" />
            <span className="envelope__flap" />
            <span className="envelope__body" />
            <span className="envelope__seal">✦</span>
          </button>
          <button className="btn btn--primary" onClick={handleOpen} disabled={phase === 'opening'}>
            Open
          </button>
        </div>
      ) : (
        <div className="letter__paper paper scale-in">
          <div className="letter__paper-inner">
            {letter.paragraphs.map((p, i) => (
              <p key={i} className="letter__paragraph">
                {p}
              </p>
            ))}
            <p className="letter__signoff">
              {letter.signOff}
              <br />
              <span className="letter__signoff-name">{letter.sender}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
