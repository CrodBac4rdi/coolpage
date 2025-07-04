import { motion, AnimatePresence } from 'framer-motion'
import { Users, Network, Sparkles, Search } from 'lucide-react'
import { useState, useMemo } from 'react'
import { characters } from '../data/characters'
import { loadStories } from '../utils/storyLoader'
import SEOHead from '../components/SEOHead'
import ModernIcon, { getCharacterIconType } from '../components/ModernIcon'
import CharacterRelationshipMap from '../components/CharacterRelationshipMap'
import CharacterShowcase from '../components/CharacterShowcase'
import { characterRelationships } from '../data/relationships'

export default function Blog() {
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStory, setSelectedStory] = useState<string>('all')
  const stories = loadStories()

  const filteredCharacters = useMemo(() => {
    let filtered = characters
    
    // Filter by story
    if (selectedStory !== 'all') {
      filtered = filtered.filter(char => char.storyId === selectedStory)
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(char => 
        char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        char.role.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    return filtered
  }, [searchTerm, selectedStory])

  const filteredRelationships = useMemo(() => {
    if (selectedStory === 'all') return characterRelationships
    
    // Get character IDs from selected story
    const storyCharacterIds = characters
      .filter(char => char.storyId === selectedStory)
      .map(char => char.id)
    
    // Filter relationships to only include those between characters in the selected story
    return characterRelationships.filter(rel => 
      storyCharacterIds.includes(rel.from) && storyCharacterIds.includes(rel.to)
    )
  }, [selectedStory])

  return (
    <>
      <SEOHead 
        title="Character Universe"
        description="Entdecke die faszinierenden Charaktere und ihre Verbindungen"
        keywords={['Charaktere', 'Beziehungen', 'Story Universe']}
      />
      
      <div className="min-h-screen pt-20 pb-20 relative">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Clean Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Character Universe
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {viewMode === 'grid' 
                ? 'Klicke auf einen Charakter für Details'
                : 'Erkunde die Verbindungen zwischen den Charakteren'
              }
            </p>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Story Filter */}
              <select
                value={selectedStory}
                onChange={(e) => setSelectedStory(e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/20 transition-all"
              >
                <option value="all">Alle Stories</option>
                {stories.map(story => (
                  <option key={story.id} value={story.id}>
                    {story.title}
                  </option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="flex gap-2 bg-white/5 rounded-full p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white/20 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Charaktere</span>
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    viewMode === 'map'
                      ? 'bg-white/20 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Network className="w-4 h-4" />
                  <span>Beziehungen</span>
                </button>
              </div>
            </div>

            {/* Search (only in grid view) */}
            {viewMode === 'grid' && (
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Charakter suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                />
              </div>
            )}
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {filteredCharacters.map((character, index) => (
                  <motion.div
                    key={character.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedCharacter(character)}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 p-6 transition-all duration-300 hover:border-white/30 hover:shadow-xl hover:scale-105 hover:bg-white/10">
                      {/* Glow Effect */}
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${character.gradient}`} />
                      
                      {/* Content */}
                      <div className="relative z-10 text-center">
                        <ModernIcon 
                          type={getCharacterIconType(character)} 
                          size="lg"
                          className="mb-4 mx-auto"
                        />
                        <h3 className="text-lg font-bold text-white mb-1">
                          {character.name}
                        </h3>
                        <p className="text-sm text-gray-400 mb-3">
                          {character.role}
                        </p>
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                          <span>{character.age} Jahre</span>
                          <span>•</span>
                          <span>{stories.find(s => s.id === character.story)?.title || character.story}</span>
                        </div>
                      </div>

                      {/* Hover Indicator */}
                      <motion.div
                        className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <Sparkles className="w-4 h-4 text-purple-400" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="map"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <CharacterRelationshipMap
                  characters={filteredCharacters}
                  relationships={filteredRelationships}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { label: 'Charaktere', value: filteredCharacters.length, icon: '👥' },
              { label: 'Stories', value: selectedStory === 'all' ? stories.length : 1, icon: '📚' },
              { label: 'Beziehungen', value: filteredRelationships.length, icon: '💞' },
              { label: 'Welten', value: selectedStory === 'all' ? '∞' : '1', icon: '🌟' }
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Character Detail Modal */}
      <AnimatePresence>
        {selectedCharacter && (
          <CharacterShowcase
            character={selectedCharacter}
            onClose={() => setSelectedCharacter(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}