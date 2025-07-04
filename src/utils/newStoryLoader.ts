// File-based story loading system
export interface Chapter {
  id: number
  title: string
  emoji: string
  content: string
  arc?: string
  description?: string
  keyMoments?: string[]
  emotionalIntensity?: 1 | 2 | 3 | 4 | 5
}

export interface StoryMetadata {
  id: string
  title: string
  description: string
  author: string
  genre: string[]
  mature: boolean
  coverEmoji: string
  gradient: string
  tags: string[]
}

export interface ManhwaStory extends StoryMetadata {
  chapters: Chapter[]
}

// Get list of available stories
export const getAvailableStories = async (): Promise<string[]> => {
  // For now, return hardcoded list - in production this would scan directories
  return [
    'forbidden-desire',
    'moonlight-academy', 
    'code-breakers',
    'dream-catcher',
    'the-transfer-student',
    'my-boss-is-a-cat',
    'shadow-in-the-mirror'
  ]
}

// Load story metadata
export const loadStoryMetadata = async (storyId: string): Promise<StoryMetadata> => {
  try {
    const response = await fetch(`/stories/${storyId}/story.json`)
    if (!response.ok) {
      throw new Error(`Failed to load story metadata: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Error loading story ${storyId}:`, error)
    throw error
  }
}

// Load individual chapter
export const loadChapter = async (storyId: string, chapterNumber: number): Promise<Chapter> => {
  try {
    const chapterFile = `chapter-${chapterNumber.toString().padStart(2, '0')}.md`
    const response = await fetch(`/stories/${storyId}/${chapterFile}`)
    
    if (!response.ok) {
      throw new Error(`Chapter ${chapterNumber} not found`)
    }
    
    const markdown = await response.text()
    return parseMarkdownChapter(markdown, chapterNumber)
  } catch (error) {
    console.error(`Error loading chapter ${chapterNumber} of ${storyId}:`, error)
    throw error
  }
}

// Parse markdown chapter into Chapter object
const parseMarkdownChapter = (markdown: string, chapterNumber: number): Chapter => {
  const lines = markdown.split('\n')
  let title = `Chapter ${chapterNumber}`
  let emoji = '📖'
  let arc = ''
  let content = ''
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Extract title from # heading
    if (line.startsWith('# ')) {
      const titleMatch = line.match(/^# (.+?)(\s+(.+))?$/)
      if (titleMatch) {
        title = titleMatch[1]
        emoji = titleMatch[3] || '📖'
      }
    }
    
    // Extract arc from *Arc: ...* 
    if (line.startsWith('*Arc:')) {
      arc = line.replace(/^\*Arc:\s*/, '').replace(/\*$/, '')
    }
    
    // Content starts after metadata
    if (!line.startsWith('#') && !line.startsWith('*Arc:') && line.length > 0) {
      content += line + '\n\n'
    }
  }
  
  return {
    id: chapterNumber,
    title,
    emoji,
    content: content.trim(),
    arc: arc || undefined
  }
}

// Load complete story with all chapters
export const loadCompleteStory = async (storyId: string): Promise<ManhwaStory> => {
  try {
    const metadata = await loadStoryMetadata(storyId)
    const chapters: Chapter[] = []
    
    // Try to load chapters (start with 1, keep going until 404)
    let chapterNumber = 1
    while (true) {
      try {
        const chapter = await loadChapter(storyId, chapterNumber)
        chapters.push(chapter)
        chapterNumber++
      } catch (error) {
        // Stop when we can't load more chapters
        break
      }
    }
    
    return {
      ...metadata,
      chapters
    }
  } catch (error) {
    console.error(`Error loading complete story ${storyId}:`, error)
    throw error
  }
}

// Load all stories (for story browser)
export const loadAllStories = async (): Promise<ManhwaStory[]> => {
  try {
    const storyIds = await getAvailableStories()
    const stories = await Promise.all(
      storyIds.map(id => loadCompleteStory(id))
    )
    return stories.filter(Boolean)
  } catch (error) {
    console.error('Error loading all stories:', error)
    return []
  }
}

// Backwards compatibility - fallback to old system if new system fails
export const loadStories = async (): Promise<ManhwaStory[]> => {
  try {
    // Try new file-based system first
    return await loadAllStories()
  } catch (error) {
    console.warn('File-based loading failed, falling back to old system')
    // Import old loader as fallback
    const { loadStories: oldLoader } = await import('./storyLoader')
    const oldStories = await oldLoader()
    // Convert old format to new format
    return oldStories.map(story => ({
      ...story,
      chapters: story.chapters.map(chapter => ({
        ...chapter,
        content: Array.isArray(chapter.content) ? chapter.content.join('\n\n') : chapter.content
      }))
    }))
  }
}

// Get story by ID
export const getStoryById = async (id: string): Promise<ManhwaStory | null> => {
  try {
    return await loadCompleteStory(id)
  } catch (error) {
    console.error(`Story ${id} not found:`, error)
    return null
  }
}

// Cache for performance
const storyCache = new Map<string, ManhwaStory>()

export const getCachedStory = async (id: string): Promise<ManhwaStory | null> => {
  if (storyCache.has(id)) {
    return storyCache.get(id)!
  }
  
  const story = await getStoryById(id)
  if (story) {
    storyCache.set(id, story)
  }
  
  return story
}