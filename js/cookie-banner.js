/**
 * Cookie Banner for Drive2Earn.io
 * Handles cookie consent banner display and user interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookies');
    
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    // If not accepted yet, show the banner
    if (!cookiesAccepted) {
        // Add cookie banner styles
        cookieBanner.style.position = 'fixed';
        cookieBanner.style.bottom = '0';
        cookieBanner.style.left = '0';
        cookieBanner.style.right = '0';
        cookieBanner.style.padding = '1rem';
        cookieBanner.style.background = 'rgba(21, 32, 43, 0.95)';
        cookieBanner.style.backdropFilter = 'blur(10px)';
        cookieBanner.style.borderTop = '1px solid rgba(76, 201, 240, 0.3)';
        cookieBanner.style.display = 'flex';
        cookieBanner.style.justifyContent = 'space-between';
        cookieBanner.style.alignItems = 'center';
        cookieBanner.style.zIndex = '9999';
        cookieBanner.style.boxShadow = '0 -5px 20px rgba(0, 0, 0, 0.2)';
        
        // Style the accept button
        if (acceptButton) {
            acceptButton.style.background = 'var(--accent-color)';
            acceptButton.style.color = 'var(--dark-bg)';
            acceptButton.style.border = 'none';
            acceptButton.style.borderRadius = '0.5rem';
            acceptButton.style.padding = '0.75rem 1.5rem';
            acceptButton.style.marginLeft = '1rem';
            acceptButton.style.fontWeight = '600';
            acceptButton.style.cursor = 'pointer';
            acceptButton.style.whiteSpace = 'nowrap';
            
            // Add hover effect with transition
            acceptButton.style.transition = 'all 0.3s ease';
            acceptButton.addEventListener('mouseover', function() {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 5px 15px rgba(184, 255, 80, 0.3)';
            });
            
            acceptButton.addEventListener('mouseout', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
            
            // Handle accept button click
            acceptButton.addEventListener('click', function() {
                // Store consent in localStorage
                localStorage.setItem('cookiesAccepted', 'true');
                
                // Hide the banner with a slide-out animation
                cookieBanner.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
                cookieBanner.style.transform = 'translateY(100%)';
                cookieBanner.style.opacity = '0';
                
                // Remove from DOM after animation completes
                setTimeout(function() {
                    cookieBanner.style.display = 'none';
                }, 500);
            });
        }
        
        // Style the text and links in the banner
        const bannerText = cookieBanner.querySelector('p');
        if (bannerText) {
            bannerText.style.margin = '0';
            bannerText.style.color = 'var(--light-text)';
            bannerText.style.fontSize = '0.95rem';
            bannerText.style.flex = '1';
            
            // Style the banner link
            const bannerLink = bannerText.querySelector('a');
            if (bannerLink) {
                bannerLink.style.color = 'var(--accent-color)';
                bannerLink.style.textDecoration = 'none';
                
                // Convert relative URL to absolute URL
                if (bannerLink.getAttribute('href') && !bannerLink.getAttribute('href').startsWith('http')) {
                    const currentUrl = window.location.href;
                    const baseUrl = currentUrl.split('/').slice(0, 3).join('/'); // Get protocol and domain
                    const relativeUrl = bannerLink.getAttribute('href');
                    bannerLink.setAttribute('href', baseUrl + '/' + relativeUrl.replace(/^\//, ''));
                }
                
                bannerLink.addEventListener('mouseover', function() {
                    this.style.textDecoration = 'underline';
                });
                
                bannerLink.addEventListener('mouseout', function() {
                    this.style.textDecoration = 'none';
                });
            }
        }
        
        // Add responsive styling for mobile devices
        const mobileStyle = document.createElement('style');
        mobileStyle.innerHTML = `
            @media (max-width: 768px) {
                #cookie-banner {
                    flex-direction: column;
                    padding: 1rem;
                }
                
                #cookie-banner p {
                    margin-bottom: 1rem;
                    text-align: center;
                }
                
                #accept-cookies {
                    width: 100%;
                    margin-left: 0;
                }
            }
        `;
        document.head.appendChild(mobileStyle);
    }
}); 