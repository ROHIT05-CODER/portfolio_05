import { useLayoutEffect, useRef } from 'react'
import { gsap, registerGsap } from '../animations/gsap'
import Img from '../components/Img'
import RevealText from '../components/RevealText'
import { images } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'

/** Full-bleed cinematic band using the "typing at the desk" photo. Uniform scale only, so the face is never distorted. */
export default function CinemaBand() {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !root.current) return
    registerGsap()
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-band-img]',
        { scale: 1.04, yPercent: -5 },
        {
          scale: 1.2,
          yPercent: 5,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={root}
      aria-labelledby="band-title"
      className="relative h-[92svh] min-h-[520px] w-full overflow-hidden bg-black"
    >
      <Img
        image={images.groceryCover}
        sizes="100vw"
        data-band-img
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: '50% 30%' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent" aria-hidden="true" />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-14 md:px-12 md:pb-20 lg:px-16">
        <div className="mx-auto w-full max-w-[1400px]">
          <h2 id="band-title" className="max-w-4xl font-display text-huge font-extrabold">
            <RevealText text="From the screen to the server." />
          </h2>
          <p className="lede mt-6">
            The Grocery AI Assistant: a React front end talking to Flask REST APIs, built end to end.
          </p>
          <a href="#projects" className="btn btn-solid mt-8">
            See the project
          </a>
        </div>
      </div>
    </section>
  )
}
