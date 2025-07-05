import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Play, Star, Calendar, X } from 'lucide-react'

// Platform logos as SVG components
const NetflixLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M5.398 0v18.845c0 .72-.198 1.128-.595 1.224-.137.033-.362.049-.675.049-1.045 0-2.09-.083-3.137-.247v4.873c1.464.28 2.584.454 3.359.523.775.068 1.551.103 2.329.103 1.213 0 2.123-.284 2.731-.853.607-.568.911-1.456.911-2.665V0h-4.923zm13.204 0v21.853c0 .72-.198 1.128-.595 1.224-.138.033-.363.049-.676.049-1.045 0-2.09-.083-3.136-.247V24h4.922V0h-4.922z"/>
  </svg>
)

const CrunchyrollLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.75c-5.384 0-9.75-4.366-9.75-9.75S6.616 2.25 12 2.25s9.75 4.366 9.75 9.75-4.366 9.75-9.75 9.75zm0-17.5c-4.273 0-7.75 3.477-7.75 7.75s3.477 7.75 7.75 7.75 7.75-3.477 7.75-7.75S16.273 4.25 12 4.25z"/>
  </svg>
)

const PrimeLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
  </svg>
)

// Type definitions
type Platform = 'netflix' | 'crunchyroll' | 'prime'

interface Anime {
  id: string
  title: string
  description: string
  platforms: Platform[]
  releaseYear: number
  episodes: number
  rating: number
  image: string
  genres: string[]
  season?: string
}

// Sample data for popular romance anime in Germany
const animeData: Anime[] = [
  {
    id: '1',
    title: 'Horimiya: The Missing Pieces',
    description: 'Die beliebte Romance-Serie kehrt mit neuen Episoden zurück, die bisher unerzählte Momente aus dem Schulleben von Hori und Miyamura zeigen.',
    platforms: ['crunchyroll'],
    releaseYear: 2023,
    episodes: 13,
    rating: 4.8,
    image: '🌸',
    genres: ['Romance', 'Slice of Life', 'School'],
    season: 'Sommer 2023'
  },
  {
    id: '2',
    title: 'Kaguya-sama: Love is War',
    description: 'Zwei geniale Schülersprecher liefern sich einen psychologischen Krieg, um den anderen dazu zu bringen, seine Liebe zu gestehen.',
    platforms: ['netflix', 'crunchyroll'],
    releaseYear: 2022,
    episodes: 36,
    rating: 4.9,
    image: '💝',
    genres: ['Romance', 'Comedy', 'Psychological']
  },
  {
    id: '3',
    title: 'My Happy Marriage',
    description: 'Eine junge Frau ohne übernatürliche Kräfte wird mit einem gefürchteten Militärkommandanten verheiratet und entdeckt wahre Liebe.',
    platforms: ['netflix'],
    releaseYear: 2023,
    episodes: 12,
    rating: 4.7,
    image: '🎎',
    genres: ['Romance', 'Historical', 'Supernatural'],
    season: 'Sommer 2023'
  },
  {
    id: '4',
    title: 'Fruits Basket: The Final',
    description: 'Der emotionale Abschluss der beliebten Serie über Tohru und die verwunschene Sohma-Familie.',
    platforms: ['crunchyroll', 'prime'],
    releaseYear: 2021,
    episodes: 63,
    rating: 4.9,
    image: '🍓',
    genres: ['Romance', 'Drama', 'Supernatural']
  },
  {
    id: '5',
    title: 'Toradora!',
    description: 'Zwei ungleiche Schüler verbünden sich, um ihren jeweiligen Schwarm zu erobern, verlieben sich aber ineinander.',
    platforms: ['netflix', 'crunchyroll'],
    releaseYear: 2008,
    episodes: 25,
    rating: 4.8,
    image: '🐯',
    genres: ['Romance', 'Comedy', 'School']
  },
  {
    id: '6',
    title: 'Your Lie in April',
    description: 'Ein traumatisierter Pianist findet durch ein lebhaftes Geigenmädchen zurück zur Musik und Liebe.',
    platforms: ['netflix', 'prime'],
    releaseYear: 2014,
    episodes: 22,
    rating: 4.9,
    image: '🎹',
    genres: ['Romance', 'Drama', 'Music']
  },
  {
    id: '7',
    title: 'The Ice Guy and His Cool Female Colleague',
    description: 'Ein Nachkomme einer Schneefamilie verliebt sich in seine ruhige Kollegin im Büro.',
    platforms: ['crunchyroll'],
    releaseYear: 2023,
    episodes: 12,
    rating: 4.5,
    image: '❄️',
    genres: ['Romance', 'Comedy', 'Supernatural'],
    season: 'Winter 2023'
  },
  {
    id: '8',
    title: 'My Love Story!!',
    description: 'Ein sanftmütiger Riese erlebt seine erste Liebe mit Hilfe seines gut aussehenden besten Freundes.',
    platforms: ['crunchyroll', 'prime'],
    releaseYear: 2015,
    episodes: 24,
    rating: 4.7,
    image: '💪',
    genres: ['Romance', 'Comedy', 'School']
  },
  {
    id: '9',
    title: 'Wotakoi: Love is Hard for Otaku',
    description: 'Zwei erwachsene Otakus navigieren ihre Beziehung zwischen Arbeit und ihren Nerd-Hobbys.',
    platforms: ['prime'],
    releaseYear: 2018,
    episodes: 11,
    rating: 4.6,
    image: '🎮',
    genres: ['Romance', 'Comedy', 'Office']
  },
  {
    id: '10',
    title: 'The Dangers in My Heart',
    description: 'Ein Außenseiter träumt davon, seine beliebte Klassenkameradin zu "zerstören", verliebt sich aber stattdessen.',
    platforms: ['crunchyroll'],
    releaseYear: 2023,
    episodes: 12,
    rating: 4.7,
    image: '💔',
    genres: ['Romance', 'Comedy', 'School'],
    season: 'Frühling 2023'
  }
]

export default function RomanceAnimeGuide() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all')
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null)

  // Filter anime based on search and platform
  const filteredAnime = useMemo(() => {
    return animeData.filter(anime => {
      const matchesSearch = 
        anime.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        anime.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        anime.genres.some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesPlatform = 
        selectedPlatform === 'all' || 
        anime.platforms.includes(selectedPlatform as Platform)
      
      return matchesSearch && matchesPlatform
    })
  }, [searchTerm, selectedPlatform])

  const getPlatformColor = (platform: Platform) => {
    switch (platform) {
      case 'netflix': return 'text-red-500'
      case 'crunchyroll': return 'text-orange-500'
      case 'prime': return 'text-blue-500'
    }
  }

  const getPlatformBgColor = (platform: Platform) => {
    switch (platform) {
      case 'netflix': return 'bg-red-500/10 border-red-500/30'
      case 'crunchyroll': return 'bg-orange-500/10 border-orange-500/30'
      case 'prime': return 'bg-blue-500/10 border-blue-500/30'
    }
  }

  const PlatformIcon = ({ platform }: { platform: Platform }) => {
    switch (platform) {
      case 'netflix': return <NetflixLogo />
      case 'crunchyroll': return <CrunchyrollLogo />
      case 'prime': return <PrimeLogo />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Romance Anime Streaming Guide
          </h1>
          <p className="text-xl text-gray-300">
            Aktuelle Romance Anime auf Netflix, Crunchyroll und Prime Video in Deutschland
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Suche nach Titel, Beschreibung oder Genre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Platform Filter */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-gray-300">
              <Filter className="w-5 h-5" />
              <span>Platform:</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedPlatform('all')}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  selectedPlatform === 'all'
                    ? 'bg-purple-600 border-purple-600 text-white'
                    : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600'
                }`}
              >
                Alle Plattformen
              </button>
              <button
                onClick={() => setSelectedPlatform('netflix')}
                className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                  selectedPlatform === 'netflix'
                    ? 'bg-red-500/20 border-red-500 text-red-400'
                    : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600'
                }`}
              >
                <NetflixLogo />
                Netflix
              </button>
              <button
                onClick={() => setSelectedPlatform('crunchyroll')}
                className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                  selectedPlatform === 'crunchyroll'
                    ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                    : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600'
                }`}
              >
                <CrunchyrollLogo />
                Crunchyroll
              </button>
              <button
                onClick={() => setSelectedPlatform('prime')}
                className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                  selectedPlatform === 'prime'
                    ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                    : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600'
                }`}
              >
                <PrimeLogo />
                Prime Video
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mb-6"
        >
          {filteredAnime.length} Anime gefunden
        </motion.p>

        {/* Anime Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnime.map((anime, index) => (
            <motion.div
              key={anime.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedAnime(anime)}
              className="group cursor-pointer"
            >
              <div className="relative h-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                {/* Emoji Icon */}
                <div className="absolute top-4 right-4 text-4xl opacity-20 group-hover:opacity-40 transition-opacity">
                  {anime.image}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-white pr-12 group-hover:text-purple-400 transition-colors">
                    {anime.title}
                  </h3>

                  {/* Genres */}
                  <div className="flex flex-wrap gap-2">
                    {anime.genres.map((genre, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs text-purple-300"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm line-clamp-3">
                    {anime.description}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{anime.releaseYear}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Play className="w-4 h-4" />
                      <span>{anime.episodes} Folgen</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>{anime.rating}</span>
                    </div>
                  </div>

                  {/* Platform Badges */}
                  <div className="flex gap-2 pt-2">
                    {anime.platforms.map((platform, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${getPlatformBgColor(platform)}`}
                      >
                        <div className={getPlatformColor(platform)}>
                          <PlatformIcon platform={platform} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAnime.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-xl">
              Keine Anime gefunden. Versuche einen anderen Suchbegriff oder Filter.
            </p>
          </motion.div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedAnime && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedAnime(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedAnime(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            {/* Modal Content */}
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center">
                <div className="text-6xl mb-4">{selectedAnime.image}</div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {selectedAnime.title}
                </h2>
                {selectedAnime.season && (
                  <p className="text-purple-400">{selectedAnime.season}</p>
                )}
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 justify-center">
                {selectedAnime.genres.map((genre, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm text-purple-300"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-gray-300 text-lg leading-relaxed">
                {selectedAnime.description}
              </p>

              {/* Info Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <Calendar className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Jahr</p>
                  <p className="text-xl font-bold text-white">{selectedAnime.releaseYear}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <Play className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Folgen</p>
                  <p className="text-xl font-bold text-white">{selectedAnime.episodes}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <Star className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Bewertung</p>
                  <p className="text-xl font-bold text-white">{selectedAnime.rating}/5</p>
                </div>
              </div>

              {/* Available On */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Verfügbar auf:</h3>
                <div className="flex gap-3">
                  {selectedAnime.platforms.map((platform, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${getPlatformBgColor(platform)}`}
                    >
                      <div className={getPlatformColor(platform)}>
                        <PlatformIcon platform={platform} />
                      </div>
                      <span className="text-white font-medium capitalize">
                        {platform === 'prime' ? 'Prime Video' : platform}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Watch Button */}
              <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02]">
                Jetzt ansehen
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}