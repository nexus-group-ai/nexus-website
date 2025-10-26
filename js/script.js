// Initialize site functionality
document.addEventListener("DOMContentLoaded", function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        offset: 100,
        easing: 'ease-in-out',
        once: true,
        disable: 'mobile'
    });
    
    // Mobile Navigation
    initMobileNavigation();
    
    // Smooth scrolling for internal links
    initSmoothScrolling();
    
    // Header scroll effects
    initScrollEffects();
});

// Mobile Navigation System
function initMobileNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (!navToggle || !navLinks) return;
    
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navToggle.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth scrolling for internal links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effects
function initScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrollPosition = window.pageYOffset;
        const header = document.querySelector('header');
        
        if (header) {
            const opacity = Math.min(scrollPosition / 100, 0.95);
            header.style.background = `rgba(13, 12, 29, ${opacity})`;
        }
        
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
}