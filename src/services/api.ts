export interface ContactInput {
  name: string
  email: string
  phone?: string
  message: string
}


export interface ContactMessage extends ContactInput {
  id: string
  status: string
  createdAt: string
}

export class ApiConfig {
  static getBaseUrl(): string {
    const { hostname } = window.location
    const isLocalhost =
      hostname === 'localhost' || hostname === '127.0.0.1' || hostname === ''

    return isLocalhost
      ? 'http://localhost:3002/api'
      : 'https://myportfolio-back-j9ji.onrender.com/api'
  }
}

export class StorageService {
  static readonly STORAGE_KEY = 'portfolio_contact_messages'

  static getMessages(): ContactMessage[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY)
      return data ? (JSON.parse(data) as ContactMessage[]) : []
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return []
    }
  }

  static saveMessages(messages: ContactMessage[]): boolean {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(messages))
      return true
    } catch (error) {
      console.error('Error saving to localStorage:', error)
      return false
    }
  }

  static addMessage(message: ContactInput): ContactMessage | null {
    const messages = this.getMessages()
    const newMessage: ContactMessage = {
      id: this.generateId(),
      ...message,
      status: 'unread',
      createdAt: new Date().toISOString(),
    }
    messages.unshift(newMessage)
    return this.saveMessages(messages) ? newMessage : null
  }

  static updateMessage(
    id: string,
    updates: Partial<ContactMessage>,
  ): ContactMessage | null {
    const messages = this.getMessages()
    const index = messages.findIndex((msg) => msg.id === id)
    if (index !== -1) {
      messages[index] = { ...messages[index], ...updates }
      this.saveMessages(messages)
      return messages[index]
    }
    return null
  }

  static deleteMessage(id: string): boolean {
    const messages = this.getMessages().filter((msg) => msg.id !== id)
    return this.saveMessages(messages)
  }

  static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2)
  }
}

export class ApiService {
  static get BASE_URL(): string {
    return ApiConfig.getBaseUrl()
  }

  static async getMessages(): Promise<ContactMessage[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/contacts`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return (await response.json()) as ContactMessage[]
    } catch (error) {
      console.error('Error fetching messages:', error)
      return StorageService.getMessages()
    }
  }

  static async createMessage(data: ContactInput): Promise<ContactMessage | null> {
    try {
      const response = await fetch(`${this.BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return (await response.json()) as ContactMessage
    } catch (error) {
      console.error('Error creating message:', error)
      return StorageService.addMessage(data)
    }
  }

  static async updateMessageStatus(
    id: string,
    status: string,
  ): Promise<ContactMessage | null> {
    try {
      const response = await fetch(`${this.BASE_URL}/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return (await response.json()) as ContactMessage
    } catch (error) {
      console.error('Error updating message status:', error)
      return StorageService.updateMessage(id, { status })
    }
  }

  static async deleteMessage(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.BASE_URL}/contacts/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return true
    } catch (error) {
      console.error('Error deleting message:', error)
      return StorageService.deleteMessage(id)
    }
  }
}
