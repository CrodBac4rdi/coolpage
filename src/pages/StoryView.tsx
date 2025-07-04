// Vorhandene Imports beibehalten
import { useParams } from 'react-router-dom'
import { manhwaStories } from '../data/manhwaStories'

export default function StoryView() {
  const { storyId } = useParams()
  console.log("Story-ID aus URL:", storyId)
  console.log("Verfügbare Story-IDs:", manhwaStories.map(s => s.id))
  
  // Story finden (case-insensitive und flexibler)
  const story = manhwaStories.find(s => 
    s.id.toLowerCase() === (storyId?.toLowerCase() || '')
  )
  
  if (!story) {
    console.error(`Story mit ID "${storyId}" nicht gefunden!`)
    return <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Story nicht gefunden</h1>
      <p>Die Story mit ID "{storyId}" existiert nicht.</p>
      <p className="mt-4">
        <a href="/" className="text-blue-500 hover:underline">Zurück zur Startseite</a>
      </p>
    </div>
  }
  
  // Restlicher Code für Story-Anzeige
  // ...
}