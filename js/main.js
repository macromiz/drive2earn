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
        <div class="project-card" data-id="${project.id}" data-category="${project.category}" data-region="${project.region}">
            <div class="project-header">
                <div class="project-logo">
                    <img src="${project.logo || 'img/placeholder-logo.png'}" alt="${project.name} logo">
                </div>
                <div class="project-badges">
                    ${project.featured ? '<span class="badge featured">Featured</span>' : ''}
                    ${project.popular ? '<span class="badge popular">Popular</span>' : ''}
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
                    <span>Region: ${project.region}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-car"></i>
                    <span>Type: ${project.type || project.category}</span>
                </div>
            </div>
            <a href="${project.url}" class="view-project-btn" data-id="${project.id}" target="_blank">View Details</a>
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
                this.classList.toggle('active');
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
function filterProjects() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const regionFilter = document.getElementById('regionFilter');
    const activeTags = document.querySelectorAll('.tag.active');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!projectCards.length) return;
    
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const categoryValue = categoryFilter ? categoryFilter.value : 'all';
    const regionValue = regionFilter ? regionFilter.value : 'all';
    
    // Get active tag filters
    const tagFilters = [];
    if (activeTags.length) {
        activeTags.forEach(tag => {
            tagFilters.push(tag.getAttribute('data-filter'));
        });
    }
    
    // Filter projects
    projectCards.forEach(card => {
        const projectName = card.querySelector('.project-name').textContent.toLowerCase();
        const projectDesc = card.querySelector('.project-description').textContent.toLowerCase();
        const projectCategory = card.getAttribute('data-category');
        const projectRegion = card.getAttribute('data-region');
        
        let showCard = true;
        
        // Check search term
        if (searchTerm && !projectName.includes(searchTerm) && !projectDesc.includes(searchTerm)) {
            showCard = false;
        }
        
        // Check category filter
        if (categoryValue !== 'all' && projectCategory !== categoryValue) {
            showCard = false;
        }
        
        // Check region filter
        if (regionValue !== 'all' && projectRegion !== regionValue) {
            showCard = false;
        }
        
        // Check tag filters
        if (tagFilters.length) {
            let hasTag = false;
            tagFilters.forEach(tag => {
                if (projectCategory === tag) {
                    hasTag = true;
                }
            });
            if (!hasTag) {
                showCard = false;
            }
        }
        
        // Show or hide card
        card.style.display = showCard ? 'block' : 'none';
    });
    
    // Show no results message if needed
    const projectsContainer = document.getElementById('projects-container');
    const projectsGrid = document.querySelector('.projects-grid');
    const visibleCards = document.querySelectorAll('.project-card[style="display: block;"]');
    
    if (visibleCards.length === 0 && projectsGrid) {
        let noResultsEl = document.querySelector('.no-results');
        if (!noResultsEl) {
            noResultsEl = document.createElement('div');
            noResultsEl.className = 'no-results';
            noResultsEl.innerHTML = '<p>No projects match your search criteria. Try adjusting your filters.</p>';
            projectsContainer.appendChild(noResultsEl);
        }
        projectsGrid.style.display = 'none';
    } else {
        const noResultsEl = document.querySelector('.no-results');
        if (noResultsEl) {
            noResultsEl.remove();
        }
        if (projectsGrid) {
            projectsGrid.style.display = 'grid';
        }
    }
}

/**
 * Show project details modal or page
 */
function showProjectDetails(projectId) {
    // Redirect to project details page or show modal
    // This function would be implemented based on your design approach
    console.log('Showing details for project ID:', projectId);
    
    if (typeof showProjectModal === 'function') {
        // If display-project.js is loaded, use its function
        showProjectModal(projectId);
    } else {
        // Otherwise navigate to a details page
        window.location.href = `project-details.html?id=${projectId}`;
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