import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft, AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-8">
      <motion.div
        className="text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="mb-8"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <AlertCircle className="w-24 h-24 mx-auto text-purple-400" />
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            404
          </span>
        </h1>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Lost in Digital Space
        </h2>
        
        <p className="text-xl text-gray-300 mb-12 max-w-lg mx-auto">
          Looks like you've ventured into uncharted territory. 
          This page doesn't exist in our digital realm.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <motion.button
              className="group bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 shadow-2xl shadow-purple-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-5 h-5" />
              Back to Home
            </motion.button>
          </Link>
          
          <motion.button
            onClick={() => window.history.back()}
            className="px-8 py-4 rounded-full font-semibold text-lg border-2 border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </motion.button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 opacity-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-32 h-32 border-4 border-purple-400 rounded-full" />
          </motion.div>
        </div>
        
        <div className="absolute bottom-1/4 right-10 opacity-20">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-24 h-24 border-4 border-pink-400 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}