import { useMemo } from 'react'

const SPARK_POINTS = Array.from({ length: 42 }, (_, i) => {
  const x = (i / 41) * 100
  const wave = Math.sin(i * 0.62) * 5 + Math.sin(i * 0.21) * 7 + Math.sin(i * 1.7) * 2
  const y = 34 - (wave + 14)
  return `${x.toFixed(2)},${Math.max(2, Math.min(34, y)).toFixed(2)}`
}).join(' ')

const FEED = [
  { kind: 'warn', type: 'SQL INJECTION ATTEMPT', ip: '203.0.113.44', action: 'BLOCKED' },
  { kind: 'alert', type: 'XSS PAYLOAD /admin', ip: '198.51.100.7', action: 'BLOCKED' },
  { kind: 'ok', type: 'RATE LIMIT EXCEEDED', ip: '192.0.2.180', action: 'THROTTLED' },
  { kind: '', type: 'ANOMALOUS LOGIN PATTERN', ip: '198.51.100.22', action: 'WATCH' },
  { kind: 'ok', type: 'SCANNER FINGERPRINT', ip: '203.0.113.9', action: 'BLOCKED' },
]

export function ShieldxMock() {
  const rows = useMemo(() => FEED, [])

  return (
    <div className="mock mock-sx">
      <div className="mock-bar">
        <span>
          <b>SHIELDX</b> — THREAT CONSOLE
        </span>
        <span className="mock-live">
          <i aria-hidden="true" /> SECURE
        </span>
      </div>

      <div className="mock-sx__top">
        <div className="sx-card">
          <span className="sx-card__k">Live traffic</span>
          <svg className="sx-spark" viewBox="0 0 100 36" preserveAspectRatio="none" aria-hidden="true">
            <polyline className="base" points="0,35 100,35" fill="none" />
            <polyline points={SPARK_POINTS} />
          </svg>
        </div>
        <div className="sx-card">
          <span className="sx-card__k">Threats blocked</span>
          <span className="sx-card__v">1 284</span>
          <span className="mock-label">+37 LAST HOUR</span>
        </div>
        <div className="sx-card">
          <span className="sx-card__k">System status</span>
          <span className="sx-card__v ok">SECURE</span>
          <span className="mock-label">WAF · SIEM · ACTIVE</span>
        </div>
      </div>

      <div className="mock-sx__feed">
        <div className="sx-feed__head">
          <span>
            LIVE FEED — <b>DETECT · BLOCK · ALERT</b>
          </span>
          <span>WS 24ms</span>
        </div>
        {rows.map((row) => (
          <div className="sx-row" key={row.type}>
            <span className={`sx-dot ${row.kind}`} aria-hidden="true" />
            <b>{row.type}</b>
            <span>
              {row.ip} — <b>{row.action}</b>
            </span>
          </div>
        ))}
      </div>

      <div className="mock-sx__foot">
        <span>
          INSPECTION <b>&lt;40ms</b>
        </span>
        <span>
          RULES <b>412</b>
        </span>
        <span>
          ANOMALY SCORE <b>0.12</b>
        </span>
        <span>
          NODES <b>03 / 03</b>
        </span>
      </div>
    </div>
  )
}
