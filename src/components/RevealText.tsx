import { useEffect, useLayoutEffect, useRef } from 'react'
import type { ElementType } from 'react'
import { gsap, ScrollTrigger, registerGsap } from '../animations/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'

type Props = {
  text: string
  as?: ElementType
  className?: string
  /** 'scroll' reveals when scrolled into view; 'manual' waits for `play`. */
  trigger?: 'scroll' | 'manual'
  play?: boolean
  stagger?: number
  delay?: number
}

/** Masked, staggered word reveal. Respects prefers-reduced-motion (text simply shows). */
export default function RevealText({
  text,
  as: Tag = 'span',
  className,
  trigger = 'scroll',
  play = false,
  stagger = 0.055,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const ctxRef = useRef<gsap.Context | null>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const el = ref.current
    if (reduced || !el) return
    registerGsap()
    const words = el.querySelectorAll<HTMLElement>('[data-word]')
    const ctx = gsap.context(() => {
      gsap.set(words, { yPercent: 115 })
      if (trigger === 'scroll') {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: () => gsap.to(words, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger, delay }),
        })
      }
    }, el)
    ctxRef.current = ctx
    return () => {
      ctx.revert()
      ctxRef.current = null
    }
  }, [reduced, trigger, stagger, delay, text])

  useEffect(() => {
    if (reduced || trigger !== 'manual' || !play || !ref.current) return
    const words = ref.current.querySelectorAll<HTMLElement>('[data-word]')
    ctxRef.current?.add(() => {
      gsap.to(words, { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger, delay })
    })
  }, [play, reduced, trigger, stagger, delay])

  const parts = text.split(' ')
  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {parts.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true">
          <span className="mask">
            <span data-word>{word}</span>
          </span>
          {i < parts.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  )
}
