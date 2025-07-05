import { motion } from 'framer-motion'
import { 
  Eye, 
  Volume2, 
  Smartphone, 
  Palette, 
  BarChart3, 
  Maximize,
  Heart,
  BookOpen,
  Zap,
  Star
} from 'lucide-react'

const features = [
  {
    icon: Eye,
    title: '3D Story Previews',
    description: 'Interaktive Vorschau mit 3D-Flip-Animationen',
    color: 'text-purple-400',
    bgColor: 'bg-purple-900/20',
    status: 'Implementiert'
  },
  {
    icon: Volume2,
    title: 'Voice Reading',
    description: 'Web Speech API mit anpassbarer Stimme',
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/20',
    status: 'Implementiert'
  },
  {
    icon: Smartphone,
    title: 'Touch Gestures',
    description: 'Swipe, Pinch, Double-tap & Long-press',
    color: 'text-green-400',
    bgColor: 'bg-green-900/20',
    status: 'Implementiert'
  },
  {
    icon: Palette,
    title: 'Dynamic Theming',
    description: 'Story-basierte Atmosphäre mit Partikeln',
    color: 'text-pink-400',
    bgColor: 'bg-pink-900/20',
    status: 'Implementiert'
  },
  {
    icon: BarChart3,
    title: 'Reading Analytics',
    description: 'Intelligente Statistiken & Achievements',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-900/20',
    status: 'Implementiert'
  },
  {
    icon: Maximize,
    title: 'Immersive Mode',
    description: 'Vollbild mit Ambient Sounds',
    color: 'text-red-400',
    bgColor: 'bg-red-900/20',
    status: 'Implementiert'
  },
  {
    icon: Heart,
    title: 'Favorites System',
    description: 'Lokale Favoriten mit Persistenz',
    color: 'text-rose-400',
    bgColor: 'bg-rose-900/20',
    status: 'Implementiert'
  },
  {
    icon: BookOpen,
    title: 'Enhanced Stories',
    description: '12 Geschichten mit 50+ Paragraphen',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-900/20',
    status: 'Implementiert'
  }
]

export default function FeatureSummary() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            🎯 Crod Babylon 2025
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Die fortschrittlichste Romance Reading Experience
          </p>
          <div className="flex items-center justify-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-400 font-medium">Alle Features implementiert!</span>
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-2xl border border-white/10 ${feature.bgColor} backdrop-blur-sm`}
            >
              <div className="flex items-center gap-3 mb-4">
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
                <h3 className="font-bold text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">{feature.description}</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs text-green-400 font-medium">{feature.status}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <Zap className="w-6 h-6 text-yellow-400" />
            Modern Web Features 2025
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="font-bold text-purple-400 mb-2">Client-Side Only</h3>
              <p className="text-gray-300 text-sm">Alles mit localStorage, GitHub Pages kompatibel</p>
            </div>
            <div>
              <h3 className="font-bold text-blue-400 mb-2">Performance</h3>
              <p className="text-gray-300 text-sm">Optimierte Animationen, lazy loading</p>
            </div>
            <div>
              <h3 className="font-bold text-green-400 mb-2">Mobile First</h3>
              <p className="text-gray-300 text-sm">Touch-optimiert, responsive Design</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-sm mb-4">
              Entwickelt im Juli 2025 mit modernsten Web-Standards
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <span>React 19.1.0</span>
              <span>•</span>
              <span>TypeScript</span>
              <span>•</span>
              <span>Framer Motion</span>
              <span>•</span>
              <span>Tailwind CSS</span>
              <span>•</span>
              <span>Web APIs</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}