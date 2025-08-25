// Initialize AOS (Animate On Scroll) Library and Enhanced Features
document.addEventListener("DOMContentLoaded", function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        offset: 100,
        easing: 'ease-in-out',
        once: true,
        disable: 'mobile' // Disable on mobile for better performance
    });
    
    // Mobile Navigation Toggle
    initMobileNavigation();
    
    // Enhanced scroll effects
    initScrollEffects();
    
    // Form enhancements
    initFormEnhancements();
    
    // Event tracking setup
    initEventTracking();
    
    // Performance optimizations
    initPerformanceOptimizations();
});

// Mobile Navigation System
function initMobileNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (!navToggle || !navLinks) return;
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isActive = navToggle.classList.contains('active');
        
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? '' : 'hidden';
        
        // Track menu usage
        trackEvent('navigation', {
            action: isActive ? 'close_mobile_menu' : 'open_mobile_menu'
        });
    });
    
    // Close mobile menu when clicking on links
    const navLinkItems = navLinks.querySelectorAll('a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
            
            // Track navigation clicks
            trackEvent('navigation', {
                action: 'click_nav_link',
                link_text: this.textContent.trim(),
                link_url: this.href
            });
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Enhanced Scroll Effects
function initScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrollPosition = window.pageYOffset;
        const header = document.querySelector('header');
        const background = document.querySelector('.background-gradient');
        
        // Header background opacity based on scroll
        if (header) {
            const opacity = Math.min(scrollPosition / 100, 0.95);
            header.style.background = `rgba(13, 12, 29, ${opacity})`;
        }
        
        // Subtle parallax effect for background
        if (background) {
            background.style.transform = `translateY(${scrollPosition * 0.1}px)`;
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

// Form Enhancements
function initFormEnhancements() {
    // Add smooth scrolling to all internal links
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
                
                // Track internal navigation
                trackEvent('navigation', {
                    action: 'scroll_to_section',
                    section: this.getAttribute('href').substring(1)
                });
            }
        });
    });
    
    // Enhanced CTA button interactions
    document.querySelectorAll('.cta-button, .cta-nav').forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Track CTA clicks
            trackEvent('cta_click', {
                button_text: this.textContent.trim(),
                button_location: this.closest('section')?.id || 'header'
            });
        });
    });
}

// Event Tracking System
function initEventTracking() {
    // Track page engagement
    let engagementTimer = 0;
    const engagementInterval = setInterval(() => {
        engagementTimer += 10;
        
        // Track engagement milestones
        if (engagementTimer === 30) {
            trackEvent('engagement', { milestone: '30_seconds' });
        } else if (engagementTimer === 60) {
            trackEvent('engagement', { milestone: '1_minute' });
        } else if (engagementTimer === 120) {
            trackEvent('engagement', { milestone: '2_minutes' });
        }
    }, 10000);
    
    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', function() {
        const scrollDepth = Math.round((window.scrollY + window.innerHeight) / document.body.scrollHeight * 100);
        
        if (scrollDepth > maxScrollDepth) {
            maxScrollDepth = scrollDepth;
            
            // Track scroll milestones
            if (maxScrollDepth >= 25 && maxScrollDepth < 50) {
                trackEvent('scroll_depth', { depth: '25_percent' });
            } else if (maxScrollDepth >= 50 && maxScrollDepth < 75) {
                trackEvent('scroll_depth', { depth: '50_percent' });
            } else if (maxScrollDepth >= 75 && maxScrollDepth < 90) {
                trackEvent('scroll_depth', { depth: '75_percent' });
            } else if (maxScrollDepth >= 90) {
                trackEvent('scroll_depth', { depth: '90_percent' });
            }
        }
    }, { passive: true });
    
    // Track feature card interactions
    document.querySelectorAll('.feature-card, .capability-item, .solution-card').forEach(card => {
        card.addEventListener('click', function() {
            const cardTitle = this.querySelector('h3')?.textContent || 'Unknown';
            trackEvent('feature_interaction', {
                feature_name: cardTitle.trim(),
                section: this.closest('section')?.id || 'unknown'
            });
        });
    });
    
    // Track external link clicks
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('external_link_click', {
                url: this.href,
                text: this.textContent.trim()
            });
        });
    });
    
    // Track page exit intent (mouse leave from top)
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0) {
            trackEvent('user_behavior', { action: 'exit_intent' });
        }
    });
    
    // Clean up on page unload
    window.addEventListener('beforeunload', function() {
        clearInterval(engagementInterval);
        trackEvent('engagement', { 
            total_time: engagementTimer,
            max_scroll_depth: maxScrollDepth 
        });
    });
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Lazy load images (if not using native lazy loading)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources on hover
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('mouseenter', function() {
            const linkTag = document.createElement('link');
            linkTag.rel = 'prefetch';
            linkTag.href = this.href;
            document.head.appendChild(linkTag);
        }, { once: true });
    });
    
    // Monitor performance
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                
                trackEvent('performance', {
                    page_load_time: Math.round(loadTime),
                    dom_ready_time: Math.round(perfData.domContentLoadedEventEnd - perfData.navigationStart)
                });
            }, 0);
        });
    }
}

// Enhanced Event Tracking Helper
function trackEvent(eventName, parameters = {}) {
    // Add common parameters
    const enhancedParameters = {
        ...parameters,
        page_title: document.title,
        page_url: window.location.href,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`
    };
    
    // Use the global tracking function
    if (window.gaConsent && window.gaConsent.hasConsent()) {
        window.gaConsent.trackEvent(eventName, enhancedParameters);
    }
    
    // Also log to console in development
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1')) {
        console.log('Event tracked:', eventName, enhancedParameters);
    }
}

// Utility functions for external use
window.nexusUtils = {
    trackEvent,
    smoothScrollTo: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = element.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },
    
    showNotification: function(message, type = 'info') {
        // Create a simple notification system
        const notification = document.createElement('div');
        notification.className = `nexus-notification nexus-notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            border-radius: 6px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
};