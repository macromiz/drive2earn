/**
 * Project data for Drive2Earn.io
 * This file contains all the project information displayed on the site
 * Last updated: 2024-03-19 - Test auto deployment
 */

window.projects = [
    {
        name: "NATIX Network",
        category: ["app", "device"],
        region: ["global"],
        description: "Turn your smartphone into an AI-powered dashcam and navigation assistant. The Drive& mobile app uses computer vision to detect road events and rewards users for contributing to the network.",
        cost: "Free app, no hardware required (optional $279 VX360 for Tesla owners)",
        website: "https://natix.network/",
        rating: 4.8,
        logo: "natix.png",
        featured: false,
        tokenId: "natix-network",
        tokenPrice: 0.00692, // Manual price update from CoinGecko (#1345)
        tokenChange: -2.41
    },
    {
        name: "MapMetrics",
        category: ["app", "device"],
        region: ["global"],
        description: "The world's first crypto-powered navigation app, rewarding users for contributing their travel data to a decentralized mapping network.",
        cost: "Free app; optional Special Position Tracker (SPT) device ($50-100) for higher earnings",
        website: "https://mapmetrics.org/",
        rating: 4.5,
        logo: "mapmetrics.png",
        featured: false,
        tokenId: "mapmetrics",
        tokenPrice: 0.0349,
        tokenChange: -3.84
    },
    {
        name: "DIMO",
        category: ["device", "app"],
        region: ["north-america", "europe"],
        description: "An open platform that lets drivers collect, own, and monetize their car's data. Connect your vehicle to DIMO to earn tokens and gain insights about your driving habits.",
        cost: "Free for modern connected cars (Tesla, etc.); others need DIMO Macaron ($39) or LTE Adapter ($169)",
        website: "https://dimo.zone/",
        rating: 4.6,
        logo: "dimo.png",
        featured: false,
        tokenId: "dimo",
        tokenPrice: 0.1024, // Manual price update from CoinGecko (#1011)
        tokenChange: -1.97
    },
    {
        name: "Hivemapper",
        category: ["device", "app"],
        region: ["global"],
        description: "A decentralized global mapping network that uses dashcam-equipped drivers to build a live street-view map. Earn HONEY tokens by contributing mapping data.",
        cost: "Requires Hivemapper Dashcam ($300-600)",
        website: "https://hivemapper.com/",
        rating: 4.7,
        logo: "hivemapper.png",
        featured: false,
        tokenId: "hivemapper",
        tokenPrice: 0.1628, // Manual price update from CoinGecko (#329)
        tokenChange: -4.39
    },
    {
        name: "Dovu",
        category: ["app"],
        region: ["global"],
        description: "A platform that incentivizes vehicle owners to share driving data in exchange for tokens. Backed by Jaguar Land Rover, focusing on carbon-offset initiatives.",
        cost: "Free app download",
        website: "https://dovu.earth/",
        rating: 4.0,
        logo: "dovu.png",
        featured: true,
        tokenId: "dovu",
        tokenPrice: 0.0000574, // Manual price update from CoinGecko (#1656)
        tokenChange: -4.12
    },
    {
        name: "Wibson",
        category: ["app"],
        region: ["global"],
        description: "A blockchain-based marketplace that allows users to securely sell personal data, including driving information, directly to buyers with full transparency.",
        cost: "Free app, earn by selling your driving data",
        website: "https://wibson.org/",
        rating: 3.9,
        logo: "wibson.png",
        featured: true
    },
    {
        name: "Nodle",
        category: ["app"],
        region: ["global"],
        description: "An IoT connectivity network that rewards users for sharing their smartphone's Bluetooth connectivity. Drivers can earn NODL tokens while on the move.",
        cost: "Free app download, no additional hardware",
        website: "https://nodle.com/",
        rating: 4.2,
        logo: "nodle.png",
        featured: true
    },
    {
        name: "Helium Mobile",
        category: ["device"],
        region: ["north-america"],
        description: "The People's Network now offering mobile coverage. Install a Helium Mobile Hotspot in your vehicle to provide 5G coverage and earn HNT tokens while driving.",
        cost: "Requires Helium Mobile Hotspot ($499-899)",
        website: "https://www.helium.com/mobile",
        rating: 4.4,
        logo: "helium.png",
        featured: true
    },
    {
        name: "peaq Network",
        category: ["app", "device"],
        region: ["global"],
        description: "A decentralized network for IoT applications with a focus on mobility. Car owners can earn tokens by sharing vehicle data or offering services like charging stations.",
        cost: "Free app; optional hardware integrations",
        website: "https://www.peaq.network/",
        rating: 4.1,
        logo: "peaq.png",
        featured: true,
        tokenId: "peaq",
        tokenPrice: 0.0189, // Manual price update from CoinGecko (#501)
        tokenChange: -4.16
    },
    {
        name: "DreamCars",
        category: ["app", "marketplace"],
        region: ["global"],
        description: "A blockchain-powered platform for car-sharing and mobility services. Vehicle owners can earn by renting their cars or sharing driving data.",
        cost: "Free registration; commission on rentals",
        website: "https://dreamcars.io/",
        rating: 3.8,
        logo: "dreamcars.png",
        featured: true
    },
    {
        name: "Carro",
        category: ["device", "app"],
        region: ["asia"],
        description: "Singapore-based car marketplace with a drive-to-earn feature. Install their telematics device to track driving behavior and earn rewards for safe driving.",
        cost: "Free with Carro subscription; device included",
        website: "https://carro.sg/",
        rating: 4.3,
        logo: "carro.png",
        featured: false
    },
    {
        name: "CarBlocks",
        category: ["device", "data"],
        region: ["global"],
        description: "A blockchain solution for secure vehicle data sharing. Drivers can monetize their car's data while maintaining privacy and control over what they share.",
        cost: "OBD-II device ($25-40) + free app",
        website: "https://carblocks.io/",
        rating: 3.7,
        logo: "carblocks.png",
        featured: false
    }
];

// Function to initialize the catalog
function initCatalog() {
    console.log("Catalog initialized with " + window.projects.length + " projects");
    
    // Call the display function if it exists
    if (typeof displayProjects === 'function') {
        displayProjects(window.projects);
    } else {
        console.error("displayProjects function not found");
    }
}

// Function to fetch token prices
function fetchTokenPrices() {
    console.log("Using pre-defined token prices from data.js");
    // Token prices are now directly defined in the project data
    
    // Refresh display if needed
    if (typeof displayProjects === 'function') {
        displayProjects(window.projects);
    }
} 
