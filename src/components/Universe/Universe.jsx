import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import StarField from '../UI/StarField'

const NODES = [
  { id: 'beginning', title: 'The Beginning', x: 18, y: 26, mx: 24, my: 12, icon: 'spark' },
  { id: 'museum', title: 'Memory Museum', x: 62, y: 16, mx: 72, my: 20, icon: 'frame' },
  { id: 'unsaid', title: "Things I Don't Say Enough", x: 82, y: 40, mx: 74, my: 38, icon: 'note' },
  { id: 'letter', title: 'A Letter For You', x: 30, y: 52, mx: 28, my: 47, icon: 'envelope' },
  { id: 'openwhen', title: 'Open When…', x: 70, y: 64, mx: 72, my: 56, icon: 'seal' },
  { id: 'quiz', title: 'How Well Do You Know Us', x: 12, y: 70, mx: 24, my: 66, icon: 'question' },
  { id: 'soundtrack', title: 'Our Soundtrack', x: 46, y: 78, mx: 70, my: 74, icon: 'wave' },
  { id: 'surprise', title: 'Surprise Me', x: 90, y: 80, mx: 28, my: 83, icon: 'star4' },
  { id: 'future', title: 'The Future', x: 50, y: 38, mx: 42, my: 30, icon: 'path' },
  { id: 'final', title: 'One Last Thing', x: 22, y: 90, mx: 62, my: 92, icon: 'dot' },
]

const CONNECTIONS = NODES.slice(0, -1).map((node, i) => [node, NODES[i + 1]])

// Fast O(1) adjacency lookup for interaction-aware constellation lines and neighbor stars
const ADJACENCY_MAP = {}
NODES.forEach((node) => {
  ADJACENCY_MAP[node.id] = new Set()
})
CONNECTIONS.forEach(([a, b]) => {
  ADJACENCY_MAP[a.id].add(b.id)
  ADJACENCY_MAP[b.id].add(a.id)
})

export default function Universe({ navigate }) {
  const reduced = useReducedMotion()
  const [activeId, setActiveId] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)
  const [focusedId, setFocusedId] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  function selectNode(id) {
    if (activeId) return

    if (reduced) {
      navigate(id)
      return
    }

    setActiveId(id)
    timerRef.current = setTimeout(() => navigate(id), 420)
  }

  const interactedId = activeId || hoveredId || focusedId

  return (
    <div className="screen universe">
      <StarField density={0.7} respondToPointer={!reduced} />

      <div className="screen__inner universe__intro fade-in">
        <p className="eyebrow">Our little universe</p>
        <h1 className="heading-l">Wander wherever you like.</h1>
        <p className="body-text body-text--soft">
          Every star holds something. There's no right order.
        </p>
      </div>

      <div
        className={`universe__field ${activeId ? 'is-traveling' : ''} ${interactedId ? 'has-interaction' : ''}`}
        role="navigation"
        aria-label="Sections of the universe"
      >
        {/* Desktop constellation threads */}
        <svg
          className="universe__lines universe__lines--desktop"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {CONNECTIONS.map(([a, b], i) => {
            const isLit = activeId && (a.id === activeId || b.id === activeId)
            const isRelated = interactedId && (a.id === interactedId || b.id === interactedId)
            const isDimmed = interactedId && !isRelated

            let lineClass = 'universe__line'
            if (isLit) lineClass += ' universe__line--lit'
            else if (isRelated) lineClass += ' universe__line--active'
            else if (isDimmed) lineClass += ' universe__line--dimmed'

            return (
              <line
                key={`d-${i}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                className={lineClass}
              />
            )
          })}
        </svg>

        {/* Mobile constellation threads */}
        <svg
          className="universe__lines universe__lines--mobile"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {CONNECTIONS.map(([a, b], i) => {
            const isLit = activeId && (a.id === activeId || b.id === activeId)
            const isRelated = interactedId && (a.id === interactedId || b.id === interactedId)
            const isDimmed = interactedId && !isRelated

            let lineClass = 'universe__line'
            if (isLit) lineClass += ' universe__line--lit'
            else if (isRelated) lineClass += ' universe__line--active'
            else if (isDimmed) lineClass += ' universe__line--dimmed'

            return (
              <line
                key={`m-${i}`}
                x1={a.mx}
                y1={a.my}
                x2={b.mx}
                y2={b.my}
                className={lineClass}
              />
            )
          })}
        </svg>

        {NODES.map((node, i) => {
          const isActive = activeId === node.id
          const isHovered = hoveredId === node.id
          const isFocused = focusedId === node.id
          const isConnected = Boolean(
            interactedId && interactedId !== node.id && ADJACENCY_MAP[interactedId]?.has(node.id)
          )
          const isDimmed = Boolean(
            interactedId && interactedId !== node.id && !ADJACENCY_MAP[interactedId]?.has(node.id)
          )

          let nodeClasses = 'universe__node'
          if (!reduced) nodeClasses += ' universe__node--float'
          if (isActive) nodeClasses += ' is-active'
          if (isHovered) nodeClasses += ' is-hovered'
          if (isFocused) nodeClasses += ' is-focused'
          if (isConnected) nodeClasses += ' is-connected'
          if (isDimmed) nodeClasses += ' is-dimmed'

          return (
            <button
              key={node.id}
              className={nodeClasses}
              style={{
                '--x': `${node.x}%`,
                '--y': `${node.y}%`,
                '--mx': `${node.mx}%`,
                '--my': `${node.my}%`,
                left: `${node.x}%`,
                top: `${node.y}%`,
                '--enter-delay': `${(i % 6) * 70}ms`,
                '--float-delay': `${(i % 5) * 0.6}s`,
              }}
              onClick={() => selectNode(node.id)}
              onPointerEnter={(e) => {
                if (e.pointerType !== 'touch') setHoveredId(node.id)
              }}
              onPointerLeave={() => setHoveredId(null)}
              onFocus={() => setFocusedId(node.id)}
              onBlur={() => setFocusedId(null)}
              disabled={!!activeId}
              aria-label={node.title}
            >
              <span className="universe__node-glow" aria-hidden="true" />
              <NodeIcon name={node.icon} />
              <span className="universe__node-label">{node.title}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function NodeIcon({ name }) {
  const props = {
    width: 20,
    height: 20,
    viewBox: '0 0 20 20',
    'aria-hidden': true,
    fill: 'none',
  }

  switch (name) {
    case 'spark':
      return (
        <svg {...props}>
          <path
            d="M10 2v5M10 13v5M2 10h5M13 10h5M4.5 4.5l3.2 3.2M12.3 12.3l3.2 3.2M15.5 4.5l-3.2 3.2M7.7 12.3l-3.2-3.2"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      )

    case 'frame':
      return (
        <svg {...props}>
          <rect
            x="3"
            y="4"
            width="14"
            height="12"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <circle
            cx="7.5"
            cy="9"
            r="1.3"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <path
            d="M3 14l4-3.5 3 2.5 3.5-4 3.5 4.5"
            stroke="currentColor"
            strokeWidth="1.1"
          />
        </svg>
      )

    case 'note':
      return (
        <svg {...props}>
          <path
            d="M4 3h9l3 3v11H4z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M7 9h6M7 12.5h4"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </svg>
      )

    case 'envelope':
      return (
        <svg {...props}>
          <rect
            x="2.5"
            y="5"
            width="15"
            height="10.5"
            rx="1.3"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path
            d="M3 6l7 5.5L17 6"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )

    case 'seal':
      return (
        <svg {...props}>
          <circle
            cx="10"
            cy="10"
            r="6.5"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path
            d="M10 6.5v3.8l2.6 1.6"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      )

    case 'question':
      return (
        <svg {...props}>
          <circle
            cx="10"
            cy="10"
            r="7"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path
            d="M7.8 8a2.2 2.2 0 1 1 3.4 1.8c-.9.6-1.2 1-1.2 1.9"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="10" cy="14.2" r="0.6" fill="currentColor" />
        </svg>
      )

    case 'wave':
      return (
        <svg {...props}>
          <path
            d="M2 10c1.5-3 2.5-3 4 0s2.5 3 4 0 2.5-3 4 0 2.5 3 4 0"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      )

    case 'star4':
      return (
        <svg {...props}>
          <path
            d="M10 2l1.6 5.4L17 9l-5.4 1.6L10 16l-1.6-5.4L3 9l5.4-1.6z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      )

    case 'path':
      return (
        <svg {...props}>
          <circle
            cx="4"
            cy="15"
            r="1.6"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle
            cx="16"
            cy="5"
            r="1.6"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M5.4 13.8C9 9 11 7.5 14.6 6.2"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeDasharray="1 2.6"
            strokeLinecap="round"
          />
        </svg>
      )

    default:
      return (
        <svg {...props}>
          <circle cx="10" cy="10" r="2.4" fill="currentColor" />
        </svg>
      )
  }
}

const HEART_COLORS = {
  core: '255, 244, 250',
  blush: '227, 179, 174',
  lav: '183, 174, 214',
  gold: '242, 200, 131',
}

function insideHeart(x, y) {
  const a = x * x + y * y - 1
  return a * a * a - x * x * y * y * y <= 0
}

function heartOutline(t) {
  const x = 16 * Math.pow(Math.sin(t), 3)
  const y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t)

  return {
    x: x / 16,
    y: y / 16,
  }
}

function buildHeartParticles({ fillCount, outlineCount, heroEvery = 11 }) {
  const points = []

  let guard = 0

  while (points.length < fillCount && guard < fillCount * 40) {
    guard++

    const x = (Math.random() * 2 - 1) * 1.3
    const y = (Math.random() * 2 - 1) * 1.25

    if (insideHeart(x, y)) {
      points.push({
        x,
        y,
        r: Math.random() * 1.1 + 0.5,
        alpha: Math.random() * 0.4 + 0.25,
        hero: points.length % heroEvery === 0,
        delay: Math.random() * 1.4,
        tw: Math.random() * 0.5 + 0.15,
        twOffset: Math.random() * Math.PI * 2,
        color:
          Math.random() < 0.72
            ? 'blush'
            : Math.random() < 0.5
              ? 'lav'
              : 'core',
      })
    }
  }

  for (let i = 0; i < outlineCount; i++) {
    const t = (i / outlineCount) * Math.PI * 2
    const { x, y } = heartOutline(t)
    const jitter = 0.025

    points.push({
      x: x + (Math.random() * 2 - 1) * jitter,
      y: y + (Math.random() * 2 - 1) * jitter,
      r: Math.random() * 0.9 + 0.6,
      alpha: Math.random() * 0.35 + 0.4,
      hero: i % 14 === 0,
      delay: Math.random() * 1.4,
      tw: Math.random() * 0.5 + 0.15,
      twOffset: Math.random() * Math.PI * 2,
      color: 'blush',
    })
  }

  return points
}

const TRAIL_CONTROL = [
  { x: 0.06, y: 0.86 },
  { x: 0.32, y: 0.5 },
  { x: 0.62, y: 0.7 },
  { x: 0.94, y: 0.16 },
]

function bezierPoint(t) {
  const [p0, p1, p2, p3] = TRAIL_CONTROL
  const u = 1 - t

  const x =
    u * u * u * p0.x +
    3 * u * u * t * p1.x +
    3 * u * t * t * p2.x +
    t * t * t * p3.x

  const y =
    u * u * u * p0.y +
    3 * u * u * t * p1.y +
    3 * u * t * t * p2.y +
    t * t * t * p3.y

  return { x, y }
}