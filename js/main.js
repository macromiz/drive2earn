/**
 * Main.js - Core functionality for the Drive2Earn website
 */

// Make the initialization function global for data.js to access
window.initializeProjects = initializeProjects;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize project loading
    initializeProjects();
    
    // Initialize sliders if any
    initSliders();
    
    // Initialize animations
    initAnimations();
    
    // Fix text selection issues
    fixTextSelection();

    // Get tag elements
    const tagElements = document.querySelectorAll('.tag');
    const clearTagsButton = document.querySelector('.clear-tags');
    const categoryFilter = document.getElementById('categoryFilter');
    
    // Add click event listeners to tag elements
    tagElements.forEach(tag => {
        tag.addEventListener('click', function(event) {
            // Prevent default behavior
            event.preventDefault();
            
            const filterValue = this.getAttribute('data-filter');
            console.log('Tag clicked:', filterValue);
            
            // Toggle active class
            if (this.classList.contains('active')) {
                // If the tag was active and is now deactivated, show all projects
                this.classList.remove('active');
                // Reset the category filter dropdown to "All Categories"
                if (categoryFilter) categoryFilter.value = 'all';
                // Show all projects
                filterProjects(null);
            } else {
                // Remove active class from all tags
                tagElements.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tag
                this.classList.add('active');
                // Update the category filter dropdown to match the selected tag
                if (categoryFilter) categoryFilter.value = filterValue;
                // Filter projects by selected category
                filterProjects(filterValue);
            }
        });
    });
    
    // Add click event listener to clear tags button
    if (clearTagsButton) {
        clearTagsButton.addEventListener('click', function(event) {
            // Prevent default behavior
            event.preventDefault();
            
            // Remove active class from all tags
            tagElements.forEach(tag => tag.classList.remove('active'));
            // Reset the category filter dropdown to "All Categories"
            if (categoryFilter) categoryFilter.value = 'all';
            // Show all projects
            filterProjects(null);
        });
    }
    
    // Add change listener to category filter
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            const value = this.value;
            
            // Update tag active state to match selected category
            tagElements.forEach(tag => {
                const tagFilter = tag.getAttribute('data-filter');
                if (tagFilter === value) {
                    tag.classList.add('active');
                } else {
                    tag.classList.remove('active');
                }
            });
            
            // Apply filter
            filterProjects(value === 'all' ? null : value);
        });
    }
});

/**
 * Fix text selection issues by ensuring proper z-index and element stacking
 */
function fixTextSelection() {
    // Add appropriate z-index to prevent overlapping elements
    const elementsToFix = [
        '.hero-content', 
        '.value-props-container',
        '.value-prop-row',
        '.bad-alternative',
        '.better-solution',
        '.trust-badge',
        '.hero-banner h1',
        '.hero-subtitle',
        '.hero-cta',
        '.cta-button',
        '.cta-subtext'
    ];
    
    elementsToFix.forEach((selector, index) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            // Set increasing z-index for better stacking context
            el.style.position = el.style.position || 'relative';
            el.style.zIndex = (10 + index).toString();
        });
    });
    
    // Ensure better text selection behavior
    document.querySelectorAll('.value-props-container span, h1, p, .hero-subtitle').forEach(el => {
        el.style.position = 'relative';
        el.style.userSelect = 'text';
        el.style.cursor = 'text';
    });
}

/**
 * Initialize project loading from data.js
 */
function initializeProjects() {
    // Check if projects container exists
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;
    
    // Check if data.js is loaded
    if (typeof window.projectsData === 'undefined') {
        console.error('Projects data not loaded. Make sure data.js is included in your HTML.');
        projectsContainer.innerHTML = '<div class="error-message">Projects could not be loaded. Please try again later.</div>';
        return;
    }
    
    // Display projects
    displayProjects(window.projectsData, projectsContainer);
    
    // Initialize search and filters
    initSearchAndFilters();
}

/**
 * Display projects in the container
 */
function displayProjects(projects, container) {
    if (!projects || !projects.length) {
        container.innerHTML = '<div class="no-projects">No projects available at the moment. Please check back later.</div>';
        return;
    }
    
    let html = '<div class="projects-grid">';
    
    projects.forEach(project => {
        html += `
        <div class="project-card" data-id="${project.id}" data-category="${project.category}" data-region="${project.region}" style="display: flex;">
            <div class="project-header">
                <div class="project-logo">
                    <img src="${project.logo || 'img/placeholder-logo.png'}" alt="${project.name} logo">
                </div>
                <div class="project-badges">
                    ${project.featured ? '<span class="badge featured">Featured</span>' : ''}
                    ${project.popular ? '<span class="badge popular">Popular</span>' : ''}
                    ${project.trending ? '<span class="badge trending">Trending</span>' : ''}
                </div>
            </div>
            <h3 class="project-name">${project.name}</h3>
            <p class="project-description">${project.shortDescription || project.description}</p>
            <div class="project-details">
                <div class="detail-item">
                    <i class="fas fa-money-bill-wave"></i>
                    <span>Est. Earnings: ${project.estEarnings || 'Varies'}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-globe"></i>
                    <span>Region: ${project.regionDetails || project.region}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-car"></i>
                    <span>Type: ${project.type || project.category}</span>
                </div>
            </div>
            <a href="${
                project.name === 'DIMO' ? 'https://dimo.co/products/dimo-lte-r1?ref=ADRIANIWANOWSKI&utm_source=affiliate&variant=46140394766591' : 
                project.name === 'DreamCars' ? 'https://dreamcars.co/' : 
                project.name === 'peaq Network' ? 'https://portal.peaq.xyz/?ref=Voixtk3Ix' : 
                project.url
            }" class="view-project-btn" data-id="${project.id}" target="_blank">View Details</a>
        </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
    
    // Add click event listeners to project detail buttons
    document.querySelectorAll('.view-project-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-id');
            showProjectDetails(projectId);
        });
    });
}

/**
 * Initialize search and filters functionality
 */
function initSearchAndFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const regionFilter = document.getElementById('regionFilter');
    const searchBtn = document.getElementById('searchBtn');
    const tags = document.querySelectorAll('.tag');
    const clearTags = document.querySelector('.clear-tags');
    
    if (!searchInput || !categoryFilter || !regionFilter || !searchBtn) return;
    
    // Search button click
    searchBtn.addEventListener('click', function() {
        filterProjects();
    });
    
    // Enter key in search input
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            filterProjects();
        }
    });
    
    // Filter change events
    categoryFilter.addEventListener('change', filterProjects);
    regionFilter.addEventListener('change', filterProjects);
    
    // Tag click events
    if (tags.length) {
        tags.forEach(tag => {
            tag.addEventListener('click', function() {
                const filterType = this.getAttribute('data-filter');
                
                // Handle app/hardware tag click
                if (filterType === 'app' || filterType === 'device') {
                    // Toggle this tag
                    this.classList.toggle('active');
                    
                    // Update category filter value
                    if (this.classList.contains('active')) {
                        categoryFilter.value = filterType;
                    } else {
                        categoryFilter.value = 'all';
                    }
                } else {
                    // For other tags, just toggle
                    this.classList.toggle('active');
                }
                
                filterProjects();
            });
        });
    }
    
    // Clear tags
    if (clearTags) {
        clearTags.addEventListener('click', function() {
            tags.forEach(tag => tag.classList.remove('active'));
            filterProjects();
        });
    }
}

/**
 * Filter projects based on all active filters
 */
function filterProjects(category = null) {
    console.log('Filtering projects with category:', category);
    
    // Get all filter values
    const searchInput = document.getElementById('searchInput');
    const regionFilter = document.getElementById('regionFilter');
    const searchQuery = searchInput ? searchInput.value.toLowerCase() : '';
    const regionValue = regionFilter ? regionFilter.value : 'all';
    
    // Get all projects data from the global projectsData array
    if (typeof projectsData !== 'undefined' && projectsData.length > 0) {
        let filteredProjects = projectsData;
        
        // Apply search filter if there's a search query
        if (searchQuery) {
            filteredProjects = filteredProjects.filter(project => 
                project.name.toLowerCase().includes(searchQuery) ||
                project.description.toLowerCase().includes(searchQuery) ||
                (project.type && project.type.toLowerCase().includes(searchQuery))
            );
        }
        
        // Apply category filter
        if (category && category !== 'all') {
            filteredProjects = filteredProjects.filter(project => {
                if (category === 'app') {
                    return project.category === 'app' || project.category === 'both';
                } else if (category === 'device') {
                    return project.category === 'device' || project.category === 'both';
                } else {
                    return project.category === category;
                }
            });
        }
        
        // Apply region filter
        if (regionValue && regionValue !== 'all') {
            filteredProjects = filteredProjects.filter(project => 
                project.region.toLowerCase() === regionValue.toLowerCase()
            );
        }
        
        console.log(`Filtered to ${filteredProjects.length} projects`);
        console.log("Filtered projects:", filteredProjects.map(p => p.name));
        
        // Display filtered projects using the display-project.js function
        if (typeof window.displayProjects === 'function') {
            window.displayProjects(filteredProjects);
        } else {
            console.error('displayProjects function not found');
            // Fallback to basic display if display-project.js is not loaded
            displayProjectsFallback(filteredProjects);
        }
    } else {
        console.warn("No projects data available for filtering");
        if (typeof window.displayProjects === 'function') {
            window.displayProjects([]);
        }
    }
}

// Fallback display function if display-project.js is not loaded
function displayProjectsFallback(projects) {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;
    
    if (!projects || !projects.length) {
        projectsContainer.innerHTML = '<div class="no-projects">No projects found matching your criteria.</div>';
        return;
    }
    
    let html = '<div class="projects-grid">';
    projects.forEach(project => {
        html += `
            <div class="project-card" data-category="${project.category}" data-region="${project.region}">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <div class="project-details">
                    <span>Category: ${project.category}</span>
                    <span>Region: ${project.region}</span>
                </div>
                <a href="${project.url}" target="_blank" class="view-project-btn">View Details</a>
            </div>
        `;
    });
    html += '</div>';
    projectsContainer.innerHTML = html;
}

/**
 * Show project details modal or page
 */
function showProjectDetails(projectId) {
    // Find the project with the given ID
    const project = window.projectsData.find(p => p.id == projectId);
    
    if (project) {
        console.log('Redirecting to project URL:', project.url);
        
        // Handle special URL cases
        let targetUrl = project.url;
        if (project.name === 'DIMO') {
            targetUrl = 'https://dimo.co/products/dimo-lte-r1?ref=ADRIANIWANOWSKI&utm_source=affiliate&variant=46140394766591';
        } else if (project.name === 'DreamCars') {
            targetUrl = 'https://dreamcars.co/';
        } else if (project.name === 'peaq Network') {
            targetUrl = 'https://portal.peaq.xyz/?ref=Voixtk3Ix';
        }
        
        // Open the link in a new tab
        window.open(targetUrl, '_blank');
    } else {
        console.error('Project not found with ID:', projectId);
        // Redirect to homepage if project not found
        window.location.href = '/';
    }
}

/**
 * Initialize sliders if slick is loaded
 */
function initSliders() {
    if (typeof $.fn.slick !== 'undefined') {
        $('.testimonial-slider').slick({
            dots: true,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 5000,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            adaptiveHeight: true
        });
    }
}

/**
 * Initialize animations and interactive elements
 */
function initAnimations() {
    // Add animation classes to elements as they scroll into view
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
} 