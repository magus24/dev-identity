import { RING_RADIUS } from '../data/stack'
import { SectionLabel, Reveal } from '../components/Primitives'
import { useLocalizedContent } from '../i18n/content'
import { useI18n } from '../i18n/provider'

function angleFor(index: number, count: number, offset: number) {
  return (index / Math.max(count, 1)) * 360 + offset
}

export function Stack() {
  const { stack } = useLocalizedContent()
  const { t } = useI18n()
  const ring1 = stack.filter((s) => s.ring === 1)
  const ring2 = stack.filter((s) => s.ring === 2)

  return (
    <section id="stack" className="section" aria-label={t('stack.aria')}>
      <SectionLabel index="04" title={t('stack.sectionTitle')} />
      <p className="lede" style={{ marginTop: -28, marginBottom: 56 }}>
        {t('stack.lede')}
      </p>

      <Reveal>
        <div className="stack-orbit-wrap">
          <div className="orbit">
            <div className="orbit-ring" data-ring="1" />
            <div className="orbit-ring" data-ring="2" />
            <div className="orbit-axis" />
            <div className="orbit-axis" style={{ transform: 'rotate(90deg)' }} />

            {[...ring1, ...ring2].map((item) => {
              const ringItems = item.ring === 1 ? ring1 : ring2
              const ringIndex = ringItems.indexOf(item)
              const count = ringItems.length
              const offset = item.ring === 1 ? -84 : -20
              const radius = RING_RADIUS[item.ring]
              const rad = ((angleFor(ringIndex, count, offset) * Math.PI) / 180)
              const rawX = 50 + radius * Math.cos(rad)
              const rawY = 50 + radius * Math.sin(rad)
              const x = Math.min(80, Math.max(20, rawX))
              const y = Math.min(82, Math.max(18, rawY))
              return (
                <button
                  key={item.name}
                  type="button"
                  className="orbit-node"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  aria-label={`${item.name} — ${item.description}`}
                >
                  {item.name}
                </button>
              )
            })}

            <div className="orbit-core">
              <svg viewBox="0 0 64 64" aria-hidden="true">
                <polygon points="32 8 52 26 46 52 18 52 12 26 32 8" fill="none" stroke="#f5f5f5" strokeWidth="1.2" opacity="0.55" />
                <polygon points="32 20 43 29 39 45 25 45 21 29 32 20" fill="rgba(77,124,255,0.16)" stroke="#4d7cff" strokeWidth="1.2" />
                <circle cx="32" cy="31" r="3" fill="#4d7cff" />
              </svg>
              <span className="core-label">{t('stack.coreLabel')}</span>
              <span className="core-sub">{t('stack.coreSub')}</span>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="stack-legend">
        <span>
          {t('stack.legendRing1')} — <b>{ring1.length}</b>
        </span>
        <span>
          {t('stack.legendRing2')} — <b>{ring2.length}</b>
        </span>
      </div>
    </section>
  )
}