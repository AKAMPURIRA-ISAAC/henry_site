// Master JavaScript for Henrie Mbogo

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCursor();
    initNavbar();
    initTypewriter();
    initCounters();
    initAOS();
    initSmoothScroll();
    initBackToTop();
    initFloatingContact();
    initFormValidation();
    initFAQ();
    initGallery();
    initParticles();
});

// Preloader
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="loader"></div>
            <div class="loader-text">Henrie Mbogo</div>
            <div class="loader-subtext">Senior Driver</div>
        </div>
    `;
    
    document.body.appendChild(preloader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
}

// Custom Cursor
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        
        gsap.to(follower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3
        });
    });
    
    // Hover effect for interactive elements
    const hoverElements = document.querySelectorAll('a, button, .btn, .featured-card, .service-card, .preview-item');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 1.5,
                duration: 0.3
            });
            gsap.to(follower, {
                scale: 1.5,
                borderColor: 'var(--accent)',
                duration: 0.3
            });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3
            });
            gsap.to(follower, {
                scale: 1,
                borderColor: 'var(--primary)',
                duration: 0.3
            });
        });
    });
}

// Navbar Scroll Effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            backToTop?.classList.add('show');
            
            // Change nav link colors when scrolled
            document.querySelectorAll('.nav-link').forEach(link => {
                link.style.color = 'var(--text)';
            });
        } else {
            navbar.classList.remove('scrolled');
            backToTop?.classList.remove('show');
            
            document.querySelectorAll('.nav-link').forEach(link => {
                link.style.color = 'var(--white)';
            });
        }
    });
}

// Typewriter Effect
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) return;
    
    const phrases = [
        'Senior Driver',
        'Muganda Straight Up',
        'Kyambogo Born',
        'Kampala Expert',
        'Safe & Reliable',
        'Professional Driver',
        'Your Trusted Chauffeur'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }
    
    type();
}

// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                
                if (!target) return;
                
                let current = 0;
                const increment = target / 50;
                const duration = 2000;
                const stepTime = duration / 50;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        setTimeout(updateCounter, stepTime);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Initialize AOS
function initAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Back to Top
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Floating Contact
function initFloatingContact() {
    const floatingBtn = document.querySelector('.floating-btn');
    if (!floatingBtn) return;
    
    floatingBtn.addEventListener('click', () => {
        floatingBtn.classList.toggle('active');
    });
}

// Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate
            const errors = validateForm(data);
            
            if (Object.keys(errors).length === 0) {
                // Success
                showNotification('Webale! Obubaka bwo bufunye. (Message sent successfully!)', 'success');
                form.reset();
            } else {
                // Show errors
                showNotification('Oyinze okujjuza ebimu. (Please fill all required fields)', 'error');
            }
        });
    });
}

// Validate Form
function validateForm(data) {
    const errors = {};
    
    if (!data.name) errors.name = 'Name is required';
    if (!data.email || !isValidEmail(data.email)) errors.email = 'Valid email is required';
    if (!data.message) errors.message = 'Message is required';
    
    return errors;
}

// Email Validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        padding: 15px 25px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #48c774, #27ae60)' : 'linear-gradient(135deg, #e74c3c, #c0392b)'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(i => {
                i.classList.remove('active');
                const answer = i.querySelector('.faq-answer');
                gsap.to(answer, {
                    height: 0,
                    opacity: 0,
                    duration: 0.3,
                    padding: 0
                });
            });
            
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                gsap.to(answer, {
                    height: 'auto',
                    opacity: 1,
                    duration: 0.3,
                    padding: '20px'
                });
            }
        });
    });
}

// Gallery Initialization
function initGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    
    // Sample gallery data
    const images = [
        {
            src: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2',
            title: 'On the Road',
            category: 'driving',
            date: '2024'
        },
        {
            src: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa',
            title: 'Community Work',
            category: 'community',
            date: '2024'
        },
        {
            src: 'https://images.unsplash.com/photo-1581092160562-40aa08e52637',
            title: 'Kampala City',
            category: 'personal',
            date: '2024'
        },
        {
            src: 'https://images.unsplash.com/photo-1522932464377-2c78ed5f94d3',
            title: 'Nature Escape',
            category: 'nature',
            date: '2024'
        }
    ];
    
    // Load images
    images.forEach((image, index) => {
        const item = createGalleryItem(image, index);
        galleryGrid.appendChild(item);
    });
    
    // Initialize lightgallery
    lightGallery(galleryGrid, {
        selector: '.gallery-item',
        plugins: [lgZoom, lgThumbnail],
        speed: 500,
        download: false
    });
}

// Create Gallery Item
function createGalleryItem(image, index) {
    const item = document.createElement('div');
    item.className = `gallery-item ${image.category}`;
    item.setAttribute('data-aos', 'fade-up');
    item.setAttribute('data-aos-delay', index * 50);
    
    item.innerHTML = `
        <a href="${image.src}?w=1200" class="gallery-link">
            <img src="${image.src}?w=400" alt="${image.title}" loading="lazy">
            <div class="gallery-overlay">
                <h3>${image.title}</h3>
                <p>${image.date}</p>
                <span class="gallery-category">${image.category}</span>
            </div>
        </a>
    `;
    
    return item;
}

// Particles Animation
function initParticles() {
    particlesJS('particles', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: true
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out'
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            }
        },
        retina_detect: true
    });
}

// Copy to Clipboard
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.btn-copy');
    
    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.getAttribute('data-copy');
            
            navigator.clipboard.writeText(text).then(() => {
                showNotification('Copied to clipboard!', 'success');
            });
        });
    });
}

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(el => {
        const speed = el.getAttribute('data-speed') || 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--dark);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity 0.5s;
    }
    
    .preloader-content {
        text-align: center;
    }
    
    .loader {
        width: 80px;
        height: 80px;
        border: 4px solid rgba(255,255,255,0.1);
        border-top-color: var(--primary);
        border-bottom-color: var(--accent);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    }
    
    .loader-text {
        color: var(--white);
        font-size: 1.5em;
        font-weight: 700;
        margin-bottom: 5px;
    }
    
    .loader-subtext {
        color: var(--accent);
        font-size: 1em;
        opacity: 0.8;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;

document.head.appendChild(style);