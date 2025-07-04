// Auto-import all story JSON files
const storyModules = import.meta.glob('../data/stories/*.json', { 
  eager: true, 
  import: 'default' 
}) as Record<string, any>

export interface Chapter {
  id: number
  title: string
  emoji: string
  content: string[]
  arc?: string
  description?: string
  keyMoments?: string[]
  emotionalIntensity?: 1 | 2 | 3 | 4 | 5
}

export interface ManhwaStory {
  id: string
  title: string
  description: string
  author: string
  genre: string[]
  mature: boolean
  coverEmoji: string
  gradient: string
  tags: string[]
  chapters: Chapter[]
}

// Cache for loaded stories
let cachedStories: ManhwaStory[] | null = null

// Load all stories from JSON files
export const loadStories = (): ManhwaStory[] => {
  if (cachedStories) return cachedStories

  const stories: ManhwaStory[] = []
  
  // Sort by filename to maintain order
  const sortedModules = Object.keys(storyModules).sort()
  
  for (const path of sortedModules) {
    const story = storyModules[path] as ManhwaStory
    if (story && story.id) {
      stories.push(story)
    }
  }
  
  cachedStories = stories
  return stories
}

// Get single story by ID
export const getStoryById = (id: string): ManhwaStory | undefined => {
  const stories = loadStories()
  return stories.find(story => story.id === id)
}