import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { LineReveal, SectionLabel } from '../components/Primitives'
import { ExperimentVisual } from '../components/visuals/ExperimentVisual'
import { EXPERIMENTS } from '../data/experiments'
import { cx } from '../lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

export function Experiments() {
  const [active, setActive] = useState(0)
  const current = EXPERIMENTS[active]

  return (
    <section id="experiments" className="section experiments" aria-labelledby="exp-title">
      <SectionLabel index="02" title="Experiments" />

      <h2 id="exp-title" className="h-display" style={{ marginBottom: 'clamp(32px, 6vh, 64px)' }}>
        <LineReveal text="NOT EVERYTHING I BUILD" />
        <LineReveal text="BECOMES A PRODUCT." delay={0.1} />
      </h2>

      <div className="exp-grid">
        <ul className="exp-list">
          {EXPERIMENTS.map((item, index) => (
            <li
              key={item.index}
              className={cx('exp-item', index === active && 'is-active')}
            >
              <button
                type="button"
                className="exp-btn"
                aria-expanded={index === active}
                onPointerEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
              >
                <span className="exp-num">{item.index}</span>
                <span className="exp-title">{item.title}</span>
                <span className="exp-desc">{item.description}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="exp-preview" aria-hidden="true">
          <div className="exp-preview__stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.pattern}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <ExperimentVisual pattern={current.pattern} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="exp-preview__meta">
            <span className="exp-preview__num">{current.index}</span>
            <span className="exp-preview__title">{current.title}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
