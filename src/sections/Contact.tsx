import { ArrowUpRight } from 'lucide-react'
import { LineReveal, Magnetic, Reveal, SectionLabel } from '../components/Primitives'
import { PROFILE } from '../data/profile'

const LINKS = [
  { label: 'GitHub', href: PROFILE.github },
  { label: 'Telegram', href: PROFILE.telegram },
  { label: 'LinkedIn', href: PROFILE.linkedin },
  { label: 'Email', href: `mailto:${PROFILE.email}` },
]

export function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="contact-glow" aria-hidden="true" />

      <div className="contact-inner">
        <SectionLabel index="05" title="Contact" />

        <h2 id="contact-title" className="contact-title">
          <LineReveal text="HAVE AN IDEA?" />
          <LineReveal text="LET'S BUILD SOMETHING" delay={0.1} />
          <LineReveal text="WORTH REMEMBERING." delay={0.2} className="muted" />
        </h2>

        <div className="contact-actions">
          {LINKS.map((link, index) => (
            <Reveal key={link.label} delay={0.25 + index * 0.07}>
              <Magnetic strength={0.34}>
                <a
                  className="btn-line"
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noreferrer"
                >
                  {link.label}
                  <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />
                </a>
              </Magnetic>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="contact-meta">
            <span className="mono">Based in {PROFILE.location}</span>
            <span className="mono">Open for {PROFILE.availability.join(' · ')}</span>
            <span className="mono accent">Response within 24h</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
