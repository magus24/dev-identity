import { LineReveal } from '../components/Primitives'
import { useI18n } from '../i18n/provider'

export function Finale() {
  const { t } = useI18n()

  return (
    <section id="finale" className="finale" aria-label={t('finale.aria')}>
      <div className="finale-glow" aria-hidden="true" />
      <p className="finale-title">
        <LineReveal text={t('finale.title')[0]} />
        <LineReveal text={t('finale.title')[1]} delay={0.14} />
      </p>
      <p className="finale-sub mono">{t('finale.sub')}</p>
    </section>
  )
}