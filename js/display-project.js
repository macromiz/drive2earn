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
    
    // Filter out projects that should be excluded
    const excludedProjects = ['Helium Mobile', 'Nodle', 'CarBlocks', 'Wibson'];
    projects = projects.filter(project => !excludedProjects.includes(project.name));
    
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
            let logoUrl = project.logoUrl || project.logo;
            
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
            
            // Add fallback URLs if needed
            if (!logoUrl) {
                switch(project.name) {
                    case 'Hivemapper':
                        logoUrl = 'https://pbs.twimg.com/profile_images/1635267082441412608/Kd5c_mt8_400x400.png';
                        break;
                    case 'DIMO':
                        logoUrl = 'https://pbs.twimg.com/profile_images/1480978731796824064/v4z2KGD9_400x400.jpg';
                        break;
                    case 'MapMetrics':
                        logoUrl = 'https://pbs.twimg.com/profile_images/1625953683342336000/8LhLtXGR_400x400.jpg';
                        break;
                    case 'DOVU':
                        logoUrl = 'https://pbs.twimg.com/profile_images/1468947000813162496/N5-tYlZ5_400x400.jpg';
                        break;
                    case 'NATIX Network':
                        logoUrl = 'https://pbs.twimg.com/profile_images/1583788133037162498/5sFrFdX1_400x400.jpg';
                        break;
                }
            }
            
            // Random gradient backgrounds for cards that need visual pop
            const gradients = [
                'linear-gradient(135deg, rgba(184, 255, 80, 0.03) 0%, rgba(15, 24, 36, 0) 100%)',
                'linear-gradient(135deg, rgba(76, 201, 240, 0.03) 0%, rgba(15, 24, 36, 0) 100%)',
                'linear-gradient(135deg, rgba(94, 114, 235, 0.03) 0%, rgba(15, 24, 36, 0) 100%)'
            ];
            
            const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
            card.style.backgroundImage = randomGradient;
            
            // Create logo element with robust fallback
            let logoHtml = '';
            
            // Generate appropriate category icon class
            let iconClass = 'fa-car';
            if (project.category === 'app') {
                iconClass = 'fa-mobile-alt';
            } else if (project.category === 'device') {
                iconClass = 'fa-microchip';
            }
            
            // Create logo HTML with robust error handling
            logoHtml = `
                <div class="project-logo">
                    <img 
                        src="${logoUrl || ''}" 
                        alt="${project.name} logo" 
                        onerror="this.style.display='none'; this.parentNode.innerHTML='<i class=\\'fas ${iconClass}\\' style=\\'font-size: 2rem; color: var(--accent-color);\\' title=\\'${project.name}\\'></i>';"
                    >
                </div>
            `;
            
            // Create tags based on category and region
            let tags = '';
            
            if (project.category === 'app') {
                tags += `<div class="project-tag"><i class="fas fa-mobile-alt"></i>App-Based</div>`;
            } else if (project.category === 'device') {
                tags += `<div class="project-tag"><i class="fas fa-microchip"></i>Device-Based</div>`;
            }
            
            // Add token tag if available
            if (project.token || project.tokenTicker) {
                const tokenName = project.tokenTicker || project.token;
                tags += `<div class="project-tag"><i class="fas fa-coins"></i>${tokenName}</div>`;
            }
            
            // Extract token info if available
            let tokenInfo = '';
            if ((project.tokenPrice && project.tokenPrice !== "N/A") || project.tokenTicker) {
                const tokenPrice = project.tokenPrice || "N/A";
                const priceChange = project.tokenPriceChange || project.priceChange || 0;
                const changeClass = priceChange >= 0 ? 'positive-change' : 'negative-change';
                const changeIcon = priceChange >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
                const ticker = project.tokenTicker || project.token || "";
                
                tokenInfo = `
                    <div class="token-price">
                        <h4>${ticker} Price</h4>
                        <p>${tokenPrice !== "N/A" ? '$' + tokenPrice : 'Price Unavailable'} 
                           ${priceChange !== 0 && tokenPrice !== "N/A" ? 
                            `<span class="${changeClass}"><i class="fas ${changeIcon}"></i> ${Math.abs(priceChange)}%</span>` : ''}
                        </p>
                    </div>
                `;
            }
            
            // Complete project description if it ends with "..."
            let description = project.description;
            if (description && description.endsWith('...')) {
                // More complete descriptions for specific projects
                switch(project.name) {
                    case 'NATIX Network':
                        description = 'NATIX helps cities transform existing urban camera networks into powerful AI sensing tools using computer vision, without sharing any video or image data. The system generates insights across mobility, safety, and traffic analytics while preserving privacy.';
                        break;
                    case 'MapMetrics':
                        description = 'MapMetrics rewards users for contributing GPS location data while driving. The app validates, processes, and enhances map quality data and compensates users with MAP tokens. Perfect for daily commuters looking to earn passively.';
                        break;
                    case 'DIMO':
                        description = 'DIMO is a user-owned IoT platform connecting drivers, vehicles and apps. It allows users to earn tokens by sharing vehicle data while maintaining ownership and control of their information, creating value from everyday driving.';
                        break;
                    case 'Hivemapper':
                        description = 'Hivemapper is building a global, blockchain-based map using dashcams and community contributions. Drivers earn HONEY tokens by capturing street-level imagery that improves map accuracy and freshness through the Hivemapper Dashcam.';
                        break;
                    case 'Dovu':
                    case 'DOVU':
                        description = 'Dovu enables users to earn DOV tokens by tracking and verifying their carbon-friendly transportation choices. The platform rewards sustainable mobility behaviors, helping reduce carbon footprints while earning crypto.';
                        break;
                    case 'peaq Network':
                        description = 'peaq Network is building the Economy of Things on Web3 foundations. Users can earn from vehicle data and services including charging stations, ridesharing, and connected vehicle applications, all powered by blockchain technology.';
                        break;
                    default:
                        // For other projects, just remove the ellipsis
                        description = description.slice(0, -3);
                }
            }
            
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
