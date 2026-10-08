import { ArrowRight } from 'lucide-react'
import { LineReveal, Reveal } from '../components/Primitives'

const STEPS = [
  { index: '01', name: 'Idea', note: 'a signal worth pursuing' },
  { index: '02', name: 'System', note: 'turned into an architecture' },
  { index: '03', name: 'Product', note: 'shipped, measured, kept alive' },
]

export function Ideas() {
  return (
    <section id="ideas" className="section ideas" aria-label="Manifesto">
      <p className="ideas-statement">
        <LineReveal text="A portfolio is" />
        <LineReveal text="not a list of works —" delay={0.08} className="oxford" />
        <LineReveal text="it is a system:" delay={0.16} />
        <LineReveal text="ideas in, products out." delay={0.24} className="oxford" />
      </p>

      <Reveal delay={0.2}>
        <div className="ideas-flow">
          {STEPS.map((step, i) => (
            <div className="ideas-step" key={step.index}>
              <span className="step-num">{step.index}</span>
              <span className="step-name">{step.name}</span>
              <span className="mono" style={{ marginTop: 10, display: 'block' }}>
                {step.note}
              </span>
              {i < STEPS.length - 1 && (
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
        Everything on this page is a function of data, geometry and intent.
      </p>
    </section>
  )
}