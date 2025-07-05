import { motion } from 'framer-motion'
import { Settings, Heart, Palette, Type } from 'lucide-react'
import { useState } from 'react'
import { useFavorites } from '../hooks/useFavorites'
import { useTheme } from '../hooks/useTheme'
import { useLocalStorage } from '../hooks/useLocalStorage'
import ThemeToggle from './ThemeToggle'

export default function UserPreferences() {
  const [showPreferences, setShowPreferences] = useState(false)
  const { favorites } = useFavorites()
  const { theme } = useTheme()
  const [readingPrefs, setReadingPrefs] = useLocalStorage('crod-babylon-reading', {
    fontSize: 18,
    fontFamily: 'Inter'
  })

  return (
    <>
      {/* Preferences Button */}
      <motion.button
        onClick={() => setShowPreferences(true)}
        className="fixed top-4 right-4 z-40 w-12 h-12 bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Settings className="w-5 h-5" />
      </motion.button>

      {/* Preferences Modal */}
      {showPreferences && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPreferences(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-96 z-50 bg-black/90 backdrop-blur-md border border-white/20 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Settings className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Einstellungen</h2>
            </div>

            {/* Theme Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-medium text-white">Design</h3>
              </div>
              <ThemeToggle />
            </div>

            {/* Reading Settings */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Type className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-medium text-white">Lesen</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-white/60 mb-1">Schriftgröße</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="14"
                      max="28"
                      step="2"
                      value={readingPrefs.fontSize}
                      onChange={(e) => setReadingPrefs(prev => ({ ...prev, fontSize: Number(e.target.value) }))}
                      className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-white text-sm w-8">{readingPrefs.fontSize}px</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Schriftart</label>
                  <select
                    value={readingPrefs.fontFamily}
                    onChange={(e) => setReadingPrefs(prev => ({ ...prev, fontFamily: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
                  >
                    <option value="Inter" className="bg-gray-800">Inter</option>
                    <option value="Georgia" className="bg-gray-800">Georgia</option>
                    <option value="Crimson Pro" className="bg-gray-800">Crimson Pro</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Favorites */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-4 h-4 text-red-400" />
                <h3 className="text-sm font-medium text-white">Favoriten</h3>
                <span className="text-xs text-white/40">({favorites.length})</span>
              </div>
              {favorites.length > 0 ? (
                <div className="text-xs text-white/60">
                  {favorites.join(', ')}
                </div>
              ) : (
                <div className="text-xs text-white/40 italic">
                  Noch keine Favoriten ausgewählt
                </div>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowPreferences(false)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium py-3 px-4 rounded-xl transition-colors"
            >
              Schließen
            </button>
          </motion.div>
        </>
      )}
    </>
  )
}