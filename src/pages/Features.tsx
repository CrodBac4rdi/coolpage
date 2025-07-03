import { motion } from 'framer-motion'
import { BookOpen, Moon, Heart, Sparkles, Bookmark, Eye, Clock, Palette } from 'lucide-react'

const readerFeatures = [
  {
    icon: <Moon className="w-8 h-8" />,
    title: "Dark Mode Reading",
    description: "夜読み Perfect for late-night romance sessions",
    features: [
      "Gentle on the eyes",
      "Customizable darkness levels", 
      "Auto-adjust based on time",
      "Midnight reader optimized"
    ],
    emoji: "🌙",
    japanese: "ダークモード"
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Reading Themes",
    description: "テーマ Multiple aesthetic modes for every mood",
    features: [
      "Cherry blossom theme",
      "Anime gradient backgrounds",
      "Romance pink palettes",
      "Custom color schemes"
    ],
    emoji: "🎨",
    japanese: "読書テーマ"
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Chapter Navigation",
    description: "章移動 Seamless story progression",
    features: [
      "One-click chapter jumping",
      "Reading progress tracking",
      "Auto-bookmark last position",
      "Quick story overview"
    ],
    emoji: "📖",
    japanese: "章ナビ"
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Romance Features",
    description: "恋愛機能 Enhanced emotional experience",
    features: [
      "Favorite chapter marking",
      "Emotional reaction buttons",
      "Romance level indicators",
      "Character relationship charts"
    ],
    emoji: "💕",
    japanese: "恋愛機能"
  },
  {
    icon: <Eye className="w-8 h-8" />,
    title: "Reading Comfort",
    description: "読書快適 Optimized for long sessions",
    features: [
      "Adjustable font sizes",
      "Line height customization",
      "Reading speed indicators",
      "Break reminders"
    ],
    emoji: "👁️",
    japanese: "読書快適"
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Progress Tracking",
    description: "進捗追跡 Never lose your place in love",
    features: [
      "Reading time statistics",
      "Story completion percentage",
      "Reading streak counters",
      "Achievement unlocks"
    ],
    emoji: "⏰",
    japanese: "進捗管理"
  }
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-sm text-pink-300">読書体験 Reader Experience</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Perfect 
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Reading Experience
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Crafted for romance lovers • 恋愛小説のための最適な読書環境 ✨
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {readerFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-white/10 hover:border-white/20 transition-all group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Icon & Emoji Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <div className="text-3xl">{feature.emoji}</div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl lg:text-2xl font-bold mb-2 text-white group-hover:text-purple-200 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-300 mb-6 text-sm lg:text-base">
                {feature.description}
              </p>

              {/* Features List */}
              <ul className="space-y-3">
                {feature.features.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                  >
                    <div className="flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-300 text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Japanese Text */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <span className="text-xs text-purple-300 font-medium">{feature.japanese}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reading Philosophy */}
        <motion.div
          className="mt-16 lg:mt-20 text-center p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl border border-purple-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 flex items-center justify-center gap-2">
            <Bookmark className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Reading Philosophy
            </span>
            <Bookmark className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-400" />
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            "Every romance deserves to be read in perfect comfort. Whether it's 2 AM or a sunny afternoon, 
            our reader experience adapts to you. Because the best love stories deserve the best reading environment."
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-400">
            <span>🌸 Designed for Romance</span>
            <span>•</span>
            <span>📱 Mobile Optimized</span>
            <span>•</span>
            <span>✨ Always Improving</span>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-12 lg:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <h2 className="text-2xl lg:text-3xl font-bold mb-6">Ready to Start Reading?</h2>
          <p className="text-lg lg:text-xl text-gray-300 mb-8">
            Experience romance stories like never before • 今すぐ読書を始めよう ✨
          </p>
          <motion.a
            href="/manhwa"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BookOpen className="w-5 h-5" />
            Start Reading
          </motion.a>
        </motion.div>
      </div>
    </div>
  )
}