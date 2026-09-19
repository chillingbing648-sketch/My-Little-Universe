import { useState } from 'react'

const MENU_ITEMS = [
  { id: 'universe', label: 'Universe' },
  { id: 'beginning', label: 'The Beginning' },
  { id: 'museum', label: 'Memory Museum' },
  { id: 'unsaid', label: "Things I Don't Say Enough" },
  { id: 'letter', label: 'A Letter' },
  { id: 'openwhen', label: 'Open When…' },
  { id: 'quiz', label: 'How Well Do You Know Us' },
  { id: 'soundtrack', label: 'Our Soundtrack' },
  { id: 'surprise', label: 'Surprise Me' },
  { id: 'future', label: 'The Future' },
  { id: 'final', label: 'One Last Thing' },
]

const BOTTOM_ITEMS = [
  { id: 'universe', label: 'Universe' },
  { id: 'museum', label: 'Memories' },
  { id: 'letter', label: 'Letter' },
  { id: 'future', label: 'Future' },
  { id: 'final', label: 'The End' },
]

export default function Navigation({ route, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  if (route === 'opening') return null

  return (
    <>
      <div className="nav-corner">
        {route !== 'universe' ? (
          <button className="nav-back" onClick={() => navigate('universe')}>
            <span aria-hidden="true">←</span> Universe
          </button>
        ) : (
          <span />
        )}
        <button
          className="icon-btn"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-haspopup="dialog"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <line x1="2" y1="5" x2="16" y2="5" stroke="currentColor" strokeWidth="1.4" />
            <line x1="2" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="1.4" />
            <line x1="2" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div
          className="menu-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Section menu"
          onClick={(e) => e.target === e.currentTarget && setMenuOpen(false)}
        >
          <button
            className="icon-btn"
            style={{ position: 'absolute', top: 20, right: 20 }}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
          <nav className="menu-list">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.id)
                  setMenuOpen(false)
                }}
                aria-current={route === item.id}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      <nav className="bottom-nav" aria-label="Quick navigation">
        {BOTTOM_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            aria-current={route === item.id}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </>
  )
}
