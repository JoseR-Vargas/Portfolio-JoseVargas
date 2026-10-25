import { useEffect, useState } from 'react'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useI18n } from '../../i18n/I18nProvider'
import type { Lang, StringKey } from '../../i18n/translations'
import { cx } from '../ui/cx'

/** Height of the fixed header; sections use the matching `scroll-mt-20`. */
const HEADER_OFFSET = 80
/** Scroll distance after which the header switches to its compact style. */
const SCROLLED_THRESHOLD = 50

const NAV_ITEMS: ReadonlyArray<{ id: string; labelKey: StringKey }> = [
  { id: 'home', labelKey: 'nav.home' },
  { id: 'about', labelKey: 'nav.about' },
  { id: 'skills', labelKey: 'nav.skills' },
  { id: 'resume', labelKey: 'nav.resume' },
  { id: 'projects', labelKey: 'nav.projects' },
  { id: 'contact', labelKey: 'nav.contact' },
]
const SECTION_IDS = NAV_ITEMS.map((item) => item.id)

const LANGS: readonly Lang[] = ['en', 'es']

export function Navbar() {
  const { t, lang, toggleLang } = useI18n()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY >= SCROLLED_THRESHOLD)
  const activeId = useActiveSection(SECTION_IDS, HEADER_OFFSET + 1)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= SCROLLED_THRESHOLD)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        scrolled
          ? 'border-layer-line bg-background/95 shadow-lg'
          : 'border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#home"
          className="rounded-full text-2xl font-extrabold tracking-tight text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          JV<span className="text-primary">.</span>
        </a>

        <div className="flex items-center gap-3 md:order-last">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t('nav.switchLang')}
            title={t('nav.switchLang')}
            className="inline-flex items-center gap-1 rounded-full border border-layer-line bg-layer px-3 py-1.5 text-xs font-semibold hover:bg-layer-hover focus-visible:outline-2 focus-visible:outline-primary"
          >
            {LANGS.map((code, index) => (
              <span key={code} className="inline-flex items-center gap-1">
                {index > 0 && (
                  <span aria-hidden="true" className="text-muted-foreground-1">
                    /
                  </span>
                )}
                <span className={code === lang ? 'text-primary' : 'text-muted-foreground-1'}>
                  {code.toUpperCase()}
                </span>
              </span>
            ))}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={t('nav.openMenu')}
            aria-expanded={menuOpen}
            aria-controls="nav"
            className="inline-flex size-10 items-center justify-center rounded-full text-2xl text-foreground hover:bg-layer-hover focus-visible:outline-2 focus-visible:outline-primary md:hidden"
          >
            <i className="bi bi-list" aria-hidden="true" />
          </button>
        </div>

        <nav
          id="nav"
          aria-label={t('nav.main')}
          className={cx(
            'max-md:fixed max-md:inset-y-0 max-md:right-0 max-md:w-64 max-md:border-l max-md:border-layer-line max-md:bg-background max-md:p-6 max-md:pt-20 max-md:shadow-2xl',
            'max-md:transition-transform max-md:duration-300 motion-reduce:transition-none',
            menuOpen ? 'max-md:translate-x-0' : 'max-md:invisible max-md:translate-x-full',
          )}
        >
          <button
            type="button"
            onClick={closeMenu}
            aria-label={t('nav.closeMenu')}
            className="absolute top-5 right-5 inline-flex size-10 items-center justify-center rounded-full text-3xl text-foreground hover:bg-layer-hover focus-visible:outline-2 focus-visible:outline-primary md:hidden"
          >
            <i className="bi bi-x" aria-hidden="true" />
          </button>
          <ul className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2">
            {NAV_ITEMS.map(({ id, labelKey }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={closeMenu}
                  aria-current={activeId === id ? 'true' : undefined}
                  className={cx(
                    'block rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-primary',
                    activeId === id
                      ? 'text-primary'
                      : 'text-muted-foreground-1 hover:text-foreground',
                  )}
                >
                  {t(labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
