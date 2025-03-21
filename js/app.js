/**
 * Main application file for Drive2Earn.io
 * Handles initialization and main functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Drive2Earn app initializing...');
    
    // Check if the projects container exists
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) {
        console.error('Projects container not found!');
        return;
    }
    
    // Check if projects are available
    if (!window.projects || !Array.isArray(window.projects)) {
        console.error('Projects data not available!');
        return;
    }
    
    console.log(`Found ${window.projects.length} projects`);
    
    // Extract unique categories and regions for filters
    const categories = [...new Set(window.projects.map(project => project.category))];
    const regions = [...new Set(window.projects.flatMap(project => project.region || []))];
    
    console.log('Categories:', categories);
    console.log('Regions:', regions);
    
    // Create filter dropdowns
    if (typeof createFilterSection === 'function') {
        createFilterSection(categories, regions);
    } else {
        console.warn('createFilterSection function not available');
    }
    
    // Set up event listeners for search and filters
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', filterAndDisplayProjects);
    } else {
        console.warn('Search input not found');
    }
    
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterAndDisplayProjects);
    } else {
        console.warn('Category filter not found');
    }
    
    const regionFilter = document.getElementById('regionFilter');
    if (regionFilter) {
        regionFilter.addEventListener('change', filterAndDisplayProjects);
    } else {
        console.warn('Region filter not found');
    }
    
    // Set up tag filtering
    setupTagFiltering();
    
    // Clear tags button
    const clearTagsBtn = document.querySelector('.clear-tags');
    if (clearTagsBtn) {
        clearTagsBtn.addEventListener('click', function() {
            const activeTags = document.querySelectorAll('.tag.active');
            activeTags.forEach(tag => tag.classList.remove('active'));
            filterAndDisplayProjects();
        });
    }
    
    // Initial display of projects
    filterAndDisplayProjects();
    
    // Fetch token prices from CoinGecko API
    try {
        fetchTokenPrices().catch(error => {
            console.error('Error in token price fetch:', error);
            // Fallback to simulation if the API fails
            simulateTokenPrices();
        });
    } catch (error) {
        console.error('Fatal error in token price fetch:', error);
        // Ensure we have fallback prices if async/await isn't supported
        simulateTokenPrices();
    }
    
    // Set up auto-refresh for token prices (every 5 minutes)
    setInterval(() => {
        try {
            fetchTokenPrices().catch(error => {
                console.error('Error in token price refresh:', error);
                simulateTokenPrices();
            });
        } catch (error) {
            console.error('Fatal error in token price refresh:', error);
            simulateTokenPrices();
        }
    }, 5 * 60 * 1000); // 5 minutes
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
