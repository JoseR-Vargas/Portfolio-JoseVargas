import { Button } from '../ui/Button'
import { DASHBOARD_TEXT } from './strings'

const { empty: TEXT } = DASHBOARD_TEXT

export function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
      <span className="inline-flex size-16 items-center justify-center rounded-full bg-primary/10 text-3xl text-primary">
        <i className="bi bi-inbox" aria-hidden="true" />
      </span>
      <h3 className="text-xl font-semibold text-foreground">{TEXT.title}</h3>
      <p className="max-w-md text-muted-foreground-1">{TEXT.description}</p>
      <Button as="a" variant="primary" href="/#contact" className="mt-2">
        <i className="bi bi-plus-circle" aria-hidden="true" />
        {TEXT.action}
      </Button>
    </div>
  )
}
