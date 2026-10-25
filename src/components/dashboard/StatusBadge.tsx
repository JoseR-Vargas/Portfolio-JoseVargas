import { cx } from '../ui/cx'

const STATUS_CLASSES: Record<string, string> = {
  unread: 'border-primary/40 bg-primary/10 text-primary',
  read: 'border-layer-line bg-layer text-muted-foreground-1',
  replied: 'border-green-500/40 bg-green-500/10 text-green-400',
}

const FALLBACK_CLASSES = 'border-layer-line bg-layer text-muted-foreground-1'

/** The status is always written out, never conveyed by color alone. */
export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize',
        STATUS_CLASSES[status] ?? FALLBACK_CLASSES,
      )}
    >
      {status}
    </span>
  )
}
