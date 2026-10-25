import { useMemo, useState } from 'react'
import { Filters } from '../components/dashboard/Filters'
import { MessageDialog } from '../components/dashboard/MessageDialog'
import { MessageList } from '../components/dashboard/MessageList'
import {
  DEFAULT_FILTERS,
  computeStats,
  filterMessages,
  getMessageId,
  type MessageFilters,
} from '../components/dashboard/messageUtils'
import { StatsGrid } from '../components/dashboard/StatsGrid'
import { DASHBOARD_TEXT } from '../components/dashboard/strings'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useMessages } from '../hooks/useMessages'
import type { ContactMessage } from '../services/api'

export default function DashboardPage() {
  const { messages, loading, reload, updateStatus, markAllAsRead } = useMessages()
  const [filters, setFilters] = useState<MessageFilters>(DEFAULT_FILTERS)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useDocumentMeta(DASHBOARD_TEXT.documentTitle, 'en')

  const stats = useMemo(() => computeStats(messages), [messages])
  const visibleMessages = useMemo(() => filterMessages(messages, filters), [messages, filters])
  // Derived from the list so status changes are reflected while the dialog is open.
  const selected = messages.find((message) => getMessageId(message) === selectedId) ?? null

  const handleSelect = (message: ContactMessage) => {
    setSelectedId(getMessageId(message))
    if (message.status === 'unread') void updateStatus(message, 'read')
  }

  const handleMarkRead = (message: ContactMessage) => {
    if (message.status === 'unread') void updateStatus(message, 'read')
  }

  const handleReply = (message: ContactMessage) => {
    const subject = encodeURIComponent(DASHBOARD_TEXT.reply.subject(message.name))
    const body = encodeURIComponent(DASHBOARD_TEXT.reply.body(message.name))
    window.open(`mailto:${message.email}?subject=${subject}&body=${body}`)
    void updateStatus(message, 'replied')
  }

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-layer-line bg-background/90 backdrop-blur">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-4">
          <h1 className="flex items-center gap-3 text-xl font-semibold text-foreground sm:text-2xl">
            <i className="bi bi-envelope-fill text-primary" aria-hidden="true" />
            {DASHBOARD_TEXT.title}
          </h1>
          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={() => void reload()}>
              <i className="bi bi-arrow-clockwise" aria-hidden="true" />
              {DASHBOARD_TEXT.refresh}
            </Button>
            <Button as="a" variant="primary" href="/">
              <i className="bi bi-house-fill" aria-hidden="true" />
              {DASHBOARD_TEXT.home}
            </Button>
          </div>
        </Container>
      </header>

      <main>
        <Container className="flex flex-col gap-8 py-8">
          <StatsGrid stats={stats} />
          <Filters filters={filters} onChange={setFilters} />

          <section aria-labelledby="messagesTitle" aria-busy={loading}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 id="messagesTitle" className="text-xl font-semibold text-foreground">
                {DASHBOARD_TEXT.messages.title}
              </h2>
              <Button variant="secondary" onClick={() => void markAllAsRead()}>
                <i className="bi bi-check2-all" aria-hidden="true" />
                {DASHBOARD_TEXT.messages.markAllRead}
              </Button>
            </div>
            <MessageList messages={visibleMessages} loading={loading} onSelect={handleSelect} />
          </section>
        </Container>
      </main>

      {selected && (
        <MessageDialog
          message={selected}
          onClose={() => setSelectedId(null)}
          onMarkRead={handleMarkRead}
          onReply={handleReply}
        />
      )}
    </>
  )
}
