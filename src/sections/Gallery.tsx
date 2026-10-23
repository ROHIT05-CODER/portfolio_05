import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import Img from '../components/Img'
import RevealText from '../components/RevealText'
import { gallery } from '../data/portfolio'
import { useFocusTrap } from '../hooks/useFocusTrap'

function Viewer({ index, onClose, onGo }: { index: number; onClose: () => void; onGo: (i: number) => void }) {
  const panel = useRef<HTMLDivElement>(null)
  const item = gallery[index]
  useFocusTrap(panel, true, onClose)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onGo(Math.min(gallery.length - 1, index + 1))
      if (e.key === 'ArrowLeft') onGo(Math.max(0, index - 1))
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [index, onGo])

  return (
    <motion.div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div ref={panel} role="dialog" aria-modal="true" aria-label={item.title} className="relative flex w-full max-w-6xl flex-col">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="font-display text-lg font-bold">
            {item.title} <span className="font-normal text-ash">({index + 1} of {gallery.length})</span>
          </p>
          <div className="flex gap-2">
            <button type="button" className="btn btn-line !p-0 h-11 w-11" onClick={() => onGo(index - 1)} disabled={index === 0} aria-label="Previous photo">
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <button type="button" className="btn btn-line !p-0 h-11 w-11" onClick={() => onGo(index + 1)} disabled={index === gallery.length - 1} aria-label="Next photo">
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <button type="button" className="btn btn-line !p-0 h-11 w-11" onClick={onClose} aria-label="Close photo viewer">
              <X size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
        {/* Fixed-height box + object-contain: the photo scales evenly and is never stretched. */}
        <div className="h-[78svh] w-full">
          <Img image={item.full} sizes="90vw" className="h-full w-full object-contain" />
        </div>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const go = useCallback((i: number) => setOpen(i), [])
  const wide = gallery.slice(1)

  const Card = ({ i, className, sizes }: { i: number; className: string; sizes: string }) => {
    const g = gallery[i]
    return (
      <button
        type="button"
        data-cursor
        onClick={() => setOpen(i)}
        aria-label={`View larger: ${g.title}`}
        className={`group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-graphite text-left ${className}`}
        style={{ aspectRatio: g.orientation === 'portrait' ? '2 / 3' : '3 / 2' }}
      >
        <Img
          image={g.image}
          sizes={sizes}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-expo group-hover:scale-[1.04]"
        />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5 pt-16">
          <span className="block font-display text-xl font-bold">{g.title}</span>
        </span>
      </button>
    )
  }

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="px-6 py-28 md:px-12 md:py-36 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <h2 id="gallery-title" className="max-w-4xl font-display text-huge font-extrabold">
          <RevealText text="Behind the build." />
        </h2>
        <p className="lede mt-8">A few frames from the workspace where these projects get made. Select a photo to see it larger.</p>

        <div className="mt-16 grid items-start gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">{Card({ i: 0, className: '', sizes: '(min-width: 1024px) 40vw, 100vw' })}</div>
          <div className="grid gap-6 lg:col-span-7 lg:pt-24">
            {wide.map((w, k) => (
              <div key={w.id}>{Card({ i: k + 1, className: '', sizes: '(min-width: 1024px) 56vw, 100vw' })}</div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>{open !== null && <Viewer key="viewer" index={open} onClose={close} onGo={go} />}</AnimatePresence>
    </section>
  )
}
