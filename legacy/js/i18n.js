/**
 * LanguageManager — EN/ES i18n for portfolio
 * Applies translations via data-i18n*, persists choice in localStorage
 */
class LanguageManager {
    static STORAGE_KEY = 'portfolio_lang';

    static TRANSLATIONS = {
        en: {
            'meta.title': 'Jose Vargas | Backend Developer',
            'hero.typewriter': ['Software Engineer', 'API Developer', 'Node.js Developer'],
            'hero.greeting': "Hello, I'm",
            'hero.description': 'Specialized in <strong>Node.js</strong> · <strong>NestJS</strong> · <strong>TypeScript</strong>',
            'hero.cta.contact': 'Contact me',
            'hero.cta.work': 'View My Work',
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.stack': 'Stack',
            'nav.skills': 'Skills',
            'nav.resume': 'Resume',
            'nav.projects': 'Projects',
            'nav.contact': 'Contact',
            'nav.openMenu': 'Open menu',
            'nav.closeMenu': 'Close menu',
            'about.tag': 'About Me',
            'about.title': 'About Me',
            'about.name': "Hi! I'm Jose Vargas",
            'about.role': 'Software Developer',
            'about.bio1': "I'm a <strong>Software Developer</strong> focused on designing and building robust server-side systems, REST APIs and business applications. I work primarily with <strong>NestJS</strong>, <strong>Node.js</strong> and <strong>TypeScript</strong>, with a strong emphasis on clean architecture, maintainability and long-term scalability. Check out my work in the <strong>Projects</strong> section.",
            'about.downloadCV': 'Download CV',
            'about.email.label': 'Email',
            'about.location.label': 'Location',
            'about.languages.label': 'Languages',
            'about.languages.value': 'Spanish (native) · English (intermediate)',
            'about.remote.label': 'Remote',
            'about.remote.value': 'Available',
            'stack.tag': 'What I Use',
            'stack.title': 'Tech Stack',
            'stack.node.title': 'Node.js',
            'stack.node.desc': 'Core runtime. REST APIs, async processes, streams.',
            'stack.ts.title': 'TypeScript',
            'stack.ts.desc': 'Static typing, generics, advanced types in production.',
            'stack.nest.title': 'NestJS',
            'stack.nest.desc': 'Primary framework. Modules, Guards, Interceptors, DTOs.',
            'stack.hex.title': 'Hexagonal Arch.',
            'stack.hex.desc': 'Ports, adapters, decoupled use cases.',
            'stack.sql.title': 'SQL / TypeORM',
            'stack.sql.desc': 'Relational modeling, migrations, transactions.',
            'stack.test.title': 'Testing',
            'stack.test.desc': 'Unit testing on use cases. Coverage with SonarQube.',
            'skills.tag': 'My Expertise',
            'skills.title': 'Skills',
            'skills.headline': 'Focused on Backend & Architecture',
            'skills.body': 'With a strong foundation in server-side development, I specialize in building scalable APIs and maintainable architectures following industry best practices.',
            'skills.hex': 'Hexagonal Architecture / DDD',
            'resume.tag': 'My Journey',
            'resume.title': 'Resume',
            'resume.edu.title': 'Education',
            'resume.exp.title': 'Experience',
            'resume.edu.1.date': '12/2023 – 02/2025',
            'resume.edu.1.title': 'Full Stack Developer',
            'resume.edu.1.org': 'CoderHouse',
            'resume.edu.1.body': 'MERN Stack, JS ES6+, backend architectures',
            'resume.edu.2.date': '07/2024 – 11/2024',
            'resume.edu.2.title': 'NestJS & TypeScript',
            'resume.edu.2.org': 'Udemy',
            'resume.edu.2.body': 'Advanced TypeScript, NestJS: modules, services, DTOs',
            'resume.edu.3.date': '2024',
            'resume.edu.3.title': 'SOLID & Clean Code',
            'resume.edu.3.org': 'Online Course',
            'resume.edu.3.body': 'SOLID principles, clean code practices, design patterns',
            'resume.exp.1.date': '05/2025 – Present',
            'resume.exp.1.title': 'Backend Developer',
            'resume.exp.1.org': 'Pormel Software Energy · Montevideo, Uruguay',
            'resume.exp.1.body': 'Backend development with Node.js, TypeScript, NestJS and Redis under hexagonal architecture and CQRS for EDEMSA, EDENOR and Volcan. Development of complete modules (domain, application and infrastructure) with CRUDs, REST APIs and cross-cutting auditing. Unit testing of critical use cases and reduction of technical debt with SonarQube. Persistence in PostgreSQL, MariaDB and Oracle DB; task management with Jira.',
            'resume.exp.2.title': 'Full Stack Developer',
            'resume.exp.2.date': 'Remote',
            'resume.exp.2.body': 'Custom web application development for small businesses with React, Node.js, TypeScript, NestJS, and MongoDB Atlas.',
            'projects.tag': 'My work',
            'projects.title': 'Projects',
            'projects.subtitle': 'Here you will find some of the personal and client projects that I created with each project containing its own case study',
            'projects.p24.desc': 'Lead-generation website for a courier company in Montevideo, Uruguay. It helps capture quote requests from businesses and individuals, while an admin panel lets the team review and manage customer submissions from one place.',
            'projects.tecni.desc': 'Comprehensive website for a technical service company specializing in electronic device repairs. Features service listings, contact forms, location maps, and social media integration.',
            'projects.booking.desc': 'Appointment booking app built for a barbershop in Montevideo. Customers can choose services, date, time and professional, while the admin receives real-time notifications and can manage booking cancellations.',
            'projects.avila.desc': 'Client website for a Miami-based food truck with brand storytelling, a category-based digital menu, business hours, contact details, social media links, and a location section to help customers find the truck quickly.',
            'projects.liscake.desc': 'Modern, responsive website for a local bakery specializing in artisanal cakes and muffins. Features an ordering system, customer testimonials, and WhatsApp integration.',
            'projects.surprise.desc': 'E-commerce website for a special occasion arrangement business where customers can browse products, add items to the cart, and complete purchases using Mercado Pago or bank transfer.',
            'projects.hostal.desc': 'Rental portal for a Cordoba-based lodging business where users can explore room and apartment information, while the admin manages tenant requests, electricity meter submissions, payment vouchers, and invoice workflows.',
            'contact.tag': 'Get in touch',
            'contact.title': 'Contact',
            'contact.subtitle': 'Feel free to reach out by submitting the form below and I will get back to you as soon as possible',
            'contact.infoTitle': 'Let\'s build something <span class="text-accent">amazing</span>',
            'contact.infoText': "I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision. Don't hesitate to reach out.",
            'contact.label.location': 'Location',
            'contact.label.availability': 'Availability',
            'contact.label.response': 'Response time',
            'contact.val.availability': 'Mon \u2013 Fri, 9am \u2013 6pm UYT',
            'contact.val.response': 'Within 24 hours',
            'contact.form.name': 'Name',
            'contact.form.email': 'Email',
            'contact.form.phone': 'Phone',
            'contact.form.message': 'Message',
            'contact.form.namePh': 'Your name',
            'contact.form.messagePh': 'Tell me about your project...',
            'contact.form.submit': 'Send Message',
            'footer.rights': '\u00a9 2025 Jose Vargas \u00b7 Backend Developer \u00b7 Montevideo, Uruguay',
        },
        es: {
            'meta.title': 'Jose Vargas | Desarrollador Backend',
            'hero.typewriter': ['Ingeniero de Software', 'Desarrollador de APIs', 'Desarrollador Node.js'],
            'hero.greeting': 'Hola, soy',
            'hero.description': 'Especializado en <strong>Node.js</strong> · <strong>NestJS</strong> · <strong>TypeScript</strong>',
            'hero.cta.contact': 'Cont\u00e1ctame',
            'hero.cta.work': 'Ver mi trabajo',
            'nav.home': 'Inicio',
            'nav.about': 'Sobre m\u00ed',
            'nav.stack': 'Stack',
            'nav.skills': 'Habilidades',
            'nav.resume': 'Curriculum',
            'nav.projects': 'Proyectos',
            'nav.contact': 'Contacto',
            'nav.openMenu': 'Abrir men\u00fa',
            'nav.closeMenu': 'Cerrar men\u00fa',
            'about.tag': 'Sobre m\u00ed',
            'about.title': 'Sobre m\u00ed',
            'about.name': '\u00a1Hola! Soy Jose Vargas',
            'about.role': 'Desarrollador de Software',
            'about.bio1': 'Soy un <strong>Desarrollador de Software</strong> enfocado en dise\u00f1ar y construir sistemas robustos del lado del servidor, APIs REST y aplicaciones de negocio. Trabajo principalmente con <strong>NestJS</strong>, <strong>Node.js</strong> y <strong>TypeScript</strong>, con un fuerte \u00e9nfasis en arquitectura limpia, mantenibilidad y escalabilidad a largo plazo. Revisa mi trabajo en la secci\u00f3n de <strong>Proyectos</strong>.',
            'about.downloadCV': 'Descargar CV',
            'about.email.label': 'Email',
            'about.location.label': 'Ubicaci\u00f3n',
            'about.languages.label': 'Idiomas',
            'about.languages.value': 'Espa\u00f1ol (nativo) \u00b7 Ingl\u00e9s (intermedio)',
            'about.remote.label': 'Remoto',
            'about.remote.value': 'Disponible',
            'stack.tag': 'Lo que uso',
            'stack.title': 'Tech Stack',
            'stack.node.title': 'Node.js',
            'stack.node.desc': 'Runtime principal. APIs REST, procesos as\u00edncronos, streams.',
            'stack.ts.title': 'TypeScript',
            'stack.ts.desc': 'Tipado est\u00e1tico, gen\u00e9ricos, tipos avanzados en producci\u00f3n.',
            'stack.nest.title': 'NestJS',
            'stack.nest.desc': 'Framework principal. M\u00f3dulos, Guards, Interceptors, DTOs.',
            'stack.hex.title': 'Arq. Hexagonal',
            'stack.hex.desc': 'Puertos, adaptadores, casos de uso desacoplados.',
            'stack.sql.title': 'SQL / TypeORM',
            'stack.sql.desc': 'Modelado relacional, migraciones, transacciones.',
            'stack.test.title': 'Testing',
            'stack.test.desc': 'Unit testing sobre casos de uso. Cobertura con SonarQube.',
            'skills.tag': 'Mi Experiencia',
            'skills.title': 'Habilidades',
            'skills.headline': 'Enfocado en Backend y Arquitectura',
            'skills.body': 'Con una base s\u00f3lida en desarrollo del lado del servidor, me especializo en construir APIs escalables y arquitecturas mantenibles siguiendo las mejores pr\u00e1cticas de la industria.',
            'skills.hex': 'Arquitectura Hexagonal / DDD',
            'resume.tag': 'Mi Trayectoria',
            'resume.title': 'Curriculum',
            'resume.edu.title': 'Educaci\u00f3n',
            'resume.exp.title': 'Experiencia',
            'resume.edu.1.date': '12/2023 \u2013 02/2025',
            'resume.edu.1.title': 'Desarrollador Full Stack',
            'resume.edu.1.org': 'CoderHouse',
            'resume.edu.1.body': 'MERN Stack, JS ES6+, arquitecturas backend',
            'resume.edu.2.date': '07/2024 \u2013 11/2024',
            'resume.edu.2.title': 'NestJS & TypeScript',
            'resume.edu.2.org': 'Udemy',
            'resume.edu.2.body': 'TypeScript avanzado, NestJS: m\u00f3dulos, services, DTOs',
            'resume.edu.3.date': '2024',
            'resume.edu.3.title': 'SOLID & Clean Code',
            'resume.edu.3.org': 'Curso Online',
            'resume.edu.3.body': 'Principios SOLID, pr\u00e1cticas de c\u00f3digo limpio, patrones de dise\u00f1o',
            'resume.exp.1.date': '05/2025 \u2013 Presente',
            'resume.exp.1.title': 'Desarrollador Backend',
            'resume.exp.1.org': 'Pormel Software Energy \u00b7 Montevideo, Uruguay',
            'resume.exp.1.body': 'Desarrollo backend con Node.js, TypeScript, NestJS y Redis bajo arquitectura hexagonal y CQRS para EDEMSA, EDENOR y Volcan. Desarrollo de m\u00f3dulos completos (dominio, aplicaci\u00f3n e infraestructura) con CRUDs, APIs REST y auditor\u00eda transversal. Testing unitario de casos de uso cr\u00edticos y reducci\u00f3n de deuda t\u00e9cnica con SonarQube. Persistencia en PostgreSQL, MariaDB y Oracle DB; gesti\u00f3n de tareas con Jira.',
            'resume.exp.2.title': 'Desarrollador Full Stack',
            'resume.exp.2.date': 'Remoto',
            'resume.exp.2.body': 'Desarrollo de aplicaciones web a medida para peque\u00f1os negocios con React, Node.js, TypeScript, NestJS y MongoDB Atlas.',
            'projects.tag': 'Mi trabajo',
            'projects.title': 'Proyectos',
            'projects.subtitle': 'Aqu\u00ed encontrar\u00e1s algunos de los proyectos personales y de clientes que cre\u00e9, cada uno con su propio caso de estudio',
            'projects.p24.desc': 'Sitio web de captaci\u00f3n de leads para una empresa de mensajer\u00eda en Montevideo, Uruguay. Ayuda a capturar solicitudes de cotizaci\u00f3n de empresas y particulares, mientras que un panel de administraci\u00f3n permite al equipo revisar y gestionar las solicitudes desde un solo lugar.',
            'projects.tecni.desc': 'Sitio web integral para una empresa de servicio t\u00e9cnico especializada en reparaci\u00f3n de dispositivos electr\u00f3nicos. Incluye listado de servicios, formularios de contacto, mapas de ubicaci\u00f3n e integraci\u00f3n con redes sociales.',
            'projects.booking.desc': 'App de reserva de citas desarrollada para una barber\u00eda en Montevideo. Los clientes pueden elegir servicios, fecha, hora y profesional, mientras el administrador recibe notificaciones en tiempo real y puede gestionar cancelaciones.',
            'projects.avila.desc': 'Sitio web para un food truck de Miami con storytelling de marca, men\u00fa digital por categor\u00edas, horarios, datos de contacto, redes sociales y secci\u00f3n de ubicaci\u00f3n para que los clientes encuentren el cami\u00f3n f\u00e1cilmente.',
            'projects.liscake.desc': 'Sitio web moderno y responsivo para una panader\u00eda local especializada en tortas y budines artesanales. Incluye sistema de pedidos, testimonios de clientes e integraci\u00f3n con WhatsApp.',
            'projects.surprise.desc': 'Sitio e-commerce para un negocio de arreglos para ocasiones especiales donde los clientes pueden explorar productos, agregarlos al carrito y completar compras con Mercado Pago o transferencia bancaria.',
            'projects.hostal.desc': 'Portal de alquiler para un hospedaje cordob\u00e9s donde los usuarios pueden explorar habitaciones y apartamentos, mientras el administrador gestiona solicitudes de inquilinos, lecturas de medidores, comprobantes de pago y flujos de facturas.',
            'contact.tag': 'Ponte en contacto',
            'contact.title': 'Contacto',
            'contact.subtitle': 'No dudes en escribirme enviando el formulario a continuaci\u00f3n y te responder\u00e9 lo antes posible',
            'contact.infoTitle': 'Construyamos algo <span class="text-accent">incre\u00edble</span>',
            'contact.infoText': 'Siempre estoy abierto a discutir nuevos proyectos, ideas creativas u oportunidades para ser parte de tu visi\u00f3n. No dudes en contactarme.',
            'contact.label.location': 'Ubicaci\u00f3n',
            'contact.label.availability': 'Disponibilidad',
            'contact.label.response': 'Tiempo de respuesta',
            'contact.val.availability': 'Lun \u2013 Vie, 9am \u2013 6pm UYT',
            'contact.val.response': 'En menos de 24 horas',
            'contact.form.name': 'Nombre',
            'contact.form.email': 'Email',
            'contact.form.phone': 'Tel\u00e9fono',
            'contact.form.message': 'Mensaje',
            'contact.form.namePh': 'Tu nombre',
            'contact.form.messagePh': 'Cu\u00e9ntame sobre tu proyecto...',
            'contact.form.submit': 'Enviar mensaje',
            'footer.rights': '\u00a9 2025 Jose Vargas \u00b7 Desarrollador Backend \u00b7 Montevideo, Uruguay',
        }
    };

    constructor() {
        this.currentLang = localStorage.getItem(LanguageManager.STORAGE_KEY) || 'en';
        this.toggleBtn = document.getElementById('langToggle');
        this._applyLang(this.currentLang);
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggle());
        }
    }

    _applyLang(lang) {
        const t = LanguageManager.TRANSLATIONS[lang];
        if (!t) return;

        document.documentElement.lang = lang;
        document.title = t['meta.title'];

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const v = t[el.dataset.i18n];
            if (v !== undefined) el.textContent = v;
        });

        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const v = t[el.dataset.i18nHtml];
            if (v !== undefined) el.innerHTML = v;
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const v = t[el.dataset.i18nPlaceholder];
            if (v !== undefined) el.placeholder = v;
        });

        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const v = t[el.dataset.i18nAria];
            if (v !== undefined) el.setAttribute('aria-label', v);
        });

        document.querySelectorAll('.lang-toggle__label').forEach(label => {
            label.classList.toggle('lang-toggle__label--active', label.dataset.lang === lang);
        });

        document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
    }

    toggle() {
        const next = this.currentLang === 'en' ? 'es' : 'en';
        this.currentLang = next;
        localStorage.setItem(LanguageManager.STORAGE_KEY, next);
        this._applyLang(next);
    }

    getTypewriterTexts() {
        return LanguageManager.TRANSLATIONS[this.currentLang]['hero.typewriter'];
    }
}
