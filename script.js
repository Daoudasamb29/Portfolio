// Navigation et Menu Mobile
document.addEventListener('DOMContentLoaded', () => {
    // Éléments
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const hero = document.getElementById('accueil');

    // Toggle Menu Mobile
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Fermer le menu mobile au clic sur un lien
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Active link highlighting
    function updateActiveLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('load', updateActiveLink);

    // Smooth scroll pour tous les liens
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation typing effect pour le titre
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Désactivé par défaut, activer si souhaité
    // const titleElement = document.querySelector('.hero-title');
    // const originalText = titleElement.innerHTML;
    // typeWriter(titleElement, originalText, 50);

    // Parallax effect sur les blobs
    window.addEventListener('mousemove', (e) => {
        const blobs = document.querySelectorAll('.blob');
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 20;
            const x = mouseX * speed;
            const y = mouseY * speed;
            blob.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Animation des éléments au scroll
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    // Ajouter la classe animate-on-scroll aux éléments
    document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .btn, .social-link')
        .forEach(el => {
            el.classList.add('animate-on-scroll');
            animateOnScroll.observe(el);
        });

    // Counter pour les statistiques (à utiliser dans la section stats)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // Loader animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Gestion du scroll pour la navbar
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const navbar = document.querySelector('.navbar');
        
        if (currentScroll <= 0) {
            navbar.style.transform = 'translateY(0)';
        } else if (currentScroll > lastScroll) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // Détection du thème sombre
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-theme');
    }

    // Gestion des erreurs d'images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });

    // Animations au chargement
    document.querySelectorAll('.avatar-border, .hero-badge, .hero-title, .hero-subtitle, .hero-description, .hero-buttons, .social-links')
        .forEach((el, index) => {
            el.style.opacity = '0';
            setTimeout(() => {
                el.style.animation = `fadeInUp 0.6s ease ${index * 0.2}s forwards`;
            }, 100);
        });

    // Parallax doux sur le fond
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const background = document.querySelector('.hero-background');
        if (background) {
            background.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Animation des particules (optionnel)
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(59, 130, 246, 0.3);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            hero.appendChild(particle);
        }
    }

    // Ajouter le style pour les particules
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Activer les particules
    // createParticles();
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Gestion des performances
if ('IntersectionObserver' in window) {
    // Lazy loading des images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Données des compétences
const skillsData = [
    { name: "React / Next.js", level: 92, icon: "⚛️", category: "expert" },
    { name: "TypeScript", level: 88, icon: "📘", category: "avance" },
    { name: "Node.js / Express", level: 85, icon: "🟢", category: "avance" },
    { name: "Python / Django", level: 80, icon: "🐍", category: "avance" },
    { name: "UI/UX Design", level: 78, icon: "🎨", category: "intermediaire" },
    { name: "React Native", level: 70, icon: "📱", category: "intermediaire" }
];

// Fonction pour déterminer le niveau textuel
function getLevelText(level) {
    if (level >= 90) return "Expert";
    if (level >= 80) return "Avancé";
    if (level >= 70) return "Intermédiaire";
    return "Débutant";
}

// Fonction pour obtenir la classe du niveau
function getLevelClass(level) {
    if (level >= 90) return "expert";
    if (level >= 80) return "avance";
    if (level >= 70) return "intermediaire";
    return "debutant";
}

// Création des cartes de compétences
function createSkillCards() {
    const skillsGrid = document.getElementById('skillsGrid');

    skillsData.forEach((skill, index) => {
        const levelClass = getLevelClass(skill.level);
        const levelText = getLevelText(skill.level);

        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.setAttribute('data-level', levelClass);
        skillCard.setAttribute('data-index', index);

        skillCard.innerHTML = `
            <div class="skill-header">
                <div class="skill-info">
                    <span class="skill-icon">${skill.icon}</span>
                    <span class="skill-name">${skill.name}</span>
                </div>
                <span class="skill-percentage">${skill.level}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: 0%"></div>
            </div>
            <span class="level-badge level-${levelClass}">${levelText}</span>
        `;

        skillsGrid.appendChild(skillCard);
    });
}

// Animation des barres de progression avec Intersection Observer
function animateProgressBars() {
    const skillCards = document.querySelectorAll('.skill-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Ajouter la classe visible pour l'animation d'entrée
                entry.target.classList.add('visible');

                // Animer la barre de progression
                const progressFill = entry.target.querySelector('.progress-fill');
                const skillIndex = parseInt(entry.target.getAttribute('data-index'));
                const skillLevel = skillsData[skillIndex].level;

                setTimeout(() => {
                    progressFill.style.width = `${skillLevel}%`;
                }, 300 + (index * 100));
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px'
    });

    skillCards.forEach(card => {
        observer.observe(card);
    });
}

// Version alternative : Cercles de progression
function createCircularSkills() {
    const container = document.getElementById('skillsGrid');
    container.innerHTML = '';
    container.className = 'skills-circles';

    skillsData.forEach((skill) => {
        const levelClass = getLevelClass(skill.level);
        const circumference = 283; // 2 * π * 45 (rayon)
        const offset = circumference - (skill.level / 100) * circumference;

        const skillCircle = document.createElement('div');
        skillCircle.className = 'skill-circle';

        skillCircle.innerHTML = `
            <svg viewBox="0 0 100 100" class="circular-chart">
                <circle class="circle-bg" cx="50" cy="50" r="45"></circle>
                <circle
                    class="circle ${levelClass}"
                    cx="50" cy="50" r="45"
                    style="stroke-dashoffset: ${circumference};"
                    data-offset="${offset}"
                ></circle>
                <text x="50" y="50" text-anchor="middle" dy=".3em" class="percentage-text">
                    ${skill.level}%
                </text>
            </svg>
            <div class="skill-info" style="justify-content: center; margin-top: 0.5rem;">
                <span class="skill-icon">${skill.icon}</span>
                <span class="skill-name">${skill.name}</span>
            </div>
            <span class="level-badge level-${levelClass}">${getLevelText(skill.level)}</span>
        `;

        container.appendChild(skillCircle);
    });

    // Animer les cercles
    animateCircles();
}

// Animation des cercles de progression
function animateCircles() {
    const circles = document.querySelectorAll('.circle');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const offset = entry.target.getAttribute('data-offset');
                entry.target.style.strokeDashoffset = offset;
            }
        });
    }, { threshold: 0.5 });

    circles.forEach(circle => {
        observer.observe(circle);
    });
}

// Compteur animé pour les statistiques
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '%';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '%';
        }
    }

    requestAnimationFrame(updateCounter);
}

// Version avec compteur animé
function createSkillCardsWithCounter() {
    const skillsGrid = document.getElementById('skillsGrid');
    skillsGrid.innerHTML = '';

    skillsData.forEach((skill, index) => {
        const levelClass = getLevelClass(skill.level);
        const levelText = getLevelText(skill.level);

        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.innerHTML = `
            <div class="skill-header">
                <div class="skill-info">
                    <span class="skill-icon">${skill.icon}</span>
                    <span class="skill-name">${skill.name}</span>
                </div>
                <span class="skill-percentage counter" data-target="${skill.level}">0%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: 0%"></div>
            </div>
            <span class="level-badge level-${levelClass}">${levelText}</span>
        `;

        skillsGrid.appendChild(skillCard);
    });

    // Observer pour les compteurs
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animer la barre
                const progressFill = entry.target.querySelector('.progress-fill');
                const skillLevel = skillsData[index].level;
                progressFill.style.width = `${skillLevel}%`;

                // Animer le compteur
                const counter = entry.target.querySelector('.counter');
                animateCounter(counter, skillLevel);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-card').forEach((card, i) => {
        observer.observe(card);
    });
}

// Ajout de filtres par catégorie
function addFilters() {
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'filters-container';
    filtersContainer.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
    `;

    const filters = ['Tous', 'Expert', 'Avancé', 'Intermédiaire'];

    filters.forEach(filter => {
        const button = document.createElement('button');
        button.textContent = filter;
        button.className = 'filter-btn';
        button.style.cssText = `
            padding: 0.5rem 1.5rem;
            border-radius: 9999px;
            border: 1px solid #374151;
            background: rgba(31, 41, 55, 0.5);
            color: #e5e7eb;
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        `;

        if (filter === 'Tous') {
            button.style.background = 'linear-gradient(to right, #3b82f6, #22d3ee)';
            button.style.border = 'none';
            button.style.color = 'white';
        }

        button.addEventListener('mouseenter', () => {
            if (filter !== 'Tous') {
                button.style.background = 'rgba(59, 130, 246, 0.2)';
                button.style.borderColor = '#3b82f6';
            }
        });

        button.addEventListener('mouseleave', () => {
            if (filter !== 'Tous') {
                button.style.background = 'rgba(31, 41, 55, 0.5)';
                button.style.borderColor = '#374151';
            }
        });

        button.addEventListener('click', () => filterSkills(filter));
        filtersContainer.appendChild(button);
    });

    const section = document.querySelector('#competences .container');
    section.insertBefore(filtersContainer, document.querySelector('.skills-grid'));
}

function filterSkills(filter) {
    const cards = document.querySelectorAll('.skill-card');

    cards.forEach(card => {
        const level = card.getAttribute('data-level');

        if (filter === 'Tous') {
            card.style.display = 'block';
        } else {
            const filterMap = {
                'Expert': 'expert',
                'Avancé': 'avance',
                'Intermédiaire': 'intermediaire'
            };

            if (level === filterMap[filter]) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Choisissez votre version :
    createSkillCards(); // Version barres de progression
    // createCircularSkills(); // Version cercles
    // createSkillCardsWithCounter(); // Version avec compteur animé

    animateProgressBars();
    addFilters();

    // Animation au scroll pour les catégories
    const categoryCards = document.querySelectorAll('.category-card');
    const categoryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    });

    categoryCards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        categoryObserver.observe(card);
    });
});

// Fonctionnalités de contact
document.addEventListener('DOMContentLoaded', () => {
    // Éléments
    const emailCard = document.getElementById('emailCard');
    const phoneCard = document.getElementById('phoneCard');
    const locationCard = document.getElementById('locationCard');
    const mapBtn = document.getElementById('mapBtn');
    const mapModal = document.getElementById('mapModal');
    const closeModal = document.getElementById('closeModal');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    // Fonction pour copier le texte
    function copyToClipboard(text, type) {
        navigator.clipboard.writeText(text).then(() => {
            // Afficher le toast
            toastMessage.textContent = `${type} copié dans le presse-papiers !`;
            toast.classList.add('show');

            // Ajouter un effet visuel sur la carte
            const activeCard = text.includes('@') ? emailCard : phoneCard;
            activeCard.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
            activeCard.style.borderColor = '#10b981';

            setTimeout(() => {
                activeCard.style.backgroundColor = '';
                activeCard.style.borderColor = '';
            }, 1000);

            // Masquer le toast après 3 secondes
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }).catch(err => {
            console.error('Erreur de copie : ', err);
            // Fallback pour les navigateurs plus anciens
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);

            toastMessage.textContent = `${type} copié !`;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        });
    }

    // Événements pour les boutons de copie
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const textToCopy = btn.getAttribute('data-copy');
            const type = btn.closest('.contact-card').querySelector('.card-title').textContent;
            copyToClipboard(textToCopy, type);
        });
    });

    // Animation au survol des cartes
    document.querySelectorAll('.contact-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.card-icon');
            icon.style.transform = 'scale(1.1)';
            icon.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.card-icon');
            icon.style.transform = 'scale(1)';
        });
    });

    // Modal pour la carte
    if (mapBtn && mapModal) {
        mapBtn.addEventListener('click', () => {
            mapModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            mapModal.classList.remove('show');
            document.body.style.overflow = '';
        });
    }

    // Fermer le modal en cliquant en dehors
    window.addEventListener('click', (e) => {
        if (e.target === mapModal) {
            mapModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // Animation au scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.contact-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    // Détection de la disponibilité
    function updateAvailability() {
        const hours = new Date().getHours();
        const statusDots = document.querySelectorAll('.status-dot');
        const phoneStatus = document.querySelector('#phoneCard .card-status');

        if (hours >= 9 && hours < 18) {
            statusDots.forEach(dot => {
                dot.style.background = '#10b981';
            });
        } else {
            const phoneStatusDot = document.querySelector('#phoneCard .status-dot');
            if (phoneStatusDot) {
                phoneStatusDot.style.background = '#f59e0b';
                phoneStatus.innerHTML = '<span class="status-dot"></span> Rappel sous 24h';
            }
        }
    }

    updateAvailability();

    // Animation du gradient sur le titre
    const title = document.querySelector('.section-title .gradient-text');
    if (title) {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            title.style.background = `linear-gradient(135deg, hsl(${hue}, 100%, 50%), hsl(${hue + 60}, 100%, 50%))`;
            title.style.webkitBackgroundClip = 'text';
            title.style.webkitTextFillColor = 'transparent';
        }, 50);
    }
});

// Service Worker pour le offline (optionnel)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('ServiceWorker non supporté : ', err);
        });
    });
}

// Données des projets (3 projets seulement)
const projectsData = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "Plateforme e-commerce complète avec paiement intégré, gestion des stocks en temps réel et tableau de bord analytique. Interface utilisateur intuitive et expérience d'achat fluide.",
        tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
        stats: { stars: 128, users: "2.5k" },
        color: "ecommerce",
        icon: "🛍️",
        github: "#",
        demo: "#"
    },
    {
        id: 2,
        title: "Task Manager Pro",
        description: "Application de gestion de projets collaborative avec tableau Kanban, calendrier interactif, et notifications en temps réel via WebSocket. Idéale pour les équipes agiles.",
        tags: ["React", "Node.js", "Socket.io", "MongoDB"],
        stats: { stars: 95, users: "1.8k" },
        color: "taskmanager",
        icon: "✅",
        github: "#",
        demo: "#"
    },
    {
        id: 3,
        title: "AI Content Generator",
        description: "Outil de génération de contenu assisté par IA avec interface intuitive, historique des générations, templates personnalisables et export multi-format.",
        tags: ["Python", "FastAPI", "React", "OpenAI"],
        stats: { stars: 210, users: "5k" },
        color: "aigenerator",
        icon: "🤖",
        github: "#",
        demo: "#"
    }
];

// Fonction pour créer une carte de projet
function createProjectCard(project) {
    return `
        <div class="project-card" data-id="${project.id}">
            <div class="project-header ${project.color}">
                <div class="project-icon">
                    <span style="font-size: 5rem;">${project.icon}</span>
                </div>
                <div class="project-stats">
                    <span class="stat-badge">
                        <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                        ${project.stats.stars}
                    </span>
                    <span class="stat-badge">
                        <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        ${project.stats.users}
                    </span>
                </div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="project-actions">
                    <a href="${project.github}" class="project-link">
                        <svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                        </svg>
                        Code source
                    </a>
                    <a href="${project.demo}" class="project-link">
                        <svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                        Démo en direct
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Fonction pour charger les projets
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');

    if (!projectsGrid) return;

    // Afficher un état de chargement
    projectsGrid.innerHTML = '<div class="loading-skeleton"></div>';

    // Simuler un chargement asynchrone
    setTimeout(() => {
        projectsGrid.innerHTML = projectsData.map(project => createProjectCard(project)).join('');

        // Ajouter les événements après le chargement
        addProjectEvents();
    }, 500);
}

// Ajouter les événements interactifs
function addProjectEvents() {
    // Animation au survol des tags
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Suivi des clics sur les projets
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.textContent.trim();
            const projectTitle = this.closest('.project-card').querySelector('.project-title').textContent;

            console.log(`🔗 Action: ${action} - Projet: ${projectTitle}`);

            // Ici vous pouvez ajouter Google Analytics ou autre tracking
            // trackProjectClick(projectTitle, action);

            // Simuler une ouverture de lien
            alert(`Lien vers ${action} du projet "${projectTitle}"`);
        });
    });

    // Animation d'entrée des cartes
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.animation = `fadeInUp 0.6s ease ${0.6 + index * 0.2}s forwards`;
    });
}

// Filtre et recherche (optionnel)
function filterProjects(searchTerm) {
    const filteredProjects = projectsData.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = filteredProjects.map(project => createProjectCard(project)).join('');

    if (filteredProjects.length === 0) {
        projectsGrid.innerHTML = `
            <div class="empty-state">
                <p>Aucun projet trouvé pour "${searchTerm}"</p>
            </div>
        `;
    }

    addProjectEvents();
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();

    // Bouton "Voir tous les projets"
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', () => {
            alert('🚀 Plus de projets bientôt disponibles !');

            // Animation du bouton
            viewMoreBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                viewMoreBtn.style.transform = 'scale(1)';
            }, 200);
        });
    }

    // Observer pour les animations au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
});

// Gestion des erreurs réseau
window.addEventListener('online', () => {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = 'Connexion rétablie';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
});

window.addEventListener('offline', () => {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = 'Mode hors-ligne - Les données affichées sont en cache';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 5000);
});
