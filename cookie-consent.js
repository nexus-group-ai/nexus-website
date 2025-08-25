/**
 * GDPR-Compliant Cookie Consent Manager
 * Nexus Group AI - 2025
 */

class CookieConsent {
    constructor() {
        this.cookieName = 'nexus-cookie-consent';
        this.cookieExpiry = 365; // days
        this.consentGiven = false;
        this.preferences = {
            necessary: true, // Always true, cannot be disabled
            analytics: false,
            marketing: false,
            functional: false
        };
        
        this.init();
    }

    init() {
        // Check if consent has already been given
        const existingConsent = this.getCookie(this.cookieName);
        
        if (existingConsent) {
            try {
                this.preferences = JSON.parse(existingConsent);
                this.consentGiven = true;
                this.loadApprovedCookies();
            } catch (e) {
                console.error('Error parsing cookie consent:', e);
                this.showConsentBanner();
            }
        } else {
            this.showConsentBanner();
        }

        // Create settings button for users to change preferences
        this.createSettingsButton();
    }

    showConsentBanner() {
        if (document.getElementById('cookie-consent-banner')) {
            return; // Banner already exists
        }

        const banner = this.createConsentBanner();
        document.body.appendChild(banner);
        
        // Animate banner in
        setTimeout(() => {
            banner.classList.add('show');
        }, 100);
    }

    createConsentBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'cookie-consent-banner';
        
        banner.innerHTML = `
            <div class="cookie-consent-content">
                <div class="cookie-consent-text">
                    <h3>🍪 We value your privacy</h3>
                    <p>We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can choose which cookies to accept.</p>
                </div>
                <div class="cookie-consent-actions">
                    <button id="cookie-accept-all" class="cookie-btn cookie-btn-primary">
                        Accept All
                    </button>
                    <button id="cookie-reject-all" class="cookie-btn cookie-btn-secondary">
                        Reject All
                    </button>
                    <button id="cookie-customize" class="cookie-btn cookie-btn-outline">
                        Customize
                    </button>
                </div>
            </div>
        `;

        // Add event listeners
        banner.querySelector('#cookie-accept-all').addEventListener('click', () => {
            this.acceptAll();
        });

        banner.querySelector('#cookie-reject-all').addEventListener('click', () => {
            this.rejectAll();
        });

        banner.querySelector('#cookie-customize').addEventListener('click', () => {
            this.showCustomizeModal();
        });

        return banner;
    }

    showCustomizeModal() {
        if (document.getElementById('cookie-customize-modal')) {
            return; // Modal already exists
        }

        const modal = this.createCustomizeModal();
        document.body.appendChild(modal);
        
        // Animate modal in
        setTimeout(() => {
            modal.classList.add('show');
        }, 100);
    }

    createCustomizeModal() {
        const modal = document.createElement('div');
        modal.id = 'cookie-customize-modal';
        modal.className = 'cookie-modal';
        
        modal.innerHTML = `
            <div class="cookie-modal-overlay"></div>
            <div class="cookie-modal-content">
                <div class="cookie-modal-header">
                    <h3>Cookie Preferences</h3>
                    <button id="cookie-modal-close" class="cookie-modal-close">&times;</button>
                </div>
                <div class="cookie-modal-body">
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h4>Strictly Necessary Cookies</h4>
                            <div class="cookie-toggle">
                                <input type="checkbox" id="necessary" checked disabled>
                                <label for="necessary"></label>
                            </div>
                        </div>
                        <p>These cookies are essential for the website to function properly. They enable basic features like navigation and access to secure areas. These cannot be disabled.</p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h4>Analytics Cookies</h4>
                            <div class="cookie-toggle">
                                <input type="checkbox" id="analytics" ${this.preferences.analytics ? 'checked' : ''}>
                                <label for="analytics"></label>
                            </div>
                        </div>
                        <p>These cookies help us understand how visitors use our website by collecting anonymous information about pages visited and user interactions.</p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h4>Marketing Cookies</h4>
                            <div class="cookie-toggle">
                                <input type="checkbox" id="marketing" ${this.preferences.marketing ? 'checked' : ''}>
                                <label for="marketing"></label>
                            </div>
                        </div>
                        <p>These cookies are used to track visitors across websites to display relevant advertisements and measure campaign effectiveness.</p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h4>Functional Cookies</h4>
                            <div class="cookie-toggle">
                                <input type="checkbox" id="functional" ${this.preferences.functional ? 'checked' : ''}>
                                <label for="functional"></label>
                            </div>
                        </div>
                        <p>These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.</p>
                    </div>
                </div>
                <div class="cookie-modal-footer">
                    <button id="cookie-save-preferences" class="cookie-btn cookie-btn-primary">
                        Save Preferences
                    </button>
                    <button id="cookie-modal-cancel" class="cookie-btn cookie-btn-secondary">
                        Cancel
                    </button>
                </div>
                <div class="cookie-modal-links">
                    <a href="/privacy-policy.html" target="_blank">Privacy Policy</a> | 
                    <a href="/cookies.html" target="_blank">Cookie Policy</a>
                </div>
            </div>
        `;

        // Add event listeners
        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        };

        modal.querySelector('#cookie-modal-close').addEventListener('click', closeModal);
        modal.querySelector('#cookie-modal-cancel').addEventListener('click', closeModal);
        modal.querySelector('.cookie-modal-overlay').addEventListener('click', closeModal);

        modal.querySelector('#cookie-save-preferences').addEventListener('click', () => {
            this.saveCustomPreferences();
            closeModal();
        });

        return modal;
    }

    createSettingsButton() {
        if (document.getElementById('cookie-settings-btn')) {
            return; // Button already exists
        }

        const settingsBtn = document.createElement('button');
        settingsBtn.id = 'cookie-settings-btn';
        settingsBtn.className = 'cookie-settings-btn';
        settingsBtn.innerHTML = '🍪';
        settingsBtn.title = 'Cookie Settings';
        
        settingsBtn.addEventListener('click', () => {
            this.showCustomizeModal();
        });

        document.body.appendChild(settingsBtn);
    }

    acceptAll() {
        this.preferences = {
            necessary: true,
            analytics: true,
            marketing: true,
            functional: true
        };
        this.saveConsent();
    }

    rejectAll() {
        this.preferences = {
            necessary: true,
            analytics: false,
            marketing: false,
            functional: false
        };
        this.saveConsent();
    }

    saveCustomPreferences() {
        const modal = document.getElementById('cookie-customize-modal');
        
        this.preferences = {
            necessary: true, // Always true
            analytics: modal.querySelector('#analytics').checked,
            marketing: modal.querySelector('#marketing').checked,
            functional: modal.querySelector('#functional').checked
        };
        
        this.saveConsent();
    }

    saveConsent() {
        this.consentGiven = true;
        this.setCookie(this.cookieName, JSON.stringify(this.preferences), this.cookieExpiry);
        this.loadApprovedCookies();
        this.hideConsentBanner();
        
        // Trigger custom event for other scripts to listen to
        window.dispatchEvent(new CustomEvent('cookieConsentChanged', {
            detail: this.preferences
        }));
    }

    loadApprovedCookies() {
        // Google Analytics (if analytics cookies are accepted)
        if (this.preferences.analytics) {
            this.loadGoogleAnalytics();
        }

        // Marketing cookies (if marketing cookies are accepted)
        if (this.preferences.marketing) {
            this.loadMarketingScripts();
        }

        // Functional cookies (if functional cookies are accepted)
        if (this.preferences.functional) {
            this.loadFunctionalScripts();
        }
    }

    loadGoogleAnalytics() {
        // Replace 'G-XXXXXXXXXX' with your actual Google Analytics ID
        const GA_ID = 'G-XXXXXXXXXX';
        
        if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_ID}"]`)) {
            // Load Google Analytics
            const script1 = document.createElement('script');
            script1.async = true;
            script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
            document.head.appendChild(script1);

            const script2 = document.createElement('script');
            script2.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                    anonymize_ip: true,
                    cookie_flags: 'SameSite=None;Secure'
                });
            `;
            document.head.appendChild(script2);
        }
    }

    loadMarketingScripts() {
        // Load marketing-related scripts here
        // Example: LinkedIn Insight Tag, Facebook Pixel, etc.
        console.log('Loading marketing scripts...');
    }

    loadFunctionalScripts() {
        // Load functional scripts here
        // Example: Chat widgets, preference saving, etc.
        console.log('Loading functional scripts...');
    }

    hideConsentBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => {
                if (banner.parentNode) {
                    banner.parentNode.removeChild(banner);
                }
            }, 300);
        }
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

    // Public methods for external use
    hasConsent(type) {
        return this.consentGiven && this.preferences[type];
    }

    getPreferences() {
        return { ...this.preferences };
    }

    revokeConsent() {
        this.setCookie(this.cookieName, '', -1);
        this.consentGiven = false;
        this.preferences = {
            necessary: true,
            analytics: false,
            marketing: false,
            functional: false
        };
        this.showConsentBanner();
        
        // Reload page to clear existing cookies/scripts
        if (confirm('To fully revoke consent, the page needs to be reloaded. Continue?')) {
            window.location.reload();
        }
    }
}

// Initialize cookie consent when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.cookieConsent = new CookieConsent();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CookieConsent;
}
