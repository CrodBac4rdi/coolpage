import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

// ES Module Kompatibilität
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pfade
const storyFile = path.join(__dirname, '../src/data/manhwaStory.js');
const storiesDir = path.join(__dirname, '../stories');

// Stelle sicher, dass Stories-Ordner existiert
if (!fs.existsSync(storiesDir)) {
  fs.mkdirSync(storiesDir);
  console.log(`✅ Stories-Ordner erstellt: ${storiesDir}`);
}

// Erstelle Beispiel-Story, falls noch keine existiert
const examplePath = path.join(storiesDir, 'beispiel-story.md');
if (!fs.existsSync(examplePath)) {
  const exampleContent = `---
id: "story-1"
title: "Die Reise"
description: "Ein spannendes Abenteuer"
author: "Anna"
genre:
  - "Abenteuer"
  - "Fantasy"
mature: false
coverEmoji: "🦄"
gradient: "from-pink-400 to-blue-500"
tags:
  - "Magie"
  - "Freundschaft"
---

# Kapitel 1 🌄

Der Morgen begann wie jeder andere. Die Sonne schien durch die Fenster und weckte Anna sanft aus ihrem Schlummer. Doch heute würde alles anders werden.

# Kapitel 2 🌌

Die Nacht war sternenklar, als sie das Dorf verließ. Der Weg vor ihr war ungewiss, aber ihr Herz war voller Hoffnung.
`;
  
  fs.writeFileSync(examplePath, exampleContent);
  console.log(`✅ Beispiel-Story erstellt: ${examplePath}`);
}

console.log(`✅ Setup abgeschlossen!`);
console.log(`�� Stories befinden sich in: ${storiesDir}`);
console.log(`📝 Erstelle weitere Markdown-Dateien im Stories-Ordner.`);
console.log(`🔍 Format: Front Matter + Kapitel mit # markiert`);

// Story-Loader aktualisieren
const loaderPath = path.join(__dirname, '../src/utils/storyLoader.js');
const loaderContent = `// Story-Loader für Markdown-Dateien
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function loadStories() {
  try {
    const storiesDir = path.join(import.meta.url, '../../stories');
    
    if (!fs.existsSync(storiesDir)) {
      console.warn('⚠️ Stories-Ordner existiert nicht:', storiesDir);
      return [];
    }
    
    const files = fs.readdirSync(storiesDir)
      .filter(file => file.endsWith('.md'));
    
    return files.map(file => {
      const filePath = path.join(storiesDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      
      // Kapitel extrahieren
      const chapters = [];
      const chapterRegex = /# (.*?)(?=\n# |$)/gs;
      let match;
      let id = 1;
      
      while ((match = chapterRegex.exec(content)) !== null) {
        const title = match[1].trim();
        const emojiMatch = title.match(/(\p{Emoji})/u);
        const emoji = emojiMatch ? emojiMatch[1] : '📚';
        
        chapters.push({
          id: id++,
          title: title.replace(emoji, '').trim(),
          emoji: emoji,
          content: [match[0].replace(/# .*?\n/, '').trim()],
          arc: data.arc
        });
      }
      
      return {
        id: file.replace('.md', ''),
        title: data.title || 'Unbenannte Story',
        description: data.description || '',
        author: data.author || 'Unbekannt',
        genre: data.genre || [],
        mature: !!data.mature,
        coverEmoji: data.coverEmoji || '📚',
        gradient: data.gradient || 'from-gray-400 to-gray-600',
        chapters: chapters,
        tags: data.tags || []
      };
    });
  } catch (error) {
    console.error('❌ Fehler beim Laden der Stories:', error);
    return [];
  }
}
`;

fs.writeFileSync(loaderPath, loaderContent);
console.log(`✅ Story-Loader aktualisiert: ${loaderPath}`);
