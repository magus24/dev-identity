import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  applyDocumentMeta,
  MESSAGES,
  pick,
  STORAGE_KEY,
  detectInitialLanguage,
  type Language,
} from './index'
import type { Messages } from './types'

export interface I18nValue {
  lang: Language
  setLang: (lang: Language) => void
  messages: Messages
  t: (key: string) => string
}

const I18nContext = createContext<I18nValue | null>(null)

/**
 * Owns the active language. Switching only swaps the message catalogue and
 * document metadata — nothing else remounts, so the 3D scene keeps running,
 * scroll stays put and the URL never changes.
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(detectInitialLanguage)
  const messages = MESSAGES[lang]

  useEffect(() => {
    applyDocumentMeta(lang, messages)
  }, [lang, messages])

  const setLang = useCallback((next: Language) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage blocked — still switch for this session */
    }
    setLangState(next)
  }, [])

  const t = useCallback((key: string): string => pick(messages, key), [messages])

  const value = useMemo<I18nValue>(
    () => ({ lang, setLang, messages, t }),
    [lang, setLang, messages, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider')
  return ctx
}