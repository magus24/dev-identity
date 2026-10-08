import { PROFILE } from '../data/profile'
import { prefersReducedMotion } from '../hooks/useMediaQuery'

export function Footer() {
  const goTop = () =>
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })

  return (
    <footer className="footer">
      <span className="footer-note">
        © {PROFILE.year} <b>D/P</b> — a system for building ideas
      </span>
      <div className="footer-links">
        <a href={PROFILE.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={PROFILE.telegram} target="_blank" rel="noreferrer">
          Telegram
        </a>
        <button type="button" className="line-link" onClick={goTop} aria-label="Back to top">
          ↑ Top
        </button>
      </div>
    </footer>
  )
}