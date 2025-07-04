// Enhanced Story Types with Markdown Support
export interface BaseChapter {
  id: number
  title: string
  emoji: string
  arc?: string
}

// Legacy chapter format (for backward compatibility)
export interface LegacyChapter extends BaseChapter {
  content: string[]
}

// New enhanced chapter format with markdown
export interface EnhancedChapter extends BaseChapter {
  subtitle?: string
  content: string // Markdown content
  wordCount: number
  readTime: number // in minutes
  mood: 'dramatic' | 'romantic' | 'action' | 'mystery' | 'tension' | 'peaceful'
  metadata: {
    pov: string // Point of view character
    setting: string
    characters: string[]
    themes: string[]
    timeline?: string
  }
  media?: {
    coverImage?: string
    ambientSound?: string
    moodMusic?: string
    backgroundGradient?: string
  }
  publishedAt?: string
  updatedAt?: string
}

// Union type for both formats
export type Chapter = LegacyChapter | EnhancedChapter

// Type guard to check if chapter is enhanced
export function isEnhancedChapter(chapter: Chapter): chapter is EnhancedChapter {
  return 'wordCount' in chapter && 'readTime' in chapter && 'metadata' in chapter
}

// Enhanced story interface
export interface EnhancedStory {
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
  
  // New enhanced fields
  synopsis?: string // Longer description
  status: 'ongoing' | 'completed' | 'hiatus'
  totalWordCount?: number
  estimatedReadTime?: number
  rating?: number
  reviewCount?: number
  lastUpdated?: string
  createdAt?: string
  
  // Content metadata
  contentWarnings?: string[]
  language: string
  translatedFrom?: string
  
  // Visual enhancements
  coverImage?: string
  bannerImage?: string
  themeColors?: {
    primary: string
    secondary: string
    accent: string
  }
  
  // Reading features
  bookmarkable: boolean
  commentable: boolean
  shareable: boolean
}

// Legacy story interface (for backward compatibility)
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

// Reader progress tracking
export interface ReadingProgress {
  storyId: string
  chapterId: number
  paragraphIndex?: number
  scrollPosition?: number
  lastReadAt: string
  totalReadTime: number
  bookmarks: Bookmark[]
  notes: ReaderNote[]
}

export interface Bookmark {
  id: string
  chapterId: number
  paragraphIndex: number
  note?: string
  createdAt: string
}

export interface ReaderNote {
  id: string
  chapterId: number
  paragraphIndex: number
  content: string
  createdAt: string
  updatedAt?: string
}

// Reading preferences
export interface ReaderPreferences {
  fontSize: 'small' | 'medium' | 'large' | 'xl'
  fontFamily: 'serif' | 'sans-serif' | 'mono'
  theme: 'light' | 'dark' | 'sepia'
  lineHeight: 'compact' | 'normal' | 'relaxed'
  maxWidth: 'narrow' | 'medium' | 'wide'
  autoScroll: boolean
  focusMode: boolean
  ambientMode: boolean
  soundEffects: boolean
}

// Content loading types
export interface ChapterContent {
  chapterId: number
  content: string
  metadata?: EnhancedChapter['metadata']
  lastModified?: string
}

export interface ContentLoader {
  loadChapter(storyId: string, chapterId: number): Promise<ChapterContent>
  preloadChapter(storyId: string, chapterId: number): Promise<void>
  clearCache(): void
}