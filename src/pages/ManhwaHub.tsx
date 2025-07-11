import { motion } from 'framer-motion'
import { Book, Star, Heart, Zap, Crown, Users, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { cn } from '../utils/cn'

const manhwas = [
  {
    id: 'solo-leveling',
    title: 'Solo Leveling',
    subtitle: 'Ich allein Level-Up',
    description: 'Sung Jin-Woo, der schwächste Jäger der Welt, erhält die Kraft, allein zu leveln.',
    rating: 4.9,
    status: 'Completed',
    chapters: 179,
    genre: ['Action', 'Fantasy', 'Supernatural'],
    image: '🗡️',
    color: 'from-red-500 to-orange-500',
    bgColor: 'from-red-900/20 to-orange-900/20'
  },
  {
    id: 'tower-of-god',
    title: 'Tower of God',
    subtitle: 'Kami no Tou',
    description: 'Bam steigt den mysteriösen Turm hinauf, um seine Freundin Rachel zu finden.',
    rating: 4.8,
    status: 'Ongoing',
    chapters: 500,
    genre: ['Adventure', 'Drama', 'Supernatural'],
    image: '🗼',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-900/20 to-cyan-900/20'
  },
  {
    id: 'the-beginning-after-the-end',
    title: 'The Beginning After The End',
    subtitle: 'TBATE',
    description: 'Ein König wird als Baby in eine Welt der Magie wiedergeboren.',
    rating: 4.7,
    status: 'Ongoing',
    chapters: 150,
    genre: ['Fantasy', 'Adventure', 'Reincarnation'],
    image: '👑',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-900/20 to-pink-900/20'
  },
  {
    id: 'omniscient-reader',
    title: 'Omniscient Reader\'s Viewpoint',
    subtitle: 'ORV',
    description: 'Kim Dokja lebt in einer Welt, die zu seinem Lieblings-Webroman geworden ist.',
    rating: 4.8,
    status: 'Ongoing',
    chapters: 100,
    genre: ['Action', 'Fantasy', 'Psychological'],
    image: '📖',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-900/20 to-emerald-900/20'
  },
  {
    id: 'true-beauty',
    title: 'True Beauty',
    subtitle: 'Wahre Schönheit',
    description: 'Jugyeong versteckt ihr wahres Gesicht hinter Make-up.',
    rating: 4.6,
    status: 'Completed',
    chapters: 230,
    genre: ['Romance', 'Drama', 'School Life'],
    image: '💄',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'from-pink-900/20 to-rose-900/20'
  },
  {
    id: 'lookism',
    title: 'Lookism',
    subtitle: 'Schönheit liegt im Auge des Betrachters',
    description: 'Daniel Park erhält einen zweiten Körper und erlebt das Leben aus einer neuen Perspektive.',
    rating: 4.7,
    status: 'Ongoing',
    chapters: 450,
    genre: ['Drama', 'School Life', 'Supernatural'],
    image: '👥',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'from-yellow-900/20 to-orange-900/20'
  },
  {
    id: 'windbreaker',
    title: 'Wind Breaker',
    subtitle: 'Cycling Chronicles',
    description: 'Jo Ja-Hyun entdeckt seine Leidenschaft für das Radfahren.',
    rating: 4.5,
    status: 'Ongoing',
    chapters: 380,
    genre: ['Sports', 'Drama', 'School Life'],
    image: '🚴',
    color: 'from-cyan-500 to-blue-500',
    bgColor: 'from-cyan-900/20 to-blue-900/20'
  },
  {
    id: 'viral-hit',
    title: 'Viral Hit',
    subtitle: 'How to Fight',
    description: 'Ein schwacher Schüler lernt zu kämpfen durch YouTube-Videos.',
    rating: 4.4,
    status: 'Ongoing',
    chapters: 220,
    genre: ['Action', 'Comedy', 'School Life'],
    image: '🥊',
    color: 'from-red-500 to-pink-500',
    bgColor: 'from-red-900/20 to-pink-900/20'
  }
]

const categories = [
  { name: 'Action', icon: Zap, count: 4 },
  { name: 'Romance', icon: Heart, count: 2 },
  { name: 'Fantasy', icon: Crown, count: 3 },
  { name: 'Drama', icon: Users, count: 5 }
]

export default function Manhwas() {
  return (
    <>
      <SEOHead 
        title="Manhwas - Korean Webtoons"
        description="Entdecke die besten koreanischen Manhwas und Webtoons. Von Solo Leveling bis Tower of God."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900">
        {/* Header */}
        <div className="container mx-auto px-4 sm:px-6 pt-8 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <Link to="/" className="text-white hover:text-purple-300 transition-colors">
              <span className="text-xl font-black">← CROD BABYLON</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="text-white/60 text-sm">
                {manhwas.length} Manhwas
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-4 sm:px-6 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
              KOREAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">MANHWAS</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Entdecke die besten koreanischen Webtoons mit vertikalem Scroll-Format
            </p>
          </motion.div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{category.count}</span>
                </motion.div>
              )
            })}
          </div>

          {/* Manhwas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {manhwas.map((manhwa, index) => (
              <motion.div
                key={manhwa.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                {/* Glow Effect */}
                <div className={cn('absolute -inset-0.5 bg-gradient-to-r rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500', manhwa.color)} />
                
                {/* Card */}
                <div className={cn('relative h-full bg-gradient-to-br from-gray-900/90 to-black/95 border border-white/20 rounded-2xl p-6 overflow-hidden backdrop-blur-sm', manhwa.bgColor)}>
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={cn('px-3 py-1 rounded-full text-xs font-medium',
                      manhwa.status === 'Completed' 
                        ? 'bg-green-500/20 border border-green-400/30 text-green-300'
                        : 'bg-blue-500/20 border border-blue-400/30 text-blue-300'
                    )}>
                      {manhwa.status}
                    </div>
                  </div>

                  {/* Manhwa Image/Icon */}
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-2">{manhwa.image}</div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-bold text-white text-lg mb-1">{manhwa.title}</h3>
                      <p className="text-gray-400 text-sm">{manhwa.subtitle}</p>
                    </div>

                    <p className="text-gray-300 text-sm line-clamp-3">{manhwa.description}</p>

                    {/* Rating & Chapters */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-white font-medium">{manhwa.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{manhwa.chapters} Kapitel</span>
                      </div>
                    </div>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-1">
                      {manhwa.genre.map((genre, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-white/80"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <button
                      className={cn('w-full bg-gradient-to-r text-white px-4 py-3 rounded-xl font-semibold hover:scale-105 transition-transform', manhwa.color)}
                    >
                      Jetzt lesen
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Coming Soon Section */}
        <motion.section
          className="container mx-auto px-4 sm:px-6 py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Mehr Manhwas kommen bald!</h2>
            <p className="text-gray-300 mb-8">
              Wir erweitern ständig unsere Sammlung. Schau bald wieder vorbei!
            </p>
            <Link
              to="/content"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform"
            >
              <span>Zurück zum Content Hub</span>
            </Link>
          </div>
        </motion.section>
      </div>
    </>
  )
}