import type { PointerEvent } from 'react'
import RevealText from '../components/RevealText'
import { profile, skillGroups } from '../data/portfolio'

const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-7', 'lg:col-span-3', 'lg:col-span-2']

function spotlight(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
}

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="px-6 py-28 md:px-12 md:py-36 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <h2 id="skills-title" className="max-w-4xl font-display text-huge font-extrabold">
          <RevealText text="The tools I work with." />
        </h2>
        <p className="lede mt-8">Every skill below is listed on my resume. I don't rate myself with percentages; the projects show what I can do with them.</p>

        <div className="mt-16 grid gap-4 lg:grid-cols-12">
          {skillGroups.map((g, i) => (
            <article
              key={g.title}
              className={`spot rounded-2xl p-7 md:p-9 ${spans[i] ?? 'lg:col-span-4'}`}
              onPointerMove={spotlight}
            >
              <h3 className="font-display text-[1.7rem] font-bold leading-tight tracking-tight">{g.title}</h3>
              <p className="mt-1 text-ash">{g.note}</p>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {g.items.map((s) => (
                  <li key={s} className="chip text-[0.95rem]">
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-white/10 pt-8">
          <span className="text-ash">Working style</span>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-bone">
            {profile.softSkills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
