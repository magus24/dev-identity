import { useMemo } from 'react'
import { MENU_ITEMS, type MenuItem } from '../data/navigation'
import { PROJECTS, type Project } from '../data/projects'
import { EXPERIMENTS, type Experiment } from '../data/experiments'
import { STACK, type StackItem } from '../data/stack'
import { TIMELINE, type TimelineEntry } from '../data/timeline'
import type { Messages } from './types'
import { pick } from './index'
import { useI18n } from './provider'

/**
 * Localized editions of every data-driven collection on the page.
 * The structural data files stay the single source of truth for ids,
 * order, links and counts — display text is overlaid from messages.
 */
export type LocalizedProject = Project & {
  subtitle: string
  tags: string[]
  description: string
  meta: { year: string; role: string; type: string }
  case: {
    overview: string
    challenge: string
    solution: string
    result: string
    technology: string[]
    stats: { value: string; label: string }[]
  }
}

export interface LocalizedContent {
  menuItems: MenuItem[]
  projects: LocalizedProject[]
  experiments: Experiment[]
  stack: StackItem[]
  timeline: TimelineEntry[]
}

export function useLocalizedContent(): LocalizedContent {
  const { messages } = useI18n()
  return useMemo(() => buildLocalizedContent(messages), [messages])
}

function buildLocalizedContent(messages: Messages): LocalizedContent {
  const menuItems: MenuItem[] = MENU_ITEMS.map((item) => ({
    ...item,
    label: pick(messages, `nav.${item.target}`),
  }))

  const projects: LocalizedProject[] = PROJECTS.map((project) => {
    const loc =
      messages.projects.content[project.id as keyof typeof messages.projects.content]
    if (!loc) return project as LocalizedProject
    return {
      ...project,
      subtitle: loc.subtitle,
      tags: [...loc.tags],
      description: loc.description,
      meta: { year: project.meta.year, role: loc.role, type: loc.type },
      case: {
        overview: loc.case.overview,
        challenge: loc.case.challenge,
        solution: loc.case.solution,
        result: loc.case.result,
        technology: [...loc.case.technology],
        stats: [...loc.case.stats],
      },
    }
  })

  const experiments: Experiment[] = EXPERIMENTS.map((experiment) => {
    const loc = messages.experiments.content[experiment.pattern]
    if (!loc) return experiment
    return { ...experiment, title: loc.title, description: loc.description }
  })

  const stack: StackItem[] = STACK.map((item) => ({
    ...item,
    description: messages.stackDesc[item.name]?.description ?? item.description,
  }))

  const timeline: TimelineEntry[] = TIMELINE.map((entry, i) => {
    const loc = messages.journey.entries[i]
    return loc ? { ...entry, title: loc.title, description: loc.description } : entry
  })

  return { menuItems, projects, experiments, stack, timeline }
}