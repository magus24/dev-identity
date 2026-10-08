/* Deterministic isometric floor plan — Yotoqhonam visual language. */

function iso(cx: number, cy: number, w: number, h: number) {
  const mid = cy
  const top = cy - h / 2
  const bottom = cy + h / 2
  return `${cx - w / 2},${mid} ${cx},${top} ${cx + w / 2},${mid} ${cx},${bottom}`
}

export function YotoqhonamMock() {
  const tiles: React.ReactNode[] = []
  let key = 0
  const w = 58
  const h = 54

  for (let floor = 0; floor < 3; floor++) {
    for (let room = 0; room < 8; room++) {
      const cx = 92 + room * w * 0.86
      const cy = 66 + floor * (h - 6)
      const occupied = ((floor * 8 + room) * 7) % 10 < 6
      const double = ((floor * 8 + room) * 13) % 9 === 0
      const points = iso(cx, cy, w, h)

      tiles.push(
        <g key={key++}>
          <polygon
            points={points}
            fill={occupied ? 'rgba(77,124,255,0.16)' : '#141418'}
            stroke={occupied ? 'rgba(125,156,255,0.6)' : 'rgba(245,245,245,0.2)'}
            strokeWidth="1"
          />
          {double && <circle cx={cx - w * 0.18} cy={cy} r="2" fill="rgba(245,245,245,0.4)" />}
          <rect x={cx + w * 0.3} y={cy - h * 0.35} width="7" height="12" fill="rgba(245,245,245,0.14)" />
        </g>,
      )
    }
  }

  return (
    <div className="mock" aria-hidden="true">
      <div className="mock-title">
        <span className="l">Dormitory — Floor plan</span>
        <span className="r">Block A / floors 1–3</span>
      </div>
      <div className="mock-body">
        <svg viewBox="0 0 560 300" role="img" aria-label="Isometric floor plan occupancy">
          <line x1="24" y1="286" x2="536" y2="286" stroke="rgba(245,245,245,0.14)" strokeWidth="1" />
          {tiles}
          <text x="30" y="40" fill="rgba(245,245,245,0.5)" fontSize="10" fontFamily="ui-monospace, monospace" letterSpacing="2">
            FL 03 · 8 ROOMS
          </text>
          <text x="30" y="98" fill="rgba(245,245,245,0.34)" fontSize="10" fontFamily="ui-monospace, monospace" letterSpacing="2">
            FL 02 · 8 ROOMS
          </text>
          <text x="30" y="156" fill="rgba(245,245,245,0.22)" fontSize="10" fontFamily="ui-monospace, monospace" letterSpacing="2">
            FL 01 · 8 ROOMS
          </text>
        </svg>
        <div className="flr-palette">
          <span className="occ">Occupied 62%</span>
          <span className="free">Free</span>
          <span className="off">Double room</span>
        </div>
      </div>
    </div>
  )
}