import type { ContactMessage } from '../../services/api'
import { cx } from '../ui/cx'
import { formatDate, getPreview } from './messageUtils'
import { StatusBadge } from './StatusBadge'

interface MessageCardProps {
  message: ContactMessage
  onSelect: (message: ContactMessage) => void
}

/** A native button keeps the card focusable and Enter/Space-activatable (legacy: tabindex + key handler). */
export function MessageCard({ message, onSelect }: MessageCardProps) {
  const unread = message.status === 'unread'

  return (
    <button
      type="button"
      onClick={() => onSelect(message)}
      className={cx(
        'block w-full cursor-pointer rounded-xl border border-layer-line bg-layer p-4 text-start transition-colors hover:bg-layer-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus',
        unread && 'border-s-4 border-s-primary',
      )}
    >
      <span className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <span className="min-w-0">
          <span
            className={cx(
              'block truncate text-base text-foreground',
              unread ? 'font-bold' : 'font-semibold',
            )}
          >
            {message.name}
          </span>
          <span className="block truncate text-sm text-muted-foreground-1">{message.email}</span>
        </span>
        <span className="flex shrink-0 items-center gap-3">
          <span className="text-xs text-muted-foreground-1">{formatDate(message.createdAt)}</span>
          <StatusBadge status={message.status} />
        </span>
      </span>
      <span className="mt-3 block text-sm break-words text-muted-foreground-1">
        {getPreview(message.message)}
      </span>
    </button>
  )
}
