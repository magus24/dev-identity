import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { MENU_ITEMS } from '../data/navigation'
import { PROFILE } from '../data/profile'
import { cx } from '../lib/utils'
import { prefersReducedMotion } from '../hooks/useMediaQuery'

const EASE = [0.22, 1, 0.36, 1] as const

const SOCIALS = [
  { label: 'GitHub', href: PROFILE.github },
  { label: 'Telegram', href: PROFILE.telegram },
  { label: 'LinkedIn', href: PROFILE.linkedin },
  { label: 'Email', href: `mailto:${PROFILE.email}` },
]

export function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => setOpen(false), [])

  const goTo = useCallback(
    (id: string) => {
      setOpen(false)
      const el = document.getElementById(id)
      if (!el) return
      window.requestAnimationFrame(() => {
        el.scrollIntoView({
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
          block: 'start',
        })
      })
    },
    [],
  )

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 32)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const firstLink = menuRef.current?.querySelector<HTMLElement>('a, button')
    firstLink?.focus({ preventScroll: true })

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus({ preventScroll: true })
      }
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header className={cx('header', scrolled && 'is-scrolled', open && 'is-open')}>
        <button
          ref={triggerRef}
          type="button"
          className="brand"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => (open ? close() : setOpen(true))}
        >
          D<i>/</i>P
        </button>

        <button
          type="button"
          className="header-status"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => (open ? close() : setOpen(true))}
        >
          <span className="label-open">{PROFILE.availability[0]}</span>
          <span className="label-close">Close</span>
          <span className="dot" aria-hidden="true" />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            ref={menuRef}
            className="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="menu-top">
              <span className="brand" aria-hidden="true">
                D<i>/</i>P
              </span>
              <button type="button" className="header-status" onClick={close}>
                Close
                <X size={14} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <nav className="menu-body" aria-label="Sections">
              <ul className="menu-list">
                {MENU_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.target}
                    className="menu-item"
                    initial={{ opacity: 0, y: 34 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.6, delay: 0.08 * i, ease: EASE }}
                  >
                    <a
                      className="menu-link"
                      href={`#${item.target}`}
                      onClick={(event) => {
                        event.preventDefault()
                        goTo(item.target)
                      }}
                    >
                      <span className="num">{item.index}</span>
                      {item.label}
                      <ArrowUpRight
                        className="arrow"
                        size={26}
                        strokeWidth={1.4}
                        aria-hidden="true"
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="menu-foot">
              <div className="menu-socials">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noreferrer"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
              <span className="mono">{PROFILE.location} — UTC+5</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
