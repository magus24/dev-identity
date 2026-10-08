export interface MenuItem {
  index: string
  label: string
  target: string
}

export const MENU_ITEMS: MenuItem[] = [
  { index: '01', label: 'WORK', target: 'work' },
  { index: '02', label: 'EXPERIMENTS', target: 'experiments' },
  { index: '03', label: 'ABOUT', target: 'about' },
  { index: '04', label: 'STACK', target: 'stack' },
  { index: '05', label: 'JOURNEY', target: 'journey' },
  { index: '06', label: 'CONTACT', target: 'contact' },
]

export const SECTIONS = [
  'top',
  'ideas',
  'about',
  'work',
  'experiments',
  'stack',
  'journey',
  'contact',
  'finale',
] as const

export type SectionId = (typeof SECTIONS)[number]

/**
 * Maps page sections to states of the CORE object.
 * The portfolio is a machine: each chapter changes how the core behaves.
 */
export const CORE_STATES: Record<SectionId, string> = {
  top: 'seed',
  ideas: 'open',
  about: 'open',
  work: 'systems',
  experiments: 'systems',
  stack: 'network',
  journey: 'open',
  contact: 'reassemble',
  finale: 'reassemble',
}