// import stories from a single source-of-truth, e.g., JSON loader
import { loadStories } from '../utils/storyLoader'

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

export const manhwaStories: ManhwaStory[] = loadStories()