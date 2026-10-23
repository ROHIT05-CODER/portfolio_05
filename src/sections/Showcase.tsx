import { useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Img from '../components/Img'
import ProjectCover from '../components/ProjectCover'
import { useProjectModal } from '../components/ProjectModal'
import RevealText from '../components/RevealText'
import { projects } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Showcase() {
  const [active, setActive] = useState(0)
  const { openProject } = useProjectModal()
  const reduced = useReducedMotion()
  const tiltRef = useRef<HTMLDivElement | null>(null)
  const count = projects.length
  const current = projects[active]

  const select = (i: number) => {
    // Clear the pointer tilt left on the previously active card.
    if (tiltRef.current) tiltRef.current.style.transform = ''
    setActive(i)
  }
  const go = (next: number) => select(Math.max(0, Math.min(count - 1, next)))

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(active + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(active - 1)
    }
  }

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = tiltRef.current
    if (!el || reduced || e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.transform = `rotateX(${((0.5 - py) * 10).toFixed(2)}deg) rotateY(${((px - 0.5) * 12).toFixed(2)}deg)`
  }
  const onLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)'
  }

  return (
    <section
      id="showcase"
      aria-labelledby="showcase-title"
      aria-roledescription="carousel"
      onKeyDown={onKeyDown}
      className="overflow-x-clip px-6 py-28 md:px-12 md:py-36 lg:px-16"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="showcase-title" className="max-w-4xl font-display text-huge font-extrabold">
            <RevealText text="Step into the work." />
          </h2>
          <div className="flex gap-3">
            <button
              type="button"
              className="btn btn-line !p-0 h-12 w-12"
              onClick={() => go(active - 1)}
              disabled={active === 0}
              aria-label="Previous project"
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="btn btn-line !p-0 h-12 w-12"
              onClick={() => go(active + 1)}
              disabled={active === count - 1}
              aria-label="Next project"
            >
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
        <p className="lede mt-6">Use the arrow keys or the buttons to move between projects. Select the centre card to open its details.</p>

        <div
          className="relative mx-auto mt-12 h-[clamp(300px,52vw,500px)] w-full"
          style={{ perspective: '1500px' }}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          {projects.map((p, i) => {
            const offset = i - active
            const abs = Math.abs(offset)
            const isActive = offset === 0
            return (
              <div
                key={p.id}
                className={`absolute left-1/2 top-1/2 w-[min(78vw,560px)] ${reduced ? '' : 'transition-all duration-[900ms] ease-expo'}`}
                style={{
                  transform: `translate(-50%, -50%) translateX(${offset * 62}%) translateZ(${-abs * 220}px) rotateY(${-offset * 30}deg) scale(${1 - abs * 0.05})`,
                  zIndex: 10 - abs,
                  transformStyle: 'preserve-3d',
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}: ${p.name}`}
              >
                <div ref={isActive ? tiltRef : undefined} className={reduced ? '' : 'transition-transform duration-300 ease-out'} style={{ transformStyle: 'preserve-3d' }}>
                  <button
                    type="button"
                    data-cursor
                    onClick={() => (isActive ? openProject(p.id) : go(i))}
                    aria-label={isActive ? `Open details for ${p.name}` : `Show ${p.name}`}
                    className={`group relative block w-full overflow-hidden rounded-2xl border bg-graphite text-left shadow-[0_50px_80px_-40px_rgba(255,255,255,0.22)] transition-[border-color,filter] duration-500 ${
                      isActive ? 'border-white/30' : 'border-white/10 brightness-50'
                    }`}
                    style={{ aspectRatio: '16 / 11' }}
                  >
                    {p.image ? (
                      <Img image={p.image} sizes="(min-width: 768px) 560px, 78vw" className="h-full w-full object-cover" />
                    ) : (
                      <ProjectCover kind={p.cover} />
                    )}
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5 pt-14">
                      <span className="block font-display text-xl font-bold">{p.name}</span>
                    </span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-[1fr_auto] md:items-end" aria-live="polite">
          <div>
            <p className="text-sm text-ash">
              Project {active + 1} of {count}
            </p>
            <h3 className="mt-1 font-display text-big font-bold">{current.name}</h3>
            <p className="mt-3 max-w-[60ch] leading-relaxed text-bone/85">{current.summary}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {current.stack.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <button type="button" className="btn btn-solid" onClick={() => openProject(current.id)}>
            Open details
          </button>
        </div>

        <div className="mt-10 flex justify-center gap-3" role="group" aria-label="Choose a project">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => select(i)}
              aria-label={`Show ${p.name}`}
              aria-current={i === active}
              className="flex h-8 w-8 items-center justify-center"
            >
              <span className={`block h-2 rounded-full transition-all duration-500 ${i === active ? 'w-8 bg-bone' : 'w-2 bg-smoke'}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
