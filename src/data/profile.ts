export interface Profile {
  name: string
  mark: string
  role: string
  headline: readonly [string, string]
  location: string
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
  name: 'David',
  mark: 'D/P',
  role: 'Software Engineer',
  headline: ['I BUILD THINGS', 'THAT SHOULD EXIST.'],
  location: 'Uzbekistan',
  disciplines: ['Software Engineering', 'AI / Cybersecurity', 'Web'],
  availability: ['Projects', 'Research', 'Collaboration'],
  email: 'you@example.com',
  github: 'https://github.com/your-username',
  telegram: 'https://t.me/your_handle',
  linkedin: 'https://linkedin.com/in/your-handle',
  year: 2026,
}
