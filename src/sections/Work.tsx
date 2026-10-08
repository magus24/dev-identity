import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import type { Project } from '../data/projects'
import { cx } from '../lib/utils'
import { SectionLabel, LineReveal, Reveal } from '../components/Primitives'
import { AntifakeMock } from '../components/visuals/AntifakeMock'
import { ShieldxMock } from '../components/visuals/ShieldxMock'
import { YotoqhonamMock } from '../components/visuals/YotoqhonamMock'
import { useLocalizedContent } from '../i18n/content'
import { useI18n } from '../i18n/provider'

const VISUALS = {
  yotoqhonam: YotoqhonamMock,
  antifake: AntifakeMock,
  shieldx: ShieldxMock,
} as const

interface ProjectRowProps {
  project: Project
  reversed: boolean
  onOpen: (project: Project) => void
}

function ProjectRow({ project, reversed, onOpen }: ProjectRowProps) {
  const ref = useRef<HTMLDivElement>(null)
  const Visual = VISUALS[project.visual as keyof typeof VISUALS]
  const { t } = useI18n()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const figureY = useTransform(scrollYProgress, [0, 1], [46, -46])
  const figureScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96])

  return (
    <article
      ref={ref}
      className={cx('project-row', reversed && 'project-row--rev')}
      data-project={project.id}
    >
      <span className="project-index" aria-hidden="true">
        {project.index}
      </span>

      <div className="project-info">
        <div className="p-meta">
          <span className="mono">
            <b>{project.meta.year}</b> — {project.meta.type}
          </span>
          <span className="mono">{project.meta.role}</span>
        </div>

        <LineReveal text={project.title} className="p-title" />

        <Reveal delay={0.08}>
          <p className="p-sub">{project.subtitle}</p>
        </Reveal>

        <div className="p-tags" aria-label={t('projects.tagsAria')}>
          {project.tags.map((tag) => (
            <span className="p-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <Reveal delay={0.14}>
          <p className="p-desc lede">{project.description}</p>
        </Reveal>

        <div className="p-actions">
          <button
            type="button"
            className="bracket-link"
            data-cursor="view"
            onClick={() => onOpen(project)}
            aria-label={t('projects.openCaseAria').replace('{title}', project.title)}
          >
            {t('projects.openCase')}
          </button>
        </div>
      </div>

      <motion.div className="p-thumb" style={{ y: figureY, scale: figureScale }}>
        <Reveal y={30}>
          <div className="p-thumb-frame">
            <span className="mono p-thumb-tag">
              FIG. {project.index} — {project.title}
            </span>
            <div style={{ padding: '56px 18px 18px' }}>
              <Visual />
            </div>
          </div>
        </Reveal>
      </motion.div>
    </article>
  )
}

interface WorkProps {
  onOpen: (project: Project) => void
}

export function Work({ onOpen }: WorkProps) {
  const { projects } = useLocalizedContent()
  const { t } = useI18n()

  return (
    <section id="work" className="section" aria-label={t('projects.aria')}>
      <SectionLabel index="01" title={t('projects.sectionTitle')} />

      {projects.map((project, i) => (
        <ProjectRow
          key={project.id}
          project={project}
          reversed={i % 2 === 1}
          onOpen={onOpen}
        />
      ))}

      <div className="hair" />
      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
        <a className="mono line-link" href="#experiments" style={{ color: 'var(--fg)' }}>
          {t('projects.next')}
          <ArrowUpRight size={12} strokeWidth={1.5} style={{ display: 'inline', verticalAlign: '-1px' }} />
        </a>
      </div>
    </section>
  )
}