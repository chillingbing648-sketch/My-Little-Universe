import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

// A quiet canvas star field. Stars drift almost imperceptibly and give a
// gentle parallax response to the pointer. When reduced motion is requested,
// it renders a single static frame instead of animating.
export default function StarField({ density = 1, respondToPointer = true }) {
  const canvasRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf = null
    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let stars = []
    let pointer = { x: 0.5, y: 0.5 }
    let destroyed = false

    function buildStars() {
      const area = width * height
      const count = Math.round((area / 9000) * density)
      stars = Array.from({ length: Math.max(24, count) }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.3 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.35,
        twinkleSpeed: Math.random() * 0.6 + 0.2,
        twinkleOffset: Math.random() * Math.PI * 2,
        parallax: Math.random() * 0.4 + 0.05,
      }))
    }

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildStars()
    }

    function draw(t) {
      if (destroyed) return
      ctx.clearRect(0, 0, width, height)
      const px = (pointer.x - 0.5) * 2
      const py = (pointer.y - 0.5) * 2
      for (const s of stars) {
        const twinkle = reduced
          ? s.baseAlpha
          : s.baseAlpha + Math.sin(t * 0.001 * s.twinkleSpeed + s.twinkleOffset) * 0.22
        const offsetX = respondToPointer && !reduced ? px * s.parallax * 10 : 0
        const offsetY = respondToPointer && !reduced ? py * s.parallax * 10 : 0
        ctx.beginPath()
        ctx.arc(s.x * width + offsetX, s.y * height + offsetY, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(242, 235, 220, ${Math.max(0, Math.min(1, twinkle))})`
        ctx.fill()
      }
      if (!reduced) raf = requestAnimationFrame(draw)
    }

    function onPointerMove(e) {
      const rect = canvas.parentElement.getBoundingClientRect()
      pointer.x = (e.clientX - rect.left) / rect.width
      pointer.y = (e.clientY - rect.top) / rect.height
    }

    resize()
    draw(0)
    window.addEventListener('resize', resize)
    if (respondToPointer) window.addEventListener('pointermove', onPointerMove)

    return () => {
      destroyed = true
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      if (respondToPointer) window.removeEventListener('pointermove', onPointerMove)
    }
  }, [density, respondToPointer, reduced])

  return (
    <div className="starfield" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
