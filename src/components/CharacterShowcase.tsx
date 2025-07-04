import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import type { Character } from '../data/characters'
import ModernIcon, { getCharacterIconType } from '../components/ModernIcon'
import { Heart, Sparkles, Quote, Coffee, Music } from 'lucide-react'

interface CharacterShowcaseProps {
  character: Character
  onClose: () => void
}

export default function CharacterShowcase({ character, onClose }: CharacterShowcaseProps) {
  const [activeTab, setActiveTab] = useState<'essence' | 'personality' | 'secrets'>('essence')

  const tabs = [
    { id: 'essence', label: 'Essenz', icon: Sparkles },
    { id: 'personality', label: 'Persönlichkeit', icon: Heart },
    { id: 'secrets', label: 'Geheimnisse', icon: Quote }
  ] as const

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Pattern */}
        <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${character.gradient}`} />
        
        {/* Header */}
        <div className="relative p-8 pb-0">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-start gap-6">
            <ModernIcon 
              type={getCharacterIconType(character)} 
              size="xl"
              className="flex-shrink-0"
            />
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">{character.name}</h2>
              <p className="text-xl text-gray-300">{character.role}</p>
              <p className="text-sm text-gray-400 mt-2">{character.age} Jahre • {character.story}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 px-8 mt-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="p-8 pt-6 max-h-[60vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'essence' && (
              <motion.div
                key="essence"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Main Description */}
                <div>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {character.story}
                  </p>
                </div>

                {/* Quick Facts Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="text-2xl mb-2">💭</div>
                    <h4 className="text-sm text-gray-400 mb-1">Traum</h4>
                    <p className="text-sm text-white">{character.dreams[0]}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="text-2xl mb-2">😨</div>
                    <h4 className="text-sm text-gray-400 mb-1">Angst</h4>
                    <p className="text-sm text-white">{character.fears[0]}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="text-2xl mb-2">⚡</div>
                    <h4 className="text-sm text-gray-400 mb-1">Stärke</h4>
                    <p className="text-sm text-white">{character.skills[0]}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="text-2xl mb-2">💔</div>
                    <h4 className="text-sm text-gray-400 mb-1">Schwäche</h4>
                    <p className="text-sm text-white">{character.weaknesses[0]}</p>
                  </div>
                </div>

                {/* Key Quote */}
                {character.quotes.length > 0 && (
                  <blockquote className="relative p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border-l-4 border-purple-500">
                    <Quote className="absolute top-4 right-4 w-8 h-8 text-purple-500/20" />
                    <p className="text-lg text-white italic mb-2">"{character.quotes[0]}"</p>
                    <footer className="text-sm text-gray-400">- {character.name}</footer>
                  </blockquote>
                )}
              </motion.div>
            )}

            {activeTab === 'personality' && (
              <motion.div
                key="personality"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Interests Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Heart className="w-5 h-5 text-pink-400" />
                      <h3 className="text-lg font-semibold text-white">Was ich liebe</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {character.loves.map((love, i) => (
                        <span key={i} className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm">
                          {love}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Coffee className="w-5 h-5 text-orange-400" />
                      <h3 className="text-lg font-semibold text-white">Hobbies</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {character.hobbies.map((hobby, i) => (
                        <span key={i} className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">
                          {hobby}
                        </span>
                      ))}
                    </div>
                  </div>

                  {character.musicTaste && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Music className="w-5 h-5 text-purple-400" />
                        <h3 className="text-lg font-semibold text-white">Musikgeschmack</h3>
                      </div>
                      <p className="text-gray-300">{character.musicTaste}</p>
                    </div>
                  )}

                  {character.quirks && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                        <h3 className="text-lg font-semibold text-white">Eigenarten</h3>
                      </div>
                      <ul className="space-y-2">
                        {character.quirks.map((quirk, i) => (
                          <li key={i} className="text-gray-300 flex items-start gap-2">
                            <span className="text-yellow-400 mt-1">•</span>
                            <span>{quirk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Inner Conflict */}
                {character.innerConflict && (
                  <div className="p-6 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl">
                    <h3 className="text-lg font-semibold text-white mb-3">Innerer Konflikt</h3>
                    <p className="text-gray-300">{character.innerConflict}</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'secrets' && (
              <motion.div
                key="secrets"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Motivation */}
                <div className="p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl">
                  <h3 className="text-lg font-semibold text-white mb-3">Was mich antreibt</h3>
                  <ul className="space-y-2">
                    {(Array.isArray(character.motivations) ? character.motivations : [character.motivations]).map((motivation: string, i: number) => (
                      <li key={i} className="text-gray-300 flex items-start gap-2">
                        <span className="text-purple-400 mt-1">→</span>
                        <span>{motivation}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Secrets */}
                {character.secrets && character.secrets.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <span className="text-2xl">🤫</span>
                      Geheimnisse
                    </h3>
                    <div className="grid gap-3">
                      {character.secrets.map((secret, i) => (
                        <div key={i} className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                          <p className="text-gray-300">{secret}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Childhood Memory */}
                {character.childhood && (
                  <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl">
                    <h3 className="text-lg font-semibold text-white mb-3">Kindheitserinnerung</h3>
                    <p className="text-gray-300">{character.childhood}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}