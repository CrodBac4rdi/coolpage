import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'

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

export function loadStories(): ManhwaStory[] {
  try {
    // Pfad zum Stories-Ordner
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const storiesDir = path.join(__dirname, '../../stories')
    
    if (!fs.existsSync(storiesDir)) {
      console.warn('⚠️ Stories-Ordner existiert nicht:', storiesDir)
      return []
    }
    
    // Alle Markdown-Dateien im Ordner finden
    const files = fs.readdirSync(storiesDir)
      .filter(file => file.endsWith('.md'))
    
    // Stories aus den Markdown-Dateien laden
    return files.map(file => {
      const filePath = path.join(storiesDir, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const { data, content: markdownContent } = matter(content)
      
      // Kapitel extrahieren (Überschriften mit #)
      const chapters: Chapter[] = []
      const chapterMatches = markdownContent.match(/# .*?(?=\n# |$)/gs) || []
      
      chapterMatches.forEach((chapterContent, index) => {
        // Titel ist die erste Zeile nach dem #
        const titleMatch = chapterContent.match(/# (.*?)(?:\n|$)/)
        const title = titleMatch ? titleMatch[1].trim() : `Kapitel ${index + 1}`
        
        // Emoji aus Titel extrahieren
        const emojiMatch = title.match(/(\p{Emoji})/u)
        const emoji = emojiMatch ? emojiMatch[1] : '📚'
        
        // Inhalt ist alles nach dem Titel
        const contentText = chapterContent.replace(/# .*?\n/, '').trim()
        
        chapters.push({
          id: index + 1,
          title: title.replace(emoji, '').trim(),
          emoji: emoji,
          content: [contentText],
          arc: undefined
        })
      })
      
      // Story-Metadaten zurückgeben
      return {
        id: path.basename(file, '.md'),
        title: data.title || 'Unbenannte Story',
        description: data.description || '',
        author: data.author || 'Unbekannt',
        genre: data.genre || [],
        mature: data.mature || false,
        coverEmoji: data.coverEmoji || '📚',
        gradient: data.gradient || 'from-gray-400 to-gray-600',
        chapters: chapters,
        tags: data.tags || []
      }
    })
  } catch (error) {
    console.error('❌ Fehler beim Laden der Stories:', error)
    return []
  }
}

// Stories laden und exportieren
export const manhwaStories = loadStories()
