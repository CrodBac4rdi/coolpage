import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkles, Zap, Globe, Layers, ChevronRight, Github, Twitter, Linkedin, Star, Rocket, Heart, Shield } from 'lucide-react'
import './App.css'

function App() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 50])
  const y2 = useTransform(scrollY, [0, 300], [0, -50])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const features = [
    {
      icon: <Sparkles className="w-10 h-10" />,
      title: "AI-Powered",
      description: "Next generation intelligence built right in",
      gradient: "from-purple-400 to-pink-400"
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Lightning Fast",
      description: "Optimized performance that scales",
      gradient: "from-yellow-400 to-orange-400"
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: "Global Ready",
      description: "Deploy anywhere, reach everyone",
      gradient: "from-blue-400 to-cyan-400"
    },
    {
      icon: <Layers className="w-10 h-10" />,
      title: "Modular Design",
      description: "Build exactly what you need",
      gradient: "from-green-400 to-emerald-400"
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Secure by Default",
      description: "Enterprise-grade security built in",
      gradient: "from-red-400 to-pink-400"
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Developer Friendly",
      description: "Built by developers, for developers",
      gradient: "from-purple-400 to-indigo-400"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden relative">
      {/* Gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
        <motion.div 
          className="absolute w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-20 right-0 bottom-0"
          animate={{
            x: -mousePosition.x * 0.02,
            y: -mousePosition.y * 0.02,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
      </div>
      {/* Animated particles */}
      <div className="fixed inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              filter: 'blur(1px)',
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 40 + 30,
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
            className="text-2xl font-bold flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
          >
            <Rocket className="w-6 h-6 text-purple-400" />
            CoolPage
          </motion.h1>
          <motion.div 
            className="flex gap-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <a href="#features" className="hover:text-purple-300 transition">Features</a>
            <a href="#stats" className="hover:text-purple-300 transition">Stats</a>
            <a href="#cta" className="hover:text-purple-300 transition">Contact</a>
          </motion.div>
        </nav>

        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-8">
          <motion.div
            className="relative"
            style={{ y: y1 }}
          >
            <motion.h1 
              className="text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 relative"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            >
              Build Something
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Amazing
              </motion.span>
            </motion.h1>
            <motion.div
              className="absolute -top-10 -right-10"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-12 h-12 text-yellow-400 opacity-60" />
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="text-2xl mb-12 max-w-3xl text-gray-200 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ y: y2 }}
          >
            The modern platform for creators, developers, and dreamers. 
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 font-semibold"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Start building your next big idea today.
            </motion.span>
          </motion.p>

          <motion.div className="flex gap-4 flex-wrap justify-center">
            <motion.button
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-10 py-5 rounded-full font-semibold text-lg flex items-center gap-3 shadow-2xl shadow-purple-500/25 relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get Started</span>
              <ChevronRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            <motion.button
              className="px-10 py-5 rounded-full font-semibold text-lg border-2 border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div 
          id="stats"
          className="relative z-10 py-20 px-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { value: "10M+", label: "Active Users", icon: <Star className="w-6 h-6" /> },
                { value: "99.9%", label: "Uptime", icon: <Shield className="w-6 h-6" /> },
                { value: "24/7", label: "Support", icon: <Heart className="w-6 h-6" /> }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center glass rounded-3xl p-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="inline-flex p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 mb-4"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.h3 
                    className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {stat.value}
                  </motion.h3>
                  <p className="text-gray-300">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <div id="features" className="relative z-10 py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-16">
              <motion.h2 
                className="text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Why Choose Us
              </motion.h2>
              <motion.p
                className="text-xl text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Everything you need to build and scale your next project
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 cursor-pointer transition-all overflow-hidden group ${
                    activeFeature === index ? 'bg-white/10' : ''
                  }`}
                  initial={{ opacity: 0, y: 20, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onClick={() => setActiveFeature(index)}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  {/* Gradient background on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                  
                  {/* Glow effect */}
                  <motion.div
                    className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                  />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className={`mb-6 inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.gradient} bg-opacity-20`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                  
                  {/* Decorative elements */}
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20 bg-white opacity-5 rounded-full blur-2xl"
                    animate={{
                      scale: activeFeature === index ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          id="cta"
          className="relative z-10 py-20 px-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="glass rounded-3xl p-12 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Background decoration */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
              />
              
              <div className="relative z-10">
                <motion.h2 
                  className="text-5xl font-bold mb-6"
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                >
                  Ready to start building?
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  Join thousands of developers who are already creating amazing experiences
                </motion.p>
                <motion.div className="flex gap-4 justify-center">
                  <motion.button
                    className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Free Trial
                  </motion.button>
                  <motion.button
                    className="border-2 border-white/30 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Pricing
                  </motion.button>
                </motion.div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"
                animate={{
                  x: [0, 20, 0],
                  y: [0, -20, 0],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl"
                animate={{
                  x: [0, -20, 0],
                  y: [0, 20, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 2.5 }}
              />
            </motion.div>
          </div>
        </motion.div>

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