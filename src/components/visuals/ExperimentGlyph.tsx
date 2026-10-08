import type { ExperimentPattern } from '../../data/experiments'

/* Deterministic generative glyphs for the experiments field. */

export function ExperimentGlyph({ pattern }: { pattern: ExperimentPattern }) {
  switch (pattern) {
    case 'vision':
      return (
        <svg className="glyph" viewBox="0 0 200 200" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) =>
            Array.from({ length: 6 }).map((__, j) => (
              <circle
                key={`${i}-${j}`}
                cx={46 + i * 22}
                cy={46 + j * 22}
                r={(i + j) % 3 === 0 ? 3 : 1.6}
                fill="none"
                stroke={(i + j) % 5 === 0 ? 'var(--accent)' : 'currentColor'}
                className={(i + j) % 5 === 0 ? 'acc' : 'ghost'}
              />
            )),
          )}
          <line x1="100" y1="6" x2="100" y2="46" stroke="var(--accent)" className="acc" />
          <line x1="100" y1="154" x2="100" y2="194" stroke="var(--accent)" className="acc" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" className="ghost" strokeDasharray="4 6" />
        </svg>
      )
    case 'security':
      return (
        <svg className="glyph" viewBox="0 0 200 200" aria-hidden="true">
          <path d="M100 22 L160 54 V104 C160 142 132 168 100 182 C68 168 40 142 40 104 V54 Z" fill="none" stroke="currentColor" className="ghost" strokeWidth="1.2" />
          <path d="M100 40 L146 62 V102 C146 130 126 152 100 164 C74 152 54 130 54 102 V62 Z" fill="none" stroke="var(--accent)" className="acc" />
          <circle cx="100" cy="96" r="22" fill="none" stroke="var(--accent)" className="acc" />
          <circle cx="100" cy="96" r="8" fill="var(--accent)" className="acc" />
        </svg>
      )
    case 'agents':
      return (
        <svg className="glyph" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="14" fill="var(--accent)" className="acc" />
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const rad = (deg * Math.PI) / 180
            const x = 100 + Math.cos(rad) * 62
            const y = 100 + Math.sin(rad) * 62
            return (
              <g key={deg}>
                <line x1={100 + Math.cos(rad) * 16} y1={100 + Math.sin(rad) * 16} x2={x} y2={y} stroke="var(--accent)" className="acc" opacity="0.7" />
                <rect x={x - 15} y={y - 9} width="30" height="18" rx="2" fill="none" stroke="currentColor" className="ghost" />
              </g>
            )
          })}
        </svg>
      )
    case 'interfaces':
      return (
        <svg className="glyph" viewBox="0 0 200 200" aria-hidden="true">
          <g stroke="currentColor" className="ghost" fill="none" opacity="0.7">
            <polygon points="100,26 156,64 156,136 100,174 44,136 44,64" />
            <polygon points="100,74 128,92 128,128 100,146 72,128 72,92" />
          </g>
          <polygon points="100,42 142,70 142,128 100,156 58,128 58,70" stroke="var(--accent)" className="acc" fill="none" />
          <line x1="100" y1="42" x2="100" y2="92" stroke="var(--accent)" className="acc" opacity="0.6" />
          <circle cx="100" cy="92" r="3" fill="var(--accent)" className="acc" />
        </svg>
      )
    case 'reverse':
      return (
        <svg className="glyph" viewBox="0 0 200 200" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i}>
              <line x1="30" y1={34 + i * 18} x2="170" y2={34 + i * 18} stroke={`rgba(245,245,245,${0.5 - i * 0.05})`} className="ghost" />
              <text x="34" y={40 + i * 18} fontSize="9" fill="var(--accent)" fontFamily="ui-monospace, monospace">
                0x{(0x20 + i * 3).toString(16).padStart(2, '0').toUpperCase()}
              </text>
              <rect x={102 + ((i * 29) % 30)} y={32 + i * 18} width={12 + (i % 4) * 4} height="4" fill="var(--accent)" opacity="0.7" />
            </g>
          ))}
        </svg>
      )
    case 'hardware':
      return (
        <svg className="glyph" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="72" fill="none" stroke="currentColor" className="ghost" opacity="0.5" />
          {Array.from({ length: 16 }).map((_, i) => {
            const rad = (i * 22.5 * Math.PI) / 180
            const x1 = 100 + Math.cos(rad) * 72
            const y1 = 100 + Math.sin(rad) * 72
            const x2 = 100 + Math.cos(rad) * 56
            const y2 = 100 + Math.sin(rad) * 56
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i % 3 === 0 ? 'var(--accent)' : 'currentColor'} className={i % 3 === 0 ? 'acc' : 'ghost'} />
          })}
          <rect x="82" y="82" width="36" height="36" fill="none" stroke="var(--accent)" className="acc" />
          <circle cx="100" cy="100" r="8" fill="var(--accent)" className="acc" />
        </svg>
      )
  }
}