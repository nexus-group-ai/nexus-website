// Initialize AOS (Animate On Scroll) Library
document.addEventListener("DOMContentLoaded", function() {
    AOS.init({
        duration: 800,       // animation duration in ms
        offset: 100,         // offset (in px) from the original trigger point
        easing: 'ease-in-out', // default easing for AOS animations
        once: true           // whether animation should happen only once - while scrolling down
    });
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
});

// Optional: Add a subtle parallax effect to the background on scroll
window.addEventListener('scroll', function() {
    const background = document.querySelector('.background-gradient');
    if (background) {
        const scrollPosition = window.pageYOffset;
        background.style.transform = `translateY(${scrollPosition * 0.2}px)`;
    }
});