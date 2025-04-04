/**
 * Project data for Drive2Earn.io
 * This file contains all the project information displayed on the site
 * Last updated: 2024-03-20
 */

// Project data for Drive2Earn
const projects = [
    {
        id: 1,
        name: "NATIX Network",
        description: "NATIX helps cities transform existing urban camera networks into powerful AI sensing tools using computer vision, without sharing any video or image data. The system generates insights across mobility, safety, and traffic analytics while preserving privacy.",
        shortDescription: "Transform urban camera networks into AI sensing tools with privacy-preserving computer vision.",
        category: "device",
        region: "global",
        logo: "https://uploads-ssl.webflow.com/64d7cea4c213947d7d05ea38/64d8ddcf1f0429e2aefb2d0f_natix-logo-white-bg.png",
        token: "NTIX",
        tokenTicker: "NTIX",
        tokenPrice: 0.0007383,
        priceChange: 1.4,
        url: "https://natix.network/",
        hardwareCost: "$299",
        featured: true,
        popular: true,
        estEarnings: "$50-$120/month",
        type: "Camera Network",
        coingeckoId: "natix-network"
    },
    {
        id: 2,
        name: "MapMetrics",
        description: "MapMetrics rewards users for contributing GPS location data while driving. The app validates, processes, and enhances map quality data and compensates users with MAP tokens. Perfect for daily commuters looking to earn passively.",
        shortDescription: "Earn tokens by contributing to map quality with your GPS location data while driving.",
        category: "app",
        region: "global",
        logo: "https://pbs.twimg.com/profile_images/1625953683342336000/8LhLtXGR_400x400.jpg",
        token: "MAP",
        tokenTicker: "MAP",
        tokenPrice: 0.042,
        priceChange: 1.5,
        url: "https://mapmetrics.org/",
        featured: true,
        popular: true,
        estEarnings: "$30-$80/month",
        type: "Navigation App",
        coingeckoId: "mapmetrics"
    },
    {
        id: 3,
        name: "DIMO",
        description: "DIMO is a user-owned IoT platform connecting drivers, vehicles and apps. It allows users to earn tokens by sharing vehicle data while maintaining ownership and control of their information, creating value from everyday driving.",
        shortDescription: "Earn tokens with this IoT platform that connects your vehicle data while maintaining your ownership.",
        category: "device",
        region: "north-america",
        logo: "https://assets-global.website-files.com/61a5fb25e3125ca024a09128/61a6073ffa27de6e2d03e051_DIMO_400x400.png",
        token: "DIMO",
        tokenTicker: "DIMO",
        tokenPrice: 0.07468,
        priceChange: 6.6,
        url: "https://dimo.zone/",
        hardwareCost: "$99-$249",
        estEarnings: "$40-$100/month",
        type: "OBD Device",
        coingeckoId: "dimo"
    },
    {
        id: 4,
        name: "Hivemapper",
        description: "Hivemapper is building a global, blockchain-based map using dashcams and community contributions. Drivers earn HONEY tokens by capturing street-level imagery that improves map accuracy and freshness through the Hivemapper Dashcam.",
        shortDescription: "Build a global blockchain-based map with your dashcam and earn HONEY tokens for your contributions.",
        category: "device",
        region: "global",
        logo: "https://pbs.twimg.com/profile_images/1635267082441412608/Kd5c_mt8_400x400.png",
        token: "HONEY",
        tokenTicker: "HONEY",
        tokenPrice: 0.18,
        priceChange: -2.4,
        url: "https://hivemapper.com/",
        hardwareCost: "$549",
        estEarnings: "$100-$300/month",
        type: "Dashcam",
        popular: true
    },
    {
        id: 7,
        name: "Dovu",
        description: "Dovu enables users to earn DOV tokens by tracking and verifying their carbon-friendly transportation choices. The platform rewards sustainable mobility behaviors, helping reduce carbon footprints while earning crypto.",
        shortDescription: "Earn tokens for your eco-friendly driving habits while reducing your carbon footprint.",
        category: "app",
        region: "europe",
        logo: "https://pbs.twimg.com/profile_images/1468947000813162496/N5-tYlZ5_400x400.jpg",
        token: "DOV",
        tokenTicker: "DOV",
        tokenPrice: 0.0005,
        priceChange: -0.6,
        url: "https://dovu.earth/",
        featured: true,
        estEarnings: "$15-$40/month",
        type: "Carbon Tracking"
    },
    {
        id: 8,
        name: "peaq Network",
        description: "peaq Network is building the Economy of Things on Web3 foundations. Users can earn from vehicle data and services including charging stations, ridesharing, and connected vehicle applications, all powered by blockchain technology.",
        shortDescription: "Join the Economy of Things and earn from your vehicle data and connected services.",
        category: "device",
        region: "europe",
        logo: "https://assets-global.website-files.com/61a5fb25e3125ca024a09128/61a5fb25e3125c4d2ea0928b_peaq.png",
        token: "PEAQ",
        tokenTicker: "PEAQ",
        tokenPrice: 0.029,
        priceChange: 2.1,
        url: "https://www.peaq.network/",
        hardwareCost: "$50-$200",
        estEarnings: "$30-$90/month",
        type: "IoT Platform"
    },
    {
        id: 9,
        name: "CarBlock",
        description: "Turn your car's diagnostic data into passive income. With a simple $30 OBD-II device, you can start earning CARB tokens while helping build the future transportation data ecosystem. Drivers typically recover their hardware cost within the first month.",
        shortDescription: "Convert your car's diagnostic data into income with a simple and affordable OBD-II device.",
        category: "device",
        region: "global",
        logo: "https://pbs.twimg.com/profile_images/1115539544591036416/DaTgHxPa_400x400.png",
        token: "CARB",
        tokenTicker: "CARB",
        tokenPrice: 0.015,
        priceChange: 1.2,
        url: "https://www.carblock.io/",
        hardwareCost: "$30",
        featured: true,
        popular: true,
        estEarnings: "$25-$60/month",
        type: "OBD Scanner"
    },
    {
        id: 10,
        name: "Wibson",
        description: "A blockchain-based data marketplace that allows users to securely and anonymously sell validated personal data, including driving patterns and location information, earning Wibson tokens in exchange.",
        shortDescription: "Sell your driving patterns and location data securely and anonymously on this blockchain marketplace.",
        category: "app",
        region: "global",
        logo: "https://imgur.com/xrEzCtp.png",
        token: "WIB",
        tokenTicker: "WIB",
        tokenPrice: 0.005,
        priceChange: 0.3,
        url: "https://wibson.org/",
        estEarnings: "$10-$30/month",
        type: "Data Marketplace"
    },
    {
        id: 11,
        name: "DreamCars",
        description: "DreamCars is creating a decentralized platform for vehicle data monetization, allowing drivers to share driving data and earn tokens. The project focuses on building a comprehensive mobility data marketplace.",
        shortDescription: "Join a decentralized platform for vehicle data monetization and earn tokens for sharing driving data.",
        category: "app",
        region: "north-america",
        logo: "https://imgur.com/nVqKRh0.png",
        token: "DREAM",
        tokenTicker: "DREAM",
        tokenPrice: 0.012,
        priceChange: 1.1,
        url: "https://dreamcars.co/",
        estEarnings: "$20-$50/month",
        type: "Mobility Marketplace"
    },
    {
        id: 12,
        name: "Carro",
        description: "Carro leverages vehicle data to provide better insurance rates and vehicle maintenance insights while compensating users with CAR tokens. The platform uses AI to analyze driving habits and vehicle performance.",
        shortDescription: "Get better insurance rates and earn tokens by sharing your vehicle data with this AI-powered platform.",
        category: "device",
        region: "asia",
        logo: "https://imgur.com/yYGMz4N.png",
        token: "CAR",
        tokenTicker: "CAR",
        tokenPrice: 0.075,
        priceChange: 0.9,
        url: "https://carro.sg/",
        hardwareCost: "$120",
        estEarnings: "$30-$80/month",
        type: "Insurance Telematics"
    }
];

// Export projects for use in main.js
window.projectsData = projects;

// Initialize projects immediately for faster display
document.addEventListener('DOMContentLoaded', function() {
    // Check if we have a projects container
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;
    
    // Alert main.js that we're ready to display projects
    if (typeof window.initializeProjects === 'function') {
        window.initializeProjects();
    } else {
        // Fallback if main.js hasn't loaded yet
        setTimeout(() => {
            console.log('Attempting to initialize projects again...');
            if (typeof window.initializeProjects === 'function') {
                window.initializeProjects();
            } else {
                // Direct fallback - display projects even without main.js
                console.log('Direct fallback for displaying projects');
                displayProjectsFallback(projects, projectsContainer);
            }
        }, 1000);
    }
    
    // Try to update token prices, but don't block display
    try {
        fetchTokenPrices();
    } catch (e) {
        console.warn('Could not fetch token prices:', e);
        // Still display projects with static data
    }
});

// Emergency fallback display function
function displayProjectsFallback(projects, container) {
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
}

// Token prices fetching from CoinGecko API
async function fetchTokenPrices() {
    console.log('Fetching token prices from CoinGecko...');
    
    // Track that we're attempting to fetch prices
    window.lastPriceUpdateAttempt = new Date().toISOString();
    
    try {
        // Get projects with CoinGecko IDs
        const projectsWithIds = projects.filter(p => p.coingeckoId);
        
        if (projectsWithIds.length === 0) {
            console.log('No projects with CoinGecko IDs found');
            return;
        }
        
        // Create array of IDs for API call
        const coinIds = projectsWithIds.map(p => p.coingeckoId).join(',');
        
        // Fetch data from CoinGecko API with timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`, {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('CoinGecko data:', data);
        
        // Update project data with API response
        data.forEach(coin => {
            const project = projects.find(p => p.coingeckoId === coin.id);
            if (project) {
                project.tokenPrice = coin.current_price;
                project.priceChange = coin.price_change_percentage_24h || 0;
                project.lastPriceUpdate = new Date().toISOString();
                console.log(`Updated ${project.name} price: $${project.tokenPrice}, change: ${project.priceChange}%`);
            }
        });
        
        // Track successful update
        window.lastSuccessfulPriceUpdate = new Date().toISOString();
        console.log('Price update completed successfully');
    } catch (error) {
        console.error('Error fetching token prices:', error);
        // Fall back to using hardcoded values - BUT STILL DISPLAY PROJECTS
        console.log('Using cached token values');
    } finally {
        // Always refresh the display when we're done
        if (typeof filterAndDisplayProjects === 'function') {
            // Use a short timeout to ensure other processing completes
            setTimeout(filterAndDisplayProjects, 100);
        }
    }
}

// Fallback function for when API fails
function simulateTokenPrices() {
    console.log('Using simulated token price changes');
    
    projects.forEach(project => {
        if (project.tokenPrice) {
            // Simulate price changes within -3% to +3%
            const randomChange = (Math.random() * 6 - 3).toFixed(2);
            project.priceChange = parseFloat(randomChange);
            
            // Update token price based on change
            const changeAmount = project.tokenPrice * (project.priceChange / 100);
            project.tokenPrice = parseFloat((project.tokenPrice + changeAmount).toFixed(6));
        }
    });
    
    // Add a note that these are simulated values
    window.usingSimulatedPrices = true;
    
    // Always refresh the display
    if (typeof filterAndDisplayProjects === 'function') {
        filterAndDisplayProjects();
    }
}

// Create filter section - this populates the filter dropdowns
function createFilterSection(categories, regions) {
    const categoryFilter = document.getElementById('categoryFilter');
    const regionFilter = document.getElementById('regionFilter');
    
    if (categoryFilter) {
        // Add all option first
        categoryFilter.innerHTML = '<option value="all">All Categories</option>';
        
        // Add each category
        categories.forEach(category => {
            // Display friendly names for categories
            let displayName = '';
            switch(category) {
                case 'app':
                    displayName = 'App-Based';
                    break;
                case 'device':
                    displayName = 'Device-Based';
                    break;
                default:
                    displayName = category.charAt(0).toUpperCase() + category.slice(1);
            }
            
            categoryFilter.innerHTML += `<option value="${category}">${displayName}</option>`;
        });
    }
    
    if (regionFilter) {
        // Add all option first
        regionFilter.innerHTML = '<option value="all">All Regions</option>';
        
        // Map of region values to display names
        const regionNames = {
            'global': 'Global',
            'north-america': 'North America',
            'europe': 'Europe',
            'asia': 'Asia',
            'south-america': 'South America',
            'africa': 'Africa',
            'oceania': 'Oceania'
        };
        
        // Add each region with proper display name
        regions.forEach(region => {
            const displayName = regionNames[region] || region.charAt(0).toUpperCase() + region.slice(1);
            regionFilter.innerHTML += `<option value="${region}">${displayName}</option>`;
        });
    }
} 
