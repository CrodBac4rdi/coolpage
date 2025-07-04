import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Chapter, ManhwaStory } from '../data/manhwaStories'

export function loadStories(): ManhwaStory[] {
  try {
    // Stories-Hauptordner
    const storiesDir = path.join(__dirname, '../../stories')
    if (!fs.existsSync(storiesDir)) {
      console.warn('Stories-Ordner existiert nicht:', storiesDir)
      return []
    }
    
    // Arc-Verzeichnisse finden
    const arcDirs = fs.readdirSync(storiesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
    
    // Stories nach Arcs organisieren
    const stories: ManhwaStory[] = []
    let currentStory: ManhwaStory | null = null
    
    arcDirs.forEach(arcDir => {
      const fullArcDir = path.join(storiesDir, arcDir)
      
      // Alle Markdown-Dateien im Arc-Verzeichnis finden
      const chapterFiles = fs.readdirSync(fullArcDir)
        .filter(file => file.endsWith('.md'))
        .sort() // Sortiere nach Dateinamen
      
      // Kapitel aus jedem Markdown extrahieren
      const chapters: Chapter[] = chapterFiles.map(file => {
        const filePath = path.join(fullArcDir, file)
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const { data, content } = matter(fileContent)
        
        // Extrahiere Inhalt (alles nach dem Frontmatter)
        const contentParts = content.trim().split('\n\n')
        const contentWithoutTitle = contentParts.slice(1) // Überspringe die Überschrift
        
        return {
          id: data.id,
          title: data.title,
          emoji: data.emoji,
          content: contentWithoutTitle,
          arc: data.arc
        } as Chapter
      })
      
      // Wenn wir noch keine Story haben, erstelle eine neue
      if (!currentStory) {
        currentStory = {
          id: arcDir,
          title: `${arcDir.replace(/-/g, ' ')}`,
          description: `Story über ${arcDir}`,
          author: 'Author',
          genre: ['Romance', 'Slice of Life'],
          mature: false,
          coverEmoji: chapters[0]?.emoji || '📚',
          gradient: 'from-pink-400 to-blue-500',
          chapters: chapters,
          tags: ['love', 'romance']
        }
        stories.push(currentStory)
      } else {
        // Füge Kapitel zur aktuellen Story hinzu
        currentStory.chapters = [...currentStory.chapters, ...chapters]
      }
    })
    
    return stories
  } catch (error) {
    console.error('Fehler beim Laden der Stories:', error)
    return []
  }
}

// Get single story by ID
export const getStoryById = (id: string): ManhwaStory | undefined => {
  const stories = loadStories()
  return stories.find(story => story.id === id)
}