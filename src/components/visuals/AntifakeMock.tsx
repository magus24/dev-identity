import { useId, useMemo } from 'react'

function useNoiseCells(count: number, seedOffset = 0) {
  return useMemo(() => {
    let seed = 90210 + seedOffset
    const random = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296
      return seed / 4294967296
    }
    return Array.from({ length: count }, () => ({
      x: Math.floor(random() * 10) * 10,
      y: Math.floor(random() * 10) * 10,
      opacity: 0.25 + random() * 0.6,
    }))
  }, [count, seedOffset])
}

function ImageThumb({ noisy }: { noisy?: boolean }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')
  const cells = useNoiseCells(noisy ? 26 : 0, noisy ? 7 : 0)

  return (
    <div className="af-node__thumb">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor="#1c2334" />
            <stop offset="100%" stopColor="#0a0b11" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#sky-${id})`} />
        <circle cx="68" cy="28" r="13" fill="#4d7cff" opacity="0.5" />
        <path
          d="M0 74 L26 50 L48 68 L70 44 L100 70 L100 100 L0 100 Z"
          fill="#0a0a0f"
          stroke="rgba(245,245,245,0.22)"
          strokeWidth="1"
        />
        {noisy &&
          cells.map((cell, i) => (
            <rect
              key={i}
              x={cell.x}
              y={cell.y}
              width="10"
              height="10"
              fill={i % 3 === 0 ? '#4d7cff' : '#f5f5f5'}
              opacity={cell.opacity * 0.55}
            />
          ))}
      </svg>
    </div>
  )
}

function EngineThumb() {
  return (
    <div className="af-node__thumb" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect width="100" height="100" fill="#0b0d15" />
        <g stroke="rgba(77,124,255,0.55)" strokeWidth="1.4" fill="none">
          <path d="M18 30 H44 M18 30 V50 M18 50 H40" />
          <path d="M82 70 H56 M82 70 V50 M82 50 H60" />
          <rect x="40" y="38" width="20" height="24" />
        </g>
        <g fill="#4d7cff">
          <circle cx="18" cy="30" r="3" />
          <circle cx="82" cy="70" r="3" />
          <circle cx="50" cy="50" r="4" />
        </g>
        <text
          x="50"
          y="94"
          textAnchor="middle"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          fill="rgba(245,245,245,0.5)"
        >
          Δε = 0.03
        </text>
      </svg>
    </div>
  )
}

function ModelThumb() {
  return (
    <div className="af-node__thumb" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect width="100" height="100" fill="#0b0d15" />
        <g stroke="rgba(245,245,245,0.22)" strokeWidth="1.2" fill="none">
          <circle cx="50" cy="44" r="18" />
          <circle cx="28" cy="72" r="12" />
          <circle cx="72" cy="72" r="12" />
          <path d="M38 56 L34 63 M62 56 L66 63 M40 72 H60" />
        </g>
        <g fill="#4d7cff">
          <circle cx="50" cy="44" r="5" />
          <circle cx="28" cy="72" r="4" />
          <circle cx="72" cy="72" r="4" />
        </g>
        <text
          x="50"
          y="96"
          textAnchor="middle"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          fill="rgba(245,245,245,0.5)"
        >
          CNN
        </text>
      </svg>
    </div>
  )
}

export function AntifakeMock() {
  return (
    <div className="mock mock-af">
      <div className="mock-bar">
        <span>
          <b>ANTIFAKE</b> — PROTECTION PIPELINE
        </span>
        <span className="mock-live">
          <i aria-hidden="true" /> RUNNING
        </span>
      </div>

      <div className="mock-af__flow">
        <div className="af-node">
          <ImageThumb />
          <span className="af-node__label">
            Original
            <br />
            Image
          </span>
        </div>

        <span className="af-arrow" aria-hidden="true" />

        <div className="af-node is-key">
          <EngineThumb />
          <span className="af-node__label">
            Protection
            <br />
            Engine
          </span>
        </div>

        <span className="af-arrow" aria-hidden="true" />

        <div className="af-node">
          <ImageThumb noisy />
          <span className="af-node__label">
            Protected
            <br />
            Image
          </span>
        </div>

        <span className="af-arrow" aria-hidden="true" />

        <div className="af-node">
          <ModelThumb />
          <span className="af-node__label">
            AI
            <br />
            Model
          </span>
        </div>

        <span className="af-arrow" aria-hidden="true" />

        <div className="af-node is-key">
          <div className="af-node__thumb" aria-hidden="true">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect width="100" height="100" fill="#0b0d15" />
              <path
                d="M50 22 L74 32 V52 C74 68 63 78 50 84 C37 78 26 68 26 52 V32 Z"
                fill="none"
                stroke="rgba(77,124,255,0.8)"
                strokeWidth="3"
              />
              <path
                d="M39 52 L47 60 L63 44"
                fill="none"
                stroke="#7ddba8"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="af-node__label">
            Robustness
            <br />
            Test
          </span>
        </div>
      </div>

      <div className="mock-af__foot">
        <span>
          PERTURBATION <b>INVISIBLE</b>
        </span>
        <span>
          FOG SUCCESS <b>94%</b>
        </span>
        <span className="af-badge">CLASSIFICATION BROKEN</span>
      </div>
    </div>
  )
}
