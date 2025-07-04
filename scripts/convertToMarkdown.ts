import fs from 'fs'
import path from 'path'
import { storyChapters } from '../src/data/manhwaStory'

// Gruppiere Kapitel nach Arcs
const chaptersGroupedByArc = storyChapters.reduce((acc, chapter) => {
  const arc = chapter.arc || 'Ungrouped'
  if (!acc[arc]) {
    acc[arc] = []
  }
  acc[arc].push(chapter)
  return acc
}, {} as Record<string, typeof storyChapters>)

// Erstelle Stories-Ordner, falls er nicht existiert
const storiesDir = path.join(__dirname, '../stories')
if (!fs.existsSync(storiesDir)) {
  fs.mkdirSync(storiesDir)
}

// Erstelle für jeden Arc einen Unterordner
Object.entries(chaptersGroupedByArc).forEach(([arcName, chapters]) => {
  const arcDir = path.join(storiesDir, arcName.toLowerCase().replace(/\s+/g, '-'))
  if (!fs.existsSync(arcDir)) {
    fs.mkdirSync(arcDir)
  }
  
  // Erstelle für jedes Kapitel eine Markdown-Datei
  chapters.forEach(chapter => {
    const fileName = `${chapter.id.toString().padStart(2, '0')}-${chapter.title.toLowerCase().replace(/\s+/g, '-')}.md`
    const filePath = path.join(arcDir, fileName)
    
    // Erstelle Markdown-Inhalt
    let markdown = `---
id: ${chapter.id}
title: "${chapter.title}"
emoji: "${chapter.emoji}"
arc: "${chapter.arc || 'Ungrouped'}"
---

# ${chapter.title} ${chapter.emoji}

${chapter.content.join('\n\n')}
`
    
    // Schreibe Datei
    fs.writeFileSync(filePath, markdown)
    console.log(`Kapitel ${chapter.id} nach ${filePath} geschrieben`)
  })
})

console.log('Konvertierung abgeschlossen!')