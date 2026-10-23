import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import RevealText from '../components/RevealText'
import { profile } from '../data/portfolio'

type Fields = { name: string; email: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>
type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent' }
  | { kind: 'mailto' }
  | { kind: 'error'; message: string }

const FORM_ID = (import.meta.env.VITE_FORMSPREE_ID ?? '').trim()

function validate(v: Fields): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Enter your name (at least 2 characters).'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter a valid email address, like name@example.com.'
  if (v.message.trim().length < 10) e.message = 'Write a message of at least 10 characters.'
  return e
}

const links = [
  { icon: Mail, label: 'Email', text: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Phone', text: profile.phone, href: `tel:+91${profile.phone}` },
  { icon: Github, label: 'GitHub', text: profile.githubLabel, href: profile.github, external: true },
  { icon: Linkedin, label: 'LinkedIn', text: profile.linkedinLabel, href: profile.linkedin, external: true },
]

export default function Contact() {
  const [values, setValues] = useState<Fields>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  const mailtoHref = () => {
    const subject = encodeURIComponent(`Portfolio enquiry from ${values.name.trim() || 'a visitor'}`)
    const body = encodeURIComponent(`${values.message.trim()}\n\nFrom: ${values.name.trim()} (${values.email.trim()})`)
    return `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name as keyof Fields]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0]
      document.getElementById(`contact-${first}`)?.focus()
      return
    }

    // Honeypot: real visitors never fill this hidden field.
    const trap = (e.currentTarget.elements.namedItem('_gotcha') as HTMLInputElement | null)?.value
    if (trap) return

    if (!FORM_ID) {
      // No delivery service configured: hand off to the visitor's email app and say so plainly.
      window.location.href = mailtoHref()
      setStatus({ kind: 'mailto' })
      return
    }

    setStatus({ kind: 'sending' })
    try {
      const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: values.name.trim(), email: values.email.trim(), message: values.message.trim() }),
      })
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
      setStatus({ kind: 'sent' })
      setValues({ name: '', email: '', message: '' })
    } catch {
      setStatus({ kind: 'error', message: `The message could not be sent. Email me directly at ${profile.email}.` })
    }
  }

  const field =
    'mt-2 w-full rounded-xl border bg-coal px-4 py-3.5 text-bone placeholder:text-smoke transition-colors focus:border-bone focus:outline-none'

  return (
    <section id="contact" aria-labelledby="contact-title" className="px-6 py-28 md:px-12 md:py-40 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <h2 id="contact-title" className="font-display text-mega font-extrabold">
          <RevealText text="Have a project in mind?" />
        </h2>
        <p className="lede mt-8">
          I'm looking for entry-level Full Stack Developer roles and open to project conversations. Write to me, or use the form.
        </p>

        <div className="mt-20 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {links.map(({ icon: Icon, label, text, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex items-center gap-4 py-5 transition-colors hover:text-white"
                  >
                    <Icon size={20} aria-hidden="true" className="shrink-0 text-ash transition-colors group-hover:text-bone" />
                    <span className="min-w-0">
                      <span className="block text-sm text-ash">{label}</span>
                      <span className="block break-words text-lg font-semibold">{text}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-4 py-5">
                <MapPin size={20} aria-hidden="true" className="shrink-0 text-ash" />
                <span>
                  <span className="block text-sm text-ash">Location</span>
                  <span className="block text-lg font-semibold">{profile.location}</span>
                </span>
              </li>
            </ul>
          </div>

          <form onSubmit={onSubmit} noValidate className="lg:col-span-7" aria-label="Contact form">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="text-sm text-ash">
                  Your name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={onChange}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'err-name' : undefined}
                  className={`${field} ${errors.name ? 'border-bone' : 'border-steel'}`}
                />
                {errors.name && (
                  <p id="err-name" className="mt-2 text-sm text-bone">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="contact-email" className="text-sm text-ash">
                  Your email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={onChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'err-email' : undefined}
                  className={`${field} ${errors.email ? 'border-bone' : 'border-steel'}`}
                />
                {errors.email && (
                  <p id="err-email" className="mt-2 text-sm text-bone">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="contact-message" className="text-sm text-ash">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                value={values.message}
                onChange={onChange}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'err-message' : undefined}
                className={`${field} resize-y ${errors.message ? 'border-bone' : 'border-steel'}`}
              />
              {errors.message && (
                <p id="err-message" className="mt-2 text-sm text-bone">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Honeypot */}
            <input name="_gotcha" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button type="submit" className="btn btn-solid" disabled={status.kind === 'sending'}>
                {status.kind === 'sending' ? 'Sending…' : FORM_ID ? 'Send message' : 'Open in my email app'}
              </button>
              <div role="status" aria-live="polite" className="min-w-0 flex-1 text-[0.95rem]">
                {status.kind === 'sent' && <p className="text-bone">Message sent. Thank you for reaching out.</p>}
                {status.kind === 'mailto' && (
                  <p className="text-bone/90">
                    Your email app should now show a draft. Nothing has been sent until you press send there. Nothing opened?{' '}
                    <a className="underline underline-offset-4" href={mailtoHref()}>
                      Open the draft again
                    </a>{' '}
                    or write to {profile.email}.
                  </p>
                )}
                {status.kind === 'error' && <p className="text-bone">{status.message}</p>}
              </div>
            </div>
            {!FORM_ID && (
              <p className="mt-5 text-sm text-ash">
                This site has no form service configured, so the button prepares an email in your own mail app instead of sending from here.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
