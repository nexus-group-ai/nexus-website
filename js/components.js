/**
 * Component Management System
 * Centralized management for reusable page components
 */

class ComponentManager {
    /**
     * Generate navigation component
     */
    static navigation() {
        return `
            <header>
                <nav class="container">
                    <a href="index.html" class="logo">
                        <img src="assets/images/logo_icon.png" alt="Nexus Group AI">
                        Nexus Group AI
                    </a>
                    <ul class="nav-links" id="nav-menu">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="cer-directive.html">CER Directive</a></li>
                        <li><a href="privacy-policy.html">Privacy</a></li>
                        <li><a href="index.html#contact" class="cta-nav">Contact</a></li>
                    </ul>
                    <div class="nav-toggle" id="mobile-menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </nav>
            </header>
        `;
    }

    /**
     * Generate footer component
     */
    static footer() {
        return `
            <footer>
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-links">
                            <a href="privacy-policy.html">Privacy Policy</a>
                            <a href="index.html#contact">Contact</a>
                        </div>
                        <p>&copy; 2025 Nexus Group AI. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        `;
    }

    /**
     * Generate background gradient component
     */
    static backgroundGradient() {
        return `<div class="background-gradient"></div>`;
    }

    /**
     * Load all components into their placeholders
     */
    static loadComponents() {
        // Load navigation
        const navPlaceholder = document.getElementById('nav-placeholder');
        if (navPlaceholder) {
            navPlaceholder.innerHTML = this.navigation();
            this.initializeMobileMenu();
        }

        // Load footer
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = this.footer();
        }

        // Load background gradient
        const bgPlaceholder = document.getElementById('bg-placeholder');
        if (bgPlaceholder) {
            bgPlaceholder.innerHTML = this.backgroundGradient();
        }
    }

    /**
     * Initialize mobile menu functionality
     */
    static initializeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');
        
        if (mobileMenu && navMenu) {
            // Remove any existing event listeners
            const newMobileMenu = mobileMenu.cloneNode(true);
            mobileMenu.parentNode.replaceChild(newMobileMenu, mobileMenu);
            
            // Add click event listener
            newMobileMenu.addEventListener('click', () => {
                newMobileMenu.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking on a link
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    newMobileMenu.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    /**
     * Set active navigation item based on current page
     */
    static setActiveNavItem() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('#')[0];
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

/**
 * Auto-initialize components when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    ComponentManager.loadComponents();
    
    // Set active nav item after a short delay to ensure components are loaded
    setTimeout(() => {
        ComponentManager.setActiveNavItem();
    }, 100);
});

/**
 * Export for use in other scripts if needed
 */
window.ComponentManager = ComponentManager;
