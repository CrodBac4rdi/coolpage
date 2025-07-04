// Client-side story loader using Vite's import.meta.glob
export interface Chapter {
  id: number
  title: string
  emoji: string
  content: string[]
  arc?: string
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
  chapters: Chapter[]
  tags: string[]
}

// Dynamically import all story JSON files
const storyModules = import.meta.glob('../data/stories/*.json', { eager: true })

export function loadStories(): ManhwaStory[] {
  const stories: ManhwaStory[] = []
  
  for (const path in storyModules) {
    const module = storyModules[path] as { default: ManhwaStory }
    if (module.default) {
      stories.push(module.default)
    }
  }
  
  return stories.sort((a, b) => a.title.localeCompare(b.title))
}

// Get single story by ID
export function getStoryById(id: string): ManhwaStory | undefined {
  const stories = loadStories()
  return stories.find(story => story.id === id)
}

// Export loaded stories
export const manhwaStories = loadStories()