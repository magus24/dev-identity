export function CoreFallback() {
  return (
    <svg
      className="core-fallback-svg"
      viewBox="-120 -120 240 240"
      aria-hidden="true"
      focusable="false"
    >
      <g className="core-fb-rings">
        <ellipse cx="0" cy="0" rx="88" ry="88" fill="none" stroke="rgba(245,245,245,0.35)" strokeWidth="1" />
        <ellipse cx="0" cy="0" rx="88" ry="38" fill="none" stroke="rgba(245,245,245,0.22)" strokeWidth="1" transform="rotate(58)" />
        <ellipse cx="0" cy="0" rx="88" ry="24" fill="none" stroke="rgba(245,245,245,0.18)" strokeWidth="1" transform="rotate(-58)" />
      </g>
      <g className="core-fb-crystal">
        <polygon
          points="0,-58 48,-20 32,50 -32,50 -48,-20"
          fill="none"
          stroke="#4d7cff"
          strokeWidth="1.4"
          opacity="0.9"
        />
        <polygon
          points="0,-30 26,-6 17,32 -17,32 -26,-6"
          fill="#4d7cff"
          opacity="0.22"
          stroke="#4d7cff"
          strokeWidth="1"
        />
        <circle cx="0" cy="-4" r="4" fill="#4d7cff" />
      </g>
      <g className="core-fb-dots" fill="#f5f5f5" opacity="0.6">
        <circle cx="74" cy="-74" r="2" />
        <circle cx="90" cy="-30" r="1.6" />
        <circle cx="96" cy="34" r="2.2" />
        <circle cx="56" cy="88" r="1.6" />
        <circle cx="-80" cy="66" r="2" />
        <circle cx="-94" cy="-8" r="1.6" />
        <circle cx="-48" cy="-92" r="2.2" />
        <circle cx="28" cy="-100" r="1.6" fill="#4d7cff" />
        <circle cx="-64" cy="98" r="1.6" fill="#4d7cff" />
      </g>
    </svg>
  )
}