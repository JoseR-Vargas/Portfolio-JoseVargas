/**
 * Dashboard copy. The legacy dashboard was never translated (hardcoded
 * English, no i18n script), so the strings stay English and live here instead
 * of the two-language portfolio translations.
 */
export const DASHBOARD_TEXT = {
  documentTitle: 'Dashboard - Contact Messages',
  title: 'Contact Dashboard',
  refresh: 'Refresh',
  home: 'Home',
  stats: {
    label: 'Message statistics',
    total: 'Total Messages',
    today: 'Today',
    last24h: 'Last 24h',
  },
  filters: {
    label: 'Filter messages',
    searchLabel: 'Search messages',
    searchPlaceholder: 'Search messages...',
    statusLabel: 'Filter by status',
    status: {
      all: 'All Status',
      unread: 'Unread',
      read: 'Read',
      replied: 'Replied',
    },
    dateLabel: 'Filter by date',
    date: {
      all: 'All Time',
      today: 'Today',
      week: 'This Week',
      month: 'This Month',
    },
  },
  messages: {
    title: 'Contact Messages',
    markAllRead: 'Mark All Read',
    loading: 'Loading messages...',
  },
  empty: {
    title: 'No messages yet',
    description: 'When visitors submit the contact form, their messages will appear here.',
    action: 'View Contact Form',
  },
  dialog: {
    title: 'Message Details',
    close: 'Close',
    name: 'Name',
    email: 'Email',
    date: 'Date',
    status: 'Status',
    message: 'Message',
    markRead: 'Mark as Read',
    alreadyRead: 'Already Read',
    replied: 'Replied',
    reply: 'Reply',
  },
  reply: {
    subject: (name: string) => `Re: Contact from ${name}`,
    body: (name: string) =>
      `Hello ${name},\n\nThank you for your message.\n\nBest regards,\nJose Vargas`,
  },
} as const
