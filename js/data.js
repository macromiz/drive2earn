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
        tokenPrice: 0.055,
        priceChange: 3.2,
        url: "https://natix.network/",
        hardwareCost: "$299",
        featured: true
    },
    {
        id: 2,
        name: "MapMetrics",
        description: "MapMetrics rewards users for contributing GPS location data while driving. The app validates, processes, and enhances map quality data and compensates users with MAP tokens. Perfect for daily commuters looking to earn passively.",
        category: "app",
        region: ["global"],
        logo: "https://pbs.twimg.com/profile_images/1625953683342336000/8LhLtXGR_400x400.jpg",
        token: "MAP",
        tokenPrice: 0.042,
        priceChange: 1.5,
        url: "https://mapmetrics.org/",
        featured: true
    },
    {
        id: 3,
        name: "DIMO",
        description: "DIMO is a user-owned IoT platform connecting drivers, vehicles and apps. It allows users to earn tokens by sharing vehicle data while maintaining ownership and control of their information, creating value from everyday driving.",
        category: "device",
        region: ["north-america", "europe"],
        logo: "https://assets-global.website-files.com/61a5fb25e3125ca024a09128/61a6073ffa27de6e2d03e051_DIMO_400x400.png",
        token: "DIMO",
        tokenPrice: 0.16,
        priceChange: 5.2,
        url: "https://dimo.zone/",
        hardwareCost: "$99-$249"
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
        id: 5,
        name: "Helium Mobile",
        description: "A community-built wireless network that lets users earn HNT tokens by sharing cellular coverage from Helium Hotspots or simply by sharing signal strength data through the mobile app.",
        category: "app",
        region: ["north-america"],
        logo: "https://assets-global.website-files.com/61a5fb25e3125ca024a09128/655691c4ea24ce9ec39d0f0a_helium-mobile-logo.png",
        token: "MOBILE",
        tokenPrice: 0.003,
        priceChange: -1.8,
        url: "https://helium.com/"
    },
    {
        id: 6,
        name: "Nodle",
        description: "A crowdsourced connectivity network that rewards users for sharing their phone's Bluetooth signal. By running the Nodle app in the background, users help locate and connect IoT devices while earning NODL tokens.",
        category: "app",
        region: ["global"],
        logo: "https://pbs.twimg.com/profile_images/1606266544605081601/SFwCU_CL_400x400.jpg",
        token: "NODL",
        tokenPrice: 0.00234,
        priceChange: 0.5,
        url: "https://www.nodle.com/"
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
        url: "https://carblocks.io/",
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

// Token prices simulation
function fetchTokenPrices() {
    // This would be replaced by actual API calls to get real token prices
    // For now, we'll just simulate some price changes
    
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
    
    console.log('Token prices updated');
    
    // Refresh display if the filter function exists
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
