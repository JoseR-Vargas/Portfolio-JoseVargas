import { useI18n } from '../../i18n/I18nProvider'
import type { StringKey } from '../../i18n/translations'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

interface Certificate {
  label: string
  href: string
  icon: 'bi-award' | 'bi-file-earmark-text'
}

interface TimelineEntry {
  dateKey: StringKey
  titleKey: StringKey
  orgKey?: StringKey
  bodyKey: StringKey
  certificates?: readonly Certificate[]
}

const EDUCATION: readonly TimelineEntry[] = [
  {
    dateKey: 'resume.edu.1.date',
    titleKey: 'resume.edu.1.title',
    orgKey: 'resume.edu.1.org',
    bodyKey: 'resume.edu.1.body',
    certificates: [
      { label: 'Backend I', href: '/tittles/back-I.jpeg', icon: 'bi-award' },
      { label: 'Backend II', href: '/tittles/back-II.jpeg', icon: 'bi-award' },
      { label: 'Backend III', href: '/tittles/back-III.jpeg', icon: 'bi-award' },
      { label: 'React', href: '/tittles/front-react.jpeg', icon: 'bi-award' },
    ],
  },
  {
    dateKey: 'resume.edu.2.date',
    titleKey: 'resume.edu.2.title',
    orgKey: 'resume.edu.2.org',
    bodyKey: 'resume.edu.2.body',
    certificates: [
      { label: 'NestJS', href: '/tittles/nest-js.pdf', icon: 'bi-file-earmark-text' },
      { label: 'TypeScript', href: '/tittles/typescript.pdf', icon: 'bi-file-earmark-text' },
    ],
  },
  {
    dateKey: 'resume.edu.3.date',
    titleKey: 'resume.edu.3.title',
    orgKey: 'resume.edu.3.org',
    bodyKey: 'resume.edu.3.body',
    certificates: [
      { label: 'SOLID', href: '/tittles/solid-clean-code.pdf', icon: 'bi-file-earmark-text' },
    ],
  },
]

const EXPERIENCE: readonly TimelineEntry[] = [
  {
    dateKey: 'resume.exp.1.date',
    titleKey: 'resume.exp.1.title',
    orgKey: 'resume.exp.1.org',
    bodyKey: 'resume.exp.1.body',
  },
  {
    dateKey: 'resume.exp.2.date',
    titleKey: 'resume.exp.2.title',
    bodyKey: 'resume.exp.2.body',
  },
]

function Timeline({ entries }: { entries: readonly TimelineEntry[] }) {
  const { t } = useI18n()

  return (
    <ol className="ml-2 border-l border-layer-line">
      {entries.map((entry) => (
        <li key={entry.titleKey} className="relative pb-8 pl-6 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute top-1.5 -left-[5px] size-2.5 rounded-full bg-primary"
          />
          <span className="text-xs font-semibold tracking-wide text-primary">{t(entry.dateKey)}</span>
          <h4 className="mt-1 text-lg font-semibold text-foreground">{t(entry.titleKey)}</h4>
          {entry.orgKey && (
            <span className="text-sm text-muted-foreground-1">{t(entry.orgKey)}</span>
          )}
          <p className="mt-2 text-sm leading-7 text-muted-foreground-1">{t(entry.bodyKey)}</p>
          {entry.certificates && (
            <div className="mt-3 flex flex-wrap gap-2">
              {entry.certificates.map(({ label, href, icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-layer-line bg-layer px-3 py-1 text-xs font-medium text-layer-foreground hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <i className={`bi ${icon}`} aria-hidden="true" />
                  {label}
                </a>
              ))}
            </div>
          )}
        </li>
      ))}
    </ol>
  )
}

export function Resume() {
  const { t } = useI18n()

  return (
    <section id="resume" className="hidden scroll-mt-20 bg-background-1 py-24">
      <Container>
        <SectionHeading tagKey="resume.tag" titleKey="resume.title" tone="dark" />
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal delay={200}>
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-foreground">
              <i className="bi bi-mortarboard text-primary" aria-hidden="true" />
              {t('resume.edu.title')}
            </h3>
            <Timeline entries={EDUCATION} />
          </Reveal>
          <Reveal delay={400}>
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-foreground">
              <i className="bi bi-briefcase text-primary" aria-hidden="true" />
              {t('resume.exp.title')}
            </h3>
            <Timeline entries={EXPERIENCE} />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
