import { ArrowRight } from 'lucide-react'
import { LineReveal, Reveal } from '../components/Primitives'
import { useI18n } from '../i18n/provider'

export function Ideas() {
  const { t, messages } = useI18n()

  return (
    <section id="ideas" className="section ideas" aria-label={t('ideas.aria')}>
      <p className="ideas-statement">
        {messages.ideas.statement.map((line, i) => (
          <LineReveal key={line} text={line} delay={0.08 * i} className={i % 2 === 1 ? 'oxford' : ''} />
        ))}
      </p>

      <Reveal delay={0.2}>
        <div className="ideas-flow">
          {messages.ideas.steps.map((step, i) => (
            <div className="ideas-step" key={step.name}>
              <span className="step-num">0{i + 1}</span>
              <span className="step-name">{step.name}</span>
              <span className="mono" style={{ marginTop: 10, display: 'block' }}>
                {step.note}
              </span>
              {i < messages.ideas.steps.length - 1 && (
                <ArrowRight
                  className="step-arrow"
                  size={22}
                  strokeWidth={1.2}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </Reveal>
      <p className="mono" style={{ marginTop: 18 }}>
        {t('ideas.footer')}
      </p>
    </section>
  )
}