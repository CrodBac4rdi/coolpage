import { motion } from 'framer-motion'
import { Star, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { loadStories } from '../utils/storyLoader'
import SEOHead from '../components/SEOHead'
import { useMemo } from 'react'

export default function ManhwaList() {
  const manhwaStories = loadStories()
  
  const storyMoods = useMemo(() => ({
    'forbidden-desire': {
      atmosphere: 'Dunkle Eleganz',
      tagline: 'Verbotene Leidenschaft zwischen Macht und Verlangen',
      mood: '🔥 Intense • 💼 Business • 🖤 Forbidden',
      textColor: 'text-emerald-100',
      accentColor: 'emerald',
      backgroundPattern: 'bg-gradient-to-br from-emerald-900/40 via-teal-800/30 to-slate-900/40'
    },
    'moonlight-academy': {
      atmosphere: 'Mystische Magie',
      tagline: 'Mondlicht enthüllt verborgene Kräfte und erste Liebe',
      mood: '🌙 Mystisch • ✨ Magie • 💙 Erwachen',
      textColor: 'text-blue-100',
      accentColor: 'blue',
      backgroundPattern: 'bg-gradient-to-br from-blue-900/40 via-purple-800/30 to-indigo-900/40'
    },
    'code-breakers': {
      atmosphere: 'Cyber Romance',
      tagline: 'Wenn Hacking auf Herzen trifft',
      mood: '💻 Cyber • 💙 Tech • 🔮 Future',
      textColor: 'text-cyan-100',
      accentColor: 'cyan',
      backgroundPattern: 'bg-gradient-to-br from-cyan-900/40 via-blue-800/30 to-slate-900/40'
    },
    'dream-catcher': {
      atmosphere: 'Träume & Realität',
      tagline: 'Zwischen Träumen wandeln, zwischen Welten lieben',
      mood: '🌙 Träume • 💜 Mystik • ✨ Übernatürlich',
      textColor: 'text-purple-100',
      accentColor: 'purple',
      backgroundPattern: 'bg-gradient-to-br from-purple-900/40 via-violet-800/30 to-indigo-900/40'
    },
    'the-transfer-student': {
      atmosphere: 'Schulgeheimnisse',
      tagline: 'Neue Schule, dunkle Geheimnisse, unerwartete Verbindungen',
      mood: '📚 School • 🔍 Mystery • 💙 Drama',
      textColor: 'text-blue-100',
      accentColor: 'blue',
      backgroundPattern: 'bg-gradient-to-br from-blue-900/40 via-slate-800/30 to-gray-900/40'
    },
    'my-boss-is-a-cat': {
      atmosphere: 'Süße Romcom',
      tagline: 'Wenn dein Chef ein flauschiges Geheimnis hat',
      mood: '🐱 Süß • 😄 Comedy • 💕 Romance',
      textColor: 'text-orange-100',
      accentColor: 'orange',
      backgroundPattern: 'bg-gradient-to-br from-orange-900/40 via-pink-800/30 to-rose-900/40'
    },
    'shadow-in-the-mirror': {
      atmosphere: 'Dunkle Geheimnisse',
      tagline: 'Spiegelbilder lügen nicht... oder doch?',
      mood: '🪞 Mystery • 👻 Supernatural • 🖤 Dark',
      textColor: 'text-gray-100',
      accentColor: 'gray',
      backgroundPattern: 'bg-gradient-to-br from-gray-900/40 via-slate-800/30 to-black/40'
    }
  }), [])
  
  return (
    <>
      <SEOHead 
        title="Digital Love Stories"
        description="Entdecke leidenschaftliche Romanzen, mystische Abenteuer und herzerwärmende Geschichten. Von Forbidden Desire bis Moonlight Academy - 12+ einzigartige Welten voller Emotionen."
        keywords={['Love Stories', 'Romance', 'Fantasy', 'Digital Fiction', 'Manhwa', 'Interactive Stories']}
      />
      
      <div className="min-h-screen pt-20 pb-20 relative overflow-hidden">
        {/* Atmospheric Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Magical Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pink-500/20 border border-pink-500/30 mb-8 backdrop-blur-sm"
            >
              <Sparkles className="w-5 h-5 text-pink-400" />
              <span className="text-sm font-medium text-pink-300">Digital Storytelling Universe</span>
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-200 to-cyan-200">
                Love Stories
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              Tauche ein in Welten voller <span className="text-pink-400">Leidenschaft</span>, 
              <span className="text-purple-400"> Magie</span> und <span className="text-cyan-400">unvergesslicher Momente</span>
            </p>
          </motion.div>

          {/* Beautiful Story Cards - Book Cover Style */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {manhwaStories.map((story, index) => {
              const mood = storyMoods[story.id] || storyMoods['forbidden-desire']
              
              return (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.15, type: "spring", damping: 25, stiffness: 120 }}
                  className="group relative"
                >
                  <Link to={`/reader/${story.id}`} className="block">
                    {/* Book Cover Card */}
                    <div className={`relative h-[480px] rounded-3xl overflow-hidden border border-white/20 transition-all duration-700 hover:scale-[1.03] hover:rotate-1 hover:border-white/40 group-hover:shadow-2xl group-hover:shadow-${mood.accentColor}-500/20`}>
                      
                      {/* Background with Mood */}
                      <div className={`absolute inset-0 ${mood.backgroundPattern}`} />
                      
                      {/* Atmospheric Pattern Overlay */}
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl transform translate-x-20 -translate-y-20" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl transform -translate-x-16 translate-y-16" />
                      </div>

                      {/* Story Cover Content */}
                      <div className="relative z-10 h-full flex flex-col p-8">
                        
                        {/* Top Section - Title & Atmosphere */}
                        <div className="flex-1 flex flex-col justify-center text-center">
                          {/* Magical Emoji */}
                          <motion.div 
                            className="text-7xl mb-6"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {story.coverEmoji}
                          </motion.div>
                          
                          {/* Title */}
                          <h3 className={`text-2xl lg:text-3xl font-bold mb-3 ${mood.textColor} leading-tight`}>
                            {story.title}
                          </h3>
                          
                          {/* Atmosphere Badge */}
                          <div className={`inline-flex items-center px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-4`}>
                            <span className={`text-sm font-medium ${mood.textColor}`}>
                              {mood.atmosphere}
                            </span>
                          </div>
                          
                          {/* Emotional Tagline */}
                          <p className={`text-base lg:text-lg ${mood.textColor} leading-relaxed font-medium mb-6 opacity-90`}>
                            {mood.tagline}
                          </p>
                        </div>

                        {/* Bottom Section - Mood & CTA */}
                        <div className="space-y-4">
                          {/* Mood Indicators */}
                          <div className="text-center">
                            <p className={`text-sm ${mood.textColor} opacity-80 font-medium`}>
                              {mood.mood}
                            </p>
                          </div>
                          
                          {/* Beautiful Read Button */}
                          <motion.div
                            className={`w-full bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm border border-white/30 text-white py-4 px-6 rounded-2xl font-semibold text-center transition-all hover:from-white/30 hover:to-white/20 hover:border-white/50 flex items-center justify-center gap-3`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span>Geschichte entdecken</span>
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                          </motion.div>
                        </div>

                        {/* Hover Glow Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r from-${mood.accentColor}-500/0 via-${mood.accentColor}-500/0 to-${mood.accentColor}-500/0 group-hover:from-${mood.accentColor}-500/10 group-hover:via-${mood.accentColor}-500/5 group-hover:to-${mood.accentColor}-500/10 rounded-3xl transition-all duration-700`} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Magical Footer Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-20 lg:mt-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-4">
                Unendliche Welten warten
              </h2>
              <p className="text-gray-400 text-lg">Jede Geschichte ein neues Abenteuer des Herzens</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { emoji: '💕', title: 'Emotionale Tiefe', desc: 'Geschichten, die dein Herz berühren' },
                { emoji: '✨', title: 'Magische Welten', desc: 'Von Realität bis Fantasy' },
                { emoji: '🌟', title: 'Unvergesslich', desc: 'Charaktere, die bei dir bleiben' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="text-4xl mb-3">{item.emoji}</div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-16 text-center"
          >
            <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-pink-500/20 via-purple-500/10 to-cyan-500/20 backdrop-blur-xl rounded-3xl border border-white/20">
              <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Bereit für dein nächstes Lieblingsabenteuer?
              </h2>
              <p className="text-gray-300 mb-6">
                Wähle eine Geschichte und lass dich von emotionalen Welten verzaubern
              </p>
              <Link to="/blog">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl font-bold text-lg shadow-2xl shadow-pink-500/25"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(236, 72, 153, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Charaktere kennenlernen ✨
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}