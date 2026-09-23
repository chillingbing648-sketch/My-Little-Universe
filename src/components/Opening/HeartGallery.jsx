import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const COLORS = {
  pink: '#f7b6d8',
  rose: '#e88ab8',
  lavender: '#c9b7ff',
  violet: '#9d8cff',
  white: '#fff4fb',
  soft: '#f3d9ff',
}

const PARTICLE_COUNT = 850
const OUTLINE_COUNT = 220
const STAR_COUNT = 85

const random = (min, max) => Math.random() * (max - min) + min

const heartPoint = (t, scale = 1) => {
  const x = 16 * Math.pow(Math.sin(t), 3)
  const y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t)

  return {
    x: x * scale,
    y: -y * scale,
  }
}

const distance = (a, b) => {
  const dx = a.x - b.x
  const dy = a.y - b.y
  return Math.sqrt(dx * dx + dy * dy)
}

function createParticle(width, height, inside = true) {
  const t = random(0, Math.PI * 2)
  const point = heartPoint(t, 1)

  let x
  let y

  if (inside) {
    const fillScale = Math.sqrt(Math.random()) * 1.02
    const p = heartPoint(t + random(-0.35, 0.35), fillScale)

    x = p.x
    y = p.y
  } else {
    x = point.x
    y = point.y
  }

  const heartWidth = Math.min(width, height) * 0.035

  return {
    x: width / 2 + x * heartWidth,
    y: height / 2 + y * heartWidth,

    targetX: width / 2 + x * heartWidth,
    targetY: height / 2 + y * heartWidth,

    startX: random(0, width),
    startY: random(0, height),

    size: random(0.45, 1.45),
    alpha: random(0.25, 0.95),

    color:
      Math.random() > 0.5
        ? COLORS.pink
        : Math.random() > 0.5
          ? COLORS.lavender
          : COLORS.rose,

    delay: random(0, 1800),
    duration: random(1100, 2100),

    phase: random(0, Math.PI * 2),
    drift: random(0.2, 1),

    twinkle: random(0.5, 1.8),

    formed: false,
  }
}

function createStar(width, height) {
  return {
    x: random(0, width),
    y: random(0, height),

    size: random(0.5, 1.6),
    alpha: random(0.15, 0.7),

    phase: random(0, Math.PI * 2),
    twinkle: random(0.5, 2),

    fourPoint: Math.random() > 0.72,
  }
}

function drawFourPointStar(ctx, x, y, size, alpha, color) {
  ctx.save()

  ctx.globalAlpha = alpha
  ctx.fillStyle = color
  ctx.shadowColor = color
  ctx.shadowBlur = size * 8

  ctx.beginPath()
  ctx.moveTo(x, y - size * 4)
  ctx.lineTo(x + size, y - size)
  ctx.lineTo(x + size * 4, y)
  ctx.lineTo(x + size, y + size)
  ctx.lineTo(x, y + size * 4)
  ctx.lineTo(x - size, y + size)
  ctx.lineTo(x - size * 4, y)
  ctx.lineTo(x - size, y - size)
  ctx.closePath()
  ctx.fill()

  ctx.restore()
}

export default function HeartGalllery({
  revealed = true,
  respondToPointer = true,
  density = 1,
}) {
  const canvasRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) return

    const ctx = canvas.getContext('2d')

    if (!ctx) return

    const parent = canvas.parentElement

    if (!parent) return

    let width = 0
    let height = 0
    let dpr = 1

    let animationFrame
    let startTime = performance.now()

    let particles = []
    let outlineParticles = []
    let stars = []

    let pointer = {
      x: 0,
      y: 0,
      active: false,
    }

    function resize() {
      const rect = parent.getBoundingClientRect()

      width = rect.width
      height = rect.height

      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = width * dpr
      canvas.height = height * dpr

      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const densityMultiplier = Math.min(
        Math.max(density, 0.35),
        1.4
      )

      const particleCount = Math.floor(
        PARTICLE_COUNT * densityMultiplier
      )

      const outlineCount = Math.floor(
        OUTLINE_COUNT * densityMultiplier
      )

      particles = Array.from(
        { length: particleCount },
        () => createParticle(width, height, true)
      )

      outlineParticles = Array.from(
        { length: outlineCount },
        () => createParticle(width, height, false)
      )

      stars = Array.from(
        { length: STAR_COUNT },
        () => createStar(width, height)
      )
    }

    function updateParticle(particle, elapsed, index) {
      const localTime = elapsed - particle.delay

      if (localTime <= 0) {
        particle.x = particle.startX
        particle.y = particle.startY
        particle.formed = false
        return
      }

      const progress = Math.min(
        localTime / particle.duration,
        1
      )

      const eased =
        1 - Math.pow(1 - progress, 4)

      particle.x =
        particle.startX +
        (particle.targetX - particle.startX) * eased

      particle.y =
        particle.startY +
        (particle.targetY - particle.startY) * eased

      particle.formed = progress >= 1

      if (particle.formed) {
        const time = elapsed * 0.001

        particle.x +=
          Math.sin(
            time * particle.drift +
              particle.phase +
              index * 0.01
          ) * 0.65

        particle.y +=
          Math.cos(
            time * particle.drift * 0.8 +
              particle.phase
          ) * 0.65
      }
    }

    function drawParticle(particle, elapsed) {
      const twinkle =
        0.72 +
        Math.sin(
          elapsed * 0.001 * particle.twinkle +
            particle.phase
        ) *
          0.28

      let x = particle.x
      let y = particle.y

      if (
        respondToPointer &&
        pointer.active &&
        !reduced
      ) {
        const dx = pointer.x - x
        const dy = pointer.y - y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 150 && dist > 0) {
          const force = (1 - dist / 150) * 8

          x -= (dx / dist) * force
          y -= (dy / dist) * force
        }
      }

      ctx.save()

      ctx.globalAlpha =
        particle.alpha * twinkle

      ctx.fillStyle = particle.color

      ctx.shadowColor = particle.color
      ctx.shadowBlur = particle.size * 5

      ctx.beginPath()
      ctx.arc(
        x,
        y,
        particle.size,
        0,
        Math.PI * 2
      )
      ctx.fill()

      ctx.restore()
    }

    function drawOutlineParticle(
      particle,
      elapsed
    ) {
      const pulse =
        0.78 +
        Math.sin(
          elapsed * 0.0015 +
            particle.phase
        ) *
          0.22

      ctx.save()

      ctx.globalAlpha =
        particle.alpha * pulse

      ctx.fillStyle = COLORS.white

      ctx.shadowColor = COLORS.pink
      ctx.shadowBlur = 7

      ctx.beginPath()

      ctx.arc(
        particle.x,
        particle.y,
        particle.size * 1.15,
        0,
        Math.PI * 2
      )

      ctx.fill()

      ctx.restore()
    }

    function drawNebula() {
      const centerX = width / 2
      const centerY = height / 2

      const radius =
        Math.min(width, height) * 0.4

      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius
      )

      gradient.addColorStop(
        0,
        'rgba(205, 150, 255, 0.075)'
      )

      gradient.addColorStop(
        0.35,
        'rgba(255, 130, 190, 0.045)'
      )

      gradient.addColorStop(
        0.7,
        'rgba(100, 90, 180, 0.018)'
      )

      gradient.addColorStop(
        1,
        'rgba(0, 0, 0, 0)'
      )

      ctx.fillStyle = gradient

      ctx.fillRect(
        0,
        0,
        width,
        height
      )
    }

    function drawStars(elapsed) {
      stars.forEach((star) => {
        const pulse =
          0.65 +
          Math.sin(
            elapsed * 0.001 * star.twinkle +
              star.phase
          ) *
            0.35

        if (star.fourPoint) {
          drawFourPointStar(
            ctx,
            star.x,
            star.y,
            star.size,
            star.alpha * pulse,
            COLORS.white
          )
        } else {
          ctx.save()

          ctx.globalAlpha =
            star.alpha * pulse

          ctx.fillStyle = COLORS.white

          ctx.beginPath()

          ctx.arc(
            star.x,
            star.y,
            star.size,
            0,
            Math.PI * 2
          )

          ctx.fill()

          ctx.restore()
        }
      })
    }

    function drawHeartGlow() {
      const centerX = width / 2
      const centerY = height / 2

      const radius =
        Math.min(width, height) * 0.25

      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius
      )

      gradient.addColorStop(
        0,
        'rgba(255, 190, 225, 0.08)'
      )

      gradient.addColorStop(
        0.45,
        'rgba(190, 145, 255, 0.045)'
      )

      gradient.addColorStop(
        1,
        'rgba(0, 0, 0, 0)'
      )

      ctx.fillStyle = gradient

      ctx.fillRect(
        centerX - radius,
        centerY - radius,
        radius * 2,
        radius * 2
      )
    }

    function drawFlowingTrail(elapsed) {
      const time = elapsed * 0.00035

      const centerX = width / 2
      const centerY = height / 2

      const scale =
        Math.min(width, height) * 0.035

      const points = []

      for (let i = 0; i < 55; i++) {
        const t =
          time +
          i * 0.075

        const heart = heartPoint(t, 1)

        const x =
          centerX +
          heart.x * scale +
          Math.sin(t * 2.1) * 25

        const y =
          centerY +
          heart.y * scale +
          Math.cos(t * 1.7) * 25

        points.push({ x, y })
      }

      ctx.save()

      ctx.lineWidth = 0.8
      ctx.lineCap = 'round'

      const gradient = ctx.createLinearGradient(
        points[0].x,
        points[0].y,
        points[points.length - 1].x,
        points[points.length - 1].y
      )

      gradient.addColorStop(
        0,
        'rgba(247, 182, 216, 0)'
      )

      gradient.addColorStop(
        0.5,
        'rgba(201, 183, 255, 0.28)'
      )

      gradient.addColorStop(
        1,
        'rgba(247, 182, 216, 0)'
      )

      ctx.strokeStyle = gradient

      ctx.beginPath()

      points.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y)
        } else {
          ctx.lineTo(point.x, point.y)
        }
      })

      ctx.stroke()

      ctx.restore()
    }

    function render(elapsed) {
      ctx.clearRect(
        0,
        0,
        width,
        height
      )

      drawNebula()
      drawStars(elapsed)

      if (revealed) {
        drawHeartGlow()
        drawFlowingTrail(elapsed)

        particles.forEach(
          (particle, index) => {
            updateParticle(
              particle,
              elapsed,
              index
            )

            drawParticle(
              particle,
              elapsed
            )
          }
        )

        outlineParticles.forEach(
          (particle) => {
            updateParticle(
              particle,
              elapsed,
              0
            )

            drawOutlineParticle(
              particle,
              elapsed
            )
          }
        )
      }

      animationFrame =
        requestAnimationFrame(loop)
    }

    function loop(now) {
      const elapsed =
        now - startTime

      render(elapsed)
    }

    function handlePointerMove(event) {
      if (!respondToPointer || reduced) {
        return
      }

      const rect =
        canvas.getBoundingClientRect()

      pointer.x =
        event.clientX - rect.left

      pointer.y =
        event.clientY - rect.top

      pointer.active = true
    }

    function handlePointerLeave() {
      pointer.active = false
    }

    resize()

    window.addEventListener(
      'resize',
      resize
    )

    if (respondToPointer) {
      canvas.addEventListener(
        'pointermove',
        handlePointerMove
      )

      canvas.addEventListener(
        'pointerleave',
        handlePointerLeave
      )
    }

    if (reduced) {
      render(2400)
    } else {
      animationFrame =
        requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(
        animationFrame
      )

      window.removeEventListener(
        'resize',
        resize
      )

      canvas.removeEventListener(
        'pointermove',
        handlePointerMove
      )

      canvas.removeEventListener(
        'pointerleave',
        handlePointerLeave
      )
    }
  }, [
    density,
    reduced,
    respondToPointer,
    revealed,
  ])

  return (
    <div
      className={`heart-gallery ${
        revealed
          ? 'heart-gallery--visible'
          : ''
      }`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  )
}