import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { Project } from '../data/projects'
import { AntifakeMock } from './visuals/AntifakeMock'
import { ShieldxMock } from './visuals/ShieldxMock'
import { YotoqhonamMock } from './visuals/YotoqhonamMock'

const EASE = [0.22, 1, 0.36, 1] as const

export const PROJECT_VISUALS = {
  yotoqhonam: YotoqhonamMock,
  antifake: AntifakeMock,
  shieldx: ShieldxMock,
} as const

interface ProjectOverlayProps {
  project: Project | null
  onClose: () => void
}

export function ProjectOverlay({ project, onClose }: ProjectOverlayProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!project) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus({ preventScroll: true })

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  const Visual = project ? PROJECT_VISUALS[project.visual] : null

  return (
    <AnimatePresence>
      {project && Visual && (
        <motion.div
          className="case-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} — case study`}
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className="case-bar">
            <span className="mono">
              PROJECT {project.index} — CASE STUDY
            </span>
            <button ref={closeRef} type="button" className="case-close" onClick={onClose}>
              Close
              <X size={14} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <div className="case-inner">
            <header className="case-head">
              <span className="mono">
                {project.meta.year} — {project.meta.type} — {project.meta.role}
              </span>
              <motion.h3
                className="case-title"
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              >
                {project.title}
              </motion.h3>
              <p className="case-sub">{project.subtitle}</p>
            </header>

            <div className="case-visual">
              <Visual />
            </div>

            <div className="case-stats">
              {project.case.stats.map((stat) => (
                <div className="case-stat" key={stat.label}>
                  <div className="case-stat__value">{stat.value}</div>
                  <div className="case-stat__label">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="case-grid">
              <div className="case-block">
                <h4>Overview</h4>
                <p>{project.case.overview}</p>
              </div>
              <div className="case-block">
                <h4>Challenge</h4>
                <p>{project.case.challenge}</p>
              </div>
              <div className="case-block">
                <h4>Solution</h4>
                <p>{project.case.solution}</p>
              </div>
              <div className="case-block">
                <h4>Result</h4>
                <p>{project.case.result}</p>
              </div>
            </div>

            <ul className="case-tech" aria-label="Technology">
              {project.case.technology.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
