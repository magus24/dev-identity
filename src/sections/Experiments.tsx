import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { EXPERIMENTS } from '../data/experiments'
import { cx } from '../lib/utils'
import { SectionLabel } from '../components/Primitives'
import { ExperimentGlyph } from '../components/visuals/ExperimentGlyph'
import { useLocalizedContent } from '../i18n/content'
import { useI18n } from '../i18n/provider'

export function Experiments() {
  const [active, setActive] = useState(0)
  const { experiments } = useLocalizedContent()
  const { t } = useI18n()
  const experiment = experiments[active]

  return (
    <section id="experiments" className="section" aria-label={t('experiments.aria')}>
      <SectionLabel index="02" title={t('experiments.sectionTitle')} />
      <p className="lede" style={{ marginTop: -28, marginBottom: 44 }}>
        {t('experiments.lede')}
      </p>

      <div className="exp-grid">
        <ul className="exp-list">
          {experiments.map((item, i) => (
            <li key={item.index}>
              <button
                type="button"
                className={cx('exp-row')}
                aria-pressed={i === active}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className="index">{item.index}</span>
                <span className="name">{item.title}</span>
                <ArrowUpRight className="arr" size={18} strokeWidth={1.4} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>

        <div className="exp-stage" aria-live="polite">
          <div className="stage-head">
            <span className="mono">{t('experiments.fieldPreview')}</span>
            <span className="mono" style={{ color: 'var(--accent)' }}>
              {experiment.index} / {String(EXPERIMENTS.length).padStart(2, '0')}
            </span>
          </div>
          <div className="stage-body">
            <AnimatePresence mode="wait">
              <motion.div
                key={experiment.pattern}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, width: '100%' }}
              >
                <div className="stage-num" aria-hidden="true">
                  {experiment.index}
                </div>
                <div style={{ width: '70%', maxWidth: 220 }}>
                  <ExperimentGlyph pattern={experiment.pattern} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="stage-desc">
            <b>{experiment.title}.</b> {experiment.description}
          </div>
        </div>
      </div>
    </section>
  )
}