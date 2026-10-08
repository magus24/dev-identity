import { useEffect, useRef } from 'react'
import { cx } from '../lib/utils'

const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'

export function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const root = rootRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    if (!root || !dot || !ring) return

    document.documentElement.classList.add('has-cursor')

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let dotX = targetX
    let dotY = targetY
    let ringX = targetX
    let ringY = targetY
    let raf = 0

    const tick = () => {
      dotX += (targetX - dotX) * 0.45
      dotY += (targetY - dotY) * 0.45
      ringX += (targetX - ringX) * 0.17
      ringY += (targetY - ringY) * 0.17
      dot.style.transform = `translate3d(${dotX.toFixed(2)}px, ${dotY.toFixed(2)}px, 0)`
      ring.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      root.classList.add('is-active')
    }

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.closest?.(HOVER_SELECTOR)) root.classList.add('is-hover')
    }

    const onOut = (event: MouseEvent) => {
      const to = event.relatedTarget as HTMLElement | null
      if (!to || !to.closest?.(HOVER_SELECTOR)) root.classList.remove('is-hover')
    }

    const onDown = () => root.classList.add('is-down')
    const onUp = () => root.classList.remove('is-down')

    const onLeaveDoc = (event: MouseEvent) => {
      if (!event.relatedTarget) root.classList.remove('is-active')
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('mouseleave', onLeaveDoc)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('mouseleave', onLeaveDoc)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  return (
    <div ref={rootRef} className={cx('cursor')} aria-hidden="true">
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  )
}
