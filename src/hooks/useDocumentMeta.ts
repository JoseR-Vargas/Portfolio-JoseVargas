import { useEffect } from 'react'

/**
 * Sets the document title, language and (optionally) favicon for the lifetime of a
 * page and restores the previous values on unmount (the portfolio's I18nProvider
 * owns title and language otherwise).
 */
export function useDocumentMeta(title: string, lang: string, iconHref?: string) {
  useEffect(() => {
    const root = document.documentElement
    const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    const previousTitle = document.title
    const previousLang = root.lang
    const previousIcon = icon?.getAttribute('href') ?? null

    // Deferred so it runs after I18nProvider's own mount effect (parent effects run last).
    const timer = setTimeout(() => {
      document.title = title
      root.lang = lang
      if (icon && iconHref) icon.setAttribute('href', iconHref)
    }, 0)

    return () => {
      clearTimeout(timer)
      document.title = previousTitle
      root.lang = previousLang
      if (icon && previousIcon) icon.setAttribute('href', previousIcon)
    }
  }, [title, lang, iconHref])
}
