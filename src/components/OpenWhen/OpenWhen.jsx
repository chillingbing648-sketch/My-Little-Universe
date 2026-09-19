import { useState } from 'react'
import { giftData, settings } from '../../data/giftData'
import { EmptySection } from '../Timeline/Timeline'
import { useEscapeToClose } from '../../hooks/useEscapeToClose'

function isLocked(item) {
  if (!settings.enableDateLocks) return false
  if (!item.unlockDate) return false
  const target = new Date(item.unlockDate + 'T00:00:00')
  if (Number.isNaN(target.getTime())) return false
  return new Date() < target
}

export default function OpenWhen() {
  const items = giftData.openWhen
  const [openIndex, setOpenIndex] = useState(null)

  const active = openIndex !== null ? items[openIndex] : null
  const locked = active ? isLocked(active) : false
  useEscapeToClose(openIndex !== null, () => setOpenIndex(null))

  if (!items?.length) return <EmptySection title="Open When…" />

  return (
    <div className="screen openwhen">
      <div className="screen__inner">
        <p className="eyebrow">A little collection</p>
        <h1 className="heading-l">Open When…</h1>

        <div className="openwhen__grid">
          {items.map((item, i) => {
            const lockedItem = isLocked(item)
            return (
              <button
                key={i}
                className={`openwhen__card lift-on-hover ${lockedItem ? 'is-locked' : ''}`}
                style={{ '--enter-delay': `${(i % 6) * 60}ms` }}
                onClick={() => setOpenIndex(i)}
              >
                <span className="openwhen__card-icon" aria-hidden="true">
                  {lockedItem ? '⚷' : '✉'}
                </span>
                <span className="openwhen__card-title">{item.title}</span>
                {lockedItem && <span className="openwhen__card-note">Waiting for its day</span>}
              </button>
            )
          })}
        </div>
      </div>

      {active && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={(e) => e.target === e.currentTarget && setOpenIndex(null)}
        >
          <div className="paper openwhen__modal scale-in" key={openIndex}>
            <button
              className="icon-btn"
              style={{ position: 'absolute', top: 10, right: 10 }}
              onClick={() => setOpenIndex(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <span className="openwhen__modal-icon" aria-hidden="true">{locked ? '⚷' : '✉'}</span>
            <h2 className="heading-l">{active.title}</h2>
            {locked ? (
              <>
                <p className="letter__paragraph">Not yet.</p>
                <p className="letter__paragraph">
                  {active.lockedMessage || 'Some things are worth waiting for.'}
                </p>
              </>
            ) : (
              <p className="letter__paragraph">{active.content}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
