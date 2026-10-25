import { CV_URL } from '../../data/site'
import { useTypewriter } from '../../hooks/useTypewriter'
import { useI18n } from '../../i18n/I18nProvider'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/JoseR-Vargas', icon: 'bi-github' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jose-vargas-development-full-stack2025/',
    icon: 'bi-linkedin',
  },
] as const

export function Hero() {
  const { t, tList } = useI18n()
  const typed = useTypewriter(tList('hero.typewriter'))

  return (
    <section
      id="home"
      className="relative flex min-h-screen scroll-mt-20 items-center overflow-hidden bg-background pt-20"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(255,107,43,0.08)_0%,transparent_60%),radial-gradient(ellipse_at_80%_20%,rgba(255,107,43,0.05)_0%,transparent_50%)]"
      />
      <Container className="relative z-10 flex items-center justify-between gap-12">
        <Reveal delay={200} className="flex-1 text-center lg:max-w-xl lg:text-left">
          <h3 className="mb-3 text-lg font-medium tracking-wide text-primary">{t('hero.greeting')}</h3>
          <h1 className="mb-4 text-5xl leading-[1.05] font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Jose
            <br />
            Vargas
          </h1>
          <h2 className="mb-6 flex min-h-10 items-center justify-center gap-0.5 text-xl font-medium text-foreground/80 sm:text-2xl lg:justify-start">
            <span aria-live="off">{typed}</span>
            <span aria-hidden="true" className="ml-px animate-cursor-blink font-light text-primary">
              |
            </span>
          </h2>
          <p
            className="mx-auto mb-8 max-w-lg leading-8 text-foreground/50 lg:mx-0 [&_strong]:text-foreground/85"
            dangerouslySetInnerHTML={{ __html: t('hero.description') }}
          />
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Button as="a" variant="primary" href="#contact">
              {t('hero.cta.contact')}
            </Button>
            <Button as="a" variant="secondary" href={CV_URL} download>
              <i className="bi bi-download" aria-hidden="true" />
              {t('about.downloadCV')}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={600} from="left" className="hidden shrink-0 items-center gap-6 lg:flex">
          <div className="h-[370px] w-[300px] overflow-hidden rounded-3xl border-[3px] border-primary shadow-[0_0_40px_rgba(255,107,43,0.15)]">
            <img
              src="/img/Profile_picture_black_and_white.jpeg"
              alt="Jose Vargas"
              className="size-full object-cover object-top"
            />
          </div>
          <div className="flex flex-col gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex size-11 items-center justify-center rounded-full border border-layer-line bg-layer text-lg text-layer-foreground hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
              >
                <i className={`bi ${icon}`} aria-hidden="true" />
              </a>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
