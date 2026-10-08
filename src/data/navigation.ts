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
  { index: '05', label: 'CONTACT', target: 'contact' },
]

export const SECTIONS = ['top', 'about', 'work', 'experiments', 'stack', 'contact'] as const
export type SectionId = (typeof SECTIONS)[number]
