// Advanced content caching and compression utilities

interface CacheEntry {
  content: string
  timestamp: number
  hits: number
  compressed?: boolean
  size: number
}

class ContentCache {
  private cache = new Map<string, CacheEntry>()
  private maxSize = 50 * 1024 * 1024 // 50MB
  private maxAge = 30 * 60 * 1000 // 30 minutes
  private currentSize = 0

  // Get content from cache
  get(key: string): string | null {
    const entry = this.cache.get(key)
    
    if (!entry) {
      return null
    }

    // Check if entry is expired
    if (Date.now() - entry.timestamp > this.maxAge) {
      this.delete(key)
      return null
    }

    // Update hit count
    entry.hits++
    
    return entry.content
  }

  // Set content in cache
  set(key: string, content: string): void {
    // Check if we need to make space
    const contentSize = this.getContentSize(content)
    
    if (contentSize > this.maxSize) {
      console.warn('Content too large for cache:', key)
      return
    }

    // Make space if needed
    this.makeSpace(contentSize)

    const entry: CacheEntry = {
      content,
      timestamp: Date.now(),
      hits: 0,
      size: contentSize
    }

    this.cache.set(key, entry)
    this.currentSize += contentSize
  }

  // Delete entry from cache
  delete(key: string): boolean {
    const entry = this.cache.get(key)
    if (entry) {
      this.currentSize -= entry.size
      return this.cache.delete(key)
    }
    return false
  }

  // Clear entire cache
  clear(): void {
    this.cache.clear()
    this.currentSize = 0
  }

  // Get cache statistics
  getStats() {
    return {
      entries: this.cache.size,
      size: this.currentSize,
      maxSize: this.maxSize,
      utilization: (this.currentSize / this.maxSize) * 100
    }
  }

  // Make space for new content
  private makeSpace(neededSize: number): void {
    if (this.currentSize + neededSize <= this.maxSize) {
      return
    }

    // Sort entries by least recently used and least hits
    const entries = Array.from(this.cache.entries()).sort(([, a], [, b]) => {
      // First by age (older first)
      const ageDiff = a.timestamp - b.timestamp
      if (ageDiff !== 0) return ageDiff
      
      // Then by hits (fewer hits first)
      return a.hits - b.hits
    })

    // Remove entries until we have enough space
    for (const [key] of entries) {
      if (this.currentSize + neededSize <= this.maxSize) {
        break
      }
      
      this.delete(key)
    }
  }

  // Get content size in bytes
  private getContentSize(content: string): number {
    return new Blob([content]).size
  }

  // Preload content
  async preload(keys: string[], loader: (key: string) => Promise<string>): Promise<void> {
    const promises = keys.map(async (key) => {
      if (!this.cache.has(key)) {
        try {
          const content = await loader(key)
          this.set(key, content)
        } catch (error) {
          console.warn(`Failed to preload content for key: ${key}`, error)
        }
      }
    })

    await Promise.all(promises)
  }
}

// Global content cache instance
export const contentCache = new ContentCache()

// Compression utilities
export class ContentCompressor {
  // Simple text compression using LZ-style algorithm
  static compress(text: string): string {
    if (text.length < 100) return text // Don't compress small texts
    
    try {
      // Use browser's built-in compression if available
      if (typeof CompressionStream !== 'undefined') {
        return this.compressWithStreams(text)
      }
      
      // Fallback to simple dictionary compression
      return this.dictionaryCompress(text)
    } catch (error) {
      console.warn('Compression failed, returning original text:', error)
      return text
    }
  }

  static decompress(compressed: string): string {
    try {
      // Try to detect compression type and decompress
      if (compressed.startsWith('DICT:')) {
        return this.dictionaryDecompress(compressed)
      }
      
      return compressed // Not compressed
    } catch (error) {
      console.warn('Decompression failed, returning as-is:', error)
      return compressed
    }
  }

  private static compressWithStreams(text: string): string {
    // This would use CompressionStream in modern browsers
    // For now, return the original text
    return text
  }

  private static dictionaryCompress(text: string): string {
    const words = text.split(/\s+/)
    const dictionary = new Map<string, number>()
    const compressed: (string | number)[] = []
    
    let dictIndex = 0
    
    for (const word of words) {
      if (word.length > 3 && !dictionary.has(word)) {
        dictionary.set(word, dictIndex++)
      }
    }

    // Only compress if we have a good compression ratio
    if (dictionary.size < words.length * 0.3) {
      for (const word of words) {
        const index = dictionary.get(word)
        compressed.push(index !== undefined ? index : word)
      }

      const dictArray = Array.from(dictionary.keys())
      return `DICT:${JSON.stringify({ dict: dictArray, content: compressed })}`
    }

    return text // No compression benefit
  }

  private static dictionaryDecompress(compressed: string): string {
    const data = JSON.parse(compressed.slice(5)) // Remove 'DICT:' prefix
    const { dict, content } = data
    
    return content.map((item: string | number) => 
      typeof item === 'number' ? dict[item] : item
    ).join(' ')
  }
}

// Reading progress persistence
export class ReadingProgressManager {
  private storageKey = 'coolpage-reading-progress'

  // Save reading progress
  saveProgress(storyId: string, chapterId: number, progress: {
    scrollPosition: number
    paragraphIndex: number
    readTime: number
    lastReadAt: string
  }): void {
    try {
      const allProgress = this.getAllProgress()
      allProgress[storyId] = {
        ...allProgress[storyId],
        [chapterId]: progress
      }
      
      localStorage.setItem(this.storageKey, JSON.stringify(allProgress))
    } catch (error) {
      console.warn('Failed to save reading progress:', error)
    }
  }

  // Get reading progress
  getProgress(storyId: string, chapterId: number) {
    try {
      const allProgress = this.getAllProgress()
      return allProgress[storyId]?.[chapterId] || null
    } catch (error) {
      console.warn('Failed to get reading progress:', error)
      return null
    }
  }

  // Get all progress
  private getAllProgress() {
    try {
      const stored = localStorage.getItem(this.storageKey)
      return stored ? JSON.parse(stored) : {}
    } catch (error) {
      console.warn('Failed to parse reading progress:', error)
      return {}
    }
  }

  // Get story completion percentage
  getCompletionPercentage(storyId: string, totalChapters: number): number {
    try {
      const storyProgress = this.getAllProgress()[storyId] || {}
      const completedChapters = Object.keys(storyProgress).length
      return Math.round((completedChapters / totalChapters) * 100)
    } catch (error) {
      return 0
    }
  }

  // Clear old progress data
  cleanup(maxAge: number = 30 * 24 * 60 * 60 * 1000): void {
    try {
      const allProgress = this.getAllProgress()
      const cutoff = Date.now() - maxAge
      
      for (const storyId in allProgress) {
        for (const chapterId in allProgress[storyId]) {
          const progress = allProgress[storyId][chapterId]
          if (new Date(progress.lastReadAt).getTime() < cutoff) {
            delete allProgress[storyId][chapterId]
          }
        }
        
        // Remove empty story entries
        if (Object.keys(allProgress[storyId]).length === 0) {
          delete allProgress[storyId]
        }
      }
      
      localStorage.setItem(this.storageKey, JSON.stringify(allProgress))
    } catch (error) {
      console.warn('Failed to cleanup reading progress:', error)
    }
  }
}

// Global instances
export const readingProgressManager = new ReadingProgressManager()

// Cleanup old data on app start
readingProgressManager.cleanup()