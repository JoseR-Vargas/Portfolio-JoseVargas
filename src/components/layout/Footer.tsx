import { useI18n } from '../../i18n/I18nProvider'
import { Container } from '../ui/Container'

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="border-t border-layer-line bg-background-1 py-8 text-center text-sm text-muted-foreground-1">
      <Container>
        <p>{t('footer.rights')}</p>
        <p className="mt-1 text-xs text-muted-foreground-2">
          Node.js · NestJS · TypeScript · Hexagonal Architecture
        </p>
      </Container>
    </footer>
  )
}
