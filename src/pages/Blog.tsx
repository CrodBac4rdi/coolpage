import { motion, AnimatePresence } from 'framer-motion'
import { User, Heart, Star, BookOpen, ArrowLeft, Users, Quote } from 'lucide-react'
import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { characters, getCharacterById } from '../data/characters'
import { loadStories } from '../utils/storyLoader'
import SEOHead from '../components/SEOHead'

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCharacterId = searchParams.get('character')
  const [filter, setFilter] = useState<string>('all')
  
  const selectedCharacter = selectedCharacterId ? getCharacterById(selectedCharacterId) : null
  const stories = loadStories()

  const filteredCharacters = useMemo(() => {
    return filter === 'all' 
      ? characters 
      : characters.filter(char => char.storyId === filter)
  }, [filter])

  if (selectedCharacter) {
    return (
      <>
        <SEOHead 
          title={`${selectedCharacter.name} - Character Profile`}
          description={`Erfahre alles über ${selectedCharacter.name} aus ${selectedCharacter.story}. ${selectedCharacter.background.slice(0, 100)}...`}
          keywords={['Charakter', selectedCharacter.name, selectedCharacter.story, ...selectedCharacter.personality]}
        />
        <div className="min-h-screen pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => setSearchParams({})}
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Zurück zu allen Charakteren
            </button>
          </motion.div>

          {/* Character Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gradient-to-br ${selectedCharacter.gradient} backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden`}
          >
            {/* Header */}
            <div className="relative p-8 pb-0">
              <div className="flex items-start gap-6">
                <div className="text-8xl">{selectedCharacter.emoji}</div>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {selectedCharacter.name}
                  </h1>
                  <p className="text-xl text-gray-300 mb-4">
                    {selectedCharacter.role}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>📖 {selectedCharacter.story}</span>
                    {selectedCharacter.age && <span>🎂 {selectedCharacter.age} Jahre</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="p-8 space-y-8">
              {/* Personality */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-400" />
                  Persönlichkeit
                </h2>
                <div className="flex flex-wrap gap-2">
                  {selectedCharacter.personality.map((trait, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/20 rounded-full text-sm text-white"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </section>

              {/* Background */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                  Hintergrund
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {selectedCharacter.background}
                </p>
              </section>

              {/* Appearance */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <User className="w-6 h-6 text-purple-400" />
                  Aussehen
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {selectedCharacter.appearance}
                </p>
              </section>

              {/* Secrets */}
              {selectedCharacter.secrets && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    🤫 Geheimnisse
                  </h2>
                  <div className="space-y-2">
                    {selectedCharacter.secrets.map((secret, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-black/30 rounded-lg border border-red-500/30"
                      >
                        <p className="text-gray-300">{secret}</p>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {/* Relationships */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-red-400" />
                  Beziehungen
                </h2>
                <div className="space-y-3">
                  {selectedCharacter.relationships.map((relationship, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 bg-white/10 rounded-lg"
                    >
                      <p className="text-gray-300">{relationship}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Quotes */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Quote className="w-6 h-6 text-green-400" />
                  Zitate
                </h2>
                <div className="space-y-4">
                  {selectedCharacter.quotes.map((quote, index) => (
                    <motion.blockquote
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gradient-to-r from-white/10 to-white/5 rounded-lg border-l-4 border-blue-400"
                    >
                      <p className="text-gray-200 italic text-lg">"{quote}"</p>
                      <footer className="text-gray-400 text-sm mt-2">
                        - {selectedCharacter.name}
                      </footer>
                    </motion.blockquote>
                  ))}
                </div>
              </section>

              {/* Read Story Button */}
              <section>
                <Link
                  to={`/reader/${selectedCharacter.storyId}`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105"
                >
                  <BookOpen className="w-5 h-5" />
                  {selectedCharacter.story} lesen
                </Link>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
      </>
    )
  }

  return (
    <>
      <SEOHead 
        title="Charakter Galerie"
        description="Entdecke die faszinierenden Charaktere unserer Geschichten und ihre Hintergrundgeschichten. Von Elena Santos bis Yuki Tanaka - 8+ detaillierte Profile."
        keywords={['Charaktere', 'Profile', 'Geschichten', 'Romance', 'Fantasy', 'Helden', 'Heldinnen']}
      />
      <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-6">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Character Profiles</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Charakter Galerie
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Entdecke die faszinierenden Charaktere unserer Geschichten und ihre Hintergrundgeschichten
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full transition-all ${
              filter === 'all'
                ? 'bg-purple-500 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Alle Charaktere
          </button>
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => setFilter(story.id)}
              className={`px-6 py-2 rounded-full transition-all ${
                filter === story.id
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {story.title}
            </button>
          ))}
        </motion.div>

        {/* Character Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredCharacters.map((character, index) => (
              <motion.div
                key={character.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => setSearchParams({ character: character.id })}
              >
                <div className={`bg-gradient-to-br ${character.gradient} backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:border-white/20 h-full`}>
                  {/* Character Avatar */}
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-3">{character.emoji}</div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {character.name}
                    </h3>
                    <p className="text-sm text-gray-300">{character.role}</p>
                  </div>

                  {/* Story Badge */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs text-white">
                      {character.story}
                    </span>
                  </div>

                  {/* Personality Traits */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {character.personality.slice(0, 3).map((trait, traitIndex) => (
                        <span
                          key={traitIndex}
                          className="px-2 py-1 bg-black/20 rounded-full text-xs text-gray-300"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Read More Button */}
                  <div className="mt-auto">
                    <div className="w-full bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg text-center text-sm font-medium transition-all group-hover:bg-white/20">
                      Profil anzeigen
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Featured Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl border border-purple-500/20"
        >
          <div className="text-center">
            <Quote className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <blockquote className="text-2xl text-white italic mb-4">
              "Die besten Charaktere sind die, die uns etwas über uns selbst lehren."
            </blockquote>
            <footer className="text-gray-400">
              - Der Geschichtenerzähler
            </footer>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  )
}