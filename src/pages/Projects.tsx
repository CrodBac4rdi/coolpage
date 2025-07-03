import { motion } from 'framer-motion'
import { Heart, Sparkles, PenTool } from 'lucide-react'
import { Link } from 'react-router-dom'

const storyProjects = [
  {
    id: 1,
    title: 'Forbidden Romance Collection',
    description: '禁断の恋 • Intense workplace romances exploring power dynamics, forbidden attraction, and passionate love stories.',
    genres: ['CEO Romance', 'Workplace Drama', 'Mature'],
    stories: 1,
    chapters: 50,
    readers: 2340,
    link: '/manhwa/forbidden-desire',
    image: '🔥',
    status: 'Active',
    gradient: 'from-red-500/30 to-pink-500/30'
  },
  {
    id: 2,
    title: 'Midnight Mystery Hearts',
    description: '真夜中の恋 • Supernatural romance series blending mystery, magic, and love stories that transcend the ordinary.',
    genres: ['Supernatural', 'Mystery Romance', 'Fantasy'],
    stories: 1,
    chapters: 50,
    readers: 1876,
    link: '/manhwa/midnight-confessions',
    image: '🌙',
    status: 'Expanding',
    gradient: 'from-purple-500/30 to-indigo-500/30'
  },
  {
    id: 3,
    title: 'Summer Love Chronicles', 
    description: '夏の恋 • Heartwarming vacation romances that bloom under the sun and continue across continents.',
    genres: ['Summer Romance', 'Travel Love', 'Sweet'],
    stories: 1,
    chapters: 50,
    readers: 3210,
    link: '/manhwa/summer-temptation',
    image: '🌊',
    status: 'Growing',
    gradient: 'from-cyan-500/30 to-blue-500/30'
  },
  {
    id: 4,
    title: 'Dark Attraction Saga',
    description: '危険な恋 • Intense psychological romances exploring the thin line between love and obsession.',
    genres: ['Dark Romance', 'Psychological', 'Thriller'],
    stories: 1,
    chapters: 50,
    readers: 4520,
    link: '/manhwa/dangerous-attraction',
    image: '🖤',
    status: 'Developing',
    gradient: 'from-gray-600/30 to-black/30'
  },
  {
    id: 5,
    title: 'Interactive Love Stories',
    description: '選択の恋 • Choose-your-own-adventure style romances where readers influence story outcomes.',
    genres: ['Interactive', 'Multiple Endings', 'Reader Choice'],
    stories: 1,
    chapters: 25,
    readers: 1654,
    link: '/games',
    image: '🎮',
    status: 'Prototype',
    gradient: 'from-emerald-500/30 to-green-500/30'
  },
  {
    id: 6,
    title: 'Classic Romance Reimagined',
    description: '古典恋愛 • Modern retellings of timeless love stories set in contemporary settings.',
    genres: ['Modern Classic', 'Diverse', 'Contemporary'],
    stories: 0,
    chapters: 0,
    readers: 0,
    link: '#',
    image: '📚',
    status: 'Coming Soon',
    gradient: 'from-amber-500/30 to-orange-500/30'
  }
]

export default function Projects() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30 mb-6">
            <PenTool className="w-4 h-4 text-pink-400" />
            <span className="text-sm text-pink-300">作品集 Story Universe</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            My <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Story Universe</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Digital worlds where love stories come alive • デジタルな恋愛物語の世界 ✨
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {storyProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link 
                to={project.link}
                className={`block bg-gradient-to-br ${project.gradient} backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 ${project.status === 'Coming Soon' ? 'pointer-events-none opacity-60' : ''}`}
              >
                {/* Header with Emoji */}
                <div className="p-6 text-center">
                  <div className="text-6xl mb-4">{project.image}</div>
                  <div className="inline-flex px-3 py-1 rounded-full bg-white/20 border border-white/30 text-xs font-medium">
                    {project.status}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 bg-black/20 backdrop-blur-sm">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Genres */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {project.genres.map((genre, i) => (
                      <span
                        key={i}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs rounded-full bg-white/15 border border-white/25 text-gray-200"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-sm font-bold text-white">{project.stories}</div>
                      <div className="text-xs text-gray-400">Stories</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{project.chapters}</div>
                      <div className="text-xs text-gray-400">Chapters</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center justify-center gap-1">
                        <Heart className="w-3 h-3" />
                        {project.readers > 0 ? project.readers.toLocaleString() : '---'}
                      </div>
                      <div className="text-xs text-gray-400">Readers</div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Creation Process */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl border border-purple-500/20"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-yellow-400" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                From Code to Stories
              </span>
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Where my programming skills meet storytelling passion. Each story is crafted with the same attention to detail as clean code.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="text-3xl mb-2">💻</div>
                <h3 className="font-bold text-white mb-2">Technical Foundation</h3>
                <p className="text-sm text-gray-400">Built with modern web technologies for the best reading experience</p>
              </div>
              <div className="p-4">
                <div className="text-3xl mb-2">📝</div>
                <h3 className="font-bold text-white mb-2">Story Crafting</h3>
                <p className="text-sm text-gray-400">Each chapter carefully planned and written for maximum emotional impact</p>
              </div>
              <div className="p-4">
                <div className="text-3xl mb-2">💕</div>
                <h3 className="font-bold text-white mb-2">Reader Connection</h3>
                <p className="text-sm text-gray-400">Stories that resonate with the heart and create lasting memories</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}