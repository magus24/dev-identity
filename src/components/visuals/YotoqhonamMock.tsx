const ROOM_STATES = Array.from({ length: 60 }, (_, i) => {
  const value = Math.sin((i + 1) * 12.9898) * 43758.5453
  const frac = value - Math.floor(value)
  if (frac > 0.58) return 'is-full'
  if (frac > 0.34) return 'is-half'
  return ''
})

const CHECKINS = [
  ['12.04', 'Sardor Abdullaev', '304 · BED 2', 'IN'],
  ['12.04', 'Nodira Ismoilova', '211 · BED 1', 'IN'],
  ['11.04', 'Jasur Karimov', '108 · BED 4', 'MOVE'],
]

export function YotoqhonamMock() {
  return (
    <div className="mock mock-yoto">
      <div className="mock-bar">
        <span>
          <b>YOTOQHONAM</b> — ADMIN
        </span>
        <span className="mock-live">
          <i aria-hidden="true" /> SYNC OK
        </span>
      </div>

      <div className="mock-yoto__body">
        <div className="mock-rail" aria-hidden="true">
          {['1', '2', '3', '4', '5'].map((n, i) => (
            <span key={n} className={i === 1 ? 'is-on' : undefined}>
              {n}
            </span>
          ))}
        </div>

        <div className="mock-yoto__main">
          <div className="mock-stats">
            <div className="mock-stat">
              <span className="mock-label">Students</span>
              <span className="mock-value">428</span>
            </div>
            <div className="mock-stat">
              <span className="mock-label">Rooms</span>
              <span className="mock-value">96</span>
            </div>
            <div className="mock-stat">
              <span className="mock-label">Free beds</span>
              <span className="mock-value">
                <em>37</em>
              </span>
            </div>
          </div>

          <div className="mock-floor">
            <div className="mock-floor__head">
              <span>
                FLOOR <b>03</b> — ROOM MAP
              </span>
              <span>CAPACITY 96%</span>
            </div>
            <div className="mock-rooms" aria-hidden="true">
              {ROOM_STATES.map((state, i) => (
                <span key={i} className={`mock-room ${state}`} />
              ))}
            </div>
            <div className="mock-legend">
              <span>
                <i aria-hidden="true" />
                Occupied
              </span>
              <span>
                <i aria-hidden="true" />
                Partial
              </span>
              <span>
                <i aria-hidden="true" />
                Free
              </span>
            </div>
          </div>

          <div className="mock-table">
            {CHECKINS.map(([date, name, room, status]) => (
              <div className="mock-row" key={name}>
                <span>{date}</span>
                <b>{name}</b>
                <span>{room}</span>
                <i>{status}</i>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
