/**
 * Cookie Banner for Drive2Earn.io
 * Handles cookie consent banner display and user interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookies');
    const declineButton = document.getElementById('decline-cookies');
    
    // Check if user has already made a cookie choice
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    const cookiesDeclined = localStorage.getItem('cookiesDeclined');
    
    // Hide banner if user has already made a choice
    if (cookiesAccepted === 'true' || cookiesDeclined === 'true') {
        cookieBanner.style.display = 'none';
    }
    
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
        cookieBanner.style.borderTop = 'none'; // Remove border
        cookieBanner.style.zIndex = '9999';
        cookieBanner.style.boxShadow = 'none'; // Remove shadow
        cookieBanner.style.textAlign = 'center';
        
        // Function to hide banner
        const hideBanner = () => {
            // Hide the banner with a slide-out animation
            cookieBanner.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            cookieBanner.style.transform = 'translateY(100%)';
            cookieBanner.style.opacity = '0';
            
            // Remove from DOM after animation completes
            setTimeout(function() {
                cookieBanner.style.display = 'none';
            }, 500);
        };
        
        // Function to set cookies enabled/disabled
        const setCookiePreference = (enabled) => {
            // Create a script element to set a global variable for other scripts to check
            const scriptElem = document.createElement('script');
            scriptElem.textContent = `window.cookiesEnabled = ${enabled};`;
            document.head.appendChild(scriptElem);
            
            // If cookies declined, disable analytics and tracking scripts
            if (!enabled) {
                // Disable Google Analytics if it exists
                if (window.ga) {
                    window['ga-disable-UA-XXXXXXXX-X'] = true; // Replace with your GA ID if you have one
                }
                
                // Disable any other tracking scripts
                const disableTracking = document.createElement('script');
                disableTracking.textContent = `
                    // Disable common tracking cookies
                    document.cookie.split(';').forEach(function(c) {
                        document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
                    });
                `;
                document.head.appendChild(disableTracking);
            }
        };
        
        // Handle accept button click
        if (acceptButton) {
            acceptButton.addEventListener('click', function() {
                // Store consent in localStorage
                localStorage.setItem('cookiesAccepted', 'true');
                localStorage.removeItem('cookiesDeclined');
                setCookiePreference(true);
                hideBanner();
            });
        }
        
        // Handle decline button click
        if (declineButton) {
            declineButton.addEventListener('click', function() {
                // Store decline preference in localStorage
                localStorage.setItem('cookiesDeclined', 'true');
                localStorage.removeItem('cookiesAccepted');
                setCookiePreference(false);
                hideBanner();
            });
        }
        
        // Style the text and links in the banner
        const bannerText = cookieBanner.querySelector('p');
        if (bannerText) {
            bannerText.style.margin = '0 0 15px 0';
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
                
                .cookie-buttons {
                    flex-direction: column;
                    gap: 10px;
                    width: 100%;
                    max-width: 250px;
                }
                
                .cookie-btn {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(mobileStyle);
    }
}); 