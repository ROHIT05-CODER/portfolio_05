import { ArrowUp } from 'lucide-react'
import { profile } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 md:px-12 lg:px-16">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-6">
        <div>
          <p className="font-display text-lg font-bold">{profile.name}</p>
          <p className="mt-1 text-sm text-ash">
            © {new Date().getFullYear()} {profile.name}. Built with React, Three.js and GSAP.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-6 text-sm">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-ash transition-colors hover:text-bone">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-ash transition-colors hover:text-bone">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="text-ash transition-colors hover:text-bone">
            Email
          </a>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
            className="inline-flex items-center gap-2 rounded-full border border-smoke px-4 py-2 font-semibold transition-colors hover:border-bone hover:bg-white/5"
          >
            Back to top
            <ArrowUp size={15} aria-hidden="true" />
          </button>
        </nav>
      </div>
    </footer>
  )
}
