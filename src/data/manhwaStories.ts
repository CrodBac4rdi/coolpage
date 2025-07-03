import { forbiddenDesireStory } from './stories/forbiddenDesire'
import { pixelsOfLoveStory } from './stories/pixelsOfLove'

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

export const manhwaStories: ManhwaStory[] = [
  {
    id: 'forbidden-desire',
    title: 'Forbidden Desire',
    description: 'Eine leidenschaftliche Liebesgeschichte zwischen einer ambitionierten Projektleiterin und ihrem neuen Chef. Verbotene Anziehung, gefährliche Spiele und brennende Leidenschaft.',
    author: 'Crod Babylon',
    genre: ['Romance', 'Drama', 'Mature'],
    mature: true,
    coverEmoji: '🔥',
    gradient: 'from-red-500/20 to-pink-500/20',
    chapters: forbiddenDesireStory,
    tags: ['CEO Romance', 'Workplace Romance', 'Forbidden Love', 'Passionate', 'Steamy']
  },
  {
    id: 'pixels-of-love',
    title: 'Pixels of Love',
    description: 'Eine süße Gaming-Romance zwischen zwei Otakus. Kaffee, Anime und die Liebe, die in den kleinsten Momenten erblüht.',
    author: 'Crod Babylon',
    genre: ['Romance', 'Slice of Life', 'Gaming'],
    mature: false,
    coverEmoji: '☕',
    gradient: 'from-blue-500/20 to-purple-500/20',
    chapters: pixelsOfLoveStory,
    tags: ['Gaming Romance', 'Otaku Love', 'Sweet', 'Wholesome', 'Cute']
  }
]