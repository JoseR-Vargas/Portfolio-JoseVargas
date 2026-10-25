import type { ContactMessage } from '../../services/api'
import { EmptyState } from './EmptyState'
import { MessageCard } from './MessageCard'
import { getMessageId } from './messageUtils'
import { DASHBOARD_TEXT } from './strings'

interface MessageListProps {
  messages: ContactMessage[]
  loading: boolean
  onSelect: (message: ContactMessage) => void
}

export function MessageList({ messages, loading, onSelect }: MessageListProps) {
  if (loading) {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 px-4 py-16 text-muted-foreground-1"
      >
        <span
          className="size-10 animate-spin rounded-full border-4 border-layer-line border-t-primary motion-reduce:animate-none"
          aria-hidden="true"
        />
        <p>{DASHBOARD_TEXT.messages.loading}</p>
      </div>
    )
  }

  if (messages.length === 0) return <EmptyState />

  return (
    <ul className="flex flex-col gap-3">
      {messages.map((message) => (
        <li key={getMessageId(message)}>
          <MessageCard message={message} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  )
}
