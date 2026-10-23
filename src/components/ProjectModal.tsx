import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Github, X } from 'lucide-react'
import { profile, projects } from '../data/portfolio'
import type { Project } from '../data/portfolio'
import { useFocusTrap } from '../hooks/useFocusTrap'
import Img from './Img'
import ProjectCover from './ProjectCover'

type Ctx = { openProject: (id: string) => void }
const ModalContext = createContext<Ctx>({ openProject: () => undefined })
export const useProjectModal = () => useContext(ModalContext)

function ModalBody({ project, onClose }: { project: Project; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null)
  useFocusTrap(panel, true, onClose)

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-white/10 bg-coal sm:rounded-3xl"
        initial={{ y: 48, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 32, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/70 backdrop-blur transition-colors hover:border-bone"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="aspect-[16/9] w-full overflow-hidden bg-graphite">
          {project.image ? (
            <Img image={project.image} sizes="(min-width: 896px) 896px, 100vw" className="h-full w-full object-cover" />
          ) : (
            <ProjectCover kind={project.cover} />
          )}
        </div>

        <div className="grid gap-8 p-6 sm:p-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-sm text-ash">
              {project.kind}
              {project.context ? `. ${project.context}` : ''}
            </p>
            <h3 id="project-modal-title" className="mt-2 font-display text-big font-bold">
              {project.name}
            </h3>
            <p className="lede mt-5">{project.summary}</p>
            {!project.image && (
              <p className="mt-4 text-sm text-ash">
                The cover is an illustration. No screenshot was supplied for this project.
              </p>
            )}
          </div>

          <div className="space-y-7">
            <div>
              <h4 className="text-sm font-semibold text-ash">What I built</h4>
              <ul className="mt-3 space-y-2.5 text-[0.98rem] leading-snug text-bone/90">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1 w-3 shrink-0 bg-bone" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-ash">Tech stack</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {project.repo && (
                <a className="btn btn-solid" href={project.repo} target="_blank" rel="noopener noreferrer">
                  <Github size={17} aria-hidden="true" />
                  View repository
                </a>
              )}
              {project.demo && (
                <a className="btn btn-line" href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={17} aria-hidden="true" />
                  Live demo
                </a>
              )}
              {!project.repo && !project.demo && (
                <>
                  <p className="w-full text-sm text-ash">Repository and demo links for this project haven't been added yet.</p>
                  <a className="btn btn-line" href={profile.github} target="_blank" rel="noopener noreferrer">
                    <Github size={17} aria-hidden="true" />
                    Browse my GitHub
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ProjectModalProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const openProject = useCallback((id: string) => setActiveId(id), [])
  const close = useCallback(() => setActiveId(null), [])
  const value = useMemo(() => ({ openProject }), [openProject])
  const project = projects.find((p) => p.id === activeId)

  return (
    <ModalContext.Provider value={value}>
      {children}
      <AnimatePresence>{project && <ModalBody key={project.id} project={project} onClose={close} />}</AnimatePresence>
    </ModalContext.Provider>
  )
}
