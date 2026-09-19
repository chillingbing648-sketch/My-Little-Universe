import { useState } from 'react'
import { giftData, settings } from '../../data/giftData'
import { EmptySection } from '../Timeline/Timeline'
import { useEscapeToClose } from '../../hooks/useEscapeToClose'

const STATUS_ICON = { 'not-yet': '○', planned: '◐', done: '✓' }

export default function Future() {
  const items = giftData.future
  const destinations = giftData.destinations
  const [openItem, setOpenItem] = useState(null)
  const [openDest, setOpenDest] = useState(null)

  useEscapeToClose(openItem !== null || openDest !== null, () => {
    setOpenItem(null)
    setOpenDest(null)
  })

  if (!settings.showFutureSection) {
    return <EmptySection title="The Future" hint="This section is turned off in settings." />
  }
  if (!items?.length && !destinations?.length) return <EmptySection title="Things We Haven't Done Yet" />

  return (
    <div className="screen future">
      <div className="screen__inner">
        <p className="eyebrow">Not a plan. Just a list.</p>
        <h1 className="heading-l">Things We Haven't Done Yet</h1>

        <ul className="future__list">
          {items.map((item, i) => (
            <li key={i} style={{ '--enter-delay': `${(i % 7) * 50}ms` }}>
              <button
                className={`future__item future__item--${item.status} lift-on-hover`}
                onClick={() => setOpenItem(i)}
              >
                <span className="future__status" aria-hidden="true">
                  {STATUS_ICON[item.status] || '○'}
                </span>
                <span>{item.title}</span>
              </button>
            </li>
          ))}
        </ul>

        {destinations?.length > 0 && (
          <div className="future__map">
            <p className="eyebrow" style={{ marginTop: '2.4em' }}>
              A few destinations
            </p>
            <div className="future__map-field">
              {destinations.map((d, i) => (
                <button
                  key={i}
                  className="future__pin"
                  style={{
                    left: `${18 + ((i * 23) % 64)}%`,
                    top: `${20 + ((i * 37) % 55)}%`,
                    '--enter-delay': `${i * 90}ms`,
                  }}
                  onClick={() => setOpenDest(i)}
                  aria-label={d.label}
                >
                  <span className="future__pin-glow" aria-hidden="true" />
                  <span className="future__pin-dot" />
                  <span className="future__pin-label">{d.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {openItem !== null && (
        <SimpleModal onClose={() => setOpenItem(null)}>
          <h2 className="heading-l">{items[openItem].title}</h2>
          <p className="letter__paragraph">"{items[openItem].note || 'Someday.'}"</p>
        </SimpleModal>
      )}
      {openDest !== null && (
        <SimpleModal onClose={() => setOpenDest(null)}>
          <h2 className="heading-l">{destinations[openDest].label}</h2>
          <p className="letter__paragraph">{destinations[openDest].note}</p>
        </SimpleModal>
      )}
    </div>
  )
}

function SimpleModal({ onClose, children }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="paper openwhen__modal scale-in">
        <button className="icon-btn" style={{ position: 'absolute', top: 10, right: 10 }} onClick={onClose} aria-label="Close">
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}
