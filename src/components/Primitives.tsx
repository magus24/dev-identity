import { motion, useReducedMotion, useSpring, type MotionValue } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { cx } from '../lib/utils'

/* ---------- text line reveal ---------- */

interface LineRevealProps {
  text: string
  delay?: number
  className?: string
}

export function LineReveal({ text, delay = 0, className }: LineRevealProps) {
  const reduce = useReducedMotion()
  /* The mask (parent) is observed, not the translated child:
     IO clips the child by the mask's overflow, so the child alone
     would never report as intersecting. */
  return (
    <motion.span
      className={cx('line-mask', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8% 0px' }}
      variants={{ hidden: {}, visible: {} }}
    >
      <motion.span
        variants={{
          hidden: reduce ? { opacity: 0 } : { y: '112%' },
          visible: reduce ? { opacity: 1 } : { y: '0%' },
        }}
        transition={{ duration: reduce ? 0.4 : 0.95, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {text}
      </motion.span>
    </motion.span>
  )
}

/* ---------- block reveal ---------- */

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

export function Reveal({ children, delay = 0, y = 26, className }: RevealProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: reduce ? 0.35 : 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- section label ---------- */

export function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="section-label">
      <span>{index}</span> / <b>{title}</b>
    </div>
  )
}

/* ---------- magnetic wrapper ---------- */

interface MagneticProps {
  children: ReactNode
  strength?: number
  className?: string
}

export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()

  const x = useSpring(0, { stiffness: 170, damping: 16, mass: 0.12 })
  const y = useSpring(0, { stiffness: 170, damping: 16, mass: 0.12 })

  const handleMove = (event: React.PointerEvent) => {
    if (reduce || event.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      className={cx('magnetic', className)}
      style={{ x: x as MotionValue<number>, y: y as MotionValue<number> }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  )
}
