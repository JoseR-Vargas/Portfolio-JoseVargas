import { useI18n } from '../../i18n/I18nProvider'
import type { StringKey } from '../../i18n/translations'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

interface Project {
  title: string
  image: string
  imageAlt: string
  href: string
  descKey: StringKey
  tags: readonly string[]
}

// Paqueteria24, TecniServi and Hostal Mayelewoo are commented out in the legacy
// page ("Hidden for now"); their translations are kept for when they return.
const PROJECTS: readonly Project[] = [
  {
    title: 'Booking App — Barberia',
    image: '/img/booking-app-project.png',
    imageAlt: 'Booking App Barberia',
    href: 'https://booking-app-front-peach.vercel.app/',
    descKey: 'projects.booking.desc',
    tags: ['JavaScript', 'Bootstrap 5', 'Real-time Alerts', 'Vercel'],
  },
  {
    title: 'Avila Grill Miami',
    image: 'https://avilagrillmiami.vercel.app/img/FoodTruckAvilaGrill.JPG',
    imageAlt: 'Avila Grill Miami',
    href: 'https://avilagrillmiami.vercel.app/',
    descKey: 'projects.avila.desc',
    tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap 5'],
  },
  {
    title: 'LisCake',
    image: 'https://liscake.netlify.app/img/cake.jpg',
    imageAlt: 'LisCake',
    href: 'https://liscake.netlify.app/',
    descKey: 'projects.liscake.desc',
    tags: ['HTML', 'CSS', 'JavaScript', 'WhatsApp API'],
  },
  {
    title: 'Nice Surprise',
    image: '/img/nice-surprise-project.jpg',
    imageAlt: 'Nice Surprise',
    href: 'https://nicesurprise.netlify.app/',
    descKey: 'projects.surprise.desc',
    tags: ['React', 'Vite', 'Mercado Pago', 'E-commerce'],
  },
]

export function Projects() {
  const { t } = useI18n()

  return (
    <section id="projects" className="scroll-mt-20 bg-neutral-100 py-24 text-neutral-600">
      <Container>
        <SectionHeading tagKey="projects.tag" titleKey="projects.title" subtitleKey="projects.subtitle" />
        <div className="grid gap-8 md:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <Reveal key={project.href} delay={200 + index * 100} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-xl">
                <div className="group relative aspect-video overflow-hidden bg-neutral-200">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/90 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 motion-reduce:transition-none">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={t('projects.liveDemo')}
                      aria-label={`${t('projects.liveDemo')}: ${project.title}`}
                      className="inline-flex size-12 items-center justify-center rounded-full bg-white text-xl text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <i className="bi bi-eye" aria-hidden="true" />
                    </a>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-lg font-bold text-neutral-900">{project.title}</h3>
                  <p className="mb-4 flex-1 text-sm leading-7">{t(project.descKey)}</p>
                  <ul className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-600"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
