import { useEffect, useRef } from 'react'

/**
 * Context-aware cursor. Rings are driven with a manual lerp loop so
 * the whole system stays out of React's render path.
 * Elements opt in with [data-cursor="VIEW|OPEN|DRAG|GO"] to show a label.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine) return

    const root = rootRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    if (!root || !dot || !ring) return

    document.documentElement.classList.add('has-cursor')

    const pos = { x: -100, y: -100 }
    const ringPos = { x: -100, y: -100 }
    let visible = false
    let hovering = false
    let down = false
    let raf = 0

    const apply = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.22
      ringPos.y += (pos.y - ringPos.y) * 0.22
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`
      raf = requestAnimationFrame(apply)
    }

    const onMove = (event: PointerEvent) => {
      pos.x = event.clientX
      pos.y = event.clientY
      if (!visible) {
        visible = true
        root.classList.add('is-active')
        ringPos.x = pos.x
        ringPos.y = pos.y
      }

      const target = event.target as HTMLElement | null
      const labelled = target?.closest<HTMLElement>('[data-cursor]')
      const interactive = target?.closest<HTMLElement>(
        'a, button, [role="button"], input, summary',
      )

      if (labelled) {
        root.classList.add('is-label')
        root.classList.remove('is-hover')
        hovering = false
        if (labelRef.current) labelRef.current.textContent = labelled.dataset.cursor ?? ''
      } else {
        root.classList.remove('is-label')
        if (interactive) {
          root.classList.add('is-hover')
          hovering = true
        } else if (hovering) {
          root.classList.remove('is-hover')
          hovering = false
        }
      }
    }

    const onLeave = () => {
      visible = false
      root.classList.remove('is-active')
      root.classList.remove('is-label', 'is-hover')
    }

    const onDown = () => {
      down = true
      root.classList.add('is-down')
    }

    const onUp = () => {
      if (!down) return
      down = false
      root.classList.remove('is-down')
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })

    if (reduce) {
      dotRef.current?.style.setProperty('transition', 'none')
    } else {
      raf = requestAnimationFrame(apply)
    }

    return () => {
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  return (
    <div ref={rootRef} className="cursor" aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </div>
  )
}