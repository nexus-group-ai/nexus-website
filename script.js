// Initialize AOS (Animate On Scroll) Library
document.addEventListener("DOMContentLoaded", function() {
    AOS.init({
        duration: 800,       // animation duration in ms
        offset: 100,         // offset (in px) from the original trigger point
        easing: 'ease-in-out', // default easing for AOS animations
        once: true           // whether animation should happen only once - while scrolling down
    });
});

// Optional: Add a subtle parallax effect to the background on scroll
window.addEventListener('scroll', function() {
    const background = document.querySelector('.background-gradient');
    const scrollPosition = window.pageYOffset;
    background.style.transform = `translateY(${scrollPosition * 0.2}px)`;
});