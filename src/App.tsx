import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Zap, Globe, Layers, ChevronRight, Github, Twitter, Linkedin } from 'lucide-react'
import './App.css'

function App() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "AI-Powered",
      description: "Next generation intelligence built right in"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Optimized performance that scales"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Ready",
      description: "Deploy anywhere, reach everyone"
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Modular Design",
      description: "Build exactly what you need"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <nav className="flex justify-between items-center p-8">
          <motion.h1 
            className="text-2xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            CoolPage
          </motion.h1>
          <motion.div 
            className="flex gap-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <a href="#" className="hover:text-purple-300 transition">Features</a>
            <a href="#" className="hover:text-purple-300 transition">About</a>
            <a href="#" className="hover:text-purple-300 transition">Contact</a>
          </motion.div>
        </nav>

        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-8">
          <motion.h1 
            className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Build Something Amazing
          </motion.h1>
          
          <motion.p 
            className="text-xl mb-8 max-w-2xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The modern platform for creators, developers, and dreamers. 
            Start building your next big idea today.
          </motion.p>

          <motion.button
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started <ChevronRight />
          </motion.button>
        </div>

        {/* Features Section */}
        <div className="relative z-10 py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-4xl font-bold text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Why Choose Us
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`bg-white/10 backdrop-blur-lg rounded-2xl p-8 cursor-pointer transition-all ${
                    activeFeature === index ? 'bg-white/20 scale-105' : ''
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveFeature(index)}
                  whileHover={{ y: -5 }}
                >
                  <div className="mb-4 text-purple-300">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 py-12 px-8 border-t border-white/10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© 2024 CoolPage. All rights reserved.</p>
            <div className="flex gap-6">
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.2 }}
                className="text-gray-400 hover:text-white transition"
              >
                <Github className="w-6 h-6" />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.2 }}
                className="text-gray-400 hover:text-white transition"
              >
                <Twitter className="w-6 h-6" />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.2 }}
                className="text-gray-400 hover:text-white transition"
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App