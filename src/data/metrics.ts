export interface Metric {
  value: number
  suffix?: string
  label: string
  note: string
}

export const METRICS: Metric[] = [
  { value: 8, suffix: '+', label: 'PROJECTS', note: 'Shipped & maintained' },
  { value: 4, label: 'HACKATHONS', note: 'Built under pressure' },
  { value: 3, label: 'RESEARCH', note: 'ML & security papers' },
  { value: 20, suffix: '+', label: 'TECHNOLOGIES', note: 'In active rotation' },
]
