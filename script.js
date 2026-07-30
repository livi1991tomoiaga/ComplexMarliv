document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');

    // Chameleonic Navbar on Scroll
    const sections = document.querySelectorAll('section, footer');
    
    const updateNavbar = () => {
        let currentSection = null;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 40 && rect.bottom >= 40) {
                currentSection = section;
            }
        });

        if (currentSection) {
            const isDarkSection = currentSection.id === 'home' || currentSection.tagName.toLowerCase() === 'footer' || currentSection.classList.contains('booking-cta');
            
            if (isDarkSection) {
                navbar.classList.remove('nav-light');
                navbar.classList.add('nav-dark');
            } else {
                navbar.classList.remove('nav-dark');
                navbar.classList.add('nav-light');
            }
        } else if (window.scrollY === 0) {
            navbar.classList.remove('nav-light');
            navbar.classList.add('nav-dark');
        }
    };

    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // initial check

    // Mobile Menu Toggle
    mobileMenuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const carouselImages = document.querySelectorAll('.carousel-item img');

    if (lightbox && carouselImages.length > 0) {
        carouselImages.forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.style.display = 'flex';
                // Small delay to allow display:flex to apply before animating opacity/transform
                setTimeout(() => lightbox.classList.add('show'), 10);
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('show');
            setTimeout(() => {
                if (!lightbox.classList.contains('show')) {
                    lightbox.style.display = 'none';
                }
            }, 300);
        };

        closeBtn.addEventListener('click', closeLightbox);
        
        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                closeLightbox();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('show')) {
                closeLightbox();
            }
        });
    }

    // Re-trigger Hero Animation on scroll to top
    const heroSection = document.getElementById('home');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroSection.classList.remove('animate-zoom');
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            heroSection.classList.add('animate-zoom');
                        });
                    });
                }
            });
        }, { threshold: 0.1 });
        heroObserver.observe(heroSection);
    }

    // Show More Rules Logic
    const showMoreRulesBtn = document.getElementById('show-more-rules');
    const rulesGrid = document.querySelector('.rules-grid');
    if (showMoreRulesBtn && rulesGrid) {
        showMoreRulesBtn.addEventListener('click', () => {
            rulesGrid.classList.toggle('show-all');
            if (rulesGrid.classList.contains('show-all')) {
                showMoreRulesBtn.textContent = 'Vezi mai puțin';
            } else {
                showMoreRulesBtn.textContent = 'Vezi mai mult';
            }
        });
    }
});
