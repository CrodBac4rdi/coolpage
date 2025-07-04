import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { Character } from '../data/characters'

interface MoodEntry {
  id: string
  characterId: string
  mood: string
  color: string
  timestamp: number
  intensity: number
  quote?: string
}

interface CharacterMoodBoardProps {
  characters: Character[]
}

export default function CharacterMoodBoard({ characters }: CharacterMoodBoardProps) {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([])
  const [selectedMood, setSelectedMood] = useState<string>('all')
  const [isCreatingMood, setIsCreatingMood] = useState(false)
  const [newMoodData, setNewMoodData] = useState({
    characterId: '',
    mood: '',
    color: '#9333ea',
    intensity: 50,
    quote: ''
  })

  const moodTypes = [
    { name: 'Fröhlich', color: '#fbbf24', icon: '😊', gradient: 'from-yellow-400 to-orange-400' },
    { name: 'Melancholisch', color: '#60a5fa', icon: '😔', gradient: 'from-blue-400 to-indigo-400' },
    { name: 'Aufgeregt', color: '#f87171', icon: '🤩', gradient: 'from-red-400 to-pink-400' },
    { name: 'Nachdenklich', color: '#a78bfa', icon: '🤔', gradient: 'from-purple-400 to-violet-400' },
    { name: 'Verliebt', color: '#f472b6', icon: '😍', gradient: 'from-pink-400 to-rose-400' },
    { name: 'Wütend', color: '#ef4444', icon: '😠', gradient: 'from-red-500 to-orange-500' },
    { name: 'Friedlich', color: '#34d399', icon: '😌', gradient: 'from-emerald-400 to-green-400' },
    { name: 'Mysteriös', color: '#818cf8', icon: '🌙', gradient: 'from-indigo-400 to-purple-500' }
  ]

  // Load saved moods
  useEffect(() => {
    const saved = localStorage.getItem('character-moods')
    if (saved) {
      setMoodEntries(JSON.parse(saved))
    } else {
      // Generate some demo moods
      generateDemoMoods()
    }
  }, [characters])

  const generateDemoMoods = () => {
    const demoMoods: MoodEntry[] = []
    
    characters.slice(0, 6).forEach((char, index) => {
      const moodType = moodTypes[index % moodTypes.length]
      demoMoods.push({
        id: `demo-${char.id}-${index}`,
        characterId: char.id,
        mood: moodType.name,
        color: moodType.color,
        timestamp: Date.now() - Math.random() * 86400000 * 7, // Last week
        intensity: Math.floor(Math.random() * 40) + 30,
        quote: getRandomQuote(char.name, moodType.name)
      })
    })

    setMoodEntries(demoMoods)
    localStorage.setItem('character-moods', JSON.stringify(demoMoods))
  }

  const getRandomQuote = (charName: string, mood: string) => {
    const quotes = {
      'Fröhlich': [
        `${charName}: "Heute ist ein wunderschöner Tag!"`,
        `${charName}: "Ich könnte die ganze Welt umarmen!"`,
        `${charName}: "Das Leben ist voller Überraschungen!"`
      ],
      'Melancholisch': [
        `${charName}: "Manchmal fühle ich mich so allein..."`,
        `${charName}: "Die Vergangenheit holt mich ein."`,
        `${charName}: "Wenn nur alles anders wäre..."`
      ],
      'Aufgeregt': [
        `${charName}: "Ich kann es kaum erwarten!"`,
        `${charName}: "Das wird das beste Abenteuer aller Zeiten!"`,
        `${charName}: "Endlich passiert etwas Spannendes!"`
      ],
      'Verliebt': [
        `${charName}: "Mein Herz schlägt so schnell..."`,
        `${charName}: "Diese Gefühle sind überwältigend."`,
        `${charName}: "Ich denke nur noch an sie/ihn..."`
      ]
    }
    
    const moodQuotes = quotes[mood as keyof typeof quotes] || [`${charName}: "..."`]
    return moodQuotes[Math.floor(Math.random() * moodQuotes.length)]
  }

  const addMoodEntry = () => {
    if (!newMoodData.characterId || !newMoodData.mood) return

    const moodType = moodTypes.find(m => m.name === newMoodData.mood)
    const character = characters.find(c => c.id === newMoodData.characterId)
    
    const newEntry: MoodEntry = {
      id: `mood-${Date.now()}`,
      characterId: newMoodData.characterId,
      mood: newMoodData.mood,
      color: moodType?.color || newMoodData.color,
      timestamp: Date.now(),
      intensity: newMoodData.intensity,
      quote: newMoodData.quote || getRandomQuote(character?.name || 'Character', newMoodData.mood)
    }

    const updated = [...moodEntries, newEntry]
    setMoodEntries(updated)
    localStorage.setItem('character-moods', JSON.stringify(updated))
    
    // Reset form
    setNewMoodData({
      characterId: '',
      mood: '',
      color: '#9333ea',
      intensity: 50,
      quote: ''
    })
    setIsCreatingMood(false)
  }

  const filteredMoods = selectedMood === 'all' 
    ? moodEntries 
    : moodEntries.filter(mood => mood.mood === selectedMood)

  const getMoodIcon = (mood: string) => {
    const moodType = moodTypes.find(m => m.name === mood)
    return moodType?.icon || '😐'
  }

  const getMoodGradient = (mood: string) => {
    const moodType = moodTypes.find(m => m.name === mood)
    return moodType?.gradient || 'from-gray-400 to-gray-600'
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Character Mood Board</h2>
            <p className="text-gray-400">Emotionale Reise der Charaktere</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsCreatingMood(!isCreatingMood)}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium hover:shadow-lg transition-all"
        >
          <Sparkles className="w-4 h-4 inline mr-2" />
          Neue Stimmung
        </button>
      </div>

      {/* Mood Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedMood('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedMood === 'all'
              ? 'bg-white text-black'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Alle Stimmungen
        </button>
        {moodTypes.map(mood => (
          <button
            key={mood.name}
            onClick={() => setSelectedMood(mood.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              selectedMood === mood.name
                ? `bg-gradient-to-r ${mood.gradient} text-white`
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <span>{mood.icon}</span>
            {mood.name}
          </button>
        ))}
      </div>

      {/* Create New Mood Modal */}
      <AnimatePresence>
        {isCreatingMood && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-black/80 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <h3 className="text-lg font-bold text-white mb-4">Neue Charakterstimmung</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Charakter</label>
                <select
                  value={newMoodData.characterId}
                  onChange={(e) => setNewMoodData({...newMoodData, characterId: e.target.value})}
                  className="w-full p-2 bg-white/10 rounded-lg text-white"
                >
                  <option value="">Charakter wählen...</option>
                  {characters.map(char => (
                    <option key={char.id} value={char.id} className="text-black">
                      {char.icon} {char.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Stimmung</label>
                <select
                  value={newMoodData.mood}
                  onChange={(e) => setNewMoodData({...newMoodData, mood: e.target.value})}
                  className="w-full p-2 bg-white/10 rounded-lg text-white"
                >
                  <option value="">Stimmung wählen...</option>
                  {moodTypes.map(mood => (
                    <option key={mood.name} value={mood.name} className="text-black">
                      {mood.icon} {mood.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Intensität ({newMoodData.intensity}%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newMoodData.intensity}
                  onChange={(e) => setNewMoodData({...newMoodData, intensity: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Zitat (optional)</label>
                <input
                  type="text"
                  value={newMoodData.quote}
                  onChange={(e) => setNewMoodData({...newMoodData, quote: e.target.value})}
                  placeholder="Charakterzitat..."
                  className="w-full p-2 bg-white/10 rounded-lg text-white placeholder-gray-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={addMoodEntry}
                className="px-4 py-2 bg-green-500 rounded-lg text-white font-medium hover:bg-green-600 transition-all"
              >
                Hinzufügen
              </button>
              <button
                onClick={() => setIsCreatingMood(false)}
                className="px-4 py-2 bg-gray-600 rounded-lg text-white font-medium hover:bg-gray-700 transition-all"
              >
                Abbrechen
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mood Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredMoods.map((entry, index) => {
            const character = characters.find(c => c.id === entry.characterId)
            if (!character) return null

            return (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${getMoodGradient(entry.mood)} p-6 group hover:scale-105 transition-all duration-300`}
              >
                {/* Floating Particles */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${10 + i * 20}%`
                      }}
                      animate={{
                        y: [-10, 10, -10],
                        opacity: [0.3, 0.8, 0.3]
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                {/* Character Icon */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{character.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{character.name}</h3>
                    <p className="text-sm text-white/80">{entry.mood}</p>
                  </div>
                  <div className="ml-auto text-3xl">{getMoodIcon(entry.mood)}</div>
                </div>

                {/* Intensity Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-white/80 mb-1">
                    <span>Intensität</span>
                    <span>{entry.intensity}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <motion.div
                      className="bg-white rounded-full h-2"
                      initial={{ width: 0 }}
                      animate={{ width: `${entry.intensity}%` }}
                      transition={{ delay: 0.5, duration: 1 }}
                    />
                  </div>
                </div>

                {/* Quote */}
                {entry.quote && (
                  <div className="bg-white/10 rounded-lg p-3 mb-4">
                    <p className="text-sm text-white italic">"{entry.quote}"</p>
                  </div>
                )}

                {/* Timestamp */}
                <div className="text-xs text-white/60">
                  {new Date(entry.timestamp).toLocaleDateString('de-DE')}
                </div>

                {/* Mood Icons Background */}
                <div className="absolute -right-6 -bottom-6 text-8xl opacity-10 group-hover:opacity-20 transition-opacity">
                  {getMoodIcon(entry.mood)}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredMoods.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🎭</div>
          <h3 className="text-xl font-bold text-white mb-2">Keine Stimmungen gefunden</h3>
          <p className="text-gray-400 mb-6">
            {selectedMood === 'all' 
              ? 'Erstelle die erste Charakterstimmung!'
              : `Keine Charaktere mit der Stimmung "${selectedMood}" gefunden.`
            }
          </p>
          <button
            onClick={() => setIsCreatingMood(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium hover:shadow-lg transition-all"
          >
            Erste Stimmung erstellen
          </button>
        </motion.div>
      )}

      {/* Mood Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {moodTypes.slice(0, 4).map(mood => {
          const count = moodEntries.filter(entry => entry.mood === mood.name).length
          return (
            <div key={mood.name} className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-2xl mb-2">{mood.icon}</div>
              <div className="text-xl font-bold text-white">{count}</div>
              <div className="text-xs text-gray-400">{mood.name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}