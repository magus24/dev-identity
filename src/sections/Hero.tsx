import { motion, useReducedMotion } from 'framer-motion'
import { Suspense, lazy, useCallback, useMemo, useState } from 'react'
import { LineReveal } from '../components/Primitives'
import { HeroFallback } from '../components/three/HeroFallback'
import { PROFILE } from '../data/profile'
import { useOnScreen } from '../hooks/usePage'
import { supportsWebGL } from '../lib/webgl'

const HeroScene = lazy(() =>
  import('../components/three/HeroScene').then((module) => ({ default: module.HeroScene })),
)

const EASE = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const [active, setActive] = useState(true)
  const reduce = useReducedMotion()
  const sectionRef = useOnScreen<HTMLElement>(setActive)
  const hasWebGL = useMemo(() => supportsWebGL(), [])

  const roles = useMemo(() => ['SOFTWARE', 'AI', 'SECURITY'], [])

  const scrollToWork = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const el = document.getElementById('work')
    if (!el) return
    el.scrollIntoView({ behavior: prefersSafe() ? 'auto' : 'smooth', block: 'start' })
  }, [])

  return (
    <section id="top" className="hero" ref={sectionRef} aria-label="Intro">
      <div className="hero-canvas" aria-hidden="true">
        {hasWebGL ? (
          <Suspense fallback={<HeroFallback />}>
            <HeroScene active={active} />
          </Suspense>
        ) : (
          <HeroFallback />
        )}
      </div>

      <div className="hero-inner">
        <div className="hero-topline mono">
          <span>DEV // IDENTITY — PORTFOLIO {PROFILE.year}</span>
          <span>
            {PROFILE.location} · <span className="accent">AVAILABLE</span>
          </span>
        </div>

        <div className="hero-main">
          <motion.p
            className="hero-role mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.05 }}
          >
            {roles.map((role, i) => (
              <span key={role} style={{ display: 'inline-flex', gap: 14 }}>
                {i > 0 && (
                  <span className="sep" aria-hidden="true">
                    /
                  </span>
                )}
                {role}
              </span>
            ))}
          </motion.p>

          <h1 className="hero-title">
            <LineReveal text={PROFILE.name} className="hero-name" delay={0.12} />
            <span className="hero-headline">
              <LineReveal text={PROFILE.headline[0]} delay={0.3} />
              <LineReveal text={PROFILE.headline[1]} delay={0.42} />
            </span>
          </h1>
        </div>

        <motion.div
          className="hero-bottom"
          initial={{ opacity: 0, y: reduce ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
        >
          <a className="bracket-link" href="#work" onClick={scrollToWork}>
            Explore work <span aria-hidden="true">↓</span>
          </a>

          <div className="hero-status">
            <span className="k">AVAILABLE FOR</span>
            <span className="v">{PROFILE.availability.join(' · ')}</span>
          </div>
        </motion.div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        Scroll
      </div>
    </section>
  )
}

function prefersSafe() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
