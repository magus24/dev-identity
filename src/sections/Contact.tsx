import { ArrowUpRight } from 'lucide-react'
import { PROFILE } from '../data/profile'
import { SectionLabel, Reveal, LineReveal } from '../components/Primitives'

const CHANNELS = [
  { label: 'GitHub', value: PROFILE.github, href: PROFILE.github },
  { label: 'Telegram', value: PROFILE.telegram, href: PROFILE.telegram },
  { label: 'LinkedIn', value: PROFILE.linkedin, href: PROFILE.linkedin },
  { label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
]

export function Contact() {
  return (
    <section id="contact" className="section" aria-label="Contact">
      <SectionLabel index="06" title="Contact — open channel" />

      <div className="contact-grid">
        <div>
          <p className="contact-title" aria-label="Have an idea">
            <LineReveal text="Have an idea?" />
            <span className="big">
              <LineReveal text="Let's build" delay={0.1} />
              <LineReveal text="something worth" delay={0.2} />
              <LineReveal text="remembering." delay={0.3} />
            </span>
          </p>
          <Reveal delay={0.2}>
            <p className="contact-lead">
              A system, a product, an experiment — if it should exist, I want to build it.
              Pick a channel, any channel.
            </p>
          </Reveal>
        </div>

        <div>
          <div className="mono" style={{ marginBottom: 10 }}>
            Channels
          </div>
          {CHANNELS.map((channel, i) => (
            <Reveal key={channel.label} delay={0.08 * i} y={18}>
              <a
                className="contact-channel"
                href={channel.href}
                target={channel.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer"
                data-cursor="OPEN"
              >
                <span className="mono">0{i + 1}</span>
                {channel.label}
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  style={{ color: 'var(--accent)', marginLeft: 'auto' }}
                  aria-hidden="true"
                />
              </a>
            </Reveal>
          ))}

          <div className="contact-status">
            <span className="dot" aria-hidden="true" />
            {PROFILE.availability[0]} — {PROFILE.location} / {PROFILE.timezone}
          </div>
        </div>
      </div>
    </section>
  )
}