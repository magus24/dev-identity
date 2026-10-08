/* Deterministic pixel pipeline — AntiFake visual language. */

function pixels(seed: number, count: number, offset = 0) {
  const dots: React.ReactNode[] = []
  for (let i = 0; i < count; i++) {
    const x = (i % 32) * 9 + 4
    const y = Math.floor(i / 32) * 9 + 4
    const v = ((i * 2654435761 + seed * 40503) >>> 0) % 100
    const bright = 18 + v * 0.9
    const tinted = v > 88
    dots.push(
      <rect
        key={`${seed}-${i}-${offset}}`}
        x={x}
        y={y}
        width={8}
        height={8}
        fill={tinted ? 'rgba(125,156,255,0.55)' : `rgba(${Math.round(bright)},${Math.round(bright)},${Math.round(bright + 8)},0.9)`}
      />,
    )
  }
  return dots
}

const SUBJECT = (
  <ellipse cx="140" cy="90" rx="52" ry="40" fill="none" stroke="rgba(245,245,245,0.55)" strokeWidth="1" strokeDasharray="3 4" />
)

export function AntifakeMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock-title">
        <span className="l">Adversarial pipeline</span>
        <span className="r">Δε = 0.03</span>
      </div>
      <div className="mock-body">
        <svg viewBox="0 0 300 180" role="img" aria-label="Image before and after perturbation">
          <g>
            <rect x="6" y="6" width="140" height="140" fill="#0d0d0f" stroke="rgba(245,245,245,0.2)" />
            {pixels(11, 128)}
          </g>
          <g>
            <rect x="154" y="6" width="140" height="140" fill="#0d0d0f" stroke="rgba(245,245,245,0.2)" />
            {pixels(11, 128, 3)}
          </g>
          {SUBJECT}
          <text x="24" y="22" fill="rgba(245,245,245,0.5)" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="2">
            INPUT
          </text>
          <text x="172" y="22" fill="rgba(245,245,245,0.5)" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="2">
            +Δε
          </text>
          <path d="M 148 76 L 152 76" stroke="#4d7cff" strokeWidth="2" />
          <path d="M 150 76 q 8 -10 18 4" stroke="rgba(245,245,245,0.4)" strokeWidth="1" fill="none" />
        </svg>

        <div className="pfx-chart">
          <div className="pfx-bar pfx-bar--before">
            <span className="cap">before</span>
            <div className="fill" style={{ height: '86%' }} />
            <span className="cap">94%</span>
          </div>
          <div className="pfx-bar pfx-bar--after">
            <span className="cap">after</span>
            <div className="fill" style={{ height: '6%' }} />
            <span className="cap">6%</span>
          </div>
        </div>
        <div className="pfx-conf">
          <span>Model confidence</span>
          <b>Invisible to eye / fatal to classifier</b>
        </div>
      </div>
    </div>
  )
}