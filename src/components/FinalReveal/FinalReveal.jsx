import { useEffect, useState } from 'react'
import { giftData } from '../../data/giftData'
import SmartImage from '../UI/SmartImage'
import StarField from '../UI/StarField'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const DELAYS = [300, 2200, 4000, 5600]

export default function FinalReveal() {
  const reduced = useReducedMotion()
  const [stage, setStage] = useState(reduced ? DELAYS.length : 0)

  useEffect(() => {
    if (reduced) return
    const timers = DELAYS.map((d, i) => setTimeout(() => setStage(i + 1), d))
    return () => timers.forEach(clearTimeout)
  }, [reduced])

  return (
    <div className={`screen screen--center final ${stage >= 3 ? 'is-focused' : ''}`}>
      <StarField density={0.35} respondToPointer={false} />
      <div className="final__light" aria-hidden="true" />

      <div className="screen__inner">
        <p className={`heading-l final__line ${stage >= 1 ? 'is-visible' : ''}`}>
          {giftData.final.line1}
        </p>
        <p className={`heading-l final__line ${stage >= 2 ? 'is-visible' : ''}`}>
          {giftData.final.line2}
        </p>
        <p className={`heading-xl final__line final__line--emphasis ${stage >= 3 ? 'is-visible' : ''}`}>
          {giftData.final.line3}
        </p>

        {stage >= 3 && giftData.final.image && (
          <div className="final__image fade-in">
            <SmartImage src={giftData.final.image} alt="" label="One last photo" />
          </div>
        )}
      </div>
    </div>
  )
}
