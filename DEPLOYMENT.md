# Deployment Guide for Nexus Group AI Website

## Overview
This guide covers deploying the Nexus Group AI website from the current repository to replace the existing website at https://nexus-group.ai/

## Prerequisites
- Git repository access
- GitHub account with appropriate permissions
- Domain control for nexus-group.ai

## Deployment Steps

### 1. Repository Setup
The repository is already configured with:
- ✅ GitHub Actions workflow (`.github/workflows/deploy.yml`)
- ✅ CNAME file pointing to `nexus-group.ai`
- ✅ Proper file structure and assets
- ✅ SEO optimization with meta tags and structured data
- ✅ Responsive design for all devices

### 2. GitHub Pages Configuration
1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. The workflow will automatically deploy on pushes to `main` branch

### 3. Domain Configuration
The CNAME file is already configured for `nexus-group.ai`. Ensure DNS settings point to:
- A record: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- Or CNAME: `nexus-group-ai.github.io`

### 4. SSL Certificate
GitHub Pages automatically provides SSL certificates for custom domains.

## File Structure
```
nexus-website/
├── .github/workflows/deploy.yml  # GitHub Actions deployment
├── .gitignore                    # Git ignore rules
├── CNAME                         # Custom domain configuration
├── index.html                    # Main website file
├── style.css                     # Styles and responsive design
├── script.js                     # JavaScript functionality
├── robots.txt                    # SEO crawler instructions
├── sitemap.xml                   # SEO sitemap
├── logo_icon.png                 # Company logo icon
├── logo_full.png                 # Full company logo
├── README.md                     # Documentation
└── DEPLOYMENT.md                 # This file
```

## Features Implemented
- ✅ Modern, responsive design
- ✅ SEO optimization (meta tags, structured data, sitemap)
- ✅ Fast loading with optimized assets
- ✅ Accessibility features
- ✅ Cross-browser compatibility
- ✅ Mobile-first approach
- ✅ Smooth animations and interactions

## Content Updates Made
The new website includes:
- Updated branding and messaging
- IRIS platform focus
- Founder information
- Contact details
- Modern design aligned with AI/tech industry standards

## Performance Optimizations
- Minimal external dependencies
- Optimized CSS with modern features
- Efficient JavaScript with AOS library
- Compressed and optimized images
- Fast loading fonts from Google Fonts

## Testing Checklist
Before going live, test:
- [ ] All navigation links work
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Form functionality (if any)
- [ ] Page load speed
- [ ] SEO meta tags are correct
- [ ] All images load properly
- [ ] Cross-browser compatibility

## Go-Live Process
1. Commit and push all changes to main branch
2. GitHub Actions will automatically deploy
3. Verify deployment at nexus-group.ai
4. Monitor for any issues

## Rollback Plan
If issues occur:
1. Revert to previous commit in main branch
2. GitHub Actions will redeploy previous version
3. Or temporarily point DNS away from GitHub Pages

## Monitoring
After deployment, monitor:
- Website accessibility
- Performance metrics
- SEO rankings
- User feedback

## Support
For technical issues contact:
- Development Team: info@nexus-group.ai
- Repository: https://github.com/nexus-group-ai/nexus-website
