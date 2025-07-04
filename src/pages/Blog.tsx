import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Star, BookOpen, ArrowLeft, Users, Quote } from 'lucide-react'
import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { characters, getCharacterById } from '../data/characters'
import { loadStories } from '../utils/storyLoader'
import SEOHead from '../components/SEOHead'
import ModernIcon, { getCharacterIconType } from '../components/ModernIcon'

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
                <ModernIcon 
                  type={getCharacterIconType(selectedCharacter)} 
                  size="xl"
                  className="mb-4"
                />
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

            {/* Bento Box Character Deep Dive */}
            <div className="p-8 space-y-8">
              {/* Hero Bento Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Profile Card */}
                <div className="lg:col-span-2 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/10">
                  <div className="flex items-center gap-3 mb-6">
                    <Star className="w-6 h-6 text-yellow-400" />
                    <h2 className="text-2xl font-bold text-white">Persönlichkeit</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {selectedCharacter.personality.map((trait, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 bg-white/20 rounded-xl text-center"
                      >
                        <span className="text-white font-medium">{trait}</span>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedCharacter.background}
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4">Auf einen Blick</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🎭</span>
                      <span className="text-gray-300 text-sm">{selectedCharacter.mood}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">👤</span>
                      <span className="text-gray-300 text-sm">{selectedCharacter.age} Jahre</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📖</span>
                      <span className="text-gray-300 text-sm">{selectedCharacter.story}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deep Dive Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Hobbies & Interests */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl p-6 border border-pink-500/20"
                >
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎨</span>
                    Hobbies
                  </h3>
                  <div className="space-y-2">
                    {selectedCharacter.hobbies.map((hobby, index) => (
                      <div key={index} className="p-2 bg-white/10 rounded-lg">
                        <span className="text-gray-300 text-sm">{hobby}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Loves & Passions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-2xl p-6 border border-red-500/20"
                >
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-400" />
                    Liebt
                  </h3>
                  <div className="space-y-2">
                    {selectedCharacter.loves.map((love, index) => (
                      <div key={index} className="p-2 bg-white/10 rounded-lg">
                        <span className="text-gray-300 text-sm">{love}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Dreams & Goals */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-6 border border-cyan-500/20"
                >
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">✨</span>
                    Träume
                  </h3>
                  <div className="space-y-2">
                    {selectedCharacter.dreams.map((dream, index) => (
                      <div key={index} className="p-2 bg-white/10 rounded-lg">
                        <span className="text-gray-300 text-sm">{dream}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Fears & Vulnerabilities */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-gray-500/20 to-slate-500/20 rounded-2xl p-6 border border-gray-500/20"
                >
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">😰</span>
                    Ängste
                  </h3>
                  <div className="space-y-2">
                    {selectedCharacter.fears.map((fear, index) => (
                      <div key={index} className="p-2 bg-white/10 rounded-lg">
                        <span className="text-gray-300 text-sm">{fear}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Skills & Talents */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/20"
                >
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">🏆</span>
                    Skills
                  </h3>
                  <div className="space-y-2">
                    {selectedCharacter.skills.map((skill, index) => (
                      <div key={index} className="p-2 bg-white/10 rounded-lg">
                        <span className="text-gray-300 text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Quirks & Habits */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-2xl p-6 border border-orange-500/20"
                >
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">🤪</span>
                    Macken
                  </h3>
                  <div className="space-y-2">
                    {selectedCharacter.quirks.map((quirk, index) => (
                      <div key={index} className="p-2 bg-white/10 rounded-lg">
                        <span className="text-gray-300 text-sm">{quirk}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Personal Story Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Childhood & Background */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl p-8 border border-indigo-500/20"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-indigo-400" />
                    Kindheit
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {selectedCharacter.childhood}
                  </p>
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Motivation</h4>
                    <p className="text-gray-300 text-sm">{selectedCharacter.motivations}</p>
                  </div>
                </motion.div>

                {/* Inner Conflict */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-purple-500/20"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">⚡</span>
                    Innerer Konflikt
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedCharacter.innerConflict}
                  </p>
                </motion.div>
              </div>

              {/* Secrets Section */}
              {selectedCharacter.secrets && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="bg-gradient-to-br from-black/40 to-gray-900/40 rounded-2xl p-8 border border-red-500/30"
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-2xl">🤫</span>
                    Geheimnisse
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCharacter.secrets.map((secret, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.1 + index * 0.1 }}
                        className="p-4 bg-red-500/20 rounded-lg border border-red-500/30"
                      >
                        <p className="text-gray-300 text-sm">{secret}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Relationships Network */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-2xl p-8 border border-rose-500/20"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Users className="w-6 h-6 text-rose-400" />
                  Beziehungen
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCharacter.relationships.map((relationship, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3 + index * 0.1 }}
                      className="p-4 bg-white/10 rounded-lg border border-white/20"
                    >
                      <p className="text-gray-300 text-sm">{relationship}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Iconic Quotes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl p-8 border border-teal-500/20"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Quote className="w-6 h-6 text-teal-400" />
                  Unvergessliche Zitate
                </h3>
                <div className="space-y-4">
                  {selectedCharacter.quotes.map((quote, index) => (
                    <motion.blockquote
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.5 + index * 0.1 }}
                      className="p-6 bg-gradient-to-r from-white/15 to-white/5 rounded-lg border-l-4 border-teal-400"
                    >
                      <p className="text-gray-200 italic text-lg mb-2">"{quote}"</p>
                      <footer className="text-gray-400 text-sm">
                        - {selectedCharacter.name}
                      </footer>
                    </motion.blockquote>
                  ))}
                </div>
              </motion.div>

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
          className="flex flex-wrap justify-center gap-2 xs:gap-3 mb-8 xs:mb-12 px-4"
        >
          <button
            onClick={() => setFilter('all')}
            className={`px-4 xs:px-6 py-2 rounded-full transition-all text-sm xs:text-base ${
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
              className={`px-4 xs:px-6 py-2 rounded-full transition-all text-sm xs:text-base ${
                filter === story.id
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {story.title}
            </button>
          ))}
        </motion.div>

        {/* Bento Grid Character Gallery */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredCharacters.map((character, index) => (
              <motion.div
                key={character.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ delay: index * 0.05, type: "spring", damping: 25 }}
                className="group cursor-pointer"
                onClick={() => setSearchParams({ character: character.id })}
              >
                <div className={`bg-gradient-to-br ${character.gradient} backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:border-white/30 hover:shadow-2xl hover:shadow-${character.iconColor}-500/20 h-full min-h-[320px] flex flex-col`}>
                  {/* Character Avatar & Identity */}
                  <div className="text-center mb-4 flex-shrink-0">
                    <ModernIcon 
                      type={getCharacterIconType(character)} 
                      size="lg"
                      className="mb-3"
                    />
                    <h3 className="text-xl font-bold text-white mb-1 leading-tight">
                      {character.name}
                    </h3>
                    <p className="text-sm text-gray-300 opacity-90">{character.role}</p>
                  </div>

                  {/* Story & Mood Badge */}
                  <div className="mb-4 flex-shrink-0">
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs text-white font-medium">
                        {character.story}
                      </span>
                      <span className={`inline-block px-3 py-1 bg-${character.iconColor}-500/20 rounded-full text-xs text-${character.iconColor}-300 font-medium`}>
                        {character.mood}
                      </span>
                    </div>
                  </div>

                  {/* Personality Preview */}
                  <div className="mb-4 flex-grow">
                    <div className="grid grid-cols-1 gap-2">
                      {character.personality.slice(0, 2).map((trait, traitIndex) => (
                        <div
                          key={traitIndex}
                          className="p-2 bg-white/10 rounded-lg text-center backdrop-blur-sm"
                        >
                          <span className="text-xs text-gray-300 font-medium">{trait}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Personality Glimpse */}
                  <div className="mb-4 flex-shrink-0">
                    <div className="p-3 bg-black/20 rounded-lg">
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                        <span>✨</span>
                        <span>Liebt</span>
                      </div>
                      <p className="text-xs text-gray-300 truncate">
                        {character.loves[0]}
                      </p>
                    </div>
                  </div>

                  {/* Deep Dive Button */}
                  <motion.div 
                    className="mt-auto flex-shrink-0"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-full bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white py-3 px-4 rounded-xl text-center text-sm font-semibold transition-all group-hover:shadow-lg border border-white/20 group-hover:border-white/40">
                      Deep Dive 🔍
                    </div>
                  </motion.div>
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