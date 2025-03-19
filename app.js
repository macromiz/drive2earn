// Filter and search functionality
function filterProjects() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedRegion = regionFilter.value;
    
    // Get active tags if any
    const activeTags = Array.from(document.querySelectorAll('.tag.active')).map(tag => 
        tag.querySelector('span').textContent.toLowerCase()
    );

    const filteredProjects = window.projects.filter(project => {
        const matchesSearch = searchTerm === '' || 
                            project.name.toLowerCase().includes(searchTerm) ||
                            project.description.toLowerCase().includes(searchTerm);
        
        const matchesCategory = selectedCategory === '' || 
                              (Array.isArray(project.category) && project.category.includes(selectedCategory));
        
        const matchesRegion = selectedRegion === '' || 
                            project.region.includes(selectedRegion);
        
        // Match any active tags
        const matchesTags = activeTags.length === 0 || 
                          activeTags.some(tag => {
                              if (tag === 'earn by driving') {
                                  return project.category.includes('app') || project.category.includes('device');
                              } else if (tag === 'low startup cost') {
                                  return project.cost && (project.cost.includes('Free') || project.cost.includes('free'));
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
            searchInput.value = '';
            categoryFilter.value = '';
            regionFilter.value = '';
            filterProjects();
        });
    }
}

// Call this on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    initSearchAndFilters();
    
    // Initial display of all projects
    if (window.projects && window.projects.length > 0) {
        displayProjects(window.projects);
    }
}); 