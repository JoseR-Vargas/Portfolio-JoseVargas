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
  TRANSLATIONS,
  type Lang,
  type ListKey,
  type StringKey,
} from './translations'

export const LANG_STORAGE_KEY = 'portfolio_lang'
const DEFAULT_LANG: Lang = 'en'

interface I18nContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
  /** Translated string (may contain inline HTML for *.bio1, *.infoTitle, etc.). */
  t: (key: StringKey) => string
  /** Translated string list, e.g. `hero.typewriter`. */
  tList: (key: ListKey) => readonly string[]
}

const I18nContext = createContext<I18nContextValue | null>(null)

function readStoredLang(): Lang {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY)
    return stored && stored in TRANSLATIONS ? (stored as Lang) : DEFAULT_LANG
  } catch {
    return DEFAULT_LANG
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(LANG_STORAGE_KEY, next)
    } catch {
      // Persisting the language is best-effort.
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = TRANSLATIONS[lang]['meta.title']
  }, [lang])

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang(lang === 'en' ? 'es' : 'en'),
      t: (key) => TRANSLATIONS[lang][key],
      tList: (key) => TRANSLATIONS[lang][key],
    }),
    [lang, setLang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within an I18nProvider')
  return ctx
}
