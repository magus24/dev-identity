import { LineReveal, Reveal, SectionLabel } from '../components/Primitives'
import { IdentityCard } from '../components/IdentityCard'
import { PROFILE } from '../data/profile'

const NOTES: Record<string, string> = {
  'Software Engineering': 'Products, platforms, systems that ship.',
  'AI / Cybersecurity': 'Models, agents, threat analysis.',
  'Web': 'Interfaces with motion and intent.',
}

export function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <SectionLabel index="03" title="About" />

      <div className="about-grid">
        <div>
          <h2 id="about-title" className="h-display about-heading">
            <LineReveal text="I DON'T JUST WRITE CODE." />
            <LineReveal text="I TURN COMPLEX PROBLEMS" delay={0.1} />
            <LineReveal text="INTO SIMPLE SYSTEMS." delay={0.2} className="hl" />
          </h2>

          <Reveal delay={0.1}>
            <ul className="disciplines">
              {PROFILE.disciplines.map((item, i) => (
                <li key={item}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="about-note">
              Based in {PROFILE.location} — building software, AI and security systems end to
              end: {PROFILE.disciplines.map((d) => NOTES[d]).join(' ')}
            </p>
          </Reveal>
        </div>

        <div className="id-card-wrap">
          <IdentityCard />
        </div>
      </div>
    </section>
  )
}
