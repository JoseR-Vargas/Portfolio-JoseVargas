import { useI18n } from '../../i18n/I18nProvider'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

// Same list and order as the CV ("Main Skills"); proper nouns, so not translated.
// Listed column by column to match the two-column CV layout.
const SKILLS: readonly string[] = [
  'Node.js',
  'JavaScript',
  'NestJS',
  'Playwright',
  'TypeScript',
  'SQL',
  'React',
  'API Testing',
]

export function Skills() {
  const { t } = useI18n()

  return (
    <section id="skills" className="scroll-mt-20 bg-background py-24">
      <Container>
        <SectionHeading tagKey="skills.tag" titleKey="skills.title" tone="dark" />
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal delay={200}>
            <h3 className="mb-4 text-2xl font-bold text-foreground">{t('skills.headline')}</h3>
            <p className="leading-8 text-muted-foreground-1">{t('skills.body')}</p>
          </Reveal>
          <Reveal delay={300}>
            <ul className="grid grid-flow-col grid-cols-2 grid-rows-4 gap-x-8 gap-y-4 text-foreground">
              {SKILLS.map((skill) => (
                <li key={skill} className="flex items-center gap-3 font-medium">
                  <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
