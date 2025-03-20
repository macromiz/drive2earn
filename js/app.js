/**
 * Main application file for Drive2Earn.io
 * Handles initialization and main functionality
 */

// Filter and search functionality
function filterProjects() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const regionFilter = document.getElementById('regionFilter');
    
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedRegion = regionFilter.value;
    
    // Get active tags if any
    const activeTags = Array.from(document.querySelectorAll('.tag.active')).map(tag => 
        tag.getAttribute('data-filter').toLowerCase()
    );

    const filteredProjects = window.projects.filter(project => {
        const matchesSearch = searchTerm === '' || 
                            project.name.toLowerCase().includes(searchTerm) ||
                            (project.description && project.description.toLowerCase().includes(searchTerm));
        
        const matchesCategory = selectedCategory === '' || 
                              (Array.isArray(project.category) && project.category.includes(selectedCategory));
        
        const matchesRegion = selectedRegion === '' || 
                            project.region.includes(selectedRegion);
        
        // Match any active tags
        const matchesTags = activeTags.length === 0 || 
                          activeTags.some(tag => {
                              if (tag === 'app') {
                                  return project.category.includes('app');
                              } else if (tag === 'hardware') {
                                  return project.category.includes('device');
                              }
                              return false;
                          });

        return matchesSearch && matchesCategory && matchesRegion && matchesTags;
    });

    displayProjects(filteredProjects);
}

// Initialize event listeners for search and filters
function initSearchAndFilters() {
    // Get elements
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const regionFilter = document.getElementById('regionFilter');
    const searchButton = document.getElementById('searchButton');
    const clearAllButton = document.querySelector('.clear-tags');
    const filterTags = document.querySelectorAll('.tag');
    
    // Add event listeners
    if (searchInput) searchInput.addEventListener('input', filterProjects);
    if (categoryFilter) categoryFilter.addEventListener('change', filterProjects);
    if (regionFilter) regionFilter.addEventListener('change', filterProjects);
    if (searchButton) searchButton.addEventListener('click', filterProjects);
    
    // Tag click event
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('active');
            filterProjects();
        });
        
        // Close icon click event
        const closeIcon = tag.querySelector('.fa-times');
        if (closeIcon) {
            closeIcon.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent tag click event
                tag.classList.remove('active');
                filterProjects();
            });
        }
    });
    
    // Clear all tags
    if (clearAllButton) {
        clearAllButton.addEventListener('click', function() {
            filterTags.forEach(tag => tag.classList.remove('active'));
            if (searchInput) searchInput.value = '';
            if (categoryFilter) categoryFilter.value = '';
            if (regionFilter) regionFilter.value = '';
            filterProjects();
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('App initialized');
    
    // Ensure catalog is initialized
    if (typeof initCatalog === 'function') {
        initCatalog();
    } else {
        console.error('initCatalog function not found');
    }
    
    // Set up tag filtering
    setupTagFiltering();
});

// Set up tag filtering functionality
function setupTagFiltering() {
    const tags = document.querySelectorAll('.tag');
    
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Toggle active class
            this.classList.toggle('active');
            
            // Update category filter if needed
            if (filter === 'app' || filter === 'hardware') {
                const categoryFilter = document.getElementById('categoryFilter');
                if (categoryFilter) {
                    categoryFilter.value = filter === 'hardware' ? 'device' : filter;
                    
                    // Trigger change event to update projects
                    const event = new Event('change');
                    categoryFilter.dispatchEvent(event);
                }
            }
        });
    });
    
    // Handle clear tags
    const clearTagsBtn = document.querySelector('.clear-tags');
    if (clearTagsBtn) {
        clearTagsBtn.addEventListener('click', function() {
            // Clear all active tags
            tags.forEach(tag => tag.classList.remove('active'));
            
            // Reset filters
            const searchInput = document.getElementById('searchInput');
            const categoryFilter = document.getElementById('categoryFilter');
            const regionFilter = document.getElementById('regionFilter');
            
            if (searchInput) searchInput.value = '';
            if (categoryFilter) categoryFilter.value = 'all';
            if (regionFilter) regionFilter.value = 'all';
            
            // Trigger filtering
            if (typeof filterProjects === 'function') {
                filterProjects();
            }
        });
    }
} 
