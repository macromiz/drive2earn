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
    
    // Set up earnings calculator
    setupEarningsCalculator();
    
    // Initial display of projects - ensure this happens BEFORE any API calls
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
    
    // Fetch token prices from CoinGecko API - this should happen AFTER initial display
    try {
        // Initial fetch is done regardless of time
        fetchTokenPrices().catch(error => {
            console.error('Error in token price fetch:', error);
            // If API fails, we still have projects displayed with cached values
        });
    } catch (error) {
        console.error('Fatal error in token price fetch:', error);
    }
    
    // Set up scheduled updates for token prices at specified times (7am, 3pm, 11pm CET)
    setupScheduledPriceUpdates();
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

/**
 * Set up scheduled updates for token prices at specified times
 * Updates will happen at 7am, 3pm, and 11pm CET
 */
function setupScheduledPriceUpdates() {
    console.log('Setting up scheduled price updates...');
    
    // Define update hours in CET (7, 15, 23)
    const updateHoursCET = [7, 15, 23];
    
    // Check every hour if it's time for an update
    setInterval(() => {
        try {
            // Get current time in CET
            const now = new Date();
            // Convert to CET
            const cetTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Paris' }));
            const currentHourCET = cetTime.getHours();
            const currentMinuteCET = cetTime.getMinutes();
            
            // Check if it's one of our update hours and within the first 5 minutes of the hour
            if (updateHoursCET.includes(currentHourCET) && currentMinuteCET < 5) {
                console.log(`Scheduled update at ${currentHourCET}:${currentMinuteCET} CET`);
                fetchTokenPrices().catch(error => {
                    console.error('Error in scheduled token price update:', error);
                    // Continue showing projects with existing prices if API fails
                });
            }
        } catch (error) {
            console.error('Error in scheduled update check:', error);
        }
    }, 60 * 1000); // Check every minute
    
    // For debug purposes, log the next update times
    logNextUpdateTimes(updateHoursCET);
}

/**
 * Log the next scheduled update times for debugging
 */
function logNextUpdateTimes(updateHoursCET) {
    // Get current time in CET
    const now = new Date();
    const cetTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Paris' }));
    const currentHourCET = cetTime.getHours();
    
    console.log(`Current time: ${cetTime.toLocaleString()} CET`);
    console.log('Next scheduled updates:');
    
    let foundNextUpdate = false;
    
    // Check for updates later today
    for (const hour of updateHoursCET) {
        if (hour > currentHourCET) {
            const nextUpdate = new Date(cetTime);
            nextUpdate.setHours(hour, 0, 0, 0);
            console.log(`- ${nextUpdate.toLocaleString()} CET`);
            foundNextUpdate = true;
        }
    }
    
    // If no more updates today, show first update tomorrow
    if (!foundNextUpdate) {
        const tomorrow = new Date(cetTime);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(updateHoursCET[0], 0, 0, 0);
        console.log(`- ${tomorrow.toLocaleString()} CET (tomorrow)`);
    }
}

/**
 * Set up the earnings calculator functionality
 */
function setupEarningsCalculator() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        if (button.textContent.includes('Calculate Your Earning')) {
            button.addEventListener('click', showEarningsCalculator);
        }
    });
}

/**
 * Show the earnings calculator modal
 */
function showEarningsCalculator(e) {
    e.preventDefault();
    
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'earnings-calculator-modal';
    
    // Create modal content
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Calculate Your Earning Potential</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p class="calculator-intro">Fill in the details below to get an estimate of your potential earnings from sharing your vehicle data.</p>
                
                <form id="earnings-calculator-form">
                    <div class="form-group">
                        <label for="average-distance">Average Distance Driven (km/month)</label>
                        <input type="range" id="average-distance" min="100" max="3000" step="100" value="1000">
                        <span class="range-value" id="distance-value">1,000 km</span>
                    </div>
                    
                    <div class="form-group">
                        <label for="vehicle-type">Vehicle Type</label>
                        <select id="vehicle-type">
                            <option value="passenger">Passenger Car</option>
                            <option value="suv">SUV</option>
                            <option value="van">Van</option>
                            <option value="truck">Truck</option>
                            <option value="electric">Electric Vehicle</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="region">Region</label>
                        <select id="region">
                            <option value="north-america">North America</option>
                            <option value="europe">Europe</option>
                            <option value="asia">Asia</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="form-group privacy-settings">
                        <label>Privacy Settings (affects earnings)</label>
                        <div class="privacy-toggle">
                            <div class="toggle-item">
                                <label for="location-data">Location Data</label>
                                <label class="switch">
                                    <input type="checkbox" id="location-data" checked>
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div class="toggle-item">
                                <label for="driving-behavior">Driving Behavior</label>
                                <label class="switch">
                                    <input type="checkbox" id="driving-behavior" checked>
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div class="toggle-item">
                                <label for="vehicle-health">Vehicle Health</label>
                                <label class="switch">
                                    <input type="checkbox" id="vehicle-health" checked>
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <button type="submit" class="calculate-btn">Calculate Earnings</button>
                </form>
                
                <div id="earnings-result" style="display: none;">
                    <h3>Your Estimated Monthly Earnings</h3>
                    <div class="earnings-display">
                        <span id="earnings-amount">$0</span>
                        <span class="per-month">per month</span>
                    </div>
                    
                    <div class="recommended-projects">
                        <h4>Recommended Projects</h4>
                        <div id="recommended-projects-list"></div>
                    </div>
                    
                    <div class="earnings-note">
                        <p>These estimates are based on current market conditions and may vary. The more you drive, the more you can earn!</p>
                    </div>
                    
                    <button class="view-projects-btn">View All Projects</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to the page
    document.body.appendChild(modal);
    
    // Add event listeners
    document.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    document.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Range input value display
    const distanceRange = document.getElementById('average-distance');
    const distanceValue = document.getElementById('distance-value');
    
    distanceRange.addEventListener('input', () => {
        distanceValue.textContent = Number(distanceRange.value).toLocaleString() + ' km';
    });
    
    // Form submission
    document.getElementById('earnings-calculator-form').addEventListener('submit', (e) => {
        e.preventDefault();
        calculateEarnings();
    });
    
    document.querySelector('.view-projects-btn')?.addEventListener('click', () => {
        document.body.removeChild(modal);
        document.getElementById('projects-container').scrollIntoView({ behavior: 'smooth' });
    });
}

/**
 * Calculate potential earnings based on user inputs
 */
function calculateEarnings() {
    const distance = parseFloat(document.getElementById('average-distance').value);
    const vehicleType = document.getElementById('vehicle-type').value;
    const region = document.getElementById('region').value;
    const locationData = document.getElementById('location-data').checked;
    const drivingBehavior = document.getElementById('driving-behavior').checked;
    const vehicleHealth = document.getElementById('vehicle-health').checked;
    
    // Base rates per 1000 km (these would ideally come from an API or server)
    const baseRates = {
        'passenger': 5,
        'suv': 5.5,
        'van': 6,
        'truck': 7,
        'electric': 8
    };
    
    // Regional multipliers
    const regionMultipliers = {
        'north-america': 1.2,
        'europe': 1.0,
        'asia': 0.9,
        'other': 0.8
    };
    
    // Privacy settings affect earnings
    let privacyMultiplier = 1.0;
    if (locationData) privacyMultiplier += 0.3;
    if (drivingBehavior) privacyMultiplier += 0.2;
    if (vehicleHealth) privacyMultiplier += 0.2;
    
    // Calculate earnings
    const baseRate = baseRates[vehicleType] || 5;
    const regionMultiplier = regionMultipliers[region] || 1.0;
    const monthlyEarnings = (distance / 1000) * baseRate * regionMultiplier * privacyMultiplier;
    
    // Display results
    document.getElementById('earnings-result').style.display = 'block';
    document.getElementById('earnings-amount').textContent = '$' + monthlyEarnings.toFixed(2);
    
    // Find recommended projects based on inputs
    findRecommendedProjects(vehicleType, region, monthlyEarnings);
    
    // Scroll to results
    document.getElementById('earnings-result').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Find and display recommended projects based on user inputs
 */
function findRecommendedProjects(vehicleType, region, earnings) {
    const recommendedProjectsList = document.getElementById('recommended-projects-list');
    recommendedProjectsList.innerHTML = '';
    
    // Filter projects that match criteria
    let matchingProjects = window.projects.filter(project => {
        // Match by region if available
        if (project.region && !project.region.includes(region)) {
            return false;
        }
        
        // Some basic matching logic (this would ideally be more sophisticated)
        if (vehicleType === 'electric' && project.description.toLowerCase().includes('electric')) {
            return true;
        }
        
        return true;
    });
    
    // Sort by relevance (simplified for example)
    matchingProjects.sort((a, b) => {
        // Featured projects first
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
    });
    
    // Take top 3
    matchingProjects = matchingProjects.slice(0, 3);
    
    // Display recommendations
    if (matchingProjects.length === 0) {
        recommendedProjectsList.innerHTML = '<p>No specific recommendations found. View all projects to explore options.</p>';
    } else {
        matchingProjects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'recommended-project';
            projectElement.innerHTML = `
                <div class="project-name">${project.name}</div>
                <div class="project-match">
                    <div class="match-score">
                        <div class="match-bar" style="width: ${Math.floor(Math.random() * 30) + 70}%"></div>
                    </div>
                    <span>Match</span>
                </div>
            `;
            
            recommendedProjectsList.appendChild(projectElement);
        });
    }
} 
