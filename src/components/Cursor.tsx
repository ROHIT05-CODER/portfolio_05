import { useEffect, useRef } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useReducedMotion } from '../hooks/useReducedMotion'

/** Restrained custom cursor. Only active with a fine pointer and no reduced-motion preference. */
export default function Cursor() {
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)')
  const reduced = useReducedMotion()
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!fine || reduced) return
    const d = dot.current
    const r = ring.current
    if (!d || !r) return
    document.documentElement.classList.add('custom-cursor')

    const target = { x: -100, y: -100 }
    const lag = { x: -100, y: -100 }
    let raf = 0
    let shown = false

    const onMove = (e: globalThis.PointerEvent) => {
      if (e.pointerType === 'touch') return
      target.x = e.clientX
      target.y = e.clientY
      d.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      if (!shown) {
        shown = true
        lag.x = e.clientX
        lag.y = e.clientY
        d.style.opacity = '1'
        r.style.opacity = '1'
      }
    }
    const onOver = (e: globalThis.PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.('a, button, [role="button"], [data-cursor]')
      r.classList.toggle('is-hover', !!el)
    }
    const onLeaveDoc = () => {
      d.style.opacity = '0'
      r.style.opacity = '0'
      shown = false
    }
    const loop = () => {
      lag.x += (target.x - lag.x) * 0.2
      lag.y += (target.y - lag.y) * 0.2
      r.style.transform = `translate3d(${lag.x}px, ${lag.y}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeaveDoc)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.documentElement.removeEventListener('pointerleave', onLeaveDoc)
      document.documentElement.classList.remove('custom-cursor')
    }
  }, [fine, reduced])

  if (!fine || reduced) return null
  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <i />
      </div>
    </>
  )
}
