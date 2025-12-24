/**
 * Main JavaScript File
 * Handles core functionality for Oscar Mhlanga's portfolio
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Engineering Portfolio Initialized - Oscar Mhlanga');
    
    // Initialize all modules
    initializeNavigation();
    initializeProjectCards();
    setActiveNavigation();
    initializeLazyLoading();
    initializeSmoothScrolling();
    
    // Initialize any page-specific functionality
    initializePageSpecificFeatures();
});

/**
 * Set active navigation link based on current page
 */
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navigation__link');
    
    navLinks.forEach(link => {
        link.classList.remove('navigation__link--active');
        const linkPage = link.getAttribute('href');
        
        // Handle index.html and root path
        if ((currentPage === 'index.html' || currentPage === '') && linkPage === 'index.html') {
            link.classList.add('navigation__link--active');
        }
        // Handle exact matches
        else if (currentPage === linkPage) {
            link.classList.add('navigation__link--active');
        }
        // Handle projects directory
        else if (currentPage.includes('projects/') && linkPage === 'projects.html') {
            link.classList.add('navigation__link--active');
        }
    });
}

/**
 * Initialize project card animations
 */
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card, .work-card, .pillar-card');
    
    if (!projectCards.length) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Initialize all cards with fade-in animation
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

/**
 * Initialize lazy loading for images
 */
function initializeLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.classList.add('lazy-load');
        });
    } else {
        // Fallback to IntersectionObserver
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if (!lazyImages.length) return;
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        lazyImages.forEach(img => {
            if (!img.src) {
                img.dataset.src = img.getAttribute('src');
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
            }
            imageObserver.observe(img);
        });
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navigation').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize page-specific features
 */
function initializePageSpecificFeatures() {
    // Projects page filtering
    if (document.querySelector('.filter-bar')) {
        initializeProjectFiltering();
    }
    
    // Contact form handling
    if (document.querySelector('.contact-form')) {
        initializeContactForm();
    }
}

/**
 * Initialize project filtering on projects page
 */
function initializeProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (!filterButtons.length || !projectItems.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            // Filter projects
            projectItems.forEach(item => {
                const categories = item.dataset.categories ? item.dataset.categories.split(' ') : [];
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'flex';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    // Trigger reflow for animation
                    void item.offsetWidth;
                    
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Initialize contact form handling
 */
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        const email = this.querySelector('input[type="email"]');
        const message = this.querySelector('textarea');
        
        if (!email.value || !message.value) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // In a real implementation, you would send this to a server
        // For now, just show a success message
        alert('Thank you for your message. I will get back to you soon.');
        this.reset();
    });
}

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
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

// Export functions for use in other modules if needed
window.Portfolio = {
    setActiveNavigation,
    initializeProjectCards,
    initializeLazyLoading,
    initializeSmoothScrolling
};