import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { Reveal, SectionLabel } from '../components/Primitives'
import { METRICS, type Metric } from '../data/metrics'
import { prefersReducedMotion } from '../hooks/useMediaQuery'

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (prefersReducedMotion()) {
      setDisplay(value)
      return
    }

    let raf = 0
    const start = performance.now()
    const duration = 1500

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(value * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref}>
      {display}
      {suffix && <em>{suffix}</em>}
    </span>
  )
}

function MetricItem({ metric, index }: { metric: Metric; index: number }) {
  return (
    <Reveal delay={index * 0.08} className="metric">
      <div className="metric__value">
        <Counter value={metric.value} suffix={metric.suffix} />
      </div>
      <div className="metric__label">{metric.label}</div>
      <div className="metric__note">{metric.note}</div>
    </Reveal>
  )
}

export function Metrics() {
  return (
    <section className="section metrics-section" aria-labelledby="metrics-title">
      <SectionLabel index="06" title="Signals" />
      <h2 id="metrics-title" className="visually-hidden">
        Numbers
      </h2>
      <div className="metrics">
        {METRICS.map((metric, index) => (
          <MetricItem key={metric.label} metric={metric} index={index} />
        ))}
      </div>
    </section>
  )
}
