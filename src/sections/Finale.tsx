import { LineReveal } from '../components/Primitives'

export function Finale() {
  return (
    <section id="finale" className="finale" aria-label="Final statement">
      <div className="finale-glow" aria-hidden="true" />
      <p className="finale-title">
        <LineReveal text="Everything starts" />
        <LineReveal text="with one idea." delay={0.14} />
      </p>
      <p className="finale-sub mono">System core reassembled — D/P · Portfolio</p>
    </section>
  )
}