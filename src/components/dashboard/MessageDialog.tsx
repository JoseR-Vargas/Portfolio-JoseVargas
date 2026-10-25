import { useEffect, useRef, type ReactNode } from 'react'
import type { ContactMessage } from '../../services/api'
import { Button } from '../ui/Button'
import { formatDate } from './messageUtils'
import { StatusBadge } from './StatusBadge'
import { DASHBOARD_TEXT } from './strings'

interface MessageDialogProps {
  message: ContactMessage
  onClose: () => void
  onMarkRead: (message: ContactMessage) => void
  onReply: (message: ContactMessage) => void
}

const { dialog: TEXT } = DASHBOARD_TEXT

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="mb-1 text-xs font-semibold tracking-wide text-muted-foreground-1 uppercase">
        {label}
      </dt>
      <dd className="break-words text-foreground">{children}</dd>
    </div>
  )
}

/**
 * Native modal dialog: Escape, focus trapping, inert background and focus
 * restoration come from the platform. Backdrop click closes it (legacy overlay).
 */
export function MessageDialog({ message, onClose, onMarkRead, onReply }: MessageDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (!dialog.open) dialog.showModal()
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
      dialog.close()
    }
  }, [])

  const markReadLabel =
    message.status === 'replied'
      ? TEXT.replied
      : message.status === 'unread'
        ? TEXT.markRead
        : TEXT.alreadyRead

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="messageDialogTitle"
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-layer-line bg-layer p-0 text-foreground backdrop:bg-black/70"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="flex max-h-[85vh] flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-layer-line px-6 py-4">
          <h3 id="messageDialogTitle" className="text-lg font-semibold">
            {TEXT.title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label={TEXT.close}
            className="inline-flex size-9 items-center justify-center rounded-full text-xl text-muted-foreground-1 hover:bg-layer-hover focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-focus"
          >
            <i className="bi bi-x" aria-hidden="true" />
          </button>
        </div>

        <dl className="flex flex-col gap-4 overflow-y-auto px-6 py-5">
          <Field label={TEXT.name}>{message.name}</Field>
          <Field label={TEXT.email}>
            <span className="text-primary">{message.email}</span>
          </Field>
          <Field label={TEXT.date}>{formatDate(message.createdAt)}</Field>
          <Field label={TEXT.status}>
            <StatusBadge status={message.status} />
          </Field>
          <Field label={TEXT.message}>
            <span className="whitespace-pre-wrap">{message.message}</span>
          </Field>
        </dl>

        <div className="flex flex-wrap justify-end gap-3 border-t border-layer-line px-6 py-4">
          <Button
            variant="secondary"
            disabled={message.status !== 'unread'}
            onClick={() => onMarkRead(message)}
          >
            {message.status === 'unread' && <i className="bi bi-check" aria-hidden="true" />}
            {markReadLabel}
          </Button>
          <Button variant="primary" onClick={() => onReply(message)}>
            <i className="bi bi-reply" aria-hidden="true" />
            {TEXT.reply}
          </Button>
        </div>
      </div>
    </dialog>
  )
}
