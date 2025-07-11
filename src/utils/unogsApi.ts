// uNoGS API integration for Netflix availability
// Free tier available on RapidAPI

interface UnogsSearchResult {
  results: Array<{
    id: string
    title: string
    img: string
    nfinfo: string
    synopsis: string
    avgrating: number
    year: string
    runtime: string
    imdbid: string
    poster: string
    imdbrating: number
    top250: number
    top250tv: number
    clist: string // Country list
    titledate: string
  }>
  total: number
}

interface NetflixAvailability {
  available: boolean
  countries: string[]
  netflixId?: string
}

// Note: You need to get your own API key from https://rapidapi.com/unogs/api/unogs-unogs-v1
const UNOGS_API_KEY = process.env.VITE_UNOGS_API_KEY || ''
const UNOGS_API_HOST = 'unogs-unogs-v1.p.rapidapi.com'

export async function checkNetflixAvailability(animeTitle: string): Promise<NetflixAvailability> {
  if (!UNOGS_API_KEY) {
    console.warn('uNoGS API key not configured. Set VITE_UNOGS_API_KEY in your .env file')
    return { available: false, countries: [] }
  }

  try {
    // Clean up the title for better search results
    const searchTitle = animeTitle
      .replace(/[^\w\s]/gi, '') // Remove special characters
      .replace(/\s+/g, ' ')     // Normalize spaces
      .trim()

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': UNOGS_API_KEY,
        'X-RapidAPI-Host': UNOGS_API_HOST
      }
    }

    // Search for the anime on Netflix
    const searchUrl = `https://${UNOGS_API_HOST}/search/titles?order_by=date&title=${encodeURIComponent(searchTitle)}&type=series`
    const response = await fetch(searchUrl, options)

    if (!response.ok) {
      throw new Error(`uNoGS API error: ${response.status}`)
    }

    const data: UnogsSearchResult = await response.json()

    if (data.results && data.results.length > 0) {
      // Find the best match
      const bestMatch = data.results.find(result => {
        const resultTitle = result.title.toLowerCase()
        const searchLower = searchTitle.toLowerCase()
        return resultTitle.includes(searchLower) || searchLower.includes(resultTitle)
      })

      if (bestMatch) {
        // Parse country list
        const countries = bestMatch.clist ? bestMatch.clist.split(',').map(c => c.trim()) : []
        
        return {
          available: true,
          countries,
          netflixId: bestMatch.id
        }
      }
    }

    return { available: false, countries: [] }
  } catch (error) {
    console.error('Error checking Netflix availability:', error)
    return { available: false, countries: [] }
  }
}

// Cache results to avoid hitting API limits
const availabilityCache = new Map<string, { data: NetflixAvailability; timestamp: number }>()
const CACHE_DURATION = 1000 * 60 * 60 * 24 // 24 hours

export async function checkNetflixAvailabilityCached(animeTitle: string): Promise<NetflixAvailability> {
  const cached = availabilityCache.get(animeTitle)
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }

  const availability = await checkNetflixAvailability(animeTitle)
  availabilityCache.set(animeTitle, { data: availability, timestamp: Date.now() })
  
  return availability
}

// Get Netflix URL for a title
export function getNetflixUrl(netflixId?: string): string {
  if (netflixId) {
    return `https://www.netflix.com/title/${netflixId}`
  }
  return 'https://www.netflix.com/search'
}