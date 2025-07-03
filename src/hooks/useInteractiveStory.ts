import { useState, useEffect } from 'react'
import type { InteractiveStory, ReaderState, Choice } from '../types/interactiveStory'

export const useInteractiveStory = (story: InteractiveStory) => {
  const [readerState, setReaderState] = useState<ReaderState>({
    currentChapter: 1,
    currentPath: 'main',
    choiceHistory: [],
    unlockedPaths: ['main'],
    completedEndings: []
  })

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem(`interactive-${story.id}`)
    if (savedState) {
      try {
        setReaderState(JSON.parse(savedState))
      } catch (error) {
        console.error('Failed to load saved state:', error)
      }
    }
  }, [story.id])

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem(`interactive-${story.id}`, JSON.stringify(readerState))
  }, [readerState, story.id])

  const getCurrentChapter = () => {
    return story.chapters.find(chapter => chapter.id === readerState.currentChapter)
  }

  const makeChoice = (choice: Choice) => {
    const currentChapter = getCurrentChapter()
    if (!currentChapter) return

    // Record choice in history
    const newChoice = {
      chapterId: currentChapter.id,
      choiceId: choice.id,
      timestamp: Date.now()
    }

    setReaderState(prev => ({
      ...prev,
      currentChapter: choice.nextChapter || prev.currentChapter + 1,
      currentPath: choice.branchPath || prev.currentPath,
      choiceHistory: [...prev.choiceHistory, newChoice],
      unlockedPaths: choice.branchPath ? 
        [...prev.unlockedPaths, choice.branchPath] : 
        prev.unlockedPaths
    }))
  }

  const goToNextChapter = () => {
    setReaderState(prev => ({
      ...prev,
      currentChapter: prev.currentChapter + 1
    }))
  }

  const goToPreviousChapter = () => {
    setReaderState(prev => ({
      ...prev,
      currentChapter: Math.max(1, prev.currentChapter - 1)
    }))
  }

  const jumpToChapter = (chapterId: number) => {
    setReaderState(prev => ({
      ...prev,
      currentChapter: chapterId
    }))
  }

  const resetStory = () => {
    setReaderState({
      currentChapter: 1,
      currentPath: 'main',
      choiceHistory: [],
      unlockedPaths: ['main'],
      completedEndings: []
    })
  }

  const getAvailableChapters = () => {
    return story.chapters.filter(chapter => 
      readerState.unlockedPaths.includes(chapter.branchPath || 'main')
    )
  }

  const getPathProgress = (path: string) => {
    const pathChapters = story.chapters.filter(chapter => chapter.branchPath === path)
    const readChapters = readerState.choiceHistory.filter(choice => 
      pathChapters.some(chapter => chapter.id === choice.chapterId)
    )
    return {
      read: readChapters.length,
      total: pathChapters.length,
      percentage: pathChapters.length > 0 ? (readChapters.length / pathChapters.length) * 100 : 0
    }
  }

  return {
    readerState,
    getCurrentChapter,
    makeChoice,
    goToNextChapter,
    goToPreviousChapter,
    jumpToChapter,
    resetStory,
    getAvailableChapters,
    getPathProgress
  }
}