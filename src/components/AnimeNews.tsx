import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Newspaper, ExternalLink, TrendingUp, Clock } from 'lucide-react'

interface NewsItem {
  title: string
  url: string
  source: string
  publishedAt: string
  description?: string
}

export default function AnimeNews() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Using a mock API response since we need to handle CORS
    // In production, you'd want to use a proper anime news API
    const fetchNews = async () => {
      try {
        // Simulating API call with mock data
        const mockNews: NewsItem[] = [
          {
            title: "Neuer Isekai-Anime angekündigt für Frühling 2025",
            url: "#",
            source: "AnimeNews",
            publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            description: "Ein weiterer spannender Isekai-Titel kommt..."
          },
          {
            title: "Top 10 Romance Manhwa des Monats",
            url: "#",
            source: "ManhwaHub",
            publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            description: "Die beliebtesten Romance-Geschichten..."
          },
          {
            title: "Light Novel Verkaufszahlen erreichen Rekordhoch",
            url: "#",
            source: "NovelStats",
            publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
            description: "Der Markt für Light Novels wächst weiter..."
          }
        ]
        
        setNews(mockNews)
        setLoading(false)
      } catch (err) {
        setError('Fehler beim Laden der News')
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60))
    if (hours < 1) return 'Gerade eben'
    if (hours < 24) return `vor ${hours}h`
    return `vor ${Math.floor(hours / 24)}d`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-900/90 to-black/95 border border-white/20 rounded-3xl p-6 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Newspaper className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Anime & Manga News</h3>
        </div>
        <TrendingUp className="w-5 h-5 text-green-400" />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
              <div className="h-3 bg-white/5 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-red-400 text-sm">{error}</p>
      ) : (
        <div className="space-y-4">
          {news.map((item, index) => (
            <motion.a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 5 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="text-white font-medium group-hover:text-purple-400 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-gray-400 text-sm mt-1 line-clamp-1">{item.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span>{item.source}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatTime(item.publishedAt)}</span>
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors flex-shrink-0 mt-1" />
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </motion.div>
  )
}