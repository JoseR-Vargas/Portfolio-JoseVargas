import { useCallback, useEffect, useRef, useState } from 'react'
import { getMessageId } from '../components/dashboard/messageUtils'
import { ApiService, StorageService, type ContactMessage } from '../services/api'

/**
 * Loads and mutates contact messages through ApiService (which falls back to
 * localStorage when the API is unavailable).
 */
export function useMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  // Only the latest request may commit its result (rapid refreshes, unmount).
  const latestRequest = useRef(0)

  const fetchMessages = useCallback(() => {
    const request = ++latestRequest.current
    const isLatest = () => request === latestRequest.current

    return ApiService.getMessages()
      .then((data) => {
        if (isLatest()) setMessages(data)
      })
      .catch((error: unknown) => {
        console.error('Error loading messages:', error)
        if (isLatest()) setMessages([])
      })
      .finally(() => {
        if (isLatest()) setLoading(false)
      })
  }, [])

  const reload = useCallback(() => {
    setLoading(true)
    return fetchMessages()
  }, [fetchMessages])

  useEffect(() => {
    void fetchMessages()
    return () => {
      latestRequest.current += 1
    }
  }, [fetchMessages])

  // Another tab stored a new contact message (legacy ContactFormIntegration).
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === StorageService.STORAGE_KEY) void reload()
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [reload])

  const updateStatus = useCallback(async (message: ContactMessage, status: string) => {
    const id = getMessageId(message)
    const updated = await ApiService.updateMessageStatus(id, status)
    if (!updated) return false
    setMessages((previous) =>
      previous.map((item) => (getMessageId(item) === id ? { ...item, status } : item)),
    )
    return true
  }, [])

  const markAllAsRead = useCallback(async () => {
    const unread = messages.filter((message) => message.status === 'unread')
    for (const message of unread) {
      await ApiService.updateMessageStatus(getMessageId(message), 'read')
    }
    await reload()
  }, [messages, reload])

  return { messages, loading, reload, updateStatus, markAllAsRead }
}
