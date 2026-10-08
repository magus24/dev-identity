/* Threat stream — SHIELDX visual language. */

const STREAMS = [
  { blocked: true, delay: 0 },
  { blocked: true, delay: 0.4 },
  { blocked: false, delay: 0.7 },
  { blocked: true, delay: 1.1 },
  { blocked: false, delay: 1.4 },
  { blocked: true, delay: 1.8 },
  { blocked: true, delay: 2.2 },
  { blocked: false, delay: 2.6 },
  { blocked: true, delay: 3 },
]

export function ShieldxMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock-title">
        <span className="l">Live threat stream</span>
        <span className="r">STATE: PROTECTED</span>
      </div>
      <div className="mock-body">
        <div className="shd-stage">
          <div className="shd-axis" />
          {STREAMS.map((s, i) => (
            <span
              key={i}
              className={s.blocked ? 'shd-stream is-blocked' : 'shd-stream is-clear'}
              style={{
                left: '10%',
                '--trail': s.blocked ? '44%' : '82%',
                animationDuration: `${2.6 + (i % 3) * 0.7}s`,
                animationDelay: `${s.delay}s`,
                marginTop: `${(i % 5) * 7 - 14}px`,
              } as React.CSSProperties}
            />
          ))}
          <div className="shd-success" style={{ display: 'none' }} />
          <div className="shd-gate">
            <span>WAF / SIEM</span>
            <span className="core-label" style={{ fontSize: 8 }}>inspecting</span>
          </div>
          <span className="shd-alert" style={{ right: '16%', top: '18%' }}>
            SQLi blocked
          </span>
          <span className="shd-alert" style={{ right: '22%', bottom: '16%', animationDelay: '0.8s' }}>
            XSS blocked
          </span>
          <span className="shd-alert" style={{ right: '4%', top: '42%', animationDelay: '1.6s' }}>
            Brute-force
          </span>
        </div>
        <div className="shd-counts">
          <span>
            <b>1.2K</b> threats blocked
          </span>
          <span>
            <b>&lt;40ms</b> latency
          </span>
          <span>
            <b>24/7</b> uptime
          </span>
        </div>
      </div>
    </div>
  )
}