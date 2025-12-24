/**
 * Navigation JavaScript - SIMPLE WORKING VERSION
 */

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.navigation__hamburger');
    const navMenu = document.querySelector('.navigation__menu');
    const body = document.body;
    
    if (!hamburger || !navMenu) return;
    
    // Debug log
    console.log('Navigation elements found:', { hamburger, navMenu });
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        console.log('Hamburger clicked');
        
        // Toggle active classes
        hamburger.classList.toggle('navigation__hamburger--active');
        navMenu.classList.toggle('navigation__menu--active');
        
        // Toggle body scroll
        if (hamburger.classList.contains('navigation__hamburger--active')) {
            body.classList.add('menu-open');
            console.log('Menu opened');
        } else {
            body.classList.remove('menu-open');
            console.log('Menu closed');
        }
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.navigation__link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('navigation__hamburger--active');
            navMenu.classList.remove('navigation__menu--active');
            body.classList.remove('menu-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = hamburger.contains(event.target) || navMenu.contains(event.target);
        
        if (!isClickInside && navMenu.classList.contains('navigation__menu--active')) {
            hamburger.classList.remove('navigation__hamburger--active');
            navMenu.classList.remove('navigation__menu--active');
            body.classList.remove('menu-open');
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('navigation__menu--active')) {
            hamburger.classList.remove('navigation__hamburger--active');
            navMenu.classList.remove('navigation__menu--active');
            body.classList.remove('menu-open');
        }
    });
    
    // Reset menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('navigation__hamburger--active');
            navMenu.classList.remove('navigation__menu--active');
            body.classList.remove('menu-open');
        }
    });
});