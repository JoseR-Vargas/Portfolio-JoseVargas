import { useI18n } from '../../i18n/I18nProvider'
import type { StringKey } from '../../i18n/translations'
import { cx } from './cx'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  tagKey: StringKey
  titleKey: StringKey
  subtitleKey?: StringKey
  /** `dark` sections render the title in light text. */
  tone?: 'light' | 'dark'
}

export function SectionHeading({ tagKey, titleKey, subtitleKey, tone = 'light' }: SectionHeadingProps) {
  const { t } = useI18n()

  return (
    <Reveal className="mb-12 text-center">
      <h4 className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">{t(tagKey)}</h4>
      <h2
        className={cx(
          'text-3xl font-bold sm:text-4xl',
          tone === 'dark' ? 'text-foreground' : 'text-neutral-900',
        )}
      >
        {t(titleKey)}
      </h2>
      {subtitleKey && (
        <p
          className={cx(
            'mx-auto mt-4 max-w-2xl',
            tone === 'dark' ? 'text-muted-foreground-1' : 'text-neutral-600',
          )}
        >
          {t(subtitleKey)}
        </p>
      )}
    </Reveal>
  )
}
