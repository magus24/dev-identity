export type VisualKey = 'yotoqhonam' | 'antifake' | 'shieldx'

export interface ProjectMeta {
  year: string
  role: string
  type: string
}

export interface CaseStudy {
  overview: string
  challenge: string
  solution: string
  technology: string[]
  result: string
  stats: { value: string; label: string }[]
}

export interface Project {
  id: string
  index: string
  title: string
  subtitle: string
  tags: string[]
  description: string
  visual: VisualKey
  meta: ProjectMeta
  case: CaseStudy
  github?: string
  demo?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'yotoqhonam',
    index: '01',
    title: 'YOTOQHONAM',
    subtitle: 'Dormitory Management Platform',
    tags: ['ACCOUNTING', 'AUTOMATION', 'AI'],
    description:
      'A dormitory as a single operating system: students, rooms, beds, floors, check-ins, transfers, duties and reporting.',
    visual: 'yotoqhonam',
    meta: { year: '2026', role: 'Full-stack / Product', type: 'Platform' },
    case: {
      overview:
        'A single operating system for a student dormitory — every bed, floor, duty shift and payment in one place.',
      challenge:
        'Spreadsheet records and paper journals: beds recounted by hand, confusion during transfers, reporting done by eye.',
      solution:
        'A "floor → room → bed" model, automatic free-capacity calculation, check-in / transfer / check-out flows and end-to-end reporting.',
      technology: ['TypeScript', 'React', 'PostgreSQL', 'REST', 'Roles & Audit'],
      result:
        'The administrator sees live occupation of the dormitory, and any operation takes minutes instead of hours.',
      stats: [
        { value: '428', label: 'Students tracked' },
        { value: '96', label: 'Rooms modelled' },
        { value: '6', label: 'Core modules' },
      ],
    },
  },
  {
    id: 'antifake',
    index: '02',
    title: 'ANTIFAKE',
    subtitle: 'AI Image Protection',
    tags: ['ADVERSARIAL ML', 'COMPUTER VISION', 'ROBUSTNESS'],
    description:
      'A protection layer for images: an imperceptible perturbation that breaks classifiers while keeping the picture intact for humans.',
    visual: 'antifake',
    meta: { year: '2026', role: 'Research / ML', type: 'Research' },
    case: {
      overview:
        'An adversarial protection engine that makes photographs unreadable for AI models while staying invisible to people.',
      challenge:
        'Models recognise images a human has never seen — deepfakes and scraping operate without the consent of authors.',
      solution:
        'Batch generation of small perturbations in feature space: the image keeps its look, the model gradient does not.',
      technology: ['PyTorch', 'FGSM / PGD', 'TorchVision', 'NumPy'],
      result:
        'Classification of target models drops to random-choice level under a perturbation invisible to the eye.',
      stats: [
        { value: '0.03', label: 'L∞ perturbation' },
        { value: '94%', label: 'Fooling success' },
        { value: '3', label: 'Models tested' },
      ],
    },
  },
  {
    id: 'shieldx',
    index: '03',
    title: 'SHIELDX',
    subtitle: 'Smart Web Security & Threat Monitoring Platform',
    tags: ['WAF', 'SIEM', 'THREAT DETECTION'],
    description:
      'A web protection platform: traffic inspection, anomaly detection, attack blocking and real-time alerting.',
    visual: 'shieldx',
    meta: { year: '2026', role: 'Security Engineering', type: 'Platform' },
    case: {
      overview:
        'A web security layer that watches traffic, learns what normal looks like and blocks what does not.',
      challenge:
        'Attacks do not arrive at convenient hours: manual log review is always late, and basic WAF rules miss bypasses.',
      solution:
        'Rules, behavioural metrics and anomaly scoring in a single pipeline: ingest → detect → block → alert.',
      technology: ['Python', 'FastAPI', 'Rules Engine', 'Anomaly Scoring', 'WebSockets'],
      result:
        'One screen instead of five log views: a live threat stream, automatic blocking and instant alerts.',
      stats: [
        { value: '1.2K', label: 'Threats blocked' },
        { value: '<40ms', label: 'Inspection latency' },
        { value: '24/7', label: 'Monitoring' },
      ],
    },
  },
]