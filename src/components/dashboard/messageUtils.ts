import type { ContactMessage } from '../../services/api'

export type StatusFilter = 'all' | 'unread' | 'read' | 'replied'
export type DateFilter = 'all' | 'today' | 'week' | 'month'

export interface MessageFilters {
  search: string
  status: StatusFilter
  date: DateFilter
}

export const DEFAULT_FILTERS: MessageFilters = { search: '', status: 'all', date: 'all' }

const HOUR_MS = 60 * 60 * 1000
const PREVIEW_LENGTH = 150

const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

/** MongoDB compatibility: the API may return `_id` instead of `id`. */
export function getMessageId(message: ContactMessage): string {
  return message._id || message.id
}

export function formatDate(date: string): string {
  const parsed = new Date(date)
  return Number.isNaN(parsed.getTime()) ? '' : DATE_FORMATTER.format(parsed)
}

export function getPreview(text: string): string {
  return text.length > PREVIEW_LENGTH ? `${text.substring(0, PREVIEW_LENGTH)}...` : text
}

function isToday(date: string): boolean {
  return new Date().toDateString() === new Date(date).toDateString()
}

function isWithin24Hours(date: string): boolean {
  return (Date.now() - new Date(date).getTime()) / HOUR_MS <= 24
}

/** Week starts on Sunday at 00:00 (legacy compared against "now minus weekday", keeping the time of day). */
function isThisWeek(date: string): boolean {
  const weekStart = new Date()
  weekStart.setHours(0, 0, 0, 0)
  weekStart.setDate(weekStart.getDate() - weekStart.getDay())
  return new Date(date) >= weekStart
}

function isThisMonth(date: string): boolean {
  const now = new Date()
  const messageDate = new Date(date)
  return (
    now.getMonth() === messageDate.getMonth() &&
    now.getFullYear() === messageDate.getFullYear()
  )
}

const DATE_PREDICATES: Record<Exclude<DateFilter, 'all'>, (date: string) => boolean> = {
  today: isToday,
  week: isThisWeek,
  month: isThisMonth,
}

export function filterMessages(
  messages: ContactMessage[],
  { search, status, date }: MessageFilters,
): ContactMessage[] {
  const term = search.toLowerCase()

  return messages.filter((message) => {
    if (term) {
      const searchable = `${message.name} ${message.email} ${message.message}`.toLowerCase()
      if (!searchable.includes(term)) return false
    }
    if (status !== 'all' && message.status !== status) return false
    if (date !== 'all' && !DATE_PREDICATES[date](message.createdAt)) return false
    return true
  })
}

export interface MessageStats {
  total: number
  today: number
  last24h: number
}

export function computeStats(messages: ContactMessage[]): MessageStats {
  return {
    total: messages.length,
    today: messages.filter((m) => isToday(m.createdAt)).length,
    last24h: messages.filter((m) => isWithin24Hours(m.createdAt)).length,
  }
}
