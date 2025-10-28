// Portfolio JavaScript - Interactive Features and Animations

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all features
    initNavigation();
    initScrollAnimations();
    initSkillBars();
    initTypingEffect();
    initParticleEffect();
    initSmoothScrolling();
    initFormHandling();
    initThemeToggle();
    initLoadingAnimation();
    initMicroInteractions();
    initAdvancedAnimations();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

// Enhanced Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for multiple elements
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);

                // Special animation for skill bars
                if (entry.target.classList.contains('skill-progress')) {
                    const width = entry.target.getAttribute('data-width');
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 500);
                }

                // Counter animation for stats
                if (entry.target.classList.contains('stat-number')) {
                    setTimeout(() => {
                        animateCounter(entry.target);
                    }, 300);
                }

                // Add special effects for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    const marker = entry.target.querySelector('.marker-icon');
                    if (marker) {
                        setTimeout(() => {
                            marker.style.animation = 'bounceIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                        }, 200);
                    }
                }
            }
        });
    }, observerOptions);

    // Observe elements with different animation types
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((el, index) => {
        if (index % 2 === 0) {
            el.classList.add('slide-in-left');
        } else {
            el.classList.add('slide-in-right');
        }
        observer.observe(el);
    });

    const otherElements = document.querySelectorAll('.education-card, .contact-card, .about-card, .skill-progress, .stat-number');
    otherElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0%';
    });
}

// Enhanced typing effect for hero title
function initTypingEffect() {
    const titleName = document.querySelector('.title-name');
    if (!titleName) return;

    const text = titleName.textContent;
    titleName.textContent = '';
    // Pas de trait de curseur pour éviter de couper l'écriture
    titleName.style.animation = 'pulse 1s ease-in-out infinite';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            titleName.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 80);
        } else {
            setTimeout(() => {
                titleName.style.animation = 'none';
                // Add a subtle glow effect after typing
                titleName.style.textShadow = '0 0 20px rgba(37, 99, 235, 0.3)';
                setTimeout(() => {
                    titleName.style.textShadow = 'none';
                }, 1500);
            }, 500);
        }
    };

    setTimeout(typeWriter, 1500);
}

// Particle effect for hero section
function initParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;

    hero.appendChild(particleContainer);

    // Create particles
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 4 + 2;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(45deg, #2563eb, #06b6d4);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        opacity: 0.3;
        animation: floatParticle ${duration}s linear infinite;
    `;

    container.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, duration * 1000);
}

// Add particle animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.3;
        }
        90% {
            opacity: 0.3;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form handling with EmailJS
function initFormHandling() {
    // Initialize EmailJS
    emailjs.init("YOUR_PUBLIC_KEY"); // Remplacez par votre clé publique EmailJS

    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('submit-btn');
        const btnText = document.getElementById('btn-text');
        const btnIcon = document.getElementById('btn-icon');
        const formStatus = document.getElementById('form-status');

        // Show loading state
        submitBtn.classList.add('loading');
        btnText.textContent = 'Envoi en cours...';
        btnIcon.className = 'fas fa-spinner';
        formStatus.className = 'form-status loading show';
        formStatus.textContent = 'Envoi de votre message...';

        try {
            // Prepare email parameters
            const templateParams = {
                from_name: document.getElementById('from_name').value,
                from_email: document.getElementById('from_email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                to_email: 'ikramelkhonsi2001@gmail.com' // Email de destination
            };

            // Send email using EmailJS
            const response = await emailjs.send(
                'YOUR_SERVICE_ID', // Remplacez par votre Service ID
                'YOUR_TEMPLATE_ID', // Remplacez par votre Template ID
                templateParams
            );

            // Success
            formStatus.className = 'form-status success show';
            formStatus.textContent = 'Message envoyé avec succès ! Je vous répondrai bientôt.';
            form.reset();

        } catch (error) {
            console.error('Erreur EmailJS:', error);
            formStatus.className = 'form-status error show';
            formStatus.textContent = 'Erreur lors de l\'envoi. Veuillez réessayer ou me contacter directement.';
        } finally {
            // Reset button state
            submitBtn.classList.remove('loading');
            btnText.textContent = 'Envoyer le message';
            btnIcon.className = 'fas fa-paper-plane';
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Counter animation
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/\d/g, '');
    let current = 0;
    const increment = target / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 30);
}

// Theme toggle (bonus feature)
function initThemeToggle() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #2563eb, #06b6d4);
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
        z-index: 1000;
        transition: all 0.3s ease;
    `;

    document.body.appendChild(themeToggle);

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

        // Save preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Loading animation
function initLoadingAnimation() {
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">IKRAM</div>
            <div class="loading-spinner"></div>
            <div class="loading-text">Chargement...</div>
        </div>
    `;

    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #2563eb, #06b6d4);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;

    const loadingContent = loadingScreen.querySelector('.loading-content');
    loadingContent.style.cssText = `
        text-align: center;
        color: white;
    `;

    const loadingLogo = loadingScreen.querySelector('.loading-logo');
    loadingLogo.style.cssText = `
        font-family: 'Space Grotesk', sans-serif;
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 2rem;
        animation: pulse 2s infinite;
    `;

    const loadingSpinner = loadingScreen.querySelector('.loading-spinner');
    loadingSpinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        margin: 0 auto 1rem;
        animation: spin 1s linear infinite;
    `;

    const loadingText = loadingScreen.querySelector('.loading-text');
    loadingText.style.cssText = `
        font-size: 1.1rem;
        opacity: 0.8;
    `;

    document.body.appendChild(loadingScreen);

    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Hide loading screen after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 500);
        }, 1500);
    });
}

// Enhanced parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-shape');
    const dataElements = document.querySelectorAll('.chart-line, .data-point');

    parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.05);
        const rotation = scrolled * 0.1;
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg)`;
    });

    dataElements.forEach((element, index) => {
        const speed = 0.2 + (index * 0.03);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Mouse cursor effect (bonus)
function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(45deg, #2563eb, #06b6d4);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.1s ease;
        opacity: 0.7;
    `;

    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Scale cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-card, .timeline-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Initialize cursor effect on desktop only
if (window.innerWidth > 768) {
    initCursorEffect();
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-shape');

    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Add dark theme styles
const darkThemeStyles = `
    .dark-theme {
        --white: #1a1a1a;
        --gray-50: #2a2a2a;
        --gray-100: #3a3a3a;
        --gray-200: #4a4a4a;
        --gray-300: #5a5a5a;
        --gray-400: #6a6a6a;
        --gray-500: #7a7a7a;
        --gray-600: #8a8a8a;
        --gray-700: #9a9a9a;
        --gray-800: #e0e0e0;
        --gray-900: #f0f0f0;
    }
    
    .dark-theme .navbar {
        background: rgba(26, 26, 26, 0.95);
        border-bottom-color: #4a4a4a;
    }
    
    .dark-theme .hero {
        background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
    }
    
    .dark-theme .about,
    .dark-theme .experiences,
    .dark-theme .contact {
        background: #2a2a2a;
    }
    
    .dark-theme .skill-card,
    .dark-theme .timeline-content,
    .dark-theme .education-card,
    .dark-theme .contact-card,
    .dark-theme .about-card,
    .dark-theme .contact-form,
    .dark-theme .profile-card {
        background: #3a3a3a;
        border: 1px solid #4a4a4a;
    }
`;

const darkStyle = document.createElement('style');
darkStyle.textContent = darkThemeStyles;
document.head.appendChild(darkStyle);

// Micro-interactions for enhanced UX
function initMicroInteractions() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add hover effects to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-12px) scale(1.05) rotate(1deg)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    });

    // Add magnetic effect to timeline markers
    const markers = document.querySelectorAll('.marker-icon');
    markers.forEach(marker => {
        marker.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(-50%, -50%) translate(${x * 0.1}px, ${y * 0.1}px) scale(1.1)`;
        });

        marker.addEventListener('mouseleave', function () {
            this.style.transform = 'translate(-50%, -50%) translate(0, 0) scale(1)';
        });
    });
}

// Advanced animations and effects
function initAdvancedAnimations() {
    // Add CSS for advanced animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .skill-card:hover .skill-icon {
            animation: wiggle 0.5s ease-in-out;
        }
        
        .timeline-item:hover .timeline-content {
            animation: pulse 0.5s ease-in-out;
        }
        
        .badge:hover {
            animation: bounceIn 0.5s ease-in-out;
        }
        
        .hero-title:hover .title-name {
            animation: neon 1s ease-in-out infinite;
        }
        
        .floating-shape:hover {
            animation: morphing 2s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);

    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Add special effects based on element type
                if (entry.target.classList.contains('skill-card')) {
                    setTimeout(() => {
                        entry.target.style.animation = 'fadeInScale 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                    }, 100);
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.skill-card, .timeline-item, .education-card');
    animatedElements.forEach(el => observer.observe(el));

    // Add 3D mouse tracking effect
    init3DMouseTracking();

    // Add advanced particle system
    initAdvancedParticleSystem();

    // Add data flow animation
    initDataFlowAnimation();
}

// 3D Mouse tracking effect
function init3DMouseTracking() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const xPos = (clientX / innerWidth) - 0.5;
        const yPos = (clientY / innerHeight) - 0.5;

        const floatingShapes = document.querySelectorAll('.floating-shape');
        floatingShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            const x = xPos * speed * 50;
            const y = yPos * speed * 50;

            shape.style.transform = `translate(${x}px, ${y}px) rotateX(${yPos * 10}deg) rotateY(${xPos * 10}deg)`;
        });
    });
}

// Advanced particle system
function initAdvancedParticleSystem() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particleContainer = document.createElement('div');
    particleContainer.className = 'advanced-particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;

    hero.appendChild(particleContainer);

    // Create advanced particles
    for (let i = 0; i < 30; i++) {
        createAdvancedParticle(particleContainer);
    }
}

function createAdvancedParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'advanced-particle';

    const size = Math.random() * 6 + 2;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 30 + 20;
    const delay = Math.random() * 5;

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(45deg, #2563eb, #06b6d4);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        opacity: 0.4;
        animation: matrix ${duration}s linear infinite;
        animation-delay: ${delay}s;
        box-shadow: 0 0 10px rgba(37, 99, 235, 0.5);
    `;

    container.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, (duration + delay) * 1000);
}

// Data flow animation
function initDataFlowAnimation() {
    const dataPath = document.querySelector('.data-path');
    if (!dataPath) return;

    // Animate the data flow path
    setInterval(() => {
        dataPath.style.strokeDashoffset = '0';
        setTimeout(() => {
            dataPath.style.strokeDashoffset = '1000';
        }, 1000);
    }, 8000);
}

// Export functions for potential external use
window.PortfolioJS = {
    showNotification,
    animateCounter,
    initScrollAnimations,
    initMicroInteractions,
    initAdvancedAnimations
};

