import { useLayoutEffect, useRef } from 'react'
import { gsap, registerGsap } from '../animations/gsap'
import Img from '../components/Img'
import RevealText from '../components/RevealText'
import TiltBox from '../components/TiltBox'
import { images } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'

const layers = [
  { y: 20, title: 'Interface', detail: 'React, Tailwind CSS' },
  { y: 112, title: 'API', detail: 'Flask, REST APIs' },
  { y: 204, title: 'Data', detail: 'SQL' },
]

export default function Workspace() {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !root.current) return
    registerGsap()
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-draw]',
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: 'power2.inOut',
          stagger: 0.25,
          scrollTrigger: { trigger: '[data-diagram]', start: 'top 80%', once: true },
        },
      )
      // Depth: the workspace photo drifts slower than the page.
      gsap.fromTo(
        '[data-workspace-img]',
        { yPercent: -4, scale: 1.1 },
        {
          yPercent: 4,
          scale: 1.1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-workspace-frame]', start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="workspace" ref={root} aria-labelledby="workspace-title" className="overflow-x-clip px-6 py-28 md:px-12 md:py-36 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <h2 id="workspace-title" className="max-w-4xl font-display text-huge font-extrabold">
          <RevealText text="Where the code gets written." />
        </h2>
        <p className="lede mt-8">
          Most of my projects touch every layer: a React interface, an API in Flask, and data behind it. The panels here are illustrations of that structure, not live systems.
        </p>

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-12">
          <TiltBox className="relative lg:col-span-8" max={5} perspective={1600}>
            <div data-workspace-frame className="overflow-hidden rounded-2xl border border-white/15 bg-graphite" style={{ aspectRatio: '3 / 2' }}>
              <Img image={images.workspace} data-workspace-img className="h-full w-full object-cover" />
            </div>

            {/* Terminal panel floats in front of the photo for depth */}
            <figure
              className="absolute -bottom-8 left-3 w-[min(86%,380px)] rounded-xl border border-white/20 bg-black/85 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md md:-left-6"
              style={{ transform: 'translateZ(70px)' }}
            >
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-smoke" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-smoke" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-smoke" aria-hidden="true" />
                <figcaption className="ml-2 text-xs text-ash">grocery-ai-assistant, illustrative</figcaption>
              </div>
              <pre className="overflow-x-auto px-4 py-4 font-mono text-[0.78rem] leading-relaxed text-bone/90" aria-label="Illustrative project structure">
{`grocery-ai-assistant/
  frontend/   React, Tailwind CSS
  backend/    Flask REST API
    GET   /api/items?q=
    POST  /api/order`}
              </pre>
              <p className="border-t border-white/10 px-4 py-2 text-[0.72rem] text-ash">A static illustration. Nothing is running here.</p>
            </figure>
          </TiltBox>

          <div data-diagram className="lg:col-span-4 lg:pt-6">
            <h3 className="font-display text-2xl font-bold">How the layers connect</h3>
            <svg viewBox="0 0 320 290" className="mt-6 w-full" role="img" aria-label="Diagram: an interface layer calls an API layer through Axios, and the API layer reads from a SQL data layer. Projects are deployed on Vercel and Render.">
              {layers.map((l) => (
                <g key={l.title}>
                  <rect x="1" y={l.y} width="220" height="66" rx="10" fill="#0d0d0d" stroke="#4d4d4d" />
                  <text x="20" y={l.y + 29} fill="#f2f2f2" fontSize="17" fontWeight="700">
                    {l.title}
                  </text>
                  <text x="20" y={l.y + 51} fill="#9a9a9a" fontSize="13">
                    {l.detail}
                  </text>
                </g>
              ))}
              <path data-draw pathLength={1} strokeDasharray="1" strokeDashoffset={reduced ? 0 : 1} d="M111 86v26" stroke="#f2f2f2" strokeWidth="1.5" fill="none" />
              <path data-draw pathLength={1} strokeDasharray="1" strokeDashoffset={reduced ? 0 : 1} d="M111 178v26" stroke="#f2f2f2" strokeWidth="1.5" fill="none" />
              <text x="124" y="103" fill="#9a9a9a" fontSize="12">
                Axios requests
              </text>
              <text x="124" y="195" fill="#9a9a9a" fontSize="12">
                queries
              </text>
              <path
                data-draw
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset={reduced ? 0 : 1}
                d="M221 53h40v90h-40"
                stroke="#9a9a9a"
                strokeWidth="1.25"
                fill="none"
                strokeLinecap="round"
              />
              <rect x="206" y="236" width="108" height="46" rx="10" fill="#0d0d0d" stroke="#2a2a2a" strokeDasharray="4 4" />
              <text x="220" y="256" fill="#f2f2f2" fontSize="13" fontWeight="700">
                Deployment
              </text>
              <text x="220" y="272" fill="#9a9a9a" fontSize="11.5">
                Vercel, Render
              </text>
            </svg>
            <p className="mt-4 text-sm leading-relaxed text-ash">
              The layers I work across, taken from the skills and projects on my resume. Not every project uses every layer.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
