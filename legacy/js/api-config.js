// API Configuration
class ApiConfig {
    static getBaseUrl() {
        // Detect environment
        const isLocalhost = window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1' ||
                          window.location.hostname === '';
        
        if (isLocalhost) {
            // Development environment
            return 'http://localhost:3002/api';
        } else {
            // Production environment - your deployed backend
            return 'https://myportfolio-back-j9ji.onrender.com/api';
        }
    }
}

// Update ApiService to use dynamic URL
class ApiService {
    static get BASE_URL() {
        return ApiConfig.getBaseUrl();
    }
    
    static async getMessages() {
        try {
            const response = await fetch(`${this.BASE_URL}/contacts`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching messages:', error);
            // Fallback to localStorage for offline mode
            return StorageService.getMessages();
        }
    }
    
    static async createMessage(data) {
        try {
            const response = await fetch(`${this.BASE_URL}/contacts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating message:', error);
            // Fallback to localStorage
            return StorageService.addMessage(data);
        }
    }
    
    static async updateMessageStatus(id, status) {
        try {
            const response = await fetch(`${this.BASE_URL}/contacts/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating message status:', error);
            // Fallback to localStorage
            return StorageService.updateMessage(id, { status });
        }
    }
    
    static async deleteMessage(id) {
        try {
            const response = await fetch(`${this.BASE_URL}/contacts/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return true;
        } catch (error) {
            console.error('Error deleting message:', error);
            // Fallback to localStorage
            return StorageService.deleteMessage(id);
        }
    }
    
}
