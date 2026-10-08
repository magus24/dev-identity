import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { LineReveal, SectionLabel } from '../components/Primitives'
import { ProjectOverlay, PROJECT_VISUALS } from '../components/ProjectOverlay'
import { PROJECTS, type Project } from '../data/projects'
import { PROFILE } from '../data/profile'

const EASE = [0.22, 1, 0.36, 1] as const

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const Visual = PROJECT_VISUALS[project.visual]

  return (
    <motion.article
      className="project"
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <div className="project-body">
        <span className="project-num" aria-hidden="true">
          {project.index}
        </span>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-sub">{project.subtitle}</p>

        <ul className="project-tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <p className="project-desc">{project.description}</p>

        <div className="project-meta">
          <div>
            <span className="k">Year</span>
            <span className="v">{project.meta.year}</span>
          </div>
          <div>
            <span className="k">Role</span>
            <span className="v">{project.meta.role}</span>
          </div>
          <div>
            <span className="k">Type</span>
            <span className="v">{project.meta.type}</span>
          </div>
        </div>

        <button type="button" className="project-cta" onClick={onOpen}>
          View case
          <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      <button
        type="button"
        className="project-media"
        onClick={onOpen}
        aria-label={`Open case study: ${project.title}`}
      >
        <span className="project-media__inner">
          <Visual />
        </span>
        <span className="view-case">
          View case
          <ArrowUpRight size={13} strokeWidth={1.6} aria-hidden="true" />
        </span>
      </button>
    </motion.article>
  )
}

export function Work() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <div className="work-head">
        <div>
          <SectionLabel index="01" title="Work" />
          <h2 id="work-title" className="h-display">
            <LineReveal text="SELECTED WORK" />
          </h2>
        </div>
        <p className="count">
          {String(PROJECTS.length).padStart(2, '0')} CASE STUDIES
          <br />
          2024 — {PROFILE.year}
        </p>
      </div>

      <div className="projects">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={() => setActive(project)} />
        ))}
      </div>

      <ProjectOverlay project={active} onClose={() => setActive(null)} />
    </section>
  )
}
