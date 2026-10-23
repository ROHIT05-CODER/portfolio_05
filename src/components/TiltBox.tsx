import { useRef } from 'react'
import type { PointerEvent, ReactNode } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

type Props = {
  children: ReactNode
  max?: number
  className?: string
  innerClassName?: string
  perspective?: number
}

/** Pointer-driven 3D tilt with a soft glare. Mouse/pen only; disabled for reduced motion and touch. */
export default function TiltBox({ children, max = 7, className = '', innerClassName = '', perspective = 1200 }: Props) {
  const inner = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType === 'touch' || !inner.current) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    inner.current.style.transform = `rotateX(${((0.5 - py) * max * 2).toFixed(2)}deg) rotateY(${((px - 0.5) * max * 2).toFixed(2)}deg)`
    inner.current.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`)
    inner.current.style.setProperty('--my', `${(py * 100).toFixed(1)}%`)
  }
  const onLeave = () => {
    if (inner.current) inner.current.style.transform = 'rotateX(0deg) rotateY(0deg)'
  }

  return (
    <div className={className} style={{ perspective }} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div
        ref={inner}
        className={`tilt relative transition-transform duration-500 ease-expo ${innerClassName}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
        <div className="sheen" aria-hidden="true" />
      </div>
    </div>
  )
}
