import { useState } from 'react'
import { giftData, settings } from '../../data/giftData'
import { useEscapeToClose } from '../../hooks/useEscapeToClose'

export default function SecretStar() {
  const [clicks, setClicks] = useState(0)
  const [open, setOpen] = useState(false)
  useEscapeToClose(open, () => setOpen(false))

  if (!settings.enableEasterEggs) return null

  function handleClick() {
    const next = clicks + 1
    setClicks(next)
    if (next >= 5) {
      setOpen(true)
      setClicks(0)
    }
  }

  return (
    <>
      <button
        className="secret-star"
        onClick={handleClick}
        aria-label="A small star"
        tabIndex={-1}
      >
        ✦
      </button>
      {open && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="paper openwhen__modal scale-in">
            <button
              className="icon-btn"
              style={{ position: 'absolute', top: 10, right: 10 }}
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>
            <p className="letter__paragraph">{giftData.secret.line1}</p>
            <p className="letter__paragraph">{giftData.secret.line2}</p>
          </div>
        </div>
      )}
    </>
  )
}
