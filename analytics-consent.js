/**
 * Google Analytics Cookie Consent Manager
 * Nexus Group AI - 2025
 * Simplified for Google Analytics only
 */

class GoogleAnalyticsConsent {
    constructor() {
        this.cookieName = 'nexus-ga-consent';
        this.cookieExpiry = 365; // days
        this.gaId = 'G-XXXXXXXXXX'; // Replace with your actual Google Analytics ID
        this.consentGiven = false;
        
        this.init();
    }

    init() {
        // Check if consent has already been given
        const existingConsent = this.getCookie(this.cookieName);
        
        if (existingConsent === 'accepted') {
            this.consentGiven = true;
            this.loadGoogleAnalytics();
        } else if (existingConsent !== 'declined') {
            // Only show banner if no decision has been made
            this.showConsentBanner();
        }

        // Create settings button for users to change preferences
        this.createSettingsButton();
    }

    showConsentBanner() {
        if (document.getElementById('ga-consent-banner')) {
            return; // Banner already exists
        }

        const banner = this.createConsentBanner();
        document.body.appendChild(banner);
        
        // Animate banner in
        setTimeout(() => {
            banner.classList.add('show');
        }, 500); // Delay to ensure page is loaded
    }

    createConsentBanner() {
        const banner = document.createElement('div');
        banner.id = 'ga-consent-banner';
        banner.className = 'ga-consent-banner';
        
        banner.innerHTML = `
            <div class="ga-consent-content">
                <div class="ga-consent-text">
                    <h3><i class="fas fa-chart-line"></i> Analytics & Performance</h3>
                    <p>We use Google Analytics to understand how visitors use our website and improve your experience. No personal data is shared with third parties.</p>
                </div>
                <div class="ga-consent-actions">
                    <button id="ga-accept" class="ga-btn ga-btn-primary">
                        <i class="fas fa-check"></i> Accept Analytics
                    </button>
                    <button id="ga-decline" class="ga-btn ga-btn-secondary">
                        <i class="fas fa-times"></i> Decline
                    </button>
                </div>
            </div>
        `;

        // Add event listeners
        banner.querySelector('#ga-accept').addEventListener('click', () => {
            this.acceptAnalytics();
        });

        banner.querySelector('#ga-decline').addEventListener('click', () => {
            this.declineAnalytics();
        });

        return banner;
    }

    createSettingsButton() {
        if (document.getElementById('ga-settings-btn')) {
            return; // Button already exists
        }

        const settingsBtn = document.createElement('button');
        settingsBtn.id = 'ga-settings-btn';
        settingsBtn.className = 'ga-settings-btn';
        settingsBtn.innerHTML = '<i class="fas fa-chart-line"></i>';
        settingsBtn.title = 'Analytics Settings';
        
        settingsBtn.addEventListener('click', () => {
            this.showConsentBanner();
        });

        document.body.appendChild(settingsBtn);
    }

    acceptAnalytics() {
        this.consentGiven = true;
        this.setCookie(this.cookieName, 'accepted', this.cookieExpiry);
        this.loadGoogleAnalytics();
        this.hideConsentBanner();
        
        // Show confirmation
        this.showNotification('✅ Analytics enabled. Thank you for helping us improve!', 'success');
    }

    declineAnalytics() {
        this.consentGiven = false;
        this.setCookie(this.cookieName, 'declined', this.cookieExpiry);
        this.hideConsentBanner();
        
        // Show confirmation
        this.showNotification('🔒 Analytics disabled. Your privacy is respected.', 'info');
    }

    loadGoogleAnalytics() {
        if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${this.gaId}"]`)) {
            return; // Already loaded
        }

        // Load Google Analytics
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${this.gaId}', {
                anonymize_ip: true,
                cookie_flags: 'SameSite=Lax;Secure',
                cookie_expires: 63072000, // 2 years in seconds
                allow_google_signals: false,
                allow_ad_personalization_signals: false
            });
        `;
        document.head.appendChild(script2);

        console.log('Google Analytics loaded with privacy-enhanced settings');
    }

    hideConsentBanner() {
        const banner = document.getElementById('ga-consent-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => {
                if (banner.parentNode) {
                    banner.parentNode.removeChild(banner);
                }
            }, 300);
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `ga-notification ga-notification-${type}`;
        notification.innerHTML = message;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Hide notification after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Utility functions
    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure`;
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Public methods
    hasConsent() {
        return this.consentGiven;
    }

    revokeConsent() {
        this.setCookie(this.cookieName, 'declined', this.cookieExpiry);
        this.consentGiven = false;
        
        // Remove GA scripts and reload page to clear tracking
        if (confirm('To fully disable analytics, the page needs to be reloaded. Continue?')) {
            window.location.reload();
        }
    }

    // Track custom events (only if consent given)
    trackEvent(eventName, parameters = {}) {
        if (this.consentGiven && typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }
    }
}

// Initialize Google Analytics consent when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.gaConsent = new GoogleAnalyticsConsent();
});

// Helper function for tracking events throughout the site
function trackEvent(eventName, parameters = {}) {
    if (window.gaConsent) {
        window.gaConsent.trackEvent(eventName, parameters);
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GoogleAnalyticsConsent;
}
