import { lazy, Suspense, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import RevealText from '../components/RevealText'
import Img from '../components/Img'
import { images, profile } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { hasWebGL } from '../hooks/useWebGL'

const HeroScene = lazy(() => import('../scenes/HeroScene'))

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function Hero({ ready }: { ready: boolean }) {
  const reduced = useReducedMotion()
  const webgl = useMemo(() => hasWebGL(), [])
  const use3D = webgl && !reduced
  const [sceneReady, setSceneReady] = useState(false)

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { duration: 0.9, delay, ease: EASE },
  })

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden pt-16 md:pt-0">
      {/* Visual: static portrait always renders first (fast LCP + fallback), 3D scene fades over it. */}
      <div
        className="relative mx-auto h-[58svh] w-full md:absolute md:inset-y-0 md:right-0 md:mx-0 md:h-auto md:w-[56%]"
        role="img"
        aria-label={images.heroPortrait.alt}
      >
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
            use3D && sceneReady ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="h-[86%] max-h-[640px] overflow-hidden rounded-[14px] border border-white/15 shadow-[0_40px_90px_-30px_rgba(255,255,255,0.18)]" style={{ aspectRatio: '4 / 5' }}>
            <Img image={images.heroPortrait} priority sizes="(min-width: 768px) 40vw, 70vw" className="h-full w-full object-cover" />
          </div>
        </div>
        {use3D && (
          <div className={`absolute inset-0 transition-opacity duration-700 ${sceneReady ? 'opacity-100' : 'opacity-0'}`}>
            <Suspense fallback={null}>
              <HeroScene onReady={() => setSceneReady(true)} />
            </Suspense>
          </div>
        )}
      </div>

      <div className="relative z-10 flex flex-col justify-end px-6 pb-16 pt-6 md:min-h-[100svh] md:w-[60%] md:px-12 md:pb-20 md:pt-28 lg:px-16">
        <motion.div {...fade(0.05)}>
          <p className="font-display text-lg font-semibold">{profile.name}</p>
          <p className="mt-1 text-ash">
            {profile.title}, {profile.degree}
          </p>
        </motion.div>

        <h1 className="mt-6 font-display font-extrabold leading-[0.9] tracking-[-0.045em] text-[clamp(3rem,14vw,5.5rem)] md:text-[clamp(3rem,7.2vw,8rem)]">
          <RevealText text="Building digital experiences" trigger="manual" play={ready} stagger={0.09} />
        </h1>

        <motion.p {...fade(0.5)} className="lede mt-7">
          I build web applications with React, Flask and SQL, from the interface people use to the API behind it.
        </motion.p>

        <motion.div {...fade(0.65)} className="mt-9 flex flex-wrap gap-3">
          <a href="#projects" className="btn btn-solid">
            Explore my work
          </a>
          <a href={profile.resumeUrl} download={profile.resumeFileName} className="btn btn-line">
            <Download size={17} aria-hidden="true" />
            Download resume
          </a>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to the about section"
        className="absolute bottom-6 right-6 z-10 hidden flex-col items-center gap-3 text-sm text-ash transition-colors hover:text-bone md:flex md:right-12"
      >
        <span style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-steel" aria-hidden="true">
          <span className="scroll-cue absolute inset-0 block bg-bone" />
        </span>
        <ArrowDown size={14} aria-hidden="true" />
      </a>
    </section>
  )
}
