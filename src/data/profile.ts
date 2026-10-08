export interface Profile {
  name: string
  mark: string
  roles: readonly string[]
  headline: readonly [string, string]
  manifesto: string
  location: string
  timezone: string
  disciplines: readonly string[]
  availability: readonly string[]
  email: string
  github: string
  telegram: string
  linkedin: string
  year: number
}

/**
 * Placeholder contact data — replace with your own before publishing.
 */
export const PROFILE: Profile = {
  name: 'DAVID',
  mark: 'D/P',
  roles: ['SOFTWARE', 'AI', 'CYBERSECURITY'],
  headline: ['I BUILD THINGS', 'THAT SHOULD EXIST.'],
  manifesto:
    'A portfolio is not a list of works — it is a system: ideas in, products out. This page is an engine. Everything you see is a function of data, geometry and intent.',
  location: 'Uzbekistan',
  timezone: 'UTC+5',
  disciplines: ['Software Engineering', 'AI', 'Cybersecurity'],
  availability: ['Projects', 'Research', 'Collaboration'],
  email: 'you@example.com',
  github: 'https://github.com/your-username',
  telegram: 'https://t.me/your_handle',
  linkedin: 'https://linkedin.com/in/your-handle',
  year: 2026,
}