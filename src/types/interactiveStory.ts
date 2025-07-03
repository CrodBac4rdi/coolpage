export interface Choice {
  id: string
  text: string
  emoji?: string
  nextChapter?: number
  branchPath?: string
  consequences?: string[]
}

export interface InteractiveChapter {
  id: number
  title: string
  emoji: string
  content: string[]
  choices?: Choice[]
  branchPath?: string
  arc?: string
  canContinueMain?: boolean
  backToMain?: number
}

export interface InteractiveStory {
  id: string
  title: string
  description: string
  author: string
  genre: string[]
  mature: boolean
  coverEmoji: string
  gradient: string
  tags: string[]
  chapters: InteractiveChapter[]
  mainPath: number[]
  branchPaths: Record<string, number[]>
}

export interface ReaderState {
  currentChapter: number
  currentPath: string
  choiceHistory: Array<{
    chapterId: number
    choiceId: string
    timestamp: number
  }>
  unlockedPaths: string[]
  completedEndings: string[]
}