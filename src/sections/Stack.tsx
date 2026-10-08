import { useState, type CSSProperties } from 'react'
import { LineReveal, SectionLabel } from '../components/Primitives'
import { STACK, type StackItem } from '../data/stack'
import { cx } from '../lib/utils'

const RING_1 = STACK.filter((item) => item.ring === 1)
const RING_2 = STACK.filter((item) => item.ring === 2)

interface RingProps {
  items: StackItem[]
  ring: 1 | 2
  offset: number
  paused: boolean
  onEnter: (item: StackItem) => void
  onLeave: () => void
}

function OrbitRing({ items, ring, offset, paused, onEnter, onLeave }: RingProps) {
  return (
    <div className={cx('orbit-ring', `orbit-ring--${ring}`, paused && 'is-paused')}>
      {items.map((item, i) => {
        const angle = (360 / items.length) * i + offset
        return (
          <div
            className="orbit-node"
            key={item.name}
            style={{ '--a': `${angle}deg` } as CSSProperties}
          >
            <button
              type="button"
              className="orbit-node__label"
              onPointerEnter={() => onEnter(item)}
              onPointerLeave={onLeave}
              onFocus={() => onEnter(item)}
              onBlur={onLeave}
            >
              <span className="orbit-node__spin">{item.name}</span>
            </button>
          </div>
        )
      })}
    </div>
  )
}

export function Stack() {
  const [hovered, setHovered] = useState<StackItem | null>(null)
  const [pausedRing, setPausedRing] = useState<0 | 1 | 2>(0)

  const enter = (item: StackItem) => {
    setHovered(item)
    setPausedRing(item.ring)
  }

  const leave = () => {
    setHovered(null)
    setPausedRing(0)
  }

  return (
    <section id="stack" className="section stack" aria-labelledby="stack-title">
      <SectionLabel index="04" title="Stack" />

      <h2 id="stack-title" className="h-display" style={{ marginBottom: 'clamp(8px, 2vh, 24px)' }}>
        <LineReveal text="WHAT I WORK WITH" />
      </h2>

      <div className="stack-stage">
        <div
          className="orbit"
          style={{ '--dur-1': '84s', '--dur-2': '132s' } as CSSProperties}
        >
          <OrbitRing
            items={RING_1}
            ring={1}
            offset={0}
            paused={pausedRing === 1}
            onEnter={enter}
            onLeave={leave}
          />
          <OrbitRing
            items={RING_2}
            ring={2}
            offset={22}
            paused={pausedRing === 2}
            onEnter={enter}
            onLeave={leave}
          />

          <div className="orbit-core">
            <span className="orbit-core__name">David</span>
            <span className="orbit-core__info">
              {hovered ? hovered.description : 'HOVER A TECHNOLOGY'}
            </span>
          </div>

          <span className="orbit-hint">{hovered ? hovered.name : '11 TECHNOLOGIES'}</span>
        </div>

        <ul className="stack-chips">
          {STACK.map((item) => (
            <li className="stack-chip" key={item.name}>
              <b>{item.name}</b>
              <span>{item.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
