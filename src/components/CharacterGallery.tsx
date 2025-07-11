import { motion } from 'framer-motion'
import { useState } from 'react'
import { Heart, Info, Sparkles, Users } from 'lucide-react'

interface Character {
  id: string
  name: string
  story: string
  role: string
  description: string
  traits: string[]
  avatar: string
  color: string
  popularity: number
}

export default function CharacterGallery() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])

  const characters: Character[] = [
    {
      id: 'alex-chen',
      name: 'Alex Chen',
      story: 'Code Breakers',
      role: 'Protagonist',
      description: 'Genialer Hacker mit geheimnisvoller Vergangenheit',
      traits: ['Intelligent', 'Mysteriös', 'Loyal'],
      avatar: '👨‍💻',
      color: 'from-green-500 to-emerald-500',
      popularity: 95
    },
    {
      id: 'luna-star',
      name: 'Luna Starweaver',
      story: 'Moonlight Academy',
      role: 'Hauptcharakter',
      description: 'Mächtige Magierin mit einem Herz aus Gold',
      traits: ['Mutig', 'Freundlich', 'Mächtig'],
      avatar: '🧙‍♀️',
      color: 'from-purple-500 to-pink-500',
      popularity: 98
    },
    {
      id: 'kai-storm',
      name: 'Kai Storm',
      story: 'Forbidden Desire',
      role: 'Love Interest',
      description: 'Charismatischer CEO mit dunklen Geheimnissen',
      traits: ['Dominant', 'Beschützend', 'Leidenschaftlich'],
      avatar: '👔',
      color: 'from-red-500 to-pink-500',
      popularity: 92
    },
    {
      id: 'mochi',
      name: 'Mr. Mochi',
      story: 'My Boss is a Cat',
      role: 'Protagonist',
      description: 'Verwandelter CEO in Katzenform',
      traits: ['Süß', 'Stur', 'Überraschend weise'],
      avatar: '🐱',
      color: 'from-orange-500 to-yellow-500',
      popularity: 100
    },
    {
      id: 'shadow',
      name: 'Shadow',
      story: 'Shadow in the Mirror',
      role: 'Antagonist',
      description: 'Mysteriöse Gestalt aus einer anderen Dimension',
      traits: ['Dunkel', 'Manipulativ', 'Faszinierend'],
      avatar: '🪞',
      color: 'from-gray-700 to-purple-900',
      popularity: 87
    },
    {
      id: 'yuki-tanaka',
      name: 'Yuki Tanaka',
      story: 'The Transfer Student',
      role: 'Protagonist',
      description: 'Neue Schülerin mit besonderer Gabe',
      traits: ['Schüchtern', 'Talentiert', 'Geheimnisvoll'],
      avatar: '👩‍🎓',
      color: 'from-blue-500 to-cyan-500',
      popularity: 90
    }
  ]

  const toggleFavorite = (characterId: string) => {
    setFavorites(prev => 
      prev.includes(characterId) 
        ? prev.filter(id => id !== characterId)
        : [...prev, characterId]
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-900/90 to-black/95 border border-white/20 rounded-3xl p-8 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Character Gallery</h3>
            <p className="text-gray-400 text-sm">Triff deine Lieblingscharaktere</p>
          </div>
        </div>
      </div>

      {/* Character Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {characters.map((character, index) => (
          <motion.div
            key={character.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedCharacter(character)}
            className="cursor-pointer group"
          >
            <div className="relative">
              {/* Character Avatar */}
              <motion.div
                className={`aspect-square bg-gradient-to-br ${character.color} rounded-2xl flex items-center justify-center text-5xl relative overflow-hidden`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                
                {/* Avatar */}
                <motion.div
                  animate={{ 
                    y: [0, -5, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  {character.avatar}
                </motion.div>

                {/* Favorite Button */}
                <motion.button
                  className="absolute top-2 right-2 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(character.id)
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart 
                    className={`w-4 h-4 transition-all ${favorites.includes(character.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                  />
                </motion.button>

                {/* Popularity Badge */}
                <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs text-white font-medium">{character.popularity}%</span>
                </div>
              </motion.div>

              {/* Character Name */}
              <p className="text-white text-sm font-medium text-center mt-2 truncate">
                {character.name}
              </p>
              <p className="text-gray-400 text-xs text-center truncate">
                {character.story}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Character Details Modal */}
      {selectedCharacter && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6"
        >
          <div className="flex items-start gap-6">
            <motion.div
              className={`w-24 h-24 bg-gradient-to-br ${selectedCharacter.color} rounded-2xl flex items-center justify-center text-5xl flex-shrink-0`}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {selectedCharacter.avatar}
            </motion.div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-2xl font-bold text-white">{selectedCharacter.name}</h4>
                  <p className="text-purple-400">{selectedCharacter.role} in {selectedCharacter.story}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedCharacter(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </motion.button>
              </div>

              <p className="text-gray-300 mb-4">{selectedCharacter.description}</p>

              {/* Traits */}
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCharacter.traits.map((trait, i) => (
                  <motion.span
                    key={trait}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-white"
                  >
                    {trait}
                  </motion.span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-gray-300">
                    {Math.floor(Math.random() * 50000 + 10000)} Fans
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-300">
                    {Math.floor(Math.random() * 20 + 5)} Kapitel Auftritte
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}