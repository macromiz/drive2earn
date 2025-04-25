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
    
    // Add click event listeners to tag elements
    tagElements.forEach(tag => {
        tag.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Toggle active class
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                // If the tag was active and is now deactivated, show all projects
                filterProjects();
            } else {
                // Remove active class from all tags
                tagElements.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tag
                this.classList.add('active');
                // Filter projects by selected category
                filterProjects(filterValue);
            }
        });
    });
    
    // Add click event listener to clear tags button
    if (clearTagsButton) {
        clearTagsButton.addEventListener('click', function() {
            // Remove active class from all tags
            tagElements.forEach(tag => tag.classList.remove('active'));
            // Show all projects
            filterProjects();
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
 * Filter projects based on search input and filters
 */
function filterProjects(category = null) {
    console.log(`Filtering projects by category: ${category || 'all'}`);
    
    // Get all projects data from the global projectsData array
    if (typeof projectsData !== 'undefined' && projectsData.length > 0) {
        let filteredProjects;
        
        if (category === null) {
            // No category filter, show all projects
            filteredProjects = projectsData;
        } else {
            // Filter projects by category
            filteredProjects = projectsData.filter(project => {
                if (Array.isArray(project.category)) {
                    // If project has multiple categories
                    return project.category.includes(category);
                } else {
                    // If project has single category
                    return project.category === category;
                }
            });
        }
        
        // Display filtered projects
        displayProjects(filteredProjects);
    } else {
        console.warn("Projects data not available for filtering");
    }
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