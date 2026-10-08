import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { PROFILE } from '../data/profile'
import { STATS } from '../data/metrics'
import { LineReveal, Reveal } from '../components/Primitives'

const EASE = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section id="top" className="hero" aria-label="Introduction">
      <div className="hero-inner">
        <Reveal delay={0.05}>
          <p className="hero-kicker mono">
            Portfolio — <span>{PROFILE.year}</span> / {PROFILE.location}
          </p>
        </Reveal>

        <h1 className="hero-name" aria-label={PROFILE.name}>
          <LineReveal text={PROFILE.name} delay={0.1} />
        </h1>

        <div className="hero-roles" aria-label="Disciplines">
          {PROFILE.roles.map((role, i) => (
            <Reveal key={role} delay={0.25 + i * 0.12}>
              <a className="hero-role" href="#about">
                <span className="num">0{i + 1}</span>
                {role}
              </a>
            </Reveal>
          ))}
        </div>

        <div className="hero-headline" aria-hidden="true">
          {PROFILE.headline.map((line, i) => (
            <LineReveal
              key={line}
              text={line}
              delay={0.6 + i * 0.14}
              className={i === 1 ? 'line--alt' : ''}
            />
          ))}
        </div>
      </div>

      <div className="hero-hint" aria-hidden="true">
        drag the core
      </div>

      <div className="hero-strip">
        {STATS.map((stat, i) => (
          <motion.div
            className="hero-stat"
            key={stat.label}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 + i * 0.1, ease: EASE }}
          >
            <div className="v">{stat.value}</div>
            <div className="l mono">{stat.label}</div>
          </motion.div>
        ))}
        <motion.a
          className="hero-go"
          href="#work"
          data-cursor="GO"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2, ease: EASE }}
        >
          Explore work
          <span className="arr" aria-hidden="true">
            <ArrowDown size={13} strokeWidth={1.5} />
          </span>
        </motion.a>
      </div>
    </section>
  )
}