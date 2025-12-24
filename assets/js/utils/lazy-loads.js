/**
 * Lazy Loading Utility
 * Handles lazy loading for images and other media
 */

class LazyLoader {
    constructor(options = {}) {
        this.options = {
            rootMargin: '50px 0px',
            threshold: 0.01,
            ...options
        };
        
        this.observer = null;
        this.observedElements = new Set();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                this.handleIntersection.bind(this),
                this.options
            );
            
            this.observeElements();
        } else {
            // Fallback: load all images immediately
            this.loadAll();
        }
    }
    
    observeElements() {
        const lazyElements = document.querySelectorAll('[data-lazy-src], [data-lazy-background]');
        
        lazyElements.forEach(element => {
            this.observer.observe(element);
            this.observedElements.add(element);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.loadElement(entry.target);
                this.observer.unobserve(entry.target);
                this.observedElements.delete(entry.target);
            }
        });
    }
    
    loadElement(element) {
        if (element.dataset.lazySrc) {
            element.src = element.dataset.lazySrc;
            element.removeAttribute('data-lazy-src');
        }
        
        if (element.dataset.lazyBackground) {
            element.style.backgroundImage = `url(${element.dataset.lazyBackground})`;
            element.removeAttribute('data-lazy-background');
        }
        
        element.classList.add('lazy-loaded');
    }
    
    loadAll() {
        this.observedElements.forEach(element => {
            this.loadElement(element);
        });
        
        this.observedElements.clear();
    }
    
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.observedElements.clear();
    }
}

// Export for use in main.js
window.LazyLoader = LazyLoader;