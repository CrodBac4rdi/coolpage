import { motion } from 'framer-motion'
import { Code, Heart, Sparkles, BookOpen, Coffee, Star } from 'lucide-react'

const journey = [
  {
    icon: <Code className="w-8 h-8" />,
    title: "The Developer Path",
    description: "Started as a passionate coder, building digital worlds one line at a time",
    emoji: "💻",
    japanese: "開発者"
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Discovering Stories",
    description: "Found my love for manhwa, light novels, and the art of storytelling",
    emoji: "📚",
    japanese: "物語"
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Romance Writer",
    description: "Combined technical skills with passion for romance to create digital love stories",
    emoji: "💕",
    japanese: "恋愛作家"
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Digital Storyteller",
    description: "Now creating immersive romance experiences that blend code and emotion",
    emoji: "✨",
    japanese: "創造者"
  }
]

const passions = [
  {
    title: "Romance Manhwa",
    description: "CEO romances, forbidden love, workplace drama",
    emoji: "💼💕",
    japanese: "恋愛漫画"
  },
  {
    title: "Light Novels",
    description: "Immersive storytelling with deep character development",
    emoji: "📖✨",
    japanese: "ライトノベル"
  },
  {
    title: "Anime Culture",
    description: "Drawing inspiration from Japanese storytelling traditions",
    emoji: "🎌🌸",
    japanese: "アニメ文化"
  },
  {
    title: "Interactive Stories",
    description: "Blending gaming elements with romantic narratives",
    emoji: "🎮💗",
    japanese: "インタラクティブ"
  }
]

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30 mb-6">
              <Coffee className="w-4 h-4 text-pink-400" />
              <span className="text-sm text-pink-300">私について About Me</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              From <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Code to Stories</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              A developer's journey into the world of digital romance • 開発者から恋愛作家への道 ✨
            </p>
          </div>

          {/* Personal Story */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="text-4xl">🌸</span>
                My Origin Story
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Hey! I'm Daniel, a passionate developer who discovered that code and romance make the perfect combination. 
                  What started as building websites turned into creating digital worlds where love stories come alive.
                </p>
                <p>
                  After years of coding, I found myself drawn to manhwa and light novels. The way these stories could make 
                  you feel every emotion, every heartbeat, every stolen glance - I knew I had to create that magic myself.
                </p>
                <p>
                  Now I combine my technical skills with storytelling passion, crafting romance experiences that live 
                  in the digital realm. Each story is built with the same care as clean, beautiful code.
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <span className="text-2xl">🍃</span>
                  <span className="text-sm text-gray-400 italic">
                    "Where pixels meet poetry, where algorithms meet affection"
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="aspect-square bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-3xl backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center p-8 relative overflow-hidden">
                {/* Floating Elements */}
                <div className="absolute top-4 left-4 text-2xl opacity-50">💻</div>
                <div className="absolute top-4 right-4 text-2xl opacity-50">📚</div>
                <div className="absolute bottom-4 left-4 text-2xl opacity-50">💕</div>
                <div className="absolute bottom-4 right-4 text-2xl opacity-50">✨</div>
                
                {/* Center Content */}
                <div className="text-center">
                  <div className="text-6xl mb-4">🌙</div>
                  <div className="text-2xl font-bold text-white mb-2">Developer + Storyteller</div>
                  <div className="text-lg text-purple-200">開発者 + 作家</div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl -z-10" />
            </motion.div>
          </div>

          {/* Journey Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
              <Star className="w-8 h-8 text-yellow-400" />
              My Journey • 私の旅路
              <Star className="w-8 h-8 text-yellow-400" />
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {journey.map((step, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-4xl mb-4">{step.emoji}</div>
                  <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{step.title}</h3>
                  <p className="text-sm text-gray-300 mb-3">{step.description}</p>
                  <div className="text-xs text-purple-300 font-medium">{step.japanese}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Passions & Interests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-12">What Drives Me • 私の情熱</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {passions.map((passion, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center hover:border-white/20 transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-3xl mb-3">{passion.emoji}</div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{passion.title}</h3>
                  <p className="text-sm text-gray-300 mb-3">{passion.description}</p>
                  <div className="text-xs text-purple-300">{passion.japanese}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl border border-purple-500/20"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              My Philosophy
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </h2>
            <p className="text-xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed">
              "Every great love story deserves a beautiful digital home. Whether it's clean code or compelling characters, 
              attention to detail makes all the difference. I believe in creating experiences that touch the heart and 
              spark imagination - one chapter, one interaction, one emotional moment at a time."
            </p>
            <div className="flex justify-center items-center gap-4 text-sm text-gray-400">
              <span>💕 Built with Love</span>
              <span>•</span>
              <span>✨ Crafted with Care</span>
              <span>•</span>
              <span>🌸 Inspired by Romance</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}