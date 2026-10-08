import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { PROFILE } from '../data/profile'

export function IdentityCard() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const rotateY = useMotionValue(0)
  const rotateX = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 160, damping: 18, mass: 0.4 })
  const springY = useSpring(rotateY, { stiffness: 160, damping: 18, mass: 0.4 })

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height

    el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`)
    el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`)

    if (reduce || event.pointerType !== 'mouse') return
    rotateY.set((px - 0.5) * 17)
    rotateX.set((0.5 - py) * 13)
  }

  const onLeave = () => {
    const el = ref.current
    if (el) {
      el.style.setProperty('--mx', '50%')
      el.style.setProperty('--my', '50%')
    }
    rotateY.set(0)
    rotateX.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className="id-card"
      style={{ rotateX: springX, rotateY: springY }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="id-card__row">
        <span className="mono">Identity card</span>
        <span className="id-card__chip">{PROFILE.year}</span>
      </div>

      <div>
        <div className="id-card__name">{PROFILE.name}</div>
        <div className="id-card__roles">
          <span>Developer</span>
          <span>Researcher</span>
          <span>Builder</span>
        </div>
      </div>

      <div className="id-card__row">
        <span className="mono">
          {PROFILE.location.slice(0, 2).toUpperCase()} · {PROFILE.mark}
        </span>
        <span className="id-card__barcode" aria-hidden="true" />
      </div>
    </motion.div>
  )
}
