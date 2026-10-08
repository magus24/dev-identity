export type ExperimentPattern =
  | 'vision'
  | 'security'
  | 'agents'
  | 'interfaces'
  | 'reverse'
  | 'hardware'

export interface Experiment {
  index: string
  title: string
  description: string
  pattern: ExperimentPattern
}

export const EXPERIMENTS: Experiment[] = [
  {
    index: '01',
    title: 'Computer Vision',
    description: 'Detection, tracking, and understanding pixels in real time.',
    pattern: 'vision',
  },
  {
    index: '02',
    title: 'Cybersecurity',
    description: 'Breaking and hardening systems to learn how they fail.',
    pattern: 'security',
  },
  {
    index: '03',
    title: 'AI Agents',
    description: 'Autonomous loops that plan, use tools and finish the job.',
    pattern: 'agents',
  },
  {
    index: '04',
    title: '3D Interfaces',
    description: 'Spatial, interactive surfaces built with WebGL and shaders.',
    pattern: 'interfaces',
  },
  {
    index: '05',
    title: 'Reverse Engineering',
    description: 'Disassembly, protocols, and understanding black boxes.',
    pattern: 'reverse',
  },
  {
    index: '06',
    title: 'Hardware',
    description: 'Sensors, microcontrollers and the physical layer.',
    pattern: 'hardware',
  },
]
