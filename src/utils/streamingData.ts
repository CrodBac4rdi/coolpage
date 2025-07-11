// Streaming availability data
// This is a simplified mapping based on common anime availability
// In production, you would use a real API like Watchmode, JustWatch, or uNoGS

export const commonAnimeStreaming: Record<string, string[]> = {
  // Popular Romance Anime and their typical streaming platforms
  'Kaguya-sama: Love is War': ['Crunchyroll', 'Funimation'],
  'Toradora!': ['Crunchyroll', 'Netflix'],
  'Your Name': ['Netflix', 'Prime Video'],
  'Weathering with You': ['HBO Max', 'Prime Video'],
  'Fruits Basket': ['Crunchyroll', 'Funimation', 'Hulu'],
  'Horimiya': ['Crunchyroll', 'Funimation'],
  'My Dress-Up Darling': ['Crunchyroll', 'Funimation'],
  'Komi Can\'t Communicate': ['Netflix'],
  'The Quintessential Quintuplets': ['Crunchyroll', 'Funimation'],
  'Rent-A-Girlfriend': ['Crunchyroll'],
  'Love, Chunibyo & Other Delusions': ['Crunchyroll', 'Netflix'],
  'Golden Time': ['Crunchyroll', 'HIDIVE'],
  'Clannad': ['Crunchyroll', 'HIDIVE'],
  'Your Lie in April': ['Crunchyroll', 'Netflix', 'Hulu'],
  'A Silent Voice': ['Netflix'],
  'I Want to Eat Your Pancreas': ['Crunchyroll', 'Netflix'],
  'The Garden of Words': ['Netflix', 'Prime Video'],
  'Violet Evergarden': ['Netflix'],
  'Oregairu': ['Crunchyroll', 'HIDIVE'],
  'Bunny Girl Senpai': ['Crunchyroll', 'Funimation', 'Hulu'],
  'Wotakoi: Love is Hard for Otaku': ['Prime Video'],
  'Monthly Girls\' Nozaki-kun': ['Crunchyroll', 'Netflix'],
  'Lovely Complex': ['Crunchyroll'],
  'Maid Sama!': ['Netflix', 'Hulu'],
  'Ouran High School Host Club': ['Netflix', 'Funimation', 'Hulu'],
  'Skip Beat!': ['Crunchyroll'],
  'Say I Love You': ['Crunchyroll'],
  'Blue Spring Ride': ['Crunchyroll'],
  'Orange': ['Crunchyroll', 'Funimation'],
  'Given': ['Crunchyroll'],
  'Bloom Into You': ['HIDIVE'],
  'Tsuki ga Kirei': ['Crunchyroll'],
  'Just Because!': ['Prime Video'],
  'Tsurezure Children': ['Crunchyroll', 'Funimation'],
  'School Days': ['Crunchyroll'],
  'White Album 2': ['Crunchyroll'],
  'Domestic Girlfriend': ['Crunchyroll', 'HIDIVE'],
  'Scum\'s Wish': ['Prime Video'],
  'Anonymous Noise': ['Crunchyroll'],
  'My Little Monster': ['Crunchyroll'],
  'The Pet Girl of Sakurasou': ['Crunchyroll'],
  'Kokoro Connect': ['Crunchyroll', 'HIDIVE'],
  'Anohana': ['Crunchyroll', 'Netflix'],
  'Angel Beats!': ['Crunchyroll', 'Netflix'],
  'Charlotte': ['Crunchyroll'],
  'Plastic Memories': ['Crunchyroll'],
  'WorldEnd': ['Crunchyroll', 'Funimation'],
  'Darling in the FranXX': ['Crunchyroll', 'Funimation', 'Hulu'],
  'The Ancient Magus\' Bride': ['Crunchyroll', 'Funimation'],
  'Snow White with the Red Hair': ['Funimation', 'Hulu'],
  'Yona of the Dawn': ['Crunchyroll', 'Funimation', 'Hulu'],
  'Kamisama Kiss': ['Funimation', 'Hulu'],
  'Inu x Boku SS': ['Crunchyroll'],
  'Special A': ['Crunchyroll', 'Hulu'],
  'Itazura na Kiss': ['Crunchyroll'],
  'Lovely★Complex': ['Crunchyroll'],
  'Kimi ni Todoke': ['Crunchyroll', 'Netflix', 'Hulu'],
  'My Love Story!!': ['Crunchyroll', 'Hulu'],
  'ReLIFE': ['Crunchyroll'],
  'Recovery of an MMO Junkie': ['Crunchyroll'],
  'Gamers!': ['Crunchyroll', 'Funimation'],
  'And you thought there is never a girl online?': ['Funimation', 'Hulu'],
  'Love Stage!!': ['Crunchyroll'],
  'Hitorijime My Hero': ['HIDIVE', 'Prime Video'],
  'Yuri!!! on Ice': ['Crunchyroll', 'Funimation'],
  'Free!': ['Crunchyroll', 'Funimation'],
  'Banana Fish': ['Prime Video'],
  'No. 6': ['Crunchyroll'],
  'Doukyuusei': ['Crunchyroll'],
}

// Default platforms for unknown anime (based on general availability patterns)
export const defaultPlatforms = ['Crunchyroll']

// Function to get streaming platforms for an anime
export function getStreamingPlatforms(animeTitle: string): string[] {
  // Try exact match first
  if (commonAnimeStreaming[animeTitle]) {
    return commonAnimeStreaming[animeTitle]
  }
  
  // Try partial match
  const titleLower = animeTitle.toLowerCase()
  for (const [key, platforms] of Object.entries(commonAnimeStreaming)) {
    if (key.toLowerCase().includes(titleLower) || titleLower.includes(key.toLowerCase())) {
      return platforms
    }
  }
  
  // Check for common keywords that indicate platform availability
  if (titleLower.includes('netflix') || titleLower.includes('violet') || titleLower.includes('komi')) {
    return ['Netflix']
  }
  
  if (titleLower.includes('prime') || titleLower.includes('wotakoi')) {
    return ['Prime Video']
  }
  
  // Most anime are on Crunchyroll
  return defaultPlatforms
}