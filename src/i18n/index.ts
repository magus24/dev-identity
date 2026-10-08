import type { Messages } from './types'
import en from './en'
import ru from './ru'
import uz from './uz'

export const STORAGE_KEY = 'portfolio-language'

export type Language = 'en' | 'ru' | 'uz'

export interface LanguageMeta {
  code: Language
  label: string
  full: string
}

export const LANGS: readonly LanguageMeta[] = [
  { code: 'uz', label: 'UZ', full: "O'zbekcha" },
  { code: 'ru', label: 'RU', full: 'Русский' },
  { code: 'en', label: 'EN', full: 'English' },
]

export const MESSAGES: Record<Language, Messages> = { en, ru, uz }

const LANG_KEYS: readonly string[] = ['en', 'ru', 'uz']

export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && LANG_KEYS.includes(value)
}

/**
 * First visit: prefer the browser language (uz → ru → en), otherwise EN.
 * Returning visitors: whatever was saved under `portfolio-language`.
 */
export function detectInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (isLanguage(saved)) return saved
  } catch {
    /* storage unavailable — fall through to browser detection */
  }
  const nav = typeof navigator !== 'undefined' ? (navigator.language ?? '').toLowerCase() : ''
  if (nav.startsWith('uz')) return 'uz'
  if (nav.startsWith('ru')) return 'ru'
  return 'en'
}

/* ---------- shallow-path access into the Messages catalogue ---------- */

export function pick<T>(obj: T, key: string): string {
  return key.split('.').reduce<unknown>((acc, part) => (acc as Record<string, unknown>)?.[part], obj) as string
}

/* ---------- document metadata follows the active language ---------- */

export function applyDocumentMeta(lang: Language, messages: Messages) {
  document.documentElement.lang = lang

  const setMeta = (selector: string, value: string) => {
    const el = document.head.querySelector<HTMLMetaElement>(selector)
    if (el) el.content = value
  }
  document.title = messages.meta.title
  setMeta('meta[name="description"]', messages.meta.description)
  setMeta('meta[property="og:title"]', messages.meta.ogTitle)
  setMeta('meta[property="og:description"]', messages.meta.ogDescription)
  setMeta('meta[name="twitter:title"]', messages.meta.ogTitle)
  setMeta('meta[name="twitter:description"]', messages.meta.ogDescription)
}