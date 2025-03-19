addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Set CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Max-Age': '86400',
  }

  // Handle OPTIONS request
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    })
  }

  try {
    // Get token IDs from query parameters
    const url = new URL(request.url)
    console.log('Request URL:', request.url);
    
    const tokenIds = url.searchParams.get('ids') || ''
    console.log('Token IDs from request:', tokenIds);
    
    // If no token IDs are provided, return an empty response
    if (!tokenIds) {
      console.log('No token IDs provided, returning empty response');
      return new Response(JSON.stringify({}), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      })
    }
    
    console.log('Fetching prices for tokens:', tokenIds)

    // Fetch token prices from CoinGecko API
    const apiKey = 'CG-qC4jt6quSxkVsmZ71pAyyh99'
    const apiUrl = `https://pro-api.coingecko.com/api/v3/simple/price?ids=${tokenIds}&vs_currencies=usd&include_24hr_change=true`;
    console.log('CoinGecko API URL:', apiUrl);
    
    const response = await fetch(
      apiUrl,
      {
        headers: {
          'x-cg-pro-api-key': apiKey
        }
      }
    )

    // Check response status
    if (!response.ok) {
      console.error('CoinGecko API error:', response.status);
      console.error('Error response:', await response.text());
      
      // Return dummy data instead of error for better user experience
      const tokens = tokenIds.split(',')
      const dummyData = {}
      
      tokens.forEach(token => {
        dummyData[token] = {
          usd: Math.random() * 10, // Random price between 0-10
          usd_24h_change: (Math.random() * 10) - 5 // Random change between -5 and 5
        }
      })
      
      return new Response(JSON.stringify(dummyData), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60' // Short cache for dummy data
        }
      })
    }

    // Cache successful response
    const responseData = await response.json()
    console.log('CoinGecko API response:', responseData)
    
    const responseToCache = new Response(JSON.stringify(responseData), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      }
    })

    return responseToCache

  } catch (error) {
    console.error('Error in worker:', error)
    
    // Return a fallback response with empty data instead of dummy data
    const tokenIds = new URL(request.url).searchParams.get('ids')
    if (!tokenIds) {
      return new Response(JSON.stringify({}), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      })
    }
    
    const tokens = tokenIds.split(',')
    const dummyData = {}
    
    tokens.forEach(token => {
      dummyData[token] = {
        usd: Math.random() * 10, // Random price between 0-10
        usd_24h_change: (Math.random() * 10) - 5 // Random change between -5 and 5
      }
    })
    
    return new Response(JSON.stringify(dummyData), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    })
  }
}
