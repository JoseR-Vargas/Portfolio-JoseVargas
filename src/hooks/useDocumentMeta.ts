import { useEffect } from 'react'

/**
 * Sets the document title and language for the lifetime of a page and restores
 * the previous values on unmount (the portfolio's I18nProvider owns them otherwise).
 */
export function useDocumentMeta(title: string, lang: string) {
  useEffect(() => {
    const root = document.documentElement
    const previousTitle = document.title
    const previousLang = root.lang

    // Deferred so it runs after I18nProvider's own mount effect (parent effects run last).
    const timer = setTimeout(() => {
      document.title = title
      root.lang = lang
    }, 0)

    return () => {
      clearTimeout(timer)
      document.title = previousTitle
      root.lang = previousLang
    }
  }, [title, lang])
}
