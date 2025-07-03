import { motion } from 'framer-motion'
import { ChevronRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 sm:mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-xs sm:text-sm">Welcome to the Digital Paradise</span>
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
            Crod Babylon
          </span>
          <br />
          <span className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-white/80">
            Where Dreams Code Reality
          </span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 px-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Enter the next generation of digital experiences. 
          We're not just building websites, we're crafting digital worlds.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/projects" className="w-full sm:w-auto">
            <motion.button
              className="group bg-gradient-to-r from-purple-500 to-pink-500 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg flex items-center justify-center gap-2 shadow-2xl shadow-purple-500/25 w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Projects
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
          <Link to="/about" className="w-full sm:w-auto">
            <motion.button
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg border-2 border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </Link>
        </motion.div>

        {/* Floating decoration */}
        <motion.div
          className="absolute -top-20 -right-20 hidden lg:block"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 360]
          }}
          transition={{ 
            y: { duration: 3, repeat: Infinity },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
        >
          <Star className="w-16 h-16 text-yellow-400/30" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
}