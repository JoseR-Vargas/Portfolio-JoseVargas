/**
 * Portfolio Main JavaScript - Modernized
 * AOS animations, skill bar animations, Poppins design system
 */

// ===== UTILITIES =====
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

    static on(element, event, handler) {
        if (element) element.addEventListener(event, handler);
    }
}

// ===== NAVIGATION MANAGER =====
class NavigationManager {
    constructor() {
        this.navToggle = DOMUtils.$('#abrir');
        this.navClose = DOMUtils.$('#cerrar');
        this.navMenu = DOMUtils.$('#nav');
        this.navLinks = DOMUtils.$$('.nav__link');

        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
    }

    bindEvents() {
        DOMUtils.on(this.navToggle, 'click', () => this.showMenu());
        DOMUtils.on(this.navClose, 'click', () => this.hideMenu());

        this.navLinks.forEach(link => {
            DOMUtils.on(link, 'click', () => this.hideMenu());
        });
    }

    showMenu() {
        DOMUtils.addClass(this.navMenu, 'show-menu');
    }

    hideMenu() {
        DOMUtils.removeClass(this.navMenu, 'show-menu');
    }

    handleScroll() {
        const header = DOMUtils.$('.header');

        DOMUtils.on(window, 'scroll', () => {
            if (window.scrollY >= 50) {
                DOMUtils.addClass(header, 'scroll-header');
            } else {
                DOMUtils.removeClass(header, 'scroll-header');
            }
        });
    }
}

// ===== SMOOTH SCROLL MANAGER =====
class SmoothScrollManager {
    constructor() {
        this.init();
    }

    init() {
        const links = DOMUtils.$$('a[href^="#"]');

        links.forEach(link => {
            DOMUtils.on(link, 'click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = DOMUtils.$(targetId);

                if (targetElement) {
                    this.scrollToElement(targetElement);
                }
            });
        });
    }

    scrollToElement(element) {
        const headerHeight = DOMUtils.$('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;

        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// ===== FORM MANAGER =====
class FormManager {
    constructor() {
        this.form = DOMUtils.$('#contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            DOMUtils.on(this.form, 'submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        if (this.validateForm(data)) {
            this.submitForm(data);
        }
    }

    validateForm(data) {
        const { name, email, message } = data;

        if (!name.trim() || !email.trim() || !message.trim()) {
            this.showMessage('Please fill in all fields', 'error');
            return false;
        }

        if (!this.isValidEmail(email)) {
            this.showMessage('Please enter a valid email address', 'error');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async submitForm(data) {
        try {
            this.showMessage('Sending message...', 'info');

            const baseUrl = window.ApiConfig ? window.ApiConfig.getBaseUrl() : 'http://localhost:3002/api';

            const response = await fetch(`${baseUrl}/contacts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            this.showMessage('Message sent successfully!', 'success');
            this.form.reset();
        } catch (error) {
            console.error('Error sending message:', error);
            this.showMessage('Error sending message. Please try again.', 'error');
        }
    }

    showMessage(message, type) {
        let messageEl = DOMUtils.$('.form-message');

        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.className = 'form-message';
            this.form.appendChild(messageEl);
        }

        messageEl.textContent = message;
        messageEl.className = `form-message form-message--${type}`;

        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }
}

// ===== TYPEWRITER EFFECT =====
class TypewriterEffect {
    constructor(element, texts, typeSpeed = 90, deleteSpeed = 55, pauseTime = 2200) {
        this.element = element;
        this.texts = texts;
        this.typeSpeed = typeSpeed;
        this.deleteSpeed = deleteSpeed;
        this.pauseTime = pauseTime;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    cancel() {
        this.cancelled = true;
    }

    type() {
        if (this.cancelled) return;
        const currentText = this.texts[this.textIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let delay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            delay = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            delay = 400;
        }

        setTimeout(() => this.type(), delay);
    }
}

// ===== SKILL BAR ANIMATIONS =====
class SkillBarAnimator {
    constructor() {
        this.init();
    }

    init() {
        const bars = DOMUtils.$$('.skill-bar__fill');
        if (!bars.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        bars.forEach(bar => observer.observe(bar));
    }
}

// ===== APP INITIALIZER =====
class PortfolioApp {
    constructor() {
        this.managers = [];
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            DOMUtils.on(document, 'DOMContentLoaded', () => this.initializeManagers());
        } else {
            this.initializeManagers();
        }
    }

    initializeManagers() {
        try {
            const langManager = new LanguageManager();

            this.managers.push(
                langManager,
                new NavigationManager(),
                new SmoothScrollManager(),
                new FormManager(),
                new SkillBarAnimator()
            );

            // Initialize AOS
            AOS.init({ easing: 'ease', duration: 400, once: true });

            // Typewriter effect on hero subtitle
            const typedEl = DOMUtils.$('#typed-text');
            let typewriter;
            if (typedEl) {
                typewriter = new TypewriterEffect(typedEl, langManager.getTypewriterTexts());
            }

            // Restart typewriter with new language strings on toggle
            DOMUtils.on(document, 'langchange', () => {
                if (typewriter) typewriter.cancel();
                if (typedEl) {
                    typedEl.textContent = '';
                    typewriter = new TypewriterEffect(typedEl, langManager.getTypewriterTexts());
                }
            });

            console.log('Portfolio app initialized successfully');
        } catch (error) {
            console.error('Error initializing portfolio app:', error);
        }
    }
}

// ===== INITIALIZE APP =====
new PortfolioApp();
