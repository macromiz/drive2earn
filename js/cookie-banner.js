/**
 * Cookie Banner for Drive2Earn.io
 * Handles cookie consent banner display and user interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookies');
    
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    // Always show the banner initially for testing purposes
    // Remove the conditional check to ensure the banner appears
    
    // Add cookie banner styles
    if (cookieBanner) {
        cookieBanner.style.display = 'flex';
        cookieBanner.style.flexDirection = 'column';
        cookieBanner.style.justifyContent = 'center';
        cookieBanner.style.alignItems = 'center';
        cookieBanner.style.position = 'fixed';
        cookieBanner.style.bottom = '0';
        cookieBanner.style.left = '0';
        cookieBanner.style.right = '0';
        cookieBanner.style.padding = '1rem';
        cookieBanner.style.background = 'rgba(21, 32, 43, 0.95)';
        cookieBanner.style.backdropFilter = 'blur(10px)';
        cookieBanner.style.borderTop = '1px solid rgba(76, 201, 240, 0.3)';
        cookieBanner.style.zIndex = '9999';
        cookieBanner.style.boxShadow = '0 -5px 20px rgba(0, 0, 0, 0.2)';
        cookieBanner.style.textAlign = 'center';
        
        // Style the accept button
        if (acceptButton) {
            acceptButton.style.background = '#38bdf8';
            acceptButton.style.color = '#0f172a';
            acceptButton.style.border = 'none';
            acceptButton.style.borderRadius = '0.5rem';
            acceptButton.style.padding = '0.75rem 2rem';
            acceptButton.style.margin = '0.75rem auto 0';
            acceptButton.style.fontWeight = '600';
            acceptButton.style.cursor = 'pointer';
            acceptButton.style.whiteSpace = 'nowrap';
            acceptButton.style.display = 'block';
            acceptButton.style.width = 'auto';
            acceptButton.style.minWidth = '150px';
            
            // Add hover effect with transition
            acceptButton.style.transition = 'all 0.3s ease';
            acceptButton.addEventListener('mouseover', function() {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 5px 15px rgba(56, 189, 248, 0.3)';
                this.style.background = '#0ea5e9';
            });
            
            acceptButton.addEventListener('mouseout', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
                this.style.background = '#38bdf8';
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
            bannerText.style.color = '#e2e8f0';
            bannerText.style.fontSize = '0.95rem';
            bannerText.style.maxWidth = '800px';
            bannerText.style.width = '100%';
            bannerText.style.textAlign = 'center';
            
            // Style the banner link
            const bannerLink = bannerText.querySelector('a');
            if (bannerLink) {
                bannerLink.style.color = '#38bdf8';
                bannerLink.style.textDecoration = 'none';
                bannerLink.style.fontWeight = '500';
                
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
                    font-size: 0.85rem;
                }
                
                #accept-cookies {
                    margin: 0.5rem auto 0;
                    padding: 0.6rem 1.5rem;
                    font-size: 0.9rem;
                }
            }
        `;
        document.head.appendChild(mobileStyle);
    }
}); 