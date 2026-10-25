import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useI18n } from '../../i18n/I18nProvider'
import type { StringKey } from '../../i18n/translations'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

interface Skill {
  /** Proper-noun label shown as-is. */
  name?: string
  /** Translated label, used when the skill name is localised. */
  nameKey?: StringKey
  percent: number
}

const SKILLS: readonly Skill[] = [
  { name: 'TypeScript / Node.js', percent: 90 },
  { name: 'NestJS', percent: 85 },
  { nameKey: 'skills.hex', percent: 80 },
  { name: 'SQL / TypeORM', percent: 75 },
  { name: 'Unit Testing / SonarQube', percent: 75 },
  { name: 'React / Full Stack', percent: 60 },
]

function SkillBar({ skill }: { skill: Skill }) {
  const { t } = useI18n()
  const { ref, revealed } = useScrollReveal<HTMLDivElement>({ threshold: 0.3 })
  const label = skill.nameKey ? t(skill.nameKey) : skill.name

  return (
    <div>
      <div className="mb-2 flex justify-between text-sm font-medium">
        <span className="text-foreground">{label}</span>
        <span className="text-primary">{skill.percent}%</span>
      </div>
      <div
        ref={ref}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={skill.percent}
        className="h-2 overflow-hidden rounded-full bg-layer-line"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-1000 ease-out motion-reduce:transition-none"
          style={{ width: revealed ? `${skill.percent}%` : '0%' }}
        />
      </div>
    </div>
  )
}

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
          <Reveal delay={300} className="flex flex-col gap-5">
            {SKILLS.map((skill) => (
              <SkillBar key={skill.name ?? skill.nameKey} skill={skill} />
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
