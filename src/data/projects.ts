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
}

export const PROJECTS: Project[] = [
  {
    id: 'yotoqhonam',
    index: '01',
    title: 'YOTOQHONAM',
    subtitle: 'Dormitory Management Platform',
    tags: ['ACCOUNTING', 'AUTOMATION', 'AI'],
    description:
      'Студенческое общежитие как единая операционная система: студенты, комнаты, койки, этажи, заселение, переселение, выселение, дежурства и отчётность.',
    visual: 'yotoqhonam',
    meta: { year: '2026', role: 'Full-stack / Product', type: 'Platform' },
    case: {
      overview:
        'A single operating system for a student dormitory — every bed, floor, duty shift and payment in one place.',
      challenge:
        'Металлические таблицы и бумажные журналы: ручной пересчёт коек, путаница при переселении, отчётность «на глаз».',
      solution:
        'Модель «этаж → комната → койка», автоматический расчёт свободных мест, сценарии заселения / переселения / выселения и сквозная отчётность.',
      technology: ['TypeScript', 'React', 'PostgreSQL', 'REST', 'Roles & Audit'],
      result:
        'Администратор видит загрузку общежития в реальном времени, а любая операция занимает минуты вместо часов.',
      stats: [
        { value: '428', label: 'STUDENTS TRACKED' },
        { value: '96', label: 'ROOMS MODELLED' },
        { value: '6', label: 'CORE MODULES' },
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
      'Защитный слой для изображений: imperceptible perturbation, которая ломает классификаторы, но сохраняет картинку для человека.',
    visual: 'antifake',
    meta: { year: '2026', role: 'Research / ML', type: 'Research' },
    case: {
      overview:
        'An adversarial protection engine that makes photographs unreadable for AI models while staying invisible to people.',
      challenge:
        'Модели распознают изображения, которых человек никогда не видел — deepfake и scraping работают без согласия авторов.',
      solution:
        'Пакетная генерация малых возмущений в пространстве признаков: изображение сохраняет вид, градиент модели — нет.',
      technology: ['PyTorch', 'FGSM / PGD', 'TorchVision', 'NumPy'],
      result:
        'Классификация целевых моделей падает до уровня случайного выбора при Δε, невидимом глазу.',
      stats: [
        { value: '0.03', label: 'L∞ PERTURBATION' },
        { value: '94%', label: 'FOG SUCCESS' },
        { value: '3', label: 'MODELS TESTED' },
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
        'Платформа защиты веб-приложений: инспекция трафика, детекция аномалий, блокировка атак и алертинг в реальном времени.',
    visual: 'shieldx',
    meta: { year: '2026', role: 'Security Engineering', type: 'Platform' },
    case: {
      overview:
        'A web security layer that watches traffic, learns what normal looks like and blocks what does not.',
      challenge:
        'Атаки приходят не в «удобные» часы: ручной разбор логов опаздывает, а базовые WAF-правила не видят обходы.',
      solution:
        'Правила + поведенческие метрики + скоринг аномалий в одном конвейере: ingest → detect → block → alert.',
      technology: ['Python', 'FastAPI', 'Rules Engine', 'Anomaly Scoring', 'WebSockets'],
      result:
        'Один экран вместо пяти логов: живой поток угроз, автоматическая блокировка и мгновенные алерты.',
      stats: [
        { value: '1.2K', label: 'THREATS BLOCKED' },
        { value: '<40ms', label: 'INSPECTION LATENCY' },
        { value: '24/7', label: 'MONITORING' },
      ],
    },
  },
]
