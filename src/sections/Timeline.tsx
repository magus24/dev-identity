import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useRef } from 'react'
import { LineReveal, SectionLabel } from '../components/Primitives'
import { TIMELINE } from '../data/timeline'
import { cx } from '../lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

function TimelineItem({ entry, index }: { entry: (typeof TIMELINE)[number]; index: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { once: true, margin: '-18% 0px' })

  return (
    <motion.li
      ref={ref}
      className={cx('tl-item', inView && 'is-active')}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.8, delay: index * 0.06, ease: EASE }}
    >
      <span className="tl-dot" aria-hidden="true" />
      <div className="tl-year">{entry.year}</div>
      <div>
        <h3 className="tl-title">{entry.title}</h3>
        <p className="tl-desc">{entry.description}</p>
      </div>
    </motion.li>
  )
}

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.65'],
  })

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="section timeline-section" aria-labelledby="timeline-title">
      <SectionLabel index="07" title="Timeline" />

      <h2
        id="timeline-title"
        className="h-display"
        style={{ marginBottom: 'clamp(32px, 6vh, 64px)' }}
      >
        <LineReveal text="HOW I GOT HERE" />
      </h2>

      <div className="timeline" ref={ref}>
        <div className="timeline-track" aria-hidden="true">
          <motion.div className="timeline-progress" style={{ scaleY: reduce ? 1 : scaleY }} />
        </div>

        <ol>
          {TIMELINE.map((entry, index) => (
            <TimelineItem key={entry.year} entry={entry} index={index} />
          ))}
        </ol>
      </div>
    </section>
  )
}
