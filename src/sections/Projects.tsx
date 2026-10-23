import { ArrowUpRight } from 'lucide-react'
import Img from '../components/Img'
import ProjectCover from '../components/ProjectCover'
import { useProjectModal } from '../components/ProjectModal'
import RevealText from '../components/RevealText'
import { projects } from '../data/portfolio'

export default function Projects() {
  const { openProject } = useProjectModal()
  const [featured, ...rest] = projects

  return (
    <section id="projects" aria-labelledby="projects-title" className="px-6 py-28 md:px-12 md:py-36 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <h2 id="projects-title" className="max-w-4xl font-display text-huge font-extrabold">
          <RevealText text="Things I've built." />
        </h2>

        {/* Featured: the most documented project gets the editorial layout */}
        <article className="group relative mt-16 grid items-end gap-8 lg:grid-cols-12 lg:gap-0">
          <div className="relative overflow-hidden rounded-2xl bg-graphite lg:col-span-8" style={{ aspectRatio: '3 / 2' }}>
            {featured.image && (
              <Img
                image={featured.image}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-expo group-hover:scale-[1.04]"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 rounded-2xl border border-white/10 bg-coal p-7 md:p-9 lg:col-span-5 lg:-ml-[13.5%] lg:mb-10">
            <p className="text-sm text-ash">{featured.kind}</p>
            <h3 className="mt-2 font-display text-big font-bold">
              <button
                type="button"
                data-cursor
                onClick={() => openProject(featured.id)}
                className="text-left after:absolute after:inset-0 after:content-['']"
              >
                {featured.name}
              </button>
            </h3>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-bone/85">{featured.summary}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {featured.stack.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-7 inline-flex items-center gap-2 font-semibold">
              View project details
              <ArrowUpRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </p>
          </div>
        </article>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {rest.map((p) => (
            <article key={p.id} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-coal transition-colors duration-500 hover:border-smoke">
              <div className="overflow-hidden bg-graphite" style={{ aspectRatio: '16 / 10' }}>
                <div className="h-full w-full transition-transform duration-[1200ms] ease-expo group-hover:scale-[1.05]">
                  {p.image ? <Img image={p.image} className="h-full w-full object-cover" /> : <ProjectCover kind={p.cover} />}
                </div>
              </div>
              <div className="p-7 md:p-8">
                <p className="text-sm text-ash">
                  {p.kind}
                  {p.context ? `. ${p.context}` : ''}
                </p>
                <h3 className="mt-2 font-display text-[1.9rem] font-bold leading-tight tracking-tight">
                  <button
                    type="button"
                    data-cursor
                    onClick={() => openProject(p.id)}
                    className="text-left after:absolute after:inset-0 after:content-['']"
                  >
                    {p.name}
                  </button>
                </h3>
                <p className="mt-3 leading-relaxed text-bone/80">{p.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
