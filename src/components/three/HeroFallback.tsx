import { useMemo } from 'react'

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

export function HeroFallback() {
  const dots = useMemo(() => {
    const list: { x: number; y: number; r: number; o: number }[] = []
    const count = 240
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < count; i += 1) {
      const y = 1 - (i / (count - 1)) * 2
      const radius = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = golden * i
      const z3 = Math.sin(theta) * radius
      list.push({
        x: 200 + Math.cos(theta) * radius * 150,
        y: 200 + y * 150,
        r: 0.7 + (z3 + 1) * 0.9,
        o: 0.12 + (z3 + 1) * 0.28,
      })
    }
    return list
  }, [])

  return (
    <div className="hero-fallback">
      <svg
        viewBox="0 0 400 400"
        role="img"
        aria-label="Abstract particle sphere"
        width="70%"
        style={{ maxWidth: 520, fontFamily: MONO }}
      >
        <defs>
          <radialGradient id="hero-fb-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4d7cff" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#4d7cff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="175" fill="url(#hero-fb-glow)" />
        <circle cx="200" cy="200" r="152" fill="none" stroke="rgba(245,245,245,0.12)" strokeWidth="1" />
        <ellipse
          cx="200"
          cy="200"
          rx="152"
          ry="52"
          fill="none"
          stroke="rgba(77,124,255,0.35)"
          strokeWidth="1"
          transform="rotate(-24 200 200)"
        />
        <g>
          {dots.map((dot, i) => (
            <circle
              key={i}
              cx={dot.x}
              cy={dot.y}
              r={dot.r}
              fill={i % 7 === 0 ? '#4d7cff' : '#f5f5f5'}
              opacity={dot.o}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
