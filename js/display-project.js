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
    
    // Add projects to the grid
    projects.forEach((project, index) => {
        // Define the card style (featured or regular)
        const isFeatured = project.featured === true;
        const cardClass = isFeatured ? 'project-card featured' : 'project-card';
        const badgeText = isFeatured ? 'Featured' : 'Popular';
        
        // Get appropriate icon based on category
        let iconClass = 'fa-car';
        if (project.category.includes('app')) {
            iconClass = 'fa-mobile-alt';
        } else if (project.category.includes('device')) {
            iconClass = 'fa-microchip';
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
        
        // Create HTML for project card with animation delay for staggered appearance
        const delay = index * 0.05;
        const projectCard = document.createElement('div');
        projectCard.className = cardClass;
        projectCard.style.animationDelay = `${delay}s`;
        
        projectCard.innerHTML = `
            <div class="project-badge ${isFeatured ? 'featured-badge' : 'regular-badge'}">${badgeText}</div>
            <div class="project-icon">
                <i class="fas ${iconClass}"></i>
            </div>
            <h3 class="project-name">${project.name}</h3>
            <div class="project-regions">
                ${regionText}
            </div>
            <p class="project-description">${project.description || ''}</p>
            
            <div class="project-cost">
                <h4>Cost to Start</h4>
                <p>${project.cost || 'Contact for pricing'}</p>
            </div>
            
            <div class="project-rating">
                <span class="rating-value">${project.rating || '4.0'}</span>
                ${generateStarRating(project.rating || 4)}
            </div>
            
            <a href="${project.website || '#'}" target="_blank" class="learn-more-btn">Learn More</a>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
    
    projectsContainer.appendChild(projectsGrid);
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
