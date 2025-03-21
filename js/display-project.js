function displayProjects(projects) {
    const projectsContainer = document.getElementById('projects-container');
    
    // Clear previous projects
    projectsContainer.innerHTML = '';
    
    // Check if any projects to display
    if (!projects || projects.length === 0) {
        projectsContainer.innerHTML = `
            <div class="no-results">
                <div class="search-icon"><i class="fas fa-search fa-3x"></i></div>
                <h2>No projects found</h2>
                <p>Try adjusting your search criteria or explore different categories.</p>
            </div>
        `;
        return;
    }
    
    // Create projects grid
    const projectsGrid = document.createElement('div');
    projectsGrid.className = 'projects-grid';
    
    // Group projects in rows of 3 for better layout
    for (let i = 0; i < projects.length; i += 3) {
        const row = document.createElement('div');
        row.className = 'projects-row';
        
        // Add up to 3 projects per row
        for (let j = i; j < Math.min(i + 3, projects.length); j++) {
            const project = projects[j];
            
            // Create a delay for staggered animation
            const delay = ((j % 3) * 0.15) + (Math.floor(j / 3) * 0.1);
            
            // Create project card
            const card = document.createElement('div');
            card.className = 'project-card';
            card.style.animationDelay = `${delay}s`;
            
            // Extract hardware cost if available
            let hardwareCost = '';
            if (project.hardwareCost) {
                hardwareCost = `<div class="project-tag"><i class="fas fa-microchip"></i>Hardware: ${project.hardwareCost}</div>`;
            }
            
            // Define logo URL based on project name
            let logoUrl = project.logoUrl;
            
            // Override with better logos when available
            if (project.name === 'NATIX Network') {
                logoUrl = 'https://natix.network/wp-content/uploads/2023/07/natix-logo-white.svg';
            } else if (project.name === 'MapMetrics') {
                logoUrl = 'https://mapmetrics.io/wp-content/uploads/2023/04/mapmatrics-logo.svg';
            } else if (project.name === 'DIMO') {
                logoUrl = 'https://dimo.zone/images/dimo-d.png';
            } else if (project.name === 'Hivemapper') {
                logoUrl = 'https://assets-global.website-files.com/6246f2beab6e8d480e24dccf/624749f0b8857dd957a91a2d_H-dashcam-logomark.svg';
            } else if (project.name === 'DOVU') {
                logoUrl = 'https://dovu.earth/assets/img/public/logo.svg';
            } else if (project.name === 'peaq Network') {
                logoUrl = 'https://peaq.network/assets/img/logos/peaq-logo-white.svg';
            }
            
            // Random gradient backgrounds for cards that need visual pop
            const gradients = [
                'linear-gradient(135deg, rgba(184, 255, 80, 0.03) 0%, rgba(15, 24, 36, 0) 100%)',
                'linear-gradient(135deg, rgba(76, 201, 240, 0.03) 0%, rgba(15, 24, 36, 0) 100%)',
                'linear-gradient(135deg, rgba(94, 114, 235, 0.03) 0%, rgba(15, 24, 36, 0) 100%)'
            ];
            
            const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
            card.style.backgroundImage = randomGradient;
            
            // Create logo element with fallback
            let logoHtml = '';
            if (logoUrl) {
                logoHtml = `
                    <div class="project-logo">
                        <img src="${logoUrl}" alt="${project.name} logo" onerror="this.onerror=null; this.src='https://via.placeholder.com/150?text=${encodeURIComponent(project.name)}'; this.style.opacity='0.7';">
                    </div>
                `;
            } else {
                // Fallback to category-based icon if no logo
                let iconClass = 'fa-car';
                if (project.category === 'app') {
                    iconClass = 'fa-mobile-alt';
                } else if (project.category === 'device') {
                    iconClass = 'fa-microchip';
                }
                
                logoHtml = `
                    <div class="project-logo" style="background-color: var(--section-bg); border-color: rgba(255, 255, 255, 0.1);">
                        <i class="fas ${iconClass}" style="font-size: 2rem; color: var(--accent-color);"></i>
                    </div>
                `;
            }
            
            // Create tags based on category and region
            let tags = '';
            
            if (project.category === 'app') {
                tags += `<div class="project-tag"><i class="fas fa-mobile-alt"></i>App-Based</div>`;
            } else if (project.category === 'device') {
                tags += `<div class="project-tag"><i class="fas fa-microchip"></i>Device-Based</div>`;
            }
            
            // Extract token info if available
            let tokenInfo = '';
            if (project.tokenTicker && project.tokenPrice) {
                const priceChange = project.tokenPriceChange || 0;
                const changeClass = priceChange >= 0 ? 'positive-change' : 'negative-change';
                const changeIcon = priceChange >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
                
                tokenInfo = `
                    <div class="token-price">
                        <h4>${project.tokenTicker} Price</h4>
                        <p>$${project.tokenPrice} <span class="${changeClass}"><i class="fas ${changeIcon}"></i> ${Math.abs(priceChange)}%</span></p>
                    </div>
                `;
            }
            
            // Complete project description if it ends with "..."
            let description = project.description;
            
            // Add card content
            card.innerHTML = `
                ${logoHtml}
                <h3 class="project-name">${project.name}</h3>
                <p class="project-description">${description}</p>
                <div class="project-tags">
                    ${tags}
                    ${hardwareCost}
                </div>
                ${tokenInfo}
                <a href="${project.url}" target="_blank" class="learn-more-btn">Learn More</a>
            `;
            
            row.appendChild(card);
        }
        
        projectsGrid.appendChild(row);
    }
    
    projectsContainer.appendChild(projectsGrid);
    
    // Add animation to reveal cards as they enter viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
}

// Helper function to generate star ratings
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let starsHtml = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star"></i>';
    }
    
    // Half star if needed
    if (halfStar) {
        starsHtml += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="far fa-star"></i>';
    }
    
    return starsHtml;
} 
