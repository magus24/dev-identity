export interface StackItem {
  name: string
  description: string
  ring: 1 | 2
}

export const STACK: StackItem[] = [
  { name: 'Python', description: 'ML research, tooling, backends', ring: 1 },
  { name: 'TypeScript', description: 'Typed product engineering', ring: 1 },
  { name: 'React', description: 'Interfaces with motion & state', ring: 1 },
  { name: 'JavaScript', description: 'The web, end to end', ring: 1 },
  { name: 'PyTorch', description: 'Models, training, experiments', ring: 1 },
  { name: 'Three.js', description: 'Real-time 3D on the web', ring: 1 },
  { name: 'Linux', description: 'Daily environment & servers', ring: 2 },
  { name: 'Docker', description: 'Reproducible deployments', ring: 2 },
  { name: 'Git', description: 'History, review, delivery', ring: 2 },
  { name: 'Cybersecurity', description: 'Threats, defenses, analysis', ring: 2 },
  { name: 'AI', description: 'Agents, vision, robustness', ring: 2 },
]

export const RING_RADIUS: Record<1 | 2, number> = { 1: 33, 2: 47 }
