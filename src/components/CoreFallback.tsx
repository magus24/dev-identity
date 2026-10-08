/**
 * Elegant animated neural field for environments without WebGL.
 * A small organic net of nodes + filaments with signals streaming
 * inward to the core — so the page never shows a blank space.
 */
export function CoreFallback() {
  return (
    <svg
      className="core-fallback-svg"
      viewBox="-120 -120 240 240"
      aria-hidden="true"
      focusable="false"
    >
      {/* system boundary */}
      <g className="core-fb-boundary">
        <circle
          cx="0"
          cy="0"
          r="104"
          fill="none"
          stroke="rgba(245,245,245,0.3)"
          strokeWidth="0.8"
          strokeDasharray="2 10"
        />
        <circle
          cx="0"
          cy="0"
          r="96"
          fill="none"
          stroke="rgba(77,124,255,0.28)"
          strokeWidth="0.7"
        />
      </g>

      {/* organic filaments — threads converging on the core */}
      <g className="core-fb-filaments" fill="none" strokeLinecap="round">
        <path d="M-74,-26 L-48,10 L-30,-14 L0,0" />
        <path d="M54,-62 L42,-30 L24,-8 L0,0" />
        <path d="M80,12 L30,18 L0,0" />
        <path d="M28,82 L4,24 L0,0" />
        <path d="M-38,64 L-14,16 L0,0" />
        <path d="M-84,40 L-30,-14 L0,0" />
        <path d="M-20,-92 L-8,-30 L0,0" />
        <path d="M60,46 L42,-30 L24,-8 L0,0" />
        <path d="M-58,-84 L-8,-30 L0,0" />
        <path d="M8,-64 L-8,-30 L24,-8 L0,0" />
        <path d="M-74,-26 L-84,40" />
        <path d="M54,-62 L60,46" />
        <path d="M80,12 L60,46" />
        <path d="M28,82 L-38,64" />
        <path d="M-20,-92 L-58,-84" />
        <path d="M-48,10 L-14,16" />
        <path d="M42,-30 L30,18" />
      </g>

      {/* ripple rings radiating from the core */}
      <circle className="core-fb-ripple" cx="0" cy="0" r="5" fill="none" stroke="rgba(77,124,255,0.35)">
        <animate attributeName="r" values="5;42" dur="4.6s" begin="1.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.55;0" dur="4.6s" begin="1.4s" repeatCount="indefinite" />
      </circle>
      <circle className="core-fb-ripple" cx="0" cy="0" r="5" fill="none" stroke="rgba(77,124,255,0.22)">
        <animate attributeName="r" values="5;42" dur="4.6s" begin="3.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.45;0" dur="4.6s" begin="3.6s" repeatCount="indefinite" />
      </circle>

      {/* core */}
      <g className="core-fb-crystal">
        <polygon
          points="0,-46 38,-16 24,40 -24,40 -38,-16"
          fill="none"
          stroke="#4d7cff"
          strokeWidth="1.2"
          opacity="0.9"
        />
        <polygon
          points="0,-24 21,-8 14,22 -14,22 -21,-8"
          fill="#4d7cff"
          opacity="0.2"
          stroke="#4d7cff"
          strokeWidth="0.8"
        />
        <circle cx="0" cy="-3" r="3.2" fill="#4d7cff" opacity="0.95" />
      </g>

      {/* neural nodes: faint points, a few blue */}
      <g className="core-fb-nodes">
        <circle cx="-74" cy="-26" r="2.1" />
        <circle cx="54" cy="-62" r="1.8" />
        <circle cx="80" cy="12" r="2.3" />
        <circle cx="28" cy="82" r="1.9" />
        <circle cx="-38" cy="64" r="2" />
        <circle cx="-84" cy="40" r="1.7" />
        <circle cx="-20" cy="-92" r="2.2" />
        <circle cx="60" cy="46" r="1.8" />
        <circle cx="-58" cy="-84" r="2" />
        <circle cx="8" cy="-64" r="1.6" />
        <circle cx="-48" cy="10" r="1.7" fill="#4d7cff" />
        <circle cx="42" cy="-30" r="1.7" fill="#4d7cff" />
        <circle cx="30" cy="18" r="1.8" />
        <circle cx="-14" cy="16" r="1.6" fill="#4d7cff" />
        <circle cx="-30" cy="-14" r="1.8" />
        <circle cx="24" cy="-8" r="1.7" />
        <circle cx="4" cy="24" r="1.6" />
        <circle cx="-8" cy="-30" r="1.6" />
      </g>

      {/* travelling signals — the "information" flowing to the core */}
      <g className="core-fb-signals" fill="#7ba4ff">
        <circle r="2" opacity="0.9">
          <animateMotion
            dur="5.2s"
            begin="0.4s"
            repeatCount="indefinite"
            path="M-74,-26 L-48,10 L-30,-14 L0,0"
          />
        </circle>
        <circle r="1.8">
          <animateMotion dur="6.4s" begin="1.6s" repeatCount="indefinite" path="M54,-62 L42,-30 L24,-8 L0,0" />
        </circle>
        <circle r="1.9" opacity="0.8">
          <animateMotion dur="7.6s" begin="2.8s" repeatCount="indefinite" path="M80,12 L30,18 L0,0" />
        </circle>
        <circle r="1.7">
          <animateMotion dur="5.8s" begin="0.9s" repeatCount="indefinite" path="M-38,64 L-14,16 L0,0" />
        </circle>
        <circle r="1.8" opacity="0.85">
          <animateMotion dur="6.9s" begin="3.7s" repeatCount="indefinite" path="M-20,-92 L-8,-30 L0,0" />
        </circle>
      </g>
    </svg>
  )
}