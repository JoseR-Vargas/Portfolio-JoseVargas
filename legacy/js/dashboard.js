/**
 * Dashboard JavaScript - Following SOLID, DRY, YAGNI Principles
 * Manages contact form submissions with NestJS backend integration ready
 */

// ===== UTILITIES (DRY Principle) =====
class DOMUtils {
    static $(selector) {
        return document.querySelector(selector);
    }
    
    static $$(selector) {
        return document.querySelectorAll(selector);
    }
    
    static addClass(element, className) {
        if (element) element.classList.add(className);
    }
    
    static removeClass(element, className) {
        if (element) element.classList.remove(className);
    }
    
    static toggleClass(element, className) {
        if (element) element.classList.toggle(className);
    }
    
    static on(element, event, handler) {
        if (element) element.addEventListener(event, handler);
    }
    
    static create(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else {
                element.setAttribute(key, value);
            }
        });
        if (content) element.innerHTML = content;
        return element;
    }
}

// ===== DATE UTILITIES =====
class DateUtils {
    static formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(date));
    }
    
    static isToday(date) {
        const today = new Date();
        const messageDate = new Date(date);
        return today.toDateString() === messageDate.toDateString();
    }
    
    static isWithin24Hours(date) {
        const now = new Date();
        const messageDate = new Date(date);
        const diffHours = (now - messageDate) / (1000 * 60 * 60);
        return diffHours <= 24;
    }
    
    static isThisWeek(date) {
        const now = new Date();
        const messageDate = new Date(date);
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
        return messageDate >= weekStart;
    }
    
    static isThisMonth(date) {
        const now = new Date();
        const messageDate = new Date(date);
        return now.getMonth() === messageDate.getMonth() && 
               now.getFullYear() === messageDate.getFullYear();
    }
}

// ===== LOCAL STORAGE SERVICE (Single Responsibility) =====
class StorageService {
    static STORAGE_KEY = 'portfolio_contact_messages';
    
    static getMessages() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return [];
        }
    }
    
    static saveMessages(messages) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(messages));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }
    
    static addMessage(message) {
        const messages = this.getMessages();
        const newMessage = {
            id: this.generateId(),
            ...message,
            status: 'unread',
            createdAt: new Date().toISOString()
        };
        messages.unshift(newMessage);
        return this.saveMessages(messages) ? newMessage : null;
    }
    
    static updateMessage(id, updates) {
        const messages = this.getMessages();
        const index = messages.findIndex(msg => msg.id === id);
        if (index !== -1) {
            messages[index] = { ...messages[index], ...updates };
            this.saveMessages(messages);
            return messages[index];
        }
        return null;
    }
    
    static deleteMessage(id) {
        const messages = this.getMessages();
        const filteredMessages = messages.filter(msg => msg.id !== id);
        return this.saveMessages(filteredMessages);
    }
    
    static generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

// ===== API SERVICE (Using from api-config.js) =====
// ApiService is loaded from api-config.js

// ===== STATS MANAGER (Single Responsibility) =====
class StatsManager {
    constructor(messages) {
        this.messages = messages;
    }
    
    getTotalMessages() {
        return this.messages.length;
    }
    
    getTodayMessages() {
        return this.messages.filter(msg => DateUtils.isToday(msg.createdAt)).length;
    }
    
    getRecentMessages() {
        return this.messages.filter(msg => DateUtils.isWithin24Hours(msg.createdAt)).length;
    }
    
    updateStatsDisplay() {
        const totalEl = DOMUtils.$('#totalMessages');
        const todayEl = DOMUtils.$('#todayMessages');
        const recentEl = DOMUtils.$('#recentMessages');
        
        if (totalEl) totalEl.textContent = this.getTotalMessages();
        if (todayEl) todayEl.textContent = this.getTodayMessages();
        if (recentEl) recentEl.textContent = this.getRecentMessages();
    }
}

// ===== MESSAGE FILTER (Single Responsibility) =====
class MessageFilter {
    constructor() {
        this.searchTerm = '';
        this.statusFilter = 'all';
        this.dateFilter = 'all';
    }
    
    setSearch(term) {
        this.searchTerm = term.toLowerCase();
    }
    
    setStatusFilter(status) {
        this.statusFilter = status;
    }
    
    setDateFilter(date) {
        this.dateFilter = date;
    }
    
    filter(messages) {
        return messages.filter(message => {
            // Search filter
            if (this.searchTerm) {
                const searchableText = `${message.name} ${message.email} ${message.message}`.toLowerCase();
                if (!searchableText.includes(this.searchTerm)) {
                    return false;
                }
            }
            
            // Status filter
            if (this.statusFilter !== 'all' && message.status !== this.statusFilter) {
                return false;
            }
            
            // Date filter
            if (this.dateFilter !== 'all') {
                switch (this.dateFilter) {
                    case 'today':
                        if (!DateUtils.isToday(message.createdAt)) return false;
                        break;
                    case 'week':
                        if (!DateUtils.isThisWeek(message.createdAt)) return false;
                        break;
                    case 'month':
                        if (!DateUtils.isThisMonth(message.createdAt)) return false;
                        break;
                }
            }
            
            return true;
        });
    }
}

// ===== MESSAGE RENDERER (Single Responsibility) =====
class MessageRenderer {
    static renderMessage(message) {
        const messageId = message._id || message.id; // MongoDB compatibility
        const messageEl = DOMUtils.create('div', {
            className: `message-item ${message.status}`,
            'data-id': messageId,
            tabindex: '0'
        });
        
        messageEl.innerHTML = `
            <div class="message-header">
                <div class="message-info">
                    <h3 class="message-name">${this.escapeHtml(message.name)}</h3>
                    <p class="message-email">${this.escapeHtml(message.email)}</p>
                </div>
                <div class="message-meta">
                    <span class="message-date">${DateUtils.formatDate(message.createdAt)}</span>
                    <span class="message-status ${message.status}">${message.status}</span>
                </div>
            </div>
            <div class="message-preview">
                ${this.escapeHtml(message.message.substring(0, 150))}${message.message.length > 150 ? '...' : ''}
            </div>
        `;
        
        return messageEl;
    }
    
    static renderMessageDetail(message) {
        return `
            <div class="message-detail">
                <div class="detail-field">
                    <label class="detail-label">Name</label>
                    <div class="detail-value">${this.escapeHtml(message.name)}</div>
                </div>
                <div class="detail-field">
                    <label class="detail-label">Email</label>
                    <div class="detail-value email">${this.escapeHtml(message.email)}</div>
                </div>
                <div class="detail-field">
                    <label class="detail-label">Date</label>
                    <div class="detail-value">${DateUtils.formatDate(message.createdAt)}</div>
                </div>
                <div class="detail-field">
                    <label class="detail-label">Status</label>
                    <div class="detail-value">
                        <span class="message-status ${message.status}">${message.status}</span>
                    </div>
                </div>
                <div class="detail-field">
                    <label class="detail-label">Message</label>
                    <div class="detail-value">${this.escapeHtml(message.message).replace(/\n/g, '<br>')}</div>
                </div>
            </div>
        `;
    }
    
    static escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// ===== MODAL MANAGER (Single Responsibility) =====
class ModalManager {
    constructor() {
        this.modal = DOMUtils.$('#messageModal');
        this.overlay = DOMUtils.$('#modalOverlay');
        this.closeBtn = DOMUtils.$('#modalCloseBtn');
        this.body = DOMUtils.$('#modalBody');
        this.markReadBtn = DOMUtils.$('#modalMarkReadBtn');
        this.replyBtn = DOMUtils.$('#modalReplyBtn');
        this.currentMessage = null;
        
        this.init();
    }
    
    init() {
        DOMUtils.on(this.closeBtn, 'click', () => this.close());
        DOMUtils.on(this.overlay, 'click', () => this.close());
        DOMUtils.on(document, 'keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.close();
            }
        });
        
        DOMUtils.on(this.markReadBtn, 'click', () => this.markAsRead());
        DOMUtils.on(this.replyBtn, 'click', () => this.reply());
    }
    
    open(message) {
        this.currentMessage = message;
        this.body.innerHTML = MessageRenderer.renderMessageDetail(message);
        DOMUtils.addClass(this.modal, 'show');
        document.body.style.overflow = 'hidden';
        
        // Update button state
        if (message.status === 'read' || message.status === 'replied') {
            this.markReadBtn.disabled = true;
            this.markReadBtn.textContent = 'Already Read';
        } else {
            this.markReadBtn.disabled = false;
            this.markReadBtn.innerHTML = '<i class="bi bi-check"></i> Mark as Read';
        }
    }
    
    close() {
        DOMUtils.removeClass(this.modal, 'show');
        document.body.style.overflow = '';
        this.currentMessage = null;
    }
    
    isOpen() {
        return this.modal.classList.contains('show');
    }
    
    async markAsRead() {
        if (!this.currentMessage || this.currentMessage.status !== 'unread') return;
        
        const messageId = this.currentMessage._id || this.currentMessage.id;
        const updated = await ApiService.updateMessageStatus(messageId, 'read');
        if (updated) {
            this.currentMessage.status = 'read';
            this.markReadBtn.disabled = true;
            this.markReadBtn.textContent = 'Already Read';
            
            // Trigger dashboard refresh
            window.dispatchEvent(new CustomEvent('messageUpdated'));
        }
    }
    
    reply() {
        if (!this.currentMessage) return;
        
        const subject = `Re: Contact from ${this.currentMessage.name}`;
        const body = `Hello ${this.currentMessage.name},\n\nThank you for your message.\n\nBest regards,\nJose Vargas`;
        const mailtoLink = `mailto:${this.currentMessage.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.open(mailtoLink);
        
        // Mark as replied
        this.markAsReplied();
    }
    
    async markAsReplied() {
        if (!this.currentMessage) return;
        
        const messageId = this.currentMessage._id || this.currentMessage.id;
        const updated = await ApiService.updateMessageStatus(messageId, 'replied');
        if (updated) {
            this.currentMessage.status = 'replied';
            this.markReadBtn.disabled = true;
            this.markReadBtn.textContent = 'Replied';
            
            // Trigger dashboard refresh
            window.dispatchEvent(new CustomEvent('messageUpdated'));
        }
    }
}

// ===== MAIN DASHBOARD MANAGER (Open/Closed Principle) =====
class DashboardManager {
    constructor() {
        this.messages = [];
        this.filteredMessages = [];
        this.filter = new MessageFilter();
        this.modal = new ModalManager();
        this.statsManager = null;
        
        this.elements = {
            searchInput: DOMUtils.$('#searchInput'),
            statusFilter: DOMUtils.$('#statusFilter'),
            dateFilter: DOMUtils.$('#dateFilter'),
            refreshBtn: DOMUtils.$('#refreshBtn'),
            markAllReadBtn: DOMUtils.$('#markAllReadBtn'),
            loadingState: DOMUtils.$('#loadingState'),
            emptyState: DOMUtils.$('#emptyState'),
            messagesList: DOMUtils.$('#messagesList'),
            messagesContainer: DOMUtils.$('#messagesContainer')
        };
        
        this.init();
    }
    
    async init() {
        this.bindEvents();
        await this.loadMessages();
        this.setupMessageListener();
    }
    
    bindEvents() {
        // Search and filters
        DOMUtils.on(this.elements.searchInput, 'input', (e) => {
            this.filter.setSearch(e.target.value);
            this.applyFilters();
        });
        
        DOMUtils.on(this.elements.statusFilter, 'change', (e) => {
            this.filter.setStatusFilter(e.target.value);
            this.applyFilters();
        });
        
        DOMUtils.on(this.elements.dateFilter, 'change', (e) => {
            this.filter.setDateFilter(e.target.value);
            this.applyFilters();
        });
        
        // Actions
        DOMUtils.on(this.elements.refreshBtn, 'click', () => this.loadMessages());
        DOMUtils.on(this.elements.markAllReadBtn, 'click', () => this.markAllAsRead());
        
        // Message clicks
        DOMUtils.on(this.elements.messagesList, 'click', (e) => {
            const messageItem = e.target.closest('.message-item');
            if (messageItem) {
                const messageId = messageItem.dataset.id;
                const message = this.messages.find(msg => (msg._id || msg.id) === messageId);
                if (message) {
                    this.modal.open(message);
                    this.markAsReadIfUnread(message);
                }
            }
        });
        
        // Keyboard navigation
        DOMUtils.on(this.elements.messagesList, 'keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const messageItem = e.target.closest('.message-item');
                if (messageItem) {
                    messageItem.click();
                }
            }
        });
    }
    
    setupMessageListener() {
        // Listen for new messages from contact form
        window.addEventListener('newContactMessage', (e) => {
            this.addNewMessage(e.detail);
        });
        
        // Listen for message updates
        window.addEventListener('messageUpdated', () => {
            this.loadMessages();
        });
    }
    
    async loadMessages() {
        this.showLoading();
        
        try {
            this.messages = await ApiService.getMessages();
            this.statsManager = new StatsManager(this.messages);
            this.statsManager.updateStatsDisplay();
            this.applyFilters();
        } catch (error) {
            console.error('Error loading messages:', error);
            this.showEmpty();
        }
    }
    
    applyFilters() {
        this.filteredMessages = this.filter.filter(this.messages);
        this.renderMessages();
    }
    
    renderMessages() {
        if (this.filteredMessages.length === 0) {
            this.showEmpty();
            return;
        }
        
        this.hideLoadingAndEmpty();
        this.elements.messagesList.innerHTML = '';
        
        this.filteredMessages.forEach(message => {
            const messageEl = MessageRenderer.renderMessage(message);
            this.elements.messagesList.appendChild(messageEl);
        });
    }
    
    addNewMessage(messageData) {
        const newMessage = StorageService.addMessage(messageData);
        if (newMessage) {
            this.loadMessages(); // Refresh the dashboard
        }
    }
    
    async markAsReadIfUnread(message) {
        if (message.status === 'unread') {
            const messageId = message._id || message.id;
            await ApiService.updateMessageStatus(messageId, 'read');
            message.status = 'read';
            this.statsManager.updateStatsDisplay();
            
            // Update the message item in the list
            const messageItem = DOMUtils.$(`[data-id="${messageId}"]`);
            if (messageItem) {
                DOMUtils.removeClass(messageItem, 'unread');
                DOMUtils.addClass(messageItem, 'read');
                const statusEl = messageItem.querySelector('.message-status');
                if (statusEl) {
                    statusEl.textContent = 'read';
                    statusEl.className = 'message-status read';
                }
            }
        }
    }
    
    async markAllAsRead() {
        const unreadMessages = this.messages.filter(msg => msg.status === 'unread');
        
        for (const message of unreadMessages) {
            const messageId = message._id || message.id;
            await ApiService.updateMessageStatus(messageId, 'read');
        }
        
        await this.loadMessages();
    }
    
    showLoading() {
        this.elements.loadingState.style.display = 'flex';
        this.elements.emptyState.style.display = 'none';
        this.elements.messagesList.style.display = 'none';
    }
    
    showEmpty() {
        this.elements.loadingState.style.display = 'none';
        this.elements.emptyState.style.display = 'flex';
        this.elements.messagesList.style.display = 'none';
    }
    
    hideLoadingAndEmpty() {
        this.elements.loadingState.style.display = 'none';
        this.elements.emptyState.style.display = 'none';
        this.elements.messagesList.style.display = 'block';
    }
}

// ===== CONTACT FORM INTEGRATION =====
class ContactFormIntegration {
    static init() {
        // Listen for form submissions from index.html
        window.addEventListener('storage', (e) => {
            if (e.key === StorageService.STORAGE_KEY) {
                // New message added, refresh dashboard if open
                window.dispatchEvent(new CustomEvent('messageUpdated'));
            }
        });
    }
    
    // Function to be called from index.html contact form (fallback)
    static async addMessage(formData) {
        try {
            // Try API first
            const messageData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone || '',
                message: formData.message
            };
            
            const newMessage = await ApiService.createMessage(messageData);
            
            // Notify dashboard if it's open in another tab
            window.dispatchEvent(new CustomEvent('newContactMessage', {
                detail: messageData
            }));
            
            return newMessage;
        } catch (error) {
            console.error('Error in ContactFormIntegration:', error);
            // Fallback to localStorage
            const messageData = {
                name: formData.name,
                email: formData.email,
                message: formData.message
            };
            
            const newMessage = StorageService.addMessage(messageData);
            
            window.dispatchEvent(new CustomEvent('newContactMessage', {
                detail: messageData
            }));
            
            return newMessage;
        }
    }
}

// ===== INITIALIZE DASHBOARD =====
class DashboardApp {
    constructor() {
        this.init();
    }
    
    init() {
        if (document.readyState === 'loading') {
            DOMUtils.on(document, 'DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }
    
    initializeApp() {
        try {
            // Initialize contact form integration
            ContactFormIntegration.init();
            
            // Initialize dashboard
            new DashboardManager();
            
            console.log('Dashboard initialized successfully');
        } catch (error) {
            console.error('Error initializing dashboard:', error);
        }
    }
}

// ===== GLOBAL EXPORTS FOR CONTACT FORM =====
window.ContactFormIntegration = ContactFormIntegration;

// ===== START APPLICATION =====
new DashboardApp();
