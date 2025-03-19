# Drive2Earn.io

A comprehensive directory of blockchain-based DePIN projects for vehicle monetization.

## Project Structure

### Root Directory
Contains all files that need to be deployed to production:
- `index.html` - Main website page
- `/css` - Stylesheets
- `/js` - JavaScript files including catalog.js with project data
- `/images` - Image assets
- `worker.js` - Cloudflare Worker script for API proxy
- `.gitignore` - Git version control configuration

### Local Development
Local development files are kept in the `/local` directory:
- `server.js` - Local development server
- `.env` - Environment variables (contains API keys, not for production)
- `package.json` & `package-lock.json` - Node.js dependencies
- `/knowledge` - Development documentation and reference materials
- `/node_modules` - Dependencies installed by npm

## Development Setup

1. Install dependencies:
```
cd local
npm install
```

2. Start the development server:
```
cd local
npm run dev
```

3. Visit http://localhost:3000 to view the site locally

## Deployment

When deploying to Cloudflare Pages, only upload the files in the root directory. 
Do not upload the `/local` directory or its contents.

Configure your environment variables (like COINGECKO_API_KEY) directly in the 
Cloudflare Dashboard rather than using the .env file. 
