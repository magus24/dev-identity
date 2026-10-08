import { EXPERIMENTS } from './experiments'
import { PROJECTS } from './projects'
import { STACK } from './stack'

export interface Stat {
  value: string
  label: string
}

/**
 * Every figure on the page is derived from the data layer —
 * no hardcoded numbers, no invented metrics.
 */
export const STATS: Stat[] = [
  { value: String(PROJECTS.length).padStart(2, '0'), label: 'PROJECTS' },
  { value: String(EXPERIMENTS.length).padStart(2, '0'), label: 'EXPERIMENTS' },
  { value: String(STACK.length).padStart(2, '0'), label: 'TECHNOLOGIES' },
]