import { motion, AnimatePresence } from 'framer-motion'
import { Settings, X, Type, Palette, Eye } from 'lucide-react'

interface ReaderSettingsProps {
  isOpen: boolean
  onClose: () => void
  settings: {
    fontSize: number
    focusMode: boolean
    ambientMode: boolean
    showCharacterMoods: boolean
    showVoiceVisualizer: boolean
    showReadingAnalytics: boolean
    showSocialTraces: boolean
    theme: 'auto' | 'light' | 'dark'
  }
  onSettingsChange: (settings: any) => void
}

export default function ReaderSettings({ 
  isOpen, 
  onClose, 
  settings, 
  onSettingsChange 
}: ReaderSettingsProps) {
  
  const updateSetting = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value }
    onSettingsChange(newSettings)
    localStorage.setItem('reader-settings', JSON.stringify(newSettings))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Settings Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-purple-500" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Lese-Einstellungen
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Settings Content */}
              <div className="p-6 space-y-6">
                
                {/* Font Size */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Type className="w-4 h-4 text-gray-500" />
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Schriftgröße
                    </label>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">A</span>
                    <input
                      type="range"
                      min="14"
                      max="24"
                      value={settings.fontSize}
                      onChange={(e) => updateSetting('fontSize', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-lg text-gray-500">A</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{settings.fontSize}px</p>
                </div>

                {/* Focus Mode */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-gray-500" />
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Fokus-Modus
                      </label>
                      <p className="text-xs text-gray-500">Hebt aktuellen Absatz hervor</p>
                    </div>
                  </div>
                  <button
                    onClick={() => updateSetting('focusMode', !settings.focusMode)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.focusMode 
                        ? 'bg-purple-500' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                      settings.focusMode ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                {/* Ambient Mode */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-gray-500" />
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Stimmungs-Hintergrund
                      </label>
                      <p className="text-xs text-gray-500">Passt Farben zur Story an</p>
                    </div>
                  </div>
                  <button
                    onClick={() => updateSetting('ambientMode', !settings.ambientMode)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.ambientMode 
                        ? 'bg-purple-500' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                      settings.ambientMode ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                {/* Current Features */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Verfügbare Features
                  </h3>
                  <div className="space-y-3">
                    
                    {/* Character Moods */}
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm text-gray-700 dark:text-gray-300">Charakter-Stimmungen</label>
                        <p className="text-xs text-gray-500">Zeigt Emotionen der Charaktere</p>
                      </div>
                      <button
                        onClick={() => updateSetting('showCharacterMoods', !settings.showCharacterMoods)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          settings.showCharacterMoods ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                          settings.showCharacterMoods ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>

                    {/* Voice Visualizer */}
                    <div className="flex items-center justify-between opacity-50">
                      <div>
                        <label className="text-sm text-gray-700 dark:text-gray-300">Stimmen-Visualizer</label>
                        <p className="text-xs text-gray-500">🚧 Geplant: Animierte Darstellung der Dialoge</p>
                      </div>
                      <button
                        disabled
                        className="relative w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
                      >
                        <div className="absolute w-5 h-5 bg-gray-400 rounded-full top-0.5 translate-x-0.5" />
                      </button>
                    </div>

                    {/* Reading Analytics */}
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm text-gray-700 dark:text-gray-300">Lese-Analytics</label>
                        <p className="text-xs text-gray-500">Statistiken über dein Leseverhalten</p>
                      </div>
                      <button
                        onClick={() => updateSetting('showReadingAnalytics', !settings.showReadingAnalytics)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          settings.showReadingAnalytics ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                          settings.showReadingAnalytics ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>

                    {/* Social Features */}
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm text-gray-700 dark:text-gray-300">Community Features</label>
                        <p className="text-xs text-gray-500">Reaktionen anderer Leser</p>
                      </div>
                      <button
                        onClick={() => updateSetting('showSocialTraces', !settings.showSocialTraces)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          settings.showSocialTraces ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                          settings.showSocialTraces ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Future Features */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    🚧 Coming Soon (Maybe)
                  </h3>
                  <div className="space-y-3 opacity-60">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm text-gray-700 dark:text-gray-300">Audio Soundtrack</label>
                        <p className="text-xs text-gray-500">Dynamische Musik passend zur Story</p>
                      </div>
                      <div className="text-xs text-purple-500 bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">
                        Planned
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm text-gray-700 dark:text-gray-300">AR Story Cards</label>
                        <p className="text-xs text-gray-500">3D Charakter-Darstellung via WebXR</p>
                      </div>
                      <div className="text-xs text-blue-500 bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                        Research
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm text-gray-700 dark:text-gray-300">Voice Reading</label>
                        <p className="text-xs text-gray-500">Text-to-Speech mit Charakter-Stimmen</p>
                      </div>
                      <div className="text-xs text-orange-500 bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded">
                        Maybe
                      </div>
                    </div>
                  </div>
                </div>

                {/* Theme Selection */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-3">
                    Design
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'light', label: 'Hell' },
                      { value: 'dark', label: 'Dunkel' },
                      { value: 'auto', label: 'Auto' }
                    ].map((theme) => (
                      <button
                        key={theme.value}
                        onClick={() => updateSetting('theme', theme.value)}
                        className={`p-3 text-sm rounded-lg border transition-all ${
                          settings.theme === theme.value
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                            : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        {theme.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={onClose}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Fertig
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}