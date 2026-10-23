import { useCallback, useEffect, useState } from 'react'
import { MotionConfig, motion } from 'framer-motion'
import Cursor from './components/Cursor'
import Footer from './components/Footer'
import Header from './components/Header'
import Loader from './components/Loader'
import { ProjectModalProvider } from './components/ProjectModal'
import { registerGsap, ScrollTrigger } from './animations/gsap'
import About from './sections/About'
import CinemaBand from './sections/CinemaBand'
import Contact from './sections/Contact'
import Experience from './sections/Experience'
import Gallery from './sections/Gallery'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Showcase from './sections/Showcase'
import Skills from './sections/Skills'
import Workspace from './sections/Workspace'

export default function App() {
  const [revealed, setRevealed] = useState(false)
  const [loaderGone, setLoaderGone] = useState(false)
  const onReveal = useCallback(() => setRevealed(true), [])
  const onGone = useCallback(() => setLoaderGone(true), [])

  // Recalculate scroll positions once web fonts and the loader are done.
  useEffect(() => {
    registerGsap()
    const refresh = () => ScrollTrigger.refresh()
    if ('fonts' in document) void document.fonts.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])
  useEffect(() => {
    if (loaderGone) ScrollTrigger.refresh()
  }, [loaderGone])

  return (
    <MotionConfig reducedMotion="user">
      <ProjectModalProvider>
        {!loaderGone && <Loader onReveal={onReveal} onGone={onGone} />}
        <Cursor />
        <a
          href="#main"
          className="fixed left-4 top-4 z-[400] -translate-y-24 rounded-full bg-bone px-5 py-3 font-semibold text-black transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Header />
        <motion.main
          id="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Hero ready={revealed} />
          <About />
          <Skills />
          <CinemaBand />
          <Projects />
          <Showcase />
          <Experience />
          <Workspace />
          <Gallery />
          <Contact />
        </motion.main>
        <Footer />
      </ProjectModalProvider>
    </MotionConfig>
  )
}
