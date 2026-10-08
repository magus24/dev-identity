import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { TIMELINE } from '../data/timeline'
import { SectionLabel } from '../components/Primitives'

export function Journey() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 75%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })

  return (
    <section id="journey" className="section" aria-label="Journey">
      <SectionLabel index="05" title="Journey — build history" />
      <p className="lede" style={{ marginTop: -28, marginBottom: 56 }}>
        The short version: each year added a layer — first pages, then systems.
      </p>

      <div ref={ref} className="timeline">
        <div className="timeline-line" aria-hidden="true">
          <motion.div className="fill" style={{ scaleY }} />
        </div>

        {TIMELINE.map((entry) => (
          <article
            key={entry.year}
            className="timeline-entry"
            data-year={entry.year}
          >
            <motion.span
              className="t-dot"
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ margin: '-20% 0px' }}
            />
            <motion.div
              className="t-year"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12% 0px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {entry.year}
            </motion.div>
            <motion.div
              className="is-active-glide"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12% 0px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="t-title">{entry.title}</h3>
              <p className="t-desc">{entry.description}</p>
            </motion.div>
          </article>
        ))}
      </div>
    </section>
  )
}