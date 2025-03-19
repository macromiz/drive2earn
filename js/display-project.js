function displayProjects(projects) {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;
    
    // Clear previous projects
    projectsContainer.innerHTML = '';
    
    if (projects.length === 0) {
        projectsContainer.innerHTML = `
            <div class="no-results">
                <div class="search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
                <h2>No projects found</h2>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }

    // Create the projects grid
    const projectsGrid = document.createElement('div');
    projectsGrid.className = 'projects-grid';
    
    // Filter out projects to exclude
    const filteredProjects = projects.filter(project => 
        project.name !== 'Nodle' && 
        project.name !== 'Helium Mobile' && 
        project.name !== 'CarBlocks' && 
        project.name !== 'Wibson'
    );
    
    // Fix incomplete descriptions that end with ellipses
    filteredProjects.forEach(project => {
        // Check if description ends with ellipsis or is incomplete
        if (project.description) {
            if (project.description.endsWith('...')) {
                // Complete descriptions based on project name
                if (project.name === 'NATIX Network') {
                    project.description = "Turn your smartphone into an AI-powered dashcam and navigation assistant. The Drive& mobile app uses computer vision to detect road events and rewards users for contributing high-quality data to the network.";
                } else if (project.name === 'MapMetrics') {
                    project.description = "The world's first crypto-powered navigation app, rewarding users for contributing their travel data to a decentralized mapping network. MapMetrics offers real-time traffic updates and personalized routing.";
                } else if (project.name === 'DIMO') {
                    project.description = "An open platform that lets drivers collect, own, and monetize their car's data. Connect your vehicle to DIMO to earn tokens and gain insights about your driving habits while maintaining full control of your data.";
                } else if (project.name === 'Hivemapper') {
                    project.description = "A decentralized global mapping network that uses dashcam-equipped drivers to build a live street-view map. Earn HONEY tokens by contributing mapping data while driving your usual routes.";
                } else if (project.name === 'Dovu') {
                    project.description = "A platform that incentivizes vehicle owners to share driving data in exchange for tokens. Backed by Jaguar Land Rover, focusing on carbon-offset initiatives and sustainable mobility solutions.";
                } else if (project.name === 'peaq Network') {
                    project.description = "A decentralized network for IoT applications with a focus on mobility. Car owners can earn tokens by sharing vehicle data or offering services like charging stations and parking spaces.";
                } else if (project.name === 'DreamCars') {
                    project.description = "A platform connecting car enthusiasts with advertisers, allowing drivers to earn by displaying branded content on their vehicles. Simply apply car wraps or stickers and earn while driving normally.";
                } else if (project.name === 'Carro') {
                    project.description = "Singapore-based car marketplace with a drive-to-earn feature. Install their telematics device to track driving behavior and earn rewards for safe driving practices and consistent vehicle maintenance.";
                } else {
                    // For any other projects with ellipses, make a generic completion
                    project.description = project.description.replace('...', '') + " with blockchain-based rewards and transparent data policies.";
                }
            }
        }
    });
    
    // Add projects to the grid
    filteredProjects.forEach((project, index) => {
        // Define the card style (featured or regular)
        const isFeatured = project.featured === true;
        const cardClass = isFeatured ? 'project-card featured' : 'project-card';
        const badgeText = isFeatured ? 'Featured' : 'Popular';
        
        // Get company logo URL based on project name
        let logoUrl = '';
        if (project.name === 'NATIX Network') {
            logoUrl = 'https://natix.network/wp-content/uploads/2023/10/natix-logo-v1.svg';
        } else if (project.name === 'MapMetrics') {
            logoUrl = 'https://mapmetrics.org/wp-content/uploads/2023/07/logo.svg';
        } else if (project.name === 'DIMO') {
            logoUrl = 'https://dimo.zone/images/logos/logo.svg';
        } else if (project.name === 'Hivemapper') {
            logoUrl = 'https://hivemapper.com/assets/hivemapper-mark.svg';
        } else if (project.name === 'Dovu') {
            logoUrl = 'https://dovu.earth/images/dovu-logo.svg';
        } else if (project.name === 'peaq Network') {
            logoUrl = 'https://peaq.network/assets/logo-icon.svg';
        }
        
        // Format regions
        let regionText = '';
        if (project.region.includes('global')) {
            regionText = '<span><i class="fas fa-globe-americas"></i> global</span>';
        } else if (project.region.includes('north-america')) {
            regionText = '<span><i class="fas fa-map-marker-alt"></i> north-america</span>';
            if (project.region.includes('europe')) {
                regionText += ' <span><i class="fas fa-map-marker-alt"></i> europe</span>';
            }
        }
        
        // Create token price display if available
        let tokenPriceHTML = '';
        if (project.tokenId && project.tokenPrice) {
            const priceChangeClass = project.tokenChange >= 0 ? 'positive-change' : 'negative-change';
            const changeSymbol = project.tokenChange >= 0 ? '+' : '';
            
            tokenPriceHTML = `
                <div class="token-price">
                    <h4>Token Price</h4>
                    <p>$${project.tokenPrice.toFixed(4)} <span class="${priceChangeClass}">${changeSymbol}${project.tokenChange.toFixed(2)}%</span></p>
                </div>
            `;
        }
        
        // Generate project tags
        let tagsHTML = '<div class="project-tags">';
        
        // Add category tag
        if (project.category.includes('app')) {
            tagsHTML += `<span class="project-tag"><i class="fas fa-mobile-alt"></i>App</span>`;
        }
        if (project.category.includes('device')) {
            tagsHTML += `<span class="project-tag"><i class="fas fa-microchip"></i>Hardware</span>`;
        }
        if (project.category.includes('passive')) {
            tagsHTML += `<span class="project-tag"><i class="fas fa-chart-line"></i>Passive</span>`;
        }
        
        // Additional tags based on project features
        if (project.cost && project.cost.toLowerCase().includes('free')) {
            tagsHTML += `<span class="project-tag"><i class="fas fa-hand-holding-usd"></i>Free</span>`;
        }
        
        // Add region as a tag
        if (project.region.includes('global')) {
            tagsHTML += `<span class="project-tag"><i class="fas fa-globe"></i>Global</span>`;
        }
        if (project.region.includes('north-america')) {
            tagsHTML += `<span class="project-tag"><i class="fas fa-map-marker-alt"></i>North America</span>`;
        }
        if (project.region.includes('europe')) {
            tagsHTML += `<span class="project-tag"><i class="fas fa-map-marker-alt"></i>Europe</span>`;
        }
        if (project.region.includes('asia')) {
            tagsHTML += `<span class="project-tag"><i class="fas fa-map-marker-alt"></i>Asia</span>`;
        }
        
        tagsHTML += '</div>';
        
        // Create HTML for project card with animation delay for staggered appearance
        const delay = index * 0.05;
        const projectCard = document.createElement('div');
        projectCard.className = cardClass;
        projectCard.style.animationDelay = `${delay}s`;
        
        // Update DreamCars info if present
        if (project.name === 'DreamCars') {
            project.description = 'A platform connecting car enthusiasts with advertisers, allowing drivers to earn by displaying branded content on their vehicles. Earn passive income just by driving as you normally would.';
            project.website = 'https://dreamcars.co';
        }
        
        // Create HTML for project card
        // Use company logo if available, otherwise use icon
        const logoHTML = logoUrl ? 
            `<div class="project-logo">
                <img src="${logoUrl}" alt="${project.name} logo">
            </div>` : 
            `<div class="project-icon">
                <i class="fas ${project.category.includes('app') ? 'fa-mobile-alt' : 'fa-car'}"></i>
            </div>`;
        
        projectCard.innerHTML = `
            <div class="project-badge ${isFeatured ? 'featured-badge' : 'regular-badge'}">${badgeText}</div>
            ${logoHTML}
            <h3 class="project-name">${project.name}</h3>
            <div class="project-regions">
                ${regionText}
            </div>
            <p class="project-description">${project.description || ''}</p>
            
            ${tagsHTML}
            
            <div class="project-cost">
                <h4>Cost to Start</h4>
                <p>${project.cost || 'Contact for pricing'}</p>
            </div>
            
            ${tokenPriceHTML}
            
            <a href="${project.website || '#'}" target="_blank" class="learn-more-btn">Learn More</a>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
    
    projectsContainer.appendChild(projectsGrid);
    
    // Add hero banner if it doesn't exist yet
    if (!document.querySelector('.hero-banner')) {
        const heroBanner = document.createElement('div');
        heroBanner.className = 'hero-banner';
        heroBanner.innerHTML = `
            <div class="container">
                <h1>Turn Your Vehicle Data Into Passive Income</h1>
                <p>Discover the best ways to earn cryptocurrency while driving</p>
            </div>
        `;
        
        // Insert after header
        const header = document.querySelector('header');
        if (header && header.nextSibling) {
            header.parentNode.insertBefore(heroBanner, header.nextSibling);
        }
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
