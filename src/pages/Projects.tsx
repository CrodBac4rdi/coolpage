import { motion } from 'framer-motion'
import { ExternalLink, Github, Star } from 'lucide-react'

const projects = [
  {
    title: "Neural Canvas",
    description: "AI-powered design tool that transforms ideas into stunning visuals",
    tags: ["AI", "Design", "React"],
    stars: 2340,
    link: "#",
    github: "#",
    gradient: "from-purple-600 to-pink-600"
  },
  {
    title: "Quantum Core",
    description: "Next-generation state management for complex applications",
    tags: ["TypeScript", "State Management", "Performance"],
    stars: 1876,
    link: "#",
    github: "#",
    gradient: "from-pink-600 to-rose-600"
  },
  {
    title: "Cyber Flow",
    description: "Visual programming interface for blockchain smart contracts",
    tags: ["Blockchain", "Web3", "Visual Programming"],
    stars: 3210,
    link: "#",
    github: "#",
    gradient: "from-blue-600 to-cyan-600"
  },
  {
    title: "Holo UI",
    description: "Futuristic component library for modern web applications",
    tags: ["UI Library", "Components", "Design System"],
    stars: 4520,
    link: "#",
    github: "#",
    gradient: "from-green-600 to-emerald-600"
  },
  {
    title: "Data Forge",
    description: "Real-time data processing and visualization platform",
    tags: ["Data", "Analytics", "Real-time"],
    stars: 1654,
    link: "#",
    github: "#",
    gradient: "from-orange-600 to-amber-600"
  },
  {
    title: "Echo Mind",
    description: "AI assistant framework for building intelligent applications",
    tags: ["AI", "Framework", "Machine Learning"],
    stars: 2890,
    link: "#",
    github: "#",
    gradient: "from-red-600 to-pink-600"
  }
]

export default function Projects() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Projects</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Explore the cutting-edge projects we're building to shape the future of technology
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`h-24 sm:h-32 bg-gradient-to-br ${project.gradient} opacity-20 rounded-t-2xl sm:rounded-t-3xl`} />
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">{project.description}</p>
                
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs rounded-full bg-white/10 border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">{project.stars.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex gap-1.5 sm:gap-2">
                    <motion.a
                      href={project.github}
                      className="p-1.5 sm:p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </motion.a>
                    <motion.a
                      href={project.link}
                      className="p-1.5 sm:p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}