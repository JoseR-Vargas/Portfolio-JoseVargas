import { CV_URL, EMAIL, LOCATION } from '../../data/site'
import { useI18n } from '../../i18n/I18nProvider'
import type { StringKey } from '../../i18n/translations'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function About() {
  const { t } = useI18n()

  const details: ReadonlyArray<{ labelKey: StringKey; value: string }> = [
    { labelKey: 'about.email.label', value: EMAIL },
    { labelKey: 'about.location.label', value: LOCATION },
    { labelKey: 'about.languages.label', value: t('about.languages.value') },
  ]

  return (
    <section id="about" className="scroll-mt-20 bg-neutral-100 py-24 text-neutral-600">
      <Container>
        <SectionHeading tagKey="about.tag" titleKey="about.title" />
        <div className="grid items-center gap-12 lg:grid-cols-[2fr_3fr]">
          <Reveal from="right" delay={300}>
            <img
              src="/img/Profile_picture_jr.jpeg"
              alt="Jose Vargas"
              className="mx-auto aspect-4/5 w-full max-w-sm rounded-3xl object-cover object-top shadow-xl"
            />
          </Reveal>
          <Reveal delay={400}>
            <h2 className="text-3xl font-bold text-neutral-900">{t('about.name')}</h2>
            <h4 className="mt-1 mb-4 text-lg font-semibold text-primary">{t('about.role')}</h4>
            <p
              className="mb-6 leading-8 [&_strong]:text-neutral-900"
              dangerouslySetInnerHTML={{ __html: t('about.bio1') }}
            />
            <ul className="mb-8 grid gap-3 sm:grid-cols-2">
              {details.map(({ labelKey, value }) => (
                <li key={labelKey} className="flex flex-col text-sm">
                  <span className="font-semibold text-neutral-900">{t(labelKey)}</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
            <Button as="a" variant="primary" href={CV_URL} download>
              <i className="bi bi-download" aria-hidden="true" />
              {t('about.downloadCV')}
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
