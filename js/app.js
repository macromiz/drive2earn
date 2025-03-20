/**
 * Main application file for Drive2Earn.io
 * Handles initialization and main functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('App initialized');
    
    // Check if projects container exists
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) {
        console.error('Missing #projects-container element');
        return;
    }
    
    // Print debugging info
    console.log('Projects container found:', projectsContainer);
    
    // Make sure window.projects is available
    if (!window.projects || !Array.isArray(window.projects) || window.projects.length === 0) {
        console.error('Projects not properly loaded:', window.projects);
        
        // Try to fix by assigning from the const if it exists
        if (typeof projects !== 'undefined' && Array.isArray(projects)) {
            console.log('Fixing window.projects by assigning from local projects variable');
            window.projects = projects;
        }
    } else {
        console.log('Projects loaded successfully:', window.projects.length);
    }
    
    // Initialize events and display projects
    console.log('Setting up event handlers');
    setupEventHandlers();
    
    // Display all projects initially
    console.log('Displaying all projects');
    try {
        if (typeof displayProjects === 'function') {
            displayProjects(window.projects);
        } else {
            console.error('displayProjects function not found');
        }
    } catch (error) {
        console.error('Error displaying projects:', error);
    }
});

// Set up all event handlers for the page
function setupEventHandlers() {
    // Search and filter elements
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const regionFilter = document.getElementById('regionFilter');
    const searchBtn = document.getElementById('searchBtn');
    const clearTagsBtn = document.querySelector('.clear-tags');
    const tags = document.querySelectorAll('.tag');
    
    // Check if elements exist and add event listeners
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            console.log('Search input changed:', this.value);
            filterAndDisplayProjects();
        });
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            console.log('Category changed:', this.value);
            filterAndDisplayProjects();
        });
    }
    
    if (regionFilter) {
        regionFilter.addEventListener('change', function() {
            console.log('Region changed:', this.value);
            filterAndDisplayProjects();
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            console.log('Search button clicked');
            filterAndDisplayProjects();
        });
    }
    
    // Set up tag filtering
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            console.log('Tag clicked:', filter);
            
            // Toggle active class
            this.classList.toggle('active');
            
            // Update category filter if needed
            if (filter === 'app' || filter === 'hardware') {
                if (categoryFilter) {
                    categoryFilter.value = filter === 'hardware' ? 'device' : filter;
                }
            }
            
            filterAndDisplayProjects();
        });
    });
    
    // Handle clear tags
    if (clearTagsBtn) {
        clearTagsBtn.addEventListener('click', function() {
            console.log('Clear tags clicked');
            
            // Clear all active tags
            tags.forEach(tag => tag.classList.remove('active'));
            
            // Reset filters
            if (searchInput) searchInput.value = '';
            if (categoryFilter) categoryFilter.value = 'all';
            if (regionFilter) regionFilter.value = 'all';
            
            filterAndDisplayProjects();
        });
    }
}

// Single function to handle filtering and displaying projects
function filterAndDisplayProjects() {
    console.log('Filtering projects...');
    
    if (!window.projects || !Array.isArray(window.projects)) {
        console.error('No projects available for filtering');
        return;
    }
    
    // Get filter values
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const regionFilter = document.getElementById('regionFilter');
    
    const searchValue = searchInput ? searchInput.value.toLowerCase() : '';
    const categoryValue = categoryFilter ? categoryFilter.value : 'all';
    const regionValue = regionFilter ? regionFilter.value : 'all';
    
    console.log('Filter values:', { searchValue, categoryValue, regionValue });
    
    // Filter projects
    let filteredProjects = window.projects;
    
    // Filter by search input
    if (searchValue) {
        filteredProjects = filteredProjects.filter(project => 
            project.name.toLowerCase().includes(searchValue) || 
            (project.description && project.description.toLowerCase().includes(searchValue))
        );
    }
    
    // Filter by category
    if (categoryValue && categoryValue !== 'all') {
        filteredProjects = filteredProjects.filter(project => 
            project.category === categoryValue
        );
    }
    
    // Filter by region
    if (regionValue && regionValue !== 'all') {
        filteredProjects = filteredProjects.filter(project => 
            project.region && project.region.includes(regionValue)
        );
    }
    
    console.log('Found', filteredProjects.length, 'matching projects');
    
    // Display filtered projects
    if (typeof displayProjects === 'function') {
        displayProjects(filteredProjects);
    } else {
        console.error('displayProjects function not defined');
    }
} 
