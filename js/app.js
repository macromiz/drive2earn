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
        document.body.innerHTML += '<div style="color:red;padding:20px;background:black;position:fixed;bottom:0;left:0;right:0;z-index:9999">ERROR: Projects container not found!</div>';
        return;
    }
    
    // Check if projects are available
    if (!window.projects || !Array.isArray(window.projects)) {
        console.error('Projects data not available!');
        document.body.innerHTML += '<div style="color:red;padding:20px;background:black;position:fixed;bottom:0;left:0;right:0;z-index:9999">ERROR: Projects data not available!</div>';
        
        // Try to fix by setting a default array
        window.projects = window.projects || [];
        
        // Check if projects is defined as a local variable
        if (typeof projects !== 'undefined' && Array.isArray(projects)) {
            console.log('Found projects in local variable, using that instead');
            window.projects = projects;
        } else {
            console.error('Could not find projects data anywhere');
            return;
        }
    }
    
    console.log(`Found ${window.projects.length} projects:`, window.projects.map(p => p.name).join(', '));
    
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
    
    // Initial display of projects - ensure this happens
    console.log("About to display projects initially");
    try {
        if (typeof filterAndDisplayProjects === 'function') {
            filterAndDisplayProjects();
        } else if (typeof displayProjects === 'function') {
            console.log("filterAndDisplayProjects not found, using displayProjects directly");
            displayProjects(window.projects);
        } else {
            console.error("Neither filterAndDisplayProjects nor displayProjects functions are available!");
            document.body.innerHTML += '<div style="color:red;padding:20px;background:black;position:fixed;bottom:0;left:0;right:0;z-index:9999">ERROR: Display functions not found!</div>';
        }
    } catch (error) {
        console.error("Error displaying projects:", error);
        document.body.innerHTML += `<div style="color:red;padding:20px;background:black;position:fixed;bottom:0;left:0;right:0;z-index:9999">ERROR: ${error.message}</div>`;
    }
    
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

/**
 * Filter projects based on search, category, and region, then display the results
 */
function filterAndDisplayProjects() {
    console.log('Filtering and displaying projects...');
    
    // Check if projects is available
    if (!window.projects || !Array.isArray(window.projects)) {
        console.error("Projects data not available for filtering");
        return;
    }
    
    // Get filter values
    const searchText = document.getElementById('searchInput')?.value?.toLowerCase() || '';
    const categoryValue = document.getElementById('categoryFilter')?.value || 'all';
    const regionValue = document.getElementById('regionFilter')?.value || 'all';
    
    console.log(`Filters - Search: "${searchText}", Category: ${categoryValue}, Region: ${regionValue}`);
    
    // Get active tags
    const activeTags = Array.from(document.querySelectorAll('.tag.active')).map(tag => tag.textContent.trim().toLowerCase());
    console.log('Active tags:', activeTags);
    
    // Apply filters
    let filteredProjects = window.projects.filter(project => {
        // Search filter
        const nameMatch = project.name.toLowerCase().includes(searchText);
        const descriptionMatch = project.description && project.description.toLowerCase().includes(searchText);
        const searchMatch = nameMatch || descriptionMatch;
        
        // Category filter
        const categoryMatch = categoryValue === 'all' || project.category === categoryValue;
        
        // Region filter
        const regionMatch = regionValue === 'all' || (project.region && project.region.includes(regionValue));
        
        // Tag filter
        const tagMatch = activeTags.length === 0 || (
            activeTags.some(tag => {
                // Check if project has token matching tag
                if (project.token && project.token.toLowerCase() === tag) return true;
                if (project.tokenTicker && project.tokenTicker.toLowerCase() === tag) return true;
                
                // Check if project category matches tag
                if (project.category === 'app' && tag === 'app-based') return true;
                if (project.category === 'device' && tag === 'device-based') return true;
                
                // Check for text match in project name or description
                return project.name.toLowerCase().includes(tag) || 
                      (project.description && project.description.toLowerCase().includes(tag));
            })
        );
        
        return searchMatch && categoryMatch && regionMatch && tagMatch;
    });
    
    console.log(`Found ${filteredProjects.length} projects after filtering`);
    
    // Call the display function
    if (typeof displayProjects === 'function') {
        displayProjects(filteredProjects);
    } else {
        console.error('displayProjects function is not defined');
        document.body.innerHTML += '<div style="color:red;padding:20px;background:black;position:fixed;bottom:0;left:0;right:0;z-index:9999">ERROR: displayProjects function not found!</div>';
    }
}

/**
 * Set up handlers for tag filtering
 */
function setupTagFiltering() {
    // Will be populated when tags are created
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('tag')) {
            event.target.classList.toggle('active');
            if (typeof filterAndDisplayProjects === 'function') {
                filterAndDisplayProjects();
            }
        }
    });
}

/**
 * Helper function to determine the button text for each project
 */
function getCtaButtonText(projectName, category) {
    // Default button text
    let buttonText = "Learn More";
    
    // Customize based on project
    switch(projectName) {
        case 'DIMO':
            buttonText = "Sign Up & Install";
            break;
        case 'Hivemapper':
            buttonText = "Buy Dashcam";
            break;
        case 'MapMetrics':
            buttonText = "Download App";
            break;
        case 'NATIX Network':
            buttonText = "Install Hardware";
            break;
        default:
            // Use category-based text if no specific override
            if (category === 'app') {
                buttonText = "Download App";
            } else if (category === 'device') {
                buttonText = "Get Hardware";
            }
    }
    
    return buttonText;
} 
