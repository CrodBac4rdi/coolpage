import { motion } from 'framer-motion'
import { Users, Target, Lightbulb, Award } from 'lucide-react'

const values = [
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Innovation First",
    description: "We push boundaries and challenge the status quo"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Community Driven",
    description: "Built by the community, for the community"
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Goal Oriented",
    description: "Every line of code has a purpose"
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Excellence Always",
    description: "We don't settle for good enough"
  }
]

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-8">
            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Crod Babylon</span>
          </h1>
          
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
            We're not just another tech company. We're dreamers, builders, and innovators creating the digital future.
          </p>

          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-300 mb-4">
                Born in 2025, Crod Babylon emerged from a simple idea: what if we could create digital experiences that feel like magic?
              </p>
              <p className="text-gray-300 mb-4">
                We started as a small group of passionate developers who believed that the web could be more than just functional - it could be beautiful, inspiring, and transformative.
              </p>
              <p className="text-gray-300">
                Today, we're building the tools and platforms that power the next generation of digital experiences.
              </p>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="aspect-square bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl backdrop-blur-xl border border-white/10 flex items-center justify-center">
                <div className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                  2025
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl -z-10" />
            </motion.div>
          </div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}