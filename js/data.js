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
        category: "device",
        region: ["global", "north-america", "europe"],
        logo: "https://uploads-ssl.webflow.com/64d7cea4c213947d7d05ea38/64d8ddcf1f0429e2aefb2d0f_natix-logo-white-bg.png",
        token: "NTIX",
        tokenTicker: "NTIX",
        tokenPrice: 0.0007383,
        priceChange: 1.4,
        url: "https://natix.network/",
        hardwareCost: "$299",
        featured: true,
        coingeckoId: "natix-network"
    },
    {
        id: 2,
        name: "MapMetrics",
        description: "MapMetrics rewards users for contributing GPS location data while driving. The app validates, processes, and enhances map quality data and compensates users with MAP tokens. Perfect for daily commuters looking to earn passively.",
        category: "app",
        region: ["global"],
        logo: "https://pbs.twimg.com/profile_images/1625953683342336000/8LhLtXGR_400x400.jpg",
        token: "MAP",
        tokenTicker: "MAP",
        tokenPrice: 0.042,
        priceChange: 1.5,
        url: "https://mapmetrics.org/",
        featured: true,
        coingeckoId: "mapmetrics"
    },
    {
        id: 3,
        name: "DIMO",
        description: "DIMO is a user-owned IoT platform connecting drivers, vehicles and apps. It allows users to earn tokens by sharing vehicle data while maintaining ownership and control of their information, creating value from everyday driving.",
        category: "device",
        region: ["north-america", "europe"],
        logo: "https://assets-global.website-files.com/61a5fb25e3125ca024a09128/61a6073ffa27de6e2d03e051_DIMO_400x400.png",
        token: "DIMO",
        tokenTicker: "DIMO",
        tokenPrice: 0.07468,
        priceChange: 6.6,
        url: "https://dimo.zone/",
        hardwareCost: "$99-$249",
        coingeckoId: "dimo"
    },
    {
        id: 4,
        name: "Hivemapper",
        description: "Hivemapper is building a global, blockchain-based map using dashcams and community contributions. Drivers earn HONEY tokens by capturing street-level imagery that improves map accuracy and freshness through the Hivemapper Dashcam.",
        category: "device",
        region: ["global", "north-america"],
        logo: "https://pbs.twimg.com/profile_images/1635267082441412608/Kd5c_mt8_400x400.png",
        token: "HONEY",
        tokenPrice: 0.18,
        priceChange: -2.4,
        url: "https://hivemapper.com/",
        hardwareCost: "$549"
    },
    {
        id: 7,
        name: "Dovu",
        description: "Dovu enables users to earn DOV tokens by tracking and verifying their carbon-friendly transportation choices. The platform rewards sustainable mobility behaviors, helping reduce carbon footprints while earning crypto.",
        category: "app",
        region: ["europe"],
        logo: "https://pbs.twimg.com/profile_images/1468947000813162496/N5-tYlZ5_400x400.jpg",
        token: "DOV",
        tokenPrice: 0.0005,
        priceChange: -0.6,
        url: "https://dovu.earth/",
        featured: true
    },
    {
        id: 8,
        name: "peaq Network",
        description: "peaq Network is building the Economy of Things on Web3 foundations. Users can earn from vehicle data and services including charging stations, ridesharing, and connected vehicle applications, all powered by blockchain technology.",
        category: "device",
        region: ["europe", "global"],
        logo: "https://assets-global.website-files.com/61a5fb25e3125ca024a09128/61a5fb25e3125c4d2ea0928b_peaq.png",
        token: "PEAQ",
        tokenPrice: 0.029,
        priceChange: 2.1,
        url: "https://www.peaq.network/",
        hardwareCost: "$50-$200"
    },
    {
        id: 9,
        name: "CarBlocks",
        description: "A platform for secure vehicle data sharing and monetization using blockchain technology. Connect your car's OBD-II port to earn tokens by sharing valuable driving and diagnostic information.",
        category: "device",
        region: ["asia", "europe"],
        logo: "",
        token: "CARB",
        url: "https://www.carblock.io/",
        hardwareCost: "$30"
    },
    {
        id: 10,
        name: "Wibson",
        description: "A blockchain-based data marketplace that allows users to securely and anonymously sell validated personal data, including driving patterns and location information, earning Wibson tokens in exchange.",
        category: "app",
        region: ["global", "south-america"],
        logo: "",
        token: "WIB",
        url: "https://wibson.org/"
    },
    {
        id: 11,
        name: "DreamCars",
        description: "DreamCars is creating a decentralized platform for vehicle data monetization, allowing drivers to share driving data and earn tokens. The project focuses on building a comprehensive mobility data marketplace.",
        category: "app",
        region: ["north-america", "europe"],
        logo: "",
        token: "DREAM",
        tokenPrice: 0.012,
        priceChange: 1.1,
        url: "https://dreamcars.co/"
    },
    {
        id: 12,
        name: "Carro",
        description: "Carro leverages vehicle data to provide better insurance rates and vehicle maintenance insights while compensating users with CAR tokens. The platform uses AI to analyze driving habits and vehicle performance.",
        category: "device",
        region: ["asia"],
        logo: "",
        token: "CAR",
        tokenPrice: 0.075,
        priceChange: 0.9,
        url: "https://carro.sg/",
        hardwareCost: "$120"
    }
];

// Make projects accessible globally
window.projects = projects;

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
