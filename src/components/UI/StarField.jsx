import { memo, useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

// Detect lower-powered hardware / mobile safely
function checkLowPower() {
  if (typeof window === 'undefined') return false
  const nav = typeof navigator !== 'undefined' ? navigator : null
  const lowCores = Boolean(nav?.hardwareConcurrency && nav.hardwareConcurrency <= 4)
  const lowMem = Boolean(nav?.deviceMemory && nav.deviceMemory <= 4)
  const touchOrMobile = Boolean(
    window.matchMedia?.('(pointer: coarse)').matches ||
    window.matchMedia?.('(max-width: 640px)').matches
  )
  return lowCores || lowMem || touchOrMobile
}

// A quiet canvas star field. Stars drift almost imperceptibly and give a
// gentle parallax response to the pointer. When reduced motion is requested,
// it renders a single static frame instead of animating.
function StarField({ density = 1, respondToPointer = true }) {
  const canvasRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let raf = null
    let width = 0
    let height = 0
    let destroyed = false
    let isVisible = true

    const isLowPower = checkLowPower()
    // Adaptive DPR: ~1.25 for weaker/mobile devices, up to 1.5 where visually safe
    const baseDpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
    const dpr = isLowPower
      ? Math.min(Math.max(1, baseDpr), 1.25)
      : Math.min(Math.max(1, baseDpr), 1.5)

    let stars = []
    let pointer = { x: 0.5, y: 0.5 }
    let targetPointer = { x: 0.5, y: 0.5 }

    // Pointer throttling / coalescing via RAF
    let hasPendingPointer = false
    let pendingClientX = 0
    let pendingClientY = 0

    // Cached bounding rect - updated on resize/scroll, NEVER on raw pointermove
    let cachedRect = { left: 0, top: 0, width: 0, height: 0 }

    function updateRect() {
      if (destroyed || !parent) return
      const rect = parent.getBoundingClientRect()
      cachedRect.left = rect.left
      cachedRect.top = rect.top
      cachedRect.width = rect.width
      cachedRect.height = rect.height
    }

    function buildStars() {
      const area = width * height
      // Adapt particle count for weaker devices while preserving appearance
      const powerScale = isLowPower ? 0.65 : 1
      const rawCount = Math.round((area / 9000) * density * powerScale)
      const minCount = isLowPower ? 18 : 24
      const maxCount = isLowPower ? 75 : 120
      const count = Math.min(maxCount, Math.max(minCount, rawCount))

      stars = Array.from({ length: count }, () => ({
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
      if (destroyed || !parent) return
      updateRect()
      width = cachedRect.width
      height = cachedRect.height
      if (width <= 0 || height <= 0) return

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildStars()

      // If reduced motion or paused, draw the static frame
      if (reduced) {
        drawFrame(0)
      }
    }

    function drawFrame(t) {
      if (destroyed || width <= 0 || height <= 0) return

      // Coalesce pointer updates into RAF frame - zero layout reflows during pointermove
      if (respondToPointer && !reduced) {
        if (hasPendingPointer && cachedRect.width > 0 && cachedRect.height > 0) {
          targetPointer.x = Math.max(0, Math.min(1, (pendingClientX - cachedRect.left) / cachedRect.width))
          targetPointer.y = Math.max(0, Math.min(1, (pendingClientY - cachedRect.top) / cachedRect.height))
          hasPendingPointer = false
        }
        pointer.x += (targetPointer.x - pointer.x) * 0.08
        pointer.y += (targetPointer.y - pointer.y) * 0.08
      }

      ctx.clearRect(0, 0, width, height)

      // Use constant base fillStyle and adjust globalAlpha per star
      // This completely eliminates per-star string allocations and color parsing
      ctx.fillStyle = '#f2ebdc'

      const px = (pointer.x - 0.5) * 2
      const py = (pointer.y - 0.5) * 2
      const len = stars.length

      for (let i = 0; i < len; i++) {
        const s = stars[i]
        const twinkle = reduced
          ? s.baseAlpha
          : s.baseAlpha + Math.sin(t * 0.001 * s.twinkleSpeed + s.twinkleOffset) * 0.22
        const offsetX = respondToPointer && !reduced ? px * s.parallax * 10 : 0
        const offsetY = respondToPointer && !reduced ? py * s.parallax * 10 : 0

        const alpha = twinkle <= 0 ? 0 : twinkle >= 1 ? 1 : twinkle
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(s.x * width + offsetX, s.y * height + offsetY, s.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Reset globalAlpha to clean state
      ctx.globalAlpha = 1
    }

    function loop(t) {
      if (destroyed) return
      if (!isVisible) {
        raf = null
        return
      }

      drawFrame(t)

      if (!reduced) {
        raf = requestAnimationFrame(loop)
      } else {
        raf = null
      }
    }

    function startLoop() {
      if (destroyed || raf || reduced || !isVisible) return
      raf = requestAnimationFrame(loop)
    }

    function stopLoop() {
      if (raf) {
        cancelAnimationFrame(raf)
        raf = null
      }
    }

    function onPointerMove(e) {
      if (destroyed) return
      // Ultra-fast: record pointer coords without calling getBoundingClientRect
      pendingClientX = e.clientX
      pendingClientY = e.clientY
      hasPendingPointer = true
    }

    // Visibility management: stop continuous loop when tab is hidden or section is offscreen
    function onVisibilityChange() {
      if (document.hidden) {
        stopLoop()
      } else if (isVisible && !reduced) {
        startLoop()
      }
    }

    let observer = null
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          isVisible = Boolean(entry && entry.isIntersecting)
          if (isVisible) {
            updateRect()
            if (!reduced) startLoop()
          } else {
            stopLoop()
          }
        },
        { threshold: 0.01 }
      )
      observer.observe(canvas)
    }

    resize()
    if (!reduced) {
      startLoop()
    } else {
      drawFrame(0)
    }

    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('scroll', updateRect, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)

    if (respondToPointer) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
    }

    return () => {
      destroyed = true
      stopLoop()
      if (observer) {
        observer.disconnect()
        observer = null
      }
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', updateRect)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      if (respondToPointer) {
        window.removeEventListener('pointermove', onPointerMove)
      }
    }
  }, [density, respondToPointer, reduced])

  return (
    <div className="starfield" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}

export default memo(StarField)
