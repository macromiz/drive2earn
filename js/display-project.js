function displayProjects(projects) {
    console.log("displayProjects called with", projects ? projects.length : 0, "projects");
    
    // Debug the projects array to see what's being passed
    if (projects && projects.length > 0) {
        console.log("Sample project data:", JSON.stringify(projects[0]));
    } else {
        console.warn("Projects array is empty or undefined:", projects);
    }
    
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) {
        console.error("Projects container not found in the DOM!");
        return;
    }
    
    // Clear previous projects
    projectsContainer.innerHTML = '';
    
    // Check if any projects to display
    if (!projects || projects.length === 0) {
        console.warn("No projects to display - showing empty state");
        projectsContainer.innerHTML = `
            <div class="no-results">
                <div class="search-icon"><i class="fas fa-search fa-3x"></i></div>
                <h2>No projects found</h2>
                <p>Try adjusting your search criteria or explore different categories.</p>
            </div>
        `;
        return;
    }
    
    console.log("Original projects before filtering:", projects.map(p => p.name).join(', '));
    
    // Filter out projects that should be excluded
    const excludedProjects = ['Wibson', 'DOVU', 'Dovu', 'CarBlock', 'Carro']; 
    const filteredProjects = projects.filter(project => !excludedProjects.includes(project.name));
    
    console.log("After filtering, remaining projects:", filteredProjects.map(p => p.name).join(', '));
    
    // If all projects were filtered out, show empty state
    if (filteredProjects.length === 0) {
        console.warn("All projects were filtered out by exclusion list");
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
    for (let i = 0; i < filteredProjects.length; i += 3) {
        const row = document.createElement('div');
        row.className = 'projects-row';
        
        // Add up to 3 projects per row
        for (let j = i; j < Math.min(i + 3, filteredProjects.length); j++) {
            const project = filteredProjects[j];
            console.log(`Creating card for project: ${project.name}`);
            
            // Create a delay for staggered animation
            const delay = ((j % 3) * 0.15) + (Math.floor(j / 3) * 0.1);
            
            // Create project card
            const card = document.createElement('div');
            card.className = 'project-card';
            card.style.animationDelay = `${delay}s`;
            
            // Add project badges (featured, popular, trending)
            let badgesHtml = '<div class="project-badges">';
            if (project.featured) {
                badgesHtml += '<span class="badge featured">Featured</span>';
            }
            if (project.popular) {
                badgesHtml += '<span class="badge popular">Popular</span>';
            }
            if (project.trending) {
                badgesHtml += '<span class="badge trending">Trending</span>';
            }
            badgesHtml += '</div>';
            
            // Extract hardware cost if available
            let hardwareCost = '';
            if (project.hardwareCost) {
                hardwareCost = `<div class="project-tag"><i class="fas fa-microchip"></i>Hardware: ${project.hardwareCost}</div>`;
            }
            
            // Use project initial for the project logo placeholder
            const projectInitial = project.name.charAt(0);
            
            // Create logo HTML with placeholder instead of image
            const logoHtml = `
                <div class="project-logo">
                    <div class="project-logo-placeholder">${projectInitial}</div>
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
            
            // Ensure we always use shortDescription or complete description with no truncation
            let description = project.shortDescription || project.description || "No description available";
            
            // Special descriptions for specific projects
            if (project.name === 'DIMO') {
                description = 'Earn tokens with this IoT platform that connects your vehicle data while maintaining your ownership.';
            } else if (project.name === 'NATIX Network') {
                description = 'Transform urban camera networks into AI sensing tools with privacy-preserving computer vision.';
            } else if (project.name === 'MapMetrics') {
                description = 'Earn tokens by contributing to map quality with your GPS location data while driving.';
            } else if (project.name === 'Hivemapper') {
                description = 'Build a global blockchain-based map with your dashcam and earn HONEY tokens for your contributions.';
            } else if (project.name === 'peaq Network') {
                description = 'Join DePin ecosystem, and earn from multiple projects.';
            } else if (project.name === 'DreamCars') {
                description = 'Invest in luxury rental cars and earn monthly income.';
            }
            
            // Check for missing getCtaButtonText function
            let buttonText = "Learn More";
            try {
                if (typeof getCtaButtonText === 'function') {
                    buttonText = getCtaButtonText(project.name, project.category);
                }
            } catch (e) {
                console.warn("Error getting CTA button text:", e);
            }
            
            // Add card content
            card.innerHTML = `
                ${logoHtml}
                <h3 class="project-name">${project.name}</h3>
                ${badgesHtml}
                <p class="project-description">${description}</p>
                <div class="project-tags">
                    ${tags}
                    ${hardwareCost}
                </div>
                ${tokenInfo}
                <div class="project-details">
                    <div class="detail-item">
                        <i class="fas fa-coins"></i>
                        <span>Est. Earnings: ${project.earnings}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-globe-americas"></i>
                        <span>Region: ${project.regionDetails || project.region}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-car"></i>
                        <span>Type: ${project.type}</span>
                    </div>
                </div>
                <a href="${
                    project.name === 'DIMO' ? 'https://dimo.co/products/dimo-lte-r1?ref=ADRIANIWANOWSKI&utm_source=affiliate&variant=46140394766591' : 
                    project.name === 'DreamCars' ? 'https://dreamcars.co/' : 
                    project.name === 'peaq Network' ? 'https://portal.peaq.xyz/?ref=Voixtk3Ix' : 
                    project.url
                }" target="_blank" class="view-project-btn">
                    ${buttonText}
                </a>
            `;
            
            row.appendChild(card);
        }
        
        projectsGrid.appendChild(row);
    }
    
    projectsContainer.appendChild(projectsGrid);
    console.log("Projects displayed successfully");
    
    // Add animation to reveal cards as they enter viewport
    try {
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
    } catch (error) {
        console.error("Error setting up IntersectionObserver:", error);
    }
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

// Add outside the card creation loop, above the place where you add observers
// Helper function to get appropriate CTA text based on project
function getCtaButtonText(projectName, category) {
    switch(projectName) {
        case 'DIMO':
            return 'Start Earning Rewards';
        case 'Hivemapper':
            return 'Map & Earn';
        case 'MapMetrics':
            return 'Drive & Earn';
        case 'NATIX Network':
            return 'Join Network';
        case 'peaq Network':
            return 'Connect & Earn';
        case 'DreamCars':
            return 'Invest Now';
        default:
            return category === 'app' ? 'Download App' : 'Start Earning';
    }
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    // Create card content with image error handling
    card.innerHTML = `
        <div class="project-header">
            <div class="project-logo">
                <img src="${project.logoUrl}" alt="${project.name} logo" onerror="this.onerror=null; this.src='img/placeholder-logo.png'; this.alt='Project logo placeholder';">
            </div>
            <div class="project-badges">
                ${project.featured ? '<span class="badge featured">FEATURED</span>' : ''}
                ${project.popular ? '<span class="badge popular">POPULAR</span>' : ''}
            </div>
        </div>
        <h3 class="project-name">${project.name}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-details">
            <div class="detail-item">
                <i class="fas fa-coins"></i>
                <span>Est. Earnings: ${project.earnings}</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-globe-americas"></i>
                <span>Region: ${project.regionDetails || project.region}</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-car"></i>
                <span>Type: ${project.type}</span>
            </div>
        </div>
        <a href="${
            project.name === 'DIMO' ? 'https://dimo.co/products/dimo-lte-r1?ref=ADRIANIWANOWSKI&utm_source=affiliate&variant=46140394766591' : 
            project.name === 'DreamCars' ? 'https://dreamcars.co/' : 
            project.name === 'peaq Network' ? 'https://portal.peaq.xyz/?ref=Voixtk3Ix' : 
            project.url
        }" class="view-project-btn">View Details</a>
    `;
    
    return card;
}

// Helper function to determine CTA text based on project type
function getCtaText(category) {
    if (!category) return 'View Details';
    
    category = category.toLowerCase();
    if (category.includes('app')) {
        return 'Download App';
    } else if (category.includes('device') || category.includes('obd')) {
        return 'Order Device';
    } else {
        return 'View Details';
    }
} 
