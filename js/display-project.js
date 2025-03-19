function displayProjects(projects) {
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = '';

    if (projects.length === 0) {
        projectsContainer.innerHTML = `
            <div class="no-results">
                <div class="search-icon">
                    <i class="fas fa-search fa-3x"></i>
                </div>
                <h2>No projects found</h2>
                <p>Try adjusting your search criteria or explore other categories.</p>
            </div>
        `;
        return;
    }

    // Define projects to filter out
    const filteredOutProjects = ['Nodle', 'Helium Mobile', 'CarBlocks', 'Wibson'];
    
    // Filter out unwanted projects
    const filteredProjects = projects.filter(project => !filteredOutProjects.includes(project.name));

    // Complete project descriptions that end with ellipses
    filteredProjects.forEach(project => {
        if (project.description.endsWith('...')) {
            // Create a complete description based on project name
            switch(project.name) {
                case 'NATIX Network':
                    project.description = 'NATIX helps cities transform existing urban camera networks into powerful AI sensing tools using computer vision, without sharing any video or image data. The system generates insights across mobility, safety, and traffic analytics while preserving privacy.';
                    break;
                case 'MapMetrics':
                    project.description = 'MapMetrics rewards users for contributing GPS location data while driving. The app validates, processes, and enhances map quality data and compensates users with MAP tokens. Perfect for daily commuters looking to earn passively.';
                    break;
                case 'DIMO':
                    project.description = 'DIMO is a user-owned IoT platform connecting drivers, vehicles and apps. It allows users to earn tokens by sharing vehicle data while maintaining ownership and control of their information, creating value from everyday driving.';
                    break;
                case 'Hivemapper':
                    project.description = 'Hivemapper is building a global, blockchain-based map using dashcams and community contributions. Drivers earn HONEY tokens by capturing street-level imagery that improves map accuracy and freshness through the Hivemapper Dashcam.';
                    break;
                case 'Dovu':
                    project.description = 'Dovu enables users to earn DOV tokens by tracking and verifying their carbon-friendly transportation choices. The platform rewards sustainable mobility behaviors, helping reduce carbon footprints while earning crypto.';
                    break;
                case 'peaq Network':
                    project.description = 'peaq Network is building the Economy of Things on Web3 foundations. Users can earn from vehicle data and services including charging stations, ridesharing, and connected vehicle applications, all powered by blockchain technology.';
                    break;
                case 'DreamCars':
                    project.description = 'DreamCars is creating a decentralized platform for vehicle data monetization, allowing drivers to share driving data and earn tokens. The project focuses on building a comprehensive mobility data marketplace.';
                    break;
                case 'Carro':
                    project.description = 'Carro leverages vehicle data to provide better insurance rates and vehicle maintenance insights while compensating users with CAR tokens. The platform uses AI to analyze driving habits and vehicle performance.';
                    break;
                default:
                    // For other projects, just remove the ellipsis
                    project.description = project.description.slice(0, -3);
            }
        }
    });

    // Create rows of three projects for better layout
    for (let i = 0; i < filteredProjects.length; i += 3) {
        const projectRow = document.createElement('div');
        projectRow.className = 'projects-row';
        
        // Add up to 3 projects per row
        for (let j = i; j < i + 3 && j < filteredProjects.length; j++) {
            const project = filteredProjects[j];
            
            // Update logo URLs for specific projects
            let logoUrl = project.logo;
            
            if (project.name === 'NATIX Network') {
                logoUrl = 'https://uploads-ssl.webflow.com/64d7cea4c213947d7d05ea38/64d8ddcf1f0429e2aefb2d0f_natix-logo-white-bg.png';
            } else if (project.name === 'MapMetrics') {
                logoUrl = 'https://pbs.twimg.com/profile_images/1625953683342336000/8LhLtXGR_400x400.jpg';
            } else if (project.name === 'Dovu') {
                logoUrl = 'https://pbs.twimg.com/profile_images/1468947000813162496/N5-tYlZ5_400x400.jpg';
            }
            
            // Extract hardware cost if present
            let hardwareCost = '';
            if (project.hardwareCost) {
                hardwareCost = `<div class="project-tag"><i class="fas fa-microchip"></i>${project.hardwareCost}</div>`;
            }
            
            // Create tags based on categories and regions
            let categoryTag = '';
            if (project.category === 'device') {
                categoryTag = `<div class="project-tag"><i class="fas fa-hdd"></i>Device-Based</div>`;
            } else if (project.category === 'app') {
                categoryTag = `<div class="project-tag"><i class="fas fa-mobile-alt"></i>App-Based</div>`;
            }
            
            // Calculate animation delay based on position
            const delay = 0.1 + (j * 0.1);
            
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.style.animationDelay = `${delay}s`;
            
            projectCard.innerHTML = `
                ${project.featured ? '<div class="project-badge featured-badge">Featured</div>' : ''}
                <div class="project-logo">
                    ${logoUrl ? `<img src="${logoUrl}" alt="${project.name} logo" onerror="this.onerror=null;this.parentNode.innerHTML='<i class=\\'fas fa-coin fa-2x\\'></i>';">` : '<i class="fas fa-coin fa-2x"></i>'}
                </div>
                <h3 class="project-name">${project.name}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${categoryTag}
                    ${hardwareCost}
                    <div class="project-tag"><i class="fas fa-tag"></i>${project.token || 'No Token'}</div>
                </div>
                ${project.tokenPrice ? `
                <div class="token-price">
                    <h4>Token Price</h4>
                    <p>$${project.tokenPrice} ${project.priceChange ? `<span class="${project.priceChange > 0 ? 'positive-change' : 'negative-change'}">${project.priceChange > 0 ? '+' : ''}${project.priceChange}%</span>` : ''}</p>
                </div>
                ` : ''}
                <a href="${project.url}" target="_blank" class="learn-more-btn">Learn More</a>
            `;
            
            projectRow.appendChild(projectCard);
        }
        
        projectsContainer.appendChild(projectRow);
    }
    
    // Add a hero banner if it doesn't exist
    if (!document.querySelector('.hero-banner')) {
        const heroSection = document.createElement('div');
        heroSection.className = 'hero-banner';
        heroSection.innerHTML = `
            <div class="container">
                <h1>Turn Your Vehicle Data into Value</h1>
                <p>Discover the top blockchain projects that reward you for your driving data</p>
            </div>
        `;
        
        // Insert hero banner at the top of the main content
        const mainContent = document.querySelector('main');
        mainContent.insertBefore(heroSection, mainContent.firstChild);
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
