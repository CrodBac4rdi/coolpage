import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module Kompatibilität
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Versuche, Stories-Ordner zu finden
const storiesDir = path.join(__dirname, '../stories');

console.log('=== STORY DEBUG ===');

// Prüfe, ob der Stories-Ordner existiert
if (fs.existsSync(storiesDir)) {
  const files = fs.readdirSync(storiesDir).filter(file => file.endsWith('.md'));
  console.log(`${files.length} Markdown-Dateien im Stories-Ordner gefunden:`);
  files.forEach(file => console.log(`- ${file}`));
  
  // Beispielweise die erste Story einlesen
  if (files.length > 0) {
    const filePath = path.join(storiesDir, files[0]);
    const content = fs.readFileSync(filePath, 'utf-8');
    console.log('\nInhalt der ersten Story (Auszug):');
    console.log(content.substring(0, 200) + '...');
  }
} else {
  console.log('❌ Stories-Ordner nicht gefunden!');
}

// Versuche, manhwaStories.ts zu finden
const manhwaStoriesPath = path.join(__dirname, '../src/data/manhwaStories.ts');
const manhwaStoryPath = path.join(__dirname, '../src/data/manhwaStory.ts');

console.log('\n=== CODE FILES ===');
console.log(`manhwaStories.ts existiert: ${fs.existsSync(manhwaStoriesPath)}`);
console.log(`manhwaStory.ts existiert: ${fs.existsSync(manhwaStoryPath)}`);

console.log('\n=== EMPFEHLUNGEN ===');
console.log('1. Stelle sicher, dass der Stories-Ordner im Root-Verzeichnis existiert');
console.log('2. Prüfe, ob mindestens eine .md-Datei im Stories-Ordner liegt');
console.log('3. Prüfe, ob manhwaStories.ts korrekt von storyLoader.ts importiert wird');
console.log('4. Prüfe die Router-Konfiguration für Story-Links');

console.log('\n=== FERTIG ===');