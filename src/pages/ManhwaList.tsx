import { motion } from 'framer-motion'
import { Book, Heart, Star, Users, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import { loadStories } from '../utils/storyLoader'

export default function ManhwaList() {
  const manhwaStories = loadStories()
  
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30 mb-6">
            <Book className="w-4 h-4 text-pink-400" />
            <span className="text-sm text-pink-300">Manhwa Collection</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-red-400">
              Love Stories
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Entdecke leidenschaftliche Romanzen und herzerwärmende Geschichten
          </p>
        </motion.div>

        {/* Story Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {manhwaStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/reader/${story.id}`}>
                <div className={`bg-gradient-to-br ${story.gradient} backdrop-blur-sm border border-white/10 rounded-3xl p-6 transition-all duration-300 hover:scale-[1.02] hover:border-white/20 h-full`}>
                  {/* Story Cover */}
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">{story.coverEmoji}</div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {story.mature && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/20 border border-red-500/30">
                          <Shield className="w-3 h-3 text-red-400" />
                          <span className="text-xs text-red-300">18+</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/20 border border-blue-500/30">
                        <Book className="w-3 h-3 text-blue-400" />
                        <span className="text-xs text-blue-300">{story.chapters.length} Kapitel</span>
                      </div>
                    </div>
                  </div>

                  {/* Story Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{story.title}</h3>
                      <p className="text-gray-300 text-sm line-clamp-3">{story.description}</p>
                    </div>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2">
                      {story.genre.map((genre, genreIndex) => (
                        <span
                          key={genreIndex}
                          className="px-2 py-1 rounded-full bg-white/10 text-xs text-gray-300"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {story.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 rounded-full bg-purple-500/20 text-xs text-purple-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>by {story.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>4.8</span>
                      </div>
                    </div>
                  </div>

                  {/* Read Button */}
                  <div className="mt-6">
                    <div className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white py-3 px-4 rounded-xl font-semibold text-center transition-all group-hover:scale-105">
                      Jetzt lesen
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

        </div>

        {/* Coming Soon Teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl border border-purple-500/20"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <Star className="w-8 h-8 text-yellow-400" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                More Stories Coming Soon
              </span>
              <Star className="w-8 h-8 text-yellow-400" />
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              New romantic adventures, deeper character development, and expanded universes await...
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-400">
              <span>🌸 New Chapters Weekly</span>
              <span>💕 More Romance Genres</span>
              <span>✨ Interactive Elements</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}