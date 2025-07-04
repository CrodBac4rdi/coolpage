import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES Module Kompatibilität
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Importiere direkt aus der Datei
const manhwaStoryPath = path.join(__dirname, '../src/data/manhwaStory.ts');

console.log(`Versuche, storyChapters aus ${manhwaStoryPath} zu laden...`);

// Da wir ESM verwenden, müssen wir dynamisch importieren
const importStoryChapters = async () => {
  try {
    // Dynamischer Import
    const { storyChapters } = await import('../src/data/manhwaStory.js');
    
    if (!storyChapters || !Array.isArray(storyChapters)) {
      console.error('❌ storyChapters ist nicht vorhanden oder kein Array!');kein Array!');
      return;
    }sole.log(`\n📁 Ordnerstruktur:`);
    nsole.log(`- ${files.length} MD-Dateien direkt im stories-Ordner`);
    console.log(`✓ ${storyChapters.length} Kapitel erfolgreich geladen`);g(`✓ ${storyChapters.length} Kapitel erfolgreich geladen`);
    
    // Gruppiere Kapitel nach Arcs
  if (files.length > 0) {   const chaptersGroupedByArc = storyChapters.reduce((acc, chapter) => {
    console.log('\n📄 Markdown-Dateien:');      const arc = chapter.arc || 'Ungrouped';
    files.forEach(file => console.log(`  - ${file.name}`));
  }
  
  // Zeige Unterordner und deren Inhalte      acc[arc].push(chapter);
  if (directories.length > 0) {
    console.log('\n📂 Unterordner:');
    directories.forEach(dir => {
      const subDir = path.join(storiesDir, dir.name);    // Erstelle Stories-Ordner, falls er nicht existiert
      const subFiles = fs.readdirSync(subDir).filter(f => f.endsWith('.md'));name, '../stories');
      console.log(`  - ${dir.name} (${subFiles.length} MD-Dateien)`);
    });
  }
  
  // Prüfe Beispiel-Story (falls vorhanden)    
  const beispielPath = path.join(storiesDir, 'beispiel-story.md');nen Unterordner





























console.log('\n=== FERTIG ===');console.log('3. Prüfe, ob die Pfade im Story-Loader korrekt sind');console.log('2. Prüfe die erstellten Markdown-Dateien');console.log('1. Führe die Konvertierung aus: npm run convert-stories');console.log('\n=== NÄCHSTE SCHRITTE ===');}  });    console.log(`- ${file}: ${exists ? '✓ existiert' : '❌ fehlt'}`);    const exists = fs.existsSync(path.join(dataDir, file));  ['manhwaStories.ts', 'manhwaStory.ts'].forEach(file => {  // Prüfe speziell die wichtigen Dateien    console.log(`Dateien in src/data: ${dataFiles.join(', ')}`);  const dataFiles = fs.readdirSync(dataDir);if (fs.existsSync(dataDir)) {const dataDir = path.join(srcDir, 'data');const srcDir = path.join(__dirname, '../src');console.log('\n=== SOURCE FILES ===');// Prüfe Source Files}  console.log('❌ Stories-Ordner existiert nicht!');} else {  }    console.log('\n✓ beispiel-story.md gefunden');  if (fs.existsSync(beispielPath)) {    Object.entries(chaptersGroupedByArc).forEach(([arcName, chapters]) => {
      const arcDir = path.join(storiesDir, arcName.toLowerCase().replace(/\s+/g, '-'));
      if (!fs.existsSync(arcDir)) {
        fs.mkdirSync(arcDir);
        console.log(`✓ Arc-Ordner erstellt: ${arcDir}`);
      }
      
      // Erstelle für jedes Kapitel eine Markdown-Datei
      chapters.forEach(chapter => {
        const fileName = `${chapter.id.toString().padStart(2, '0')}-${chapter.title.toLowerCase().replace(/\s+/g, '-')}.md`;
        const filePath = path.join(arcDir, fileName);
        
        // Erstelle Markdown-Inhalt
        let markdown = `---
id: ${chapter.id}
title: "${chapter.title}"
emoji: "${chapter.emoji}"
arc: "${chapter.arc || 'Ungrouped'}"
---

# ${chapter.title} ${chapter.emoji}

${chapter.content.join('\n\n')}
`;
        
        // Schreibe Datei
        fs.writeFileSync(filePath, markdown);
        console.log(`✓ Kapitel ${chapter.id} nach ${filePath} geschrieben`);
      });
    });
    
    console.log('✓ Konvertierung abgeschlossen!');
  } catch (error) {
    console.error('❌ Fehler beim Importieren oder Konvertieren:', error);
  }



importStoryChapters();};};

importStoryChapters();