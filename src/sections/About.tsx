import { PROFILE } from '../data/profile'
import { Reveal, SectionLabel } from '../components/Primitives'

const FACTS = [
  { k: 'Name', v: PROFILE.name.toLowerCase() },
  { k: 'Role', v: PROFILE.roles.join(' / ') },
  { k: 'Focus', v: PROFILE.disciplines.join(' / ') },
  { k: 'Location', v: PROFILE.location },
  { k: 'Timezone', v: PROFILE.timezone },
  { k: 'Status', v: PROFILE.availability[0] },
]

export function About() {
  return (
    <section id="about" className="section" aria-label="About">
      <SectionLabel index="03" title="About" />

      <div className="about-grid">
        <div>
          <dl className="about-facts">
            {FACTS.map((fact) => (
              <div className="about-fact" key={fact.k}>
                <dt>{fact.k}</dt>
                <dd>{fact.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <Reveal>
            <p className="about-manifesto">
              I operate at the intersection of{' '}
              <em>software, AI and security</em> — building interfaces, models and
              defensive layers. The thread between them is the same: take a messy
              problem, reduce it to a <em>system</em>, and ship it until it is useful.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="about-disciplines">
              {PROFILE.disciplines.map((discipline, i) => (
                <div className="about-discipline" key={discipline}>
                  <span className="d-num">0{i + 1}</span>
                  <span className="d-name">{discipline}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="identity" aria-label="Identity card">
              <div className="identity-grid">
                <div className="identity-mark">
                  D<i>/</i>P
                </div>
                <div className="identity-fields">
                  <div className="identity-field">
                    <span className="k">System</span>
                    <span className="v">D/P — build once, reuse forever</span>
                  </div>
                  <div className="identity-field">
                    <span className="k">State</span>
                    <span className="v" style={{ color: 'var(--success)' }}>
                      Available for projects
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}