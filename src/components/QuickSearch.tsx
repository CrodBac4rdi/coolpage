import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Sparkles, Book, Tv, Users, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '../utils/cn'
import { debounce } from '../utils/performance'

interface SearchResult {
  type: 'anime' | 'story' | 'manhwa' | 'page'
  title: string
  description?: string
  path: string
  icon: React.ComponentType<{ className?: string }>
}

export default function QuickSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  // Mock search function - in production, this would search your actual content
  const performSearch = debounce((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    const allResults: SearchResult[] = [
      // Pages
      { type: 'page', title: 'Anime Search', path: '/romance-search', icon: Tv },
      { type: 'page', title: 'My Watchlist', path: '/watchlist', icon: Book },
      { type: 'page', title: 'Content Hub', path: '/content', icon: Sparkles },
      { type: 'page', title: 'Stories', path: '/stories', icon: Book },
      { type: 'page', title: 'Manhwas', path: '/manhwas', icon: Users },
      
      // Quick actions
      { type: 'anime', title: 'Search for Romance Anime', path: '/romance-search?q=romance', icon: Tv },
      { type: 'anime', title: 'Popular Anime', path: '/romance-search', icon: Tv },
    ]

    const filtered = allResults.filter(result =>
      result.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    setResults(filtered.slice(0, 5))
  }, 300)

  // Keyboard shortcut to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSelect = (result: SearchResult) => {
    navigate(result.path)
    setIsOpen(false)
    setQuery('')
    setResults([])
  }

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <Search className="w-4 h-4" />
        <span className="text-sm text-gray-600 dark:text-gray-400">Quick Search</span>
        <kbd className="ml-2 px-2 py-0.5 text-xs bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">
          ⌘K
        </kbd>
      </button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Search Panel */}
            <motion.div
              className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value)
                      performSearch(e.target.value)
                    }}
                    placeholder="Search pages, anime, or stories..."
                    className="w-full pl-12 pr-12 py-4 text-lg bg-transparent focus:outline-none"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Results */}
                {results.length > 0 && (
                  <div className="border-t border-gray-200 dark:border-gray-700">
                    {results.map((result, index) => {
                      const Icon = result.icon
                      return (
                        <button
                          key={index}
                          onClick={() => handleSelect(result)}
                          className={cn(
                            "w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
                            "text-left group"
                          )}
                        >
                          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors">
                            <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 dark:text-white">
                              {result.title}
                            </div>
                            {result.description && (
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {result.description}
                              </div>
                            )}
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      )
                    })}
                  </div>
                )}

                {/* Empty State */}
                {query && results.length === 0 && (
                  <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    No results found for "{query}"
                  </div>
                )}

                {/* Footer */}
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">↑↓</kbd>
                      Navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">↵</kbd>
                      Select
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">esc</kbd>
                      Close
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}