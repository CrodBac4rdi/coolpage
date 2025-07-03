// Auto-import all interactive story JSON files
const interactiveStoryModules = import.meta.glob('/src/data/interactive/*.json', { 
  eager: true, 
  import: 'default' 
}) as Record<string, any>

import type { InteractiveStory } from '../types/interactiveStory'

// Cache for loaded stories
let cachedInteractiveStories: InteractiveStory[] | null = null

// Load all interactive stories from JSON files
export const loadInteractiveStories = (): InteractiveStory[] => {
  if (cachedInteractiveStories) return cachedInteractiveStories

  const stories: InteractiveStory[] = []
  
  // Sort by filename to maintain order
  const sortedModules = Object.keys(interactiveStoryModules).sort()
  
  for (const path of sortedModules) {
    const story = interactiveStoryModules[path] as InteractiveStory
    if (story && story.id) {
      stories.push(story)
    }
  }
  
  cachedInteractiveStories = stories
  return stories
}

// Get single interactive story by ID
export const getInteractiveStoryById = (id: string): InteractiveStory | undefined => {
  const stories = loadInteractiveStories()
  return stories.find(story => story.id === id)
}