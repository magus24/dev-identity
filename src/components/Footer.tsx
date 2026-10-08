import { PROFILE } from '../data/profile'

const LINKS = [
  { label: 'GitHub', href: PROFILE.github },
  { label: 'Telegram', href: PROFILE.telegram },
  { label: 'LinkedIn', href: PROFILE.linkedin },
  { label: 'Email', href: `mailto:${PROFILE.email}` },
]

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer-note">
        <b>{PROFILE.name}</b> / {PROFILE.year} — Designed &amp; built from scratch.
      </p>

      <nav className="footer-links" aria-label="Social links">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noreferrer"
          >
            {link.label}
          </a>
        ))}
        <a href="#top">Back to top ↑</a>
      </nav>
    </footer>
  )
}
