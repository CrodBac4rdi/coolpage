import { useState, useEffect } from 'react'

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: string
  progress?: number
  maxProgress?: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

interface AchievementData {
  achievements: Achievement[]
  totalPoints: number
  level: number
}

const ACHIEVEMENTS_CONFIG: Achievement[] = [
  // Reading Achievements
  {
    id: 'first-chapter',
    title: 'Erste Schritte',
    description: 'Lies dein erstes Kapitel',
    icon: '📖',
    rarity: 'common',
    maxProgress: 1
  },
  {
    id: 'speed-reader',
    title: 'Speed Reader',
    description: 'Lies 5 Kapitel an einem Tag',
    icon: '⚡',
    rarity: 'rare',
    maxProgress: 5
  },
  {
    id: 'night-owl',
    title: 'Nachteule',
    description: 'Lese nach Mitternacht',
    icon: '🦉',
    rarity: 'common'
  },
  {
    id: 'early-bird',
    title: 'Früher Vogel',
    description: 'Lese vor 6 Uhr morgens',
    icon: '🐦',
    rarity: 'common'
  },
  {
    id: 'story-completionist',
    title: 'Story Completionist',
    description: 'Beende eine komplette Geschichte',
    icon: '🏆',
    rarity: 'epic'
  },
  {
    id: 'genre-explorer',
    title: 'Genre Explorer',
    description: 'Lies Stories aus 3 verschiedenen Genres',
    icon: '🗺️',
    rarity: 'rare',
    maxProgress: 3
  },
  {
    id: 'bookmark-master',
    title: 'Bookmark Master',
    description: 'Setze 10 Lesezeichen',
    icon: '🔖',
    rarity: 'rare',
    maxProgress: 10
  },
  {
    id: 'marathon-reader',
    title: 'Marathon Leser',
    description: 'Lies 3 Stunden am Stück',
    icon: '🏃',
    rarity: 'epic'
  },
  {
    id: 'loyal-reader',
    title: 'Treuer Leser',
    description: 'Besuche die Seite 7 Tage in Folge',
    icon: '💫',
    rarity: 'epic',
    maxProgress: 7
  },
  {
    id: 'social-butterfly',
    title: 'Social Butterfly',
    description: 'Teile eine Story auf Social Media',
    icon: '🦋',
    rarity: 'common'
  },
  {
    id: 'character-fan',
    title: 'Character Fan',
    description: 'Erkunde alle Charakterprofile',
    icon: '❤️',
    rarity: 'rare'
  },
  {
    id: 'secret-finder',
    title: 'Geheimnisfinder',
    description: 'Finde das versteckte Easter Egg',
    icon: '🥚',
    rarity: 'legendary'
  }
]

export const useAchievements = () => {
  const [achievementData, setAchievementData] = useState<AchievementData>({
    achievements: ACHIEVEMENTS_CONFIG.map(a => ({ ...a, progress: 0 })),
    totalPoints: 0,
    level: 1
  })
  
  const [showNotification, setShowNotification] = useState<Achievement | null>(null)

  useEffect(() => {
    // Load saved achievements
    const saved = localStorage.getItem('user-achievements')
    if (saved) {
      const data = JSON.parse(saved)
      setAchievementData(data)
    }
  }, [])

  const saveAchievements = (data: AchievementData) => {
    localStorage.setItem('user-achievements', JSON.stringify(data))
    setAchievementData(data)
  }

  const unlockAchievement = (achievementId: string) => {
    const achievement = achievementData.achievements.find(a => a.id === achievementId)
    if (!achievement || achievement.unlockedAt) return

    const updatedAchievements = achievementData.achievements.map(a => {
      if (a.id === achievementId) {
        return { ...a, unlockedAt: new Date().toISOString(), progress: a.maxProgress || 1 }
      }
      return a
    })

    const points = calculatePoints(achievement.rarity)
    const newTotal = achievementData.totalPoints + points
    const newLevel = Math.floor(newTotal / 100) + 1

    const newData = {
      achievements: updatedAchievements,
      totalPoints: newTotal,
      level: newLevel
    }

    saveAchievements(newData)
    setShowNotification(achievement)

    // Hide notification after 5 seconds
    setTimeout(() => setShowNotification(null), 5000)
  }

  const updateProgress = (achievementId: string, progress: number) => {
    const achievement = achievementData.achievements.find(a => a.id === achievementId)
    if (!achievement || achievement.unlockedAt) return

    const updatedAchievements = achievementData.achievements.map(a => {
      if (a.id === achievementId) {
        const newProgress = Math.min(progress, a.maxProgress || 1)
        const shouldUnlock = newProgress >= (a.maxProgress || 1)
        
        if (shouldUnlock) {
          unlockAchievement(achievementId)
          return a
        }
        
        return { ...a, progress: newProgress }
      }
      return a
    })

    saveAchievements({ ...achievementData, achievements: updatedAchievements })
  }

  const calculatePoints = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 10
      case 'rare': return 25
      case 'epic': return 50
      case 'legendary': return 100
      default: return 10
    }
  }

  const getUnlockedCount = () => {
    return achievementData.achievements.filter(a => a.unlockedAt).length
  }

  const getCompletionPercentage = () => {
    return Math.round((getUnlockedCount() / achievementData.achievements.length) * 100)
  }

  const checkTimeBasedAchievements = () => {
    const hour = new Date().getHours()
    
    if (hour >= 0 && hour < 6) {
      unlockAchievement('early-bird')
    } else if (hour >= 0 && hour < 4) {
      unlockAchievement('night-owl')
    }
  }

  return {
    achievements: achievementData.achievements,
    totalPoints: achievementData.totalPoints,
    level: achievementData.level,
    unlockAchievement,
    updateProgress,
    getUnlockedCount,
    getCompletionPercentage,
    showNotification,
    checkTimeBasedAchievements
  }
}