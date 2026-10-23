import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { images, profile } from '../data/portfolio'

type Props = {
  /** Called as the curtain starts lifting so the hero can begin its entrance. */
  onReveal: () => void
  /** Called once the curtain has fully left the screen. */
  onGone: () => void
}

const PRELOAD = [images.heroPortrait.src]

function preloadImages(): Promise<void> {
  const loads = PRELOAD.map(
    (src) =>
      new Promise<void>((resolve) => {
        const img = new Image()
        img.onload = () => resolve()
        img.onerror = () => resolve()
        img.src = src
      }),
  )
  const timeout = new Promise<void>((resolve) => setTimeout(resolve, 3500))
  return Promise.race([Promise.all(loads).then(() => undefined), timeout])
}

/** Monochrome loading sequence: counter + progress line, then a curtain lift. */
export default function Loader({ onReveal, onGone }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const num = useRef<HTMLSpanElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    let cancelled = false
    const counter = { v: 0 }
    const paint = () => {
      if (num.current) num.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
      if (bar.current) bar.current.style.transform = `scaleX(${counter.v / 100})`
    }

    const ctx = gsap.context(() => {
      const first = gsap.to(counter, { v: 90, duration: reduced ? 0.15 : 1.3, ease: 'power2.out', onUpdate: paint })
      Promise.all([preloadImages(), first.then()]).then(() => {
        if (cancelled) return
        gsap.to(counter, {
          v: 100,
          duration: reduced ? 0.05 : 0.35,
          ease: 'power1.out',
          onUpdate: paint,
          onComplete: () => {
            if (cancelled) return
            gsap.delayedCall(reduced ? 0 : 0.45, onReveal)
            gsap.to(root.current, {
              yPercent: -100,
              duration: reduced ? 0.01 : 1,
              delay: reduced ? 0 : 0.1,
              ease: 'expo.inOut',
              onComplete: () => {
                document.body.style.overflow = ''
                onGone()
              },
            })
          },
        })
      })
    }, root)

    return () => {
      cancelled = true
      ctx.revert()
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  return (
    <div
      ref={root}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[300] flex flex-col justify-between bg-black px-6 py-6 md:px-12 md:py-10"
    >
      <div className="flex items-start justify-between text-sm text-ash">
        <span className="font-semibold text-bone">{profile.name}</span>
        <span>{profile.title}</span>
      </div>
      <div>
        <span ref={num} className="block font-display text-[clamp(5rem,22vw,18rem)] font-bold leading-[0.8] tracking-[-0.06em] text-bone">
          000
        </span>
        <div className="mt-6 h-px w-full bg-steel">
          <div ref={bar} className="h-px origin-left bg-bone" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>
    </div>
  )
}
