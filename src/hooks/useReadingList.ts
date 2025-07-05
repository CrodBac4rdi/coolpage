import { useState, useEffect } from 'react'

interface ReadingListItem {
  storyId: string
  title: string
  addedAt: Date
  progress: number
  lastReadAt?: Date
  status: 'reading' | 'completed' | 'plan-to-read' | 'dropped'
}

export function useReadingList() {
  const [readingList, setReadingList] = useState<ReadingListItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('crod-reading-list')
    if (stored) {
      const parsed = JSON.parse(stored)
      setReadingList(parsed.map((item: any) => ({
        ...item,
        addedAt: new Date(item.addedAt),
        lastReadAt: item.lastReadAt ? new Date(item.lastReadAt) : undefined
      })))
    }
  }, [])

  const saveReadingList = (list: ReadingListItem[]) => {
    localStorage.setItem('crod-reading-list', JSON.stringify(list))
    setReadingList(list)
  }

  const addToReadingList = (storyId: string, title: string, status: ReadingListItem['status'] = 'plan-to-read') => {
    const existing = readingList.find(item => item.storyId === storyId)
    if (existing) {
      updateStatus(storyId, status)
      return
    }

    const newItem: ReadingListItem = {
      storyId,
      title,
      addedAt: new Date(),
      progress: 0,
      status
    }

    const updated = [...readingList, newItem]
    saveReadingList(updated)
  }

  const removeFromReadingList = (storyId: string) => {
    const updated = readingList.filter(item => item.storyId !== storyId)
    saveReadingList(updated)
  }

  const updateProgress = (storyId: string, progress: number) => {
    const updated = readingList.map(item => 
      item.storyId === storyId 
        ? { ...item, progress, lastReadAt: new Date() }
        : item
    )
    saveReadingList(updated)
  }

  const updateStatus = (storyId: string, status: ReadingListItem['status']) => {
    const updated = readingList.map(item => 
      item.storyId === storyId 
        ? { ...item, status, lastReadAt: new Date() }
        : item
    )
    saveReadingList(updated)
  }

  const isInReadingList = (storyId: string) => {
    return readingList.some(item => item.storyId === storyId)
  }

  const getStoryStatus = (storyId: string) => {
    const item = readingList.find(item => item.storyId === storyId)
    return item?.status
  }

  const getReadingStats = () => {
    const stats = {
      total: readingList.length,
      reading: readingList.filter(item => item.status === 'reading').length,
      completed: readingList.filter(item => item.status === 'completed').length,
      planToRead: readingList.filter(item => item.status === 'plan-to-read').length,
      dropped: readingList.filter(item => item.status === 'dropped').length
    }
    return stats
  }

  return {
    readingList,
    addToReadingList,
    removeFromReadingList,
    updateProgress,
    updateStatus,
    isInReadingList,
    getStoryStatus,
    getReadingStats
  }
}