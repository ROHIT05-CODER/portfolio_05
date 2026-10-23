import { useLayoutEffect, useRef } from 'react'
import { gsap, registerGsap } from '../animations/gsap'
import Img from '../components/Img'
import RevealText from '../components/RevealText'
import { images, profile } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'

const facts = [
  { label: 'Studying', value: 'B.Tech Artificial Intelligence & Data Science, Adhi College of Engineering and Technology' },
  { label: 'Based in', value: profile.location },
  { label: 'Looking for', value: 'Entry-level Full Stack Developer roles' },
]

export default function About() {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !root.current) return
    registerGsap()
    const ctx = gsap.context(() => {
      // Portrait: monochrome clip reveal, then a slow parallax drift inside the frame (uniform scale only).
      gsap.fromTo(
        '[data-portrait]',
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: { trigger: '[data-portrait]', start: 'top 80%', once: true },
        },
      )
      gsap.fromTo(
        '[data-portrait-img]',
        { yPercent: -5, scale: 1.12 },
        {
          yPercent: 5,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: { trigger: '[data-portrait]', start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
      // Offset outline wipes in as the section scrolls past.
      gsap.fromTo(
        '[data-frame]',
        { clipPath: 'inset(0 100% 100% 0)' },
        {
          clipPath: 'inset(0 0% 0% 0)',
          ease: 'none',
          scrollTrigger: { trigger: '[data-portrait]', start: 'top 85%', end: 'center 45%', scrub: true },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="about" ref={root} aria-labelledby="about-title" className="relative px-6 py-28 md:px-12 md:py-40 lg:px-16">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="relative lg:col-span-5">
          <div
            data-frame
            aria-hidden="true"
            className="pointer-events-none absolute -left-4 -top-4 h-full w-full border border-smoke md:-left-6 md:-top-6"
            style={{ clipPath: reduced ? 'none' : 'inset(0 100% 100% 0)' }}
          />
          <div data-portrait className="relative overflow-hidden rounded-[10px] bg-graphite" style={{ aspectRatio: '9 / 10' }}>
            <Img
              image={images.aboutPortrait}
              sizes="(min-width: 1024px) 40vw, 90vw"
              data-portrait-img
              className="h-full w-full object-cover"
              style={{ objectPosition: '50% 18%' }}
            />
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-10">
          <h2 id="about-title" className="font-display text-huge font-extrabold">
            <RevealText text="Engineer in training, builder already." />
          </h2>
          <p className="lede mt-10">{profile.summary}</p>

          <dl className="mt-14 divide-y divide-white/10 border-y border-white/10">
            {facts.map((f) => (
              <div key={f.label} className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-8">
                <dt className="text-ash">{f.label}</dt>
                <dd className="text-bone">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
