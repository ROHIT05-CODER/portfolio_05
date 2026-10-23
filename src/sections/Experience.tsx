import { useLayoutEffect, useRef } from 'react'
import { gsap, registerGsap } from '../animations/gsap'
import RevealText from '../components/RevealText'
import { achievements, learning, timeline } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Experience() {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !root.current) return
    registerGsap()
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-line]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-timeline]', start: 'top 70%', end: 'bottom 60%', scrub: true },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="experience" ref={root} aria-labelledby="experience-title" className="px-6 py-28 md:px-12 md:py-36 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <h2 id="experience-title" className="max-w-4xl font-display text-huge font-extrabold">
          <RevealText text="Education and experience." />
        </h2>

        <div className="mt-20 grid gap-16 lg:grid-cols-12">
          <ol data-timeline className="relative space-y-14 pl-9 lg:col-span-7">
            <span aria-hidden="true" className="absolute bottom-0 left-[5px] top-2 w-px bg-steel" />
            <span
              aria-hidden="true"
              data-line
              className="absolute bottom-0 left-[5px] top-2 w-px origin-top bg-bone"
              style={{ transform: reduced ? 'none' : 'scaleY(0)' }}
            />
            {timeline.map((t) => (
              <li key={t.id} className="relative">
                <span aria-hidden="true" className="absolute -left-9 top-[0.55rem] h-[11px] w-[11px] rounded-full border border-bone bg-black" />
                <h3 className="font-display text-[1.6rem] font-bold leading-tight tracking-tight md:text-[1.9rem]">{t.title}</h3>
                <p className="mt-2 text-lg text-bone/85">{t.place}</p>
                {t.meta && <p className="mt-1 text-ash">{t.meta}</p>}
                {t.points && (
                  <ul className="mt-5 space-y-2.5 text-bone/85">
                    {t.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.7rem] h-px w-3 shrink-0 bg-bone" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>

          <div className="space-y-12 lg:col-span-5">
            <div>
              <h3 className="font-display text-2xl font-bold">Achievements</h3>
              <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
                {achievements.map((a) => (
                  <li key={a} className="py-4 leading-snug">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold">Certifications and learning</h3>
              <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
                {learning.map((l) => (
                  <li key={l} className="py-4 leading-snug">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
