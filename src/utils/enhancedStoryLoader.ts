import type { EnhancedStory, ChapterContent, ContentLoader } from '../types/story'

// Enhanced story loader with markdown support and dynamic loading
export class EnhancedStoryLoader implements ContentLoader {
  private chapterCache = new Map<string, ChapterContent>()
  private storyCache = new Map<string, EnhancedStory>()
  private preloadQueue = new Set<string>()

  // Load story metadata (without chapter content)
  async loadStoryMetadata(storyId: string): Promise<EnhancedStory> {
    if (this.storyCache.has(storyId)) {
      return this.storyCache.get(storyId)!
    }

    try {
      // Try to load from new enhanced format first
      const enhancedStory = await this.loadEnhancedStory(storyId)
      this.storyCache.set(storyId, enhancedStory)
      return enhancedStory
    } catch (error) {
      // Fallback to legacy format
      console.warn(`Enhanced story not found for ${storyId}, falling back to legacy format`)
      return await this.loadLegacyStory(storyId)
    }
  }

  // Load enhanced story format
  private async loadEnhancedStory(storyId: string): Promise<EnhancedStory> {
    const storyModule = await import(`../content/stories/${storyId}/metadata.ts`)
    return storyModule.default as EnhancedStory
  }

  // Load legacy story format and convert
  private async loadLegacyStory(storyId: string): Promise<EnhancedStory> {
    const storyModule = await import(`../data/stories/${storyId}.json`)
    const legacyStory = storyModule.default

    // Convert legacy story to enhanced format
    return {
      ...legacyStory,
      status: 'completed' as const,
      language: 'de',
      bookmarkable: true,
      commentable: true,
      shareable: true,
      totalWordCount: this.calculateWordCount(legacyStory.chapters),
      estimatedReadTime: this.calculateReadTime(legacyStory.chapters),
      lastUpdated: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }
  }

  // Load individual chapter content
  async loadChapter(storyId: string, chapterId: number): Promise<ChapterContent> {
    const cacheKey = `${storyId}-${chapterId}`
    
    if (this.chapterCache.has(cacheKey)) {
      return this.chapterCache.get(cacheKey)!
    }

    try {
      // Try to load from markdown files first
      const chapterContent = await this.loadMarkdownChapter(storyId, chapterId)
      this.chapterCache.set(cacheKey, chapterContent)
      return chapterContent
    } catch (error) {
      // Fallback to legacy format
      console.warn(`Markdown chapter not found for ${storyId}/${chapterId}, using legacy format`)
      return await this.loadLegacyChapter(storyId, chapterId)
    }
  }

  // Load markdown chapter
  private async loadMarkdownChapter(storyId: string, chapterId: number): Promise<ChapterContent> {
    const chapterModule = await import(`../content/stories/${storyId}/chapters/chapter-${chapterId}.md?raw`)
    const markdownContent = chapterModule.default
    
    // Try to load chapter metadata
    let metadata
    try {
      const metadataModule = await import(`../content/stories/${storyId}/chapters/chapter-${chapterId}.meta.ts`)
      metadata = metadataModule.default
    } catch (error) {
      // Metadata is optional
      metadata = undefined
    }

    return {
      chapterId,
      content: markdownContent,
      metadata,
      lastModified: new Date().toISOString()
    }
  }

  // Load legacy chapter
  private async loadLegacyChapter(storyId: string, chapterId: number): Promise<ChapterContent> {
    const story = await this.loadStoryMetadata(storyId)
    const chapter = story.chapters.find(c => c.id === chapterId)
    
    if (!chapter) {
      throw new Error(`Chapter ${chapterId} not found in story ${storyId}`)
    }

    // Convert legacy chapter array to markdown
    const content = Array.isArray(chapter.content) 
      ? chapter.content.join('\n\n') 
      : chapter.content

    return {
      chapterId,
      content,
      lastModified: new Date().toISOString()
    }
  }

  // Preload chapter for better performance
  async preloadChapter(storyId: string, chapterId: number): Promise<void> {
    const cacheKey = `${storyId}-${chapterId}`
    
    if (this.preloadQueue.has(cacheKey)) {
      return
    }

    this.preloadQueue.add(cacheKey)
    
    try {
      await this.loadChapter(storyId, chapterId)
    } catch (error) {
      console.warn(`Failed to preload chapter ${storyId}/${chapterId}:`, error)
    } finally {
      this.preloadQueue.delete(cacheKey)
    }
  }

  // Preload next chapters for smooth reading
  async preloadNextChapters(storyId: string, currentChapterId: number, count: number = 2): Promise<void> {
    const story = await this.loadStoryMetadata(storyId)
    const currentIndex = story.chapters.findIndex(c => c.id === currentChapterId)
    
    if (currentIndex === -1) return

    const preloadPromises = []
    for (let i = 1; i <= count; i++) {
      const nextChapter = story.chapters[currentIndex + i]
      if (nextChapter) {
        preloadPromises.push(this.preloadChapter(storyId, nextChapter.id))
      }
    }

    await Promise.all(preloadPromises)
  }

  // Clear cache to free memory
  clearCache(): void {
    this.chapterCache.clear()
    this.storyCache.clear()
    this.preloadQueue.clear()
  }

  // Calculate word count for legacy chapters
  private calculateWordCount(chapters: any[]): number {
    return chapters.reduce((total, chapter) => {
      const content = Array.isArray(chapter.content) 
        ? chapter.content.join(' ') 
        : chapter.content
      return total + content.split(/\s+/).length
    }, 0)
  }

  // Calculate estimated read time (average 200 words per minute)
  private calculateReadTime(chapters: any[]): number {
    const wordCount = this.calculateWordCount(chapters)
    return Math.ceil(wordCount / 200)
  }

  // Get reading statistics
  getReadingStats(storyId: string): Promise<{
    totalWords: number
    estimatedReadTime: number
    chapterCount: number
  }> {
    return this.loadStoryMetadata(storyId).then(story => ({
      totalWords: story.totalWordCount || 0,
      estimatedReadTime: story.estimatedReadTime || 0,
      chapterCount: story.chapters.length
    }))
  }

  // Search within story content
  async searchInStory(storyId: string, query: string): Promise<{
    chapterId: number
    chapterTitle: string
    matches: string[]
  }[]> {
    const story = await this.loadStoryMetadata(storyId)
    const results = []

    for (const chapter of story.chapters) {
      const content = await this.loadChapter(storyId, chapter.id)
      const matches = this.findMatches(content.content, query)
      
      if (matches.length > 0) {
        results.push({
          chapterId: chapter.id,
          chapterTitle: chapter.title,
          matches
        })
      }
    }

    return results
  }

  // Find text matches in content
  private findMatches(content: string, query: string): string[] {
    const regex = new RegExp(query, 'gi')
    const matches = []
    const lines = content.split('\n')
    
    for (const line of lines) {
      if (regex.test(line)) {
        matches.push(line.trim())
      }
    }
    
    return matches.slice(0, 3) // Limit to 3 matches per chapter
  }
}

// Global instance
export const enhancedStoryLoader = new EnhancedStoryLoader()

// Hook for React components
export function useEnhancedStoryLoader() {
  return enhancedStoryLoader
}

// Utility functions
export function estimateReadTime(content: string): number {
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / 200) // 200 words per minute
}

export function extractMetadata(markdownContent: string): {
  title?: string
  description?: string
  tags?: string[]
} {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/
  const match = markdownContent.match(frontmatterRegex)
  
  if (!match) return {}

  const frontmatter = match[1]
  const metadata: any = {}

  // Simple YAML parsing for common fields
  const lines = frontmatter.split('\n')
  for (const line of lines) {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim()
      if (key.trim() === 'tags') {
        metadata.tags = value.split(',').map(t => t.trim())
      } else {
        metadata[key.trim()] = value
      }
    }
  }

  return metadata
}