import { motion } from 'framer-motion'
import { Zap, Globe, Shield, Heart, Code, Palette } from 'lucide-react'

const features = [
  {
    icon: <Code className="w-10 h-10" />,
    title: "Next-Gen Development",
    description: "Cutting-edge tech stack for blazing fast applications",
    gradient: "from-purple-400 to-pink-400"
  },
  {
    icon: <Zap className="w-10 h-10" />,
    title: "Lightning Performance",
    description: "Optimized to the core, because milliseconds matter",
    gradient: "from-yellow-400 to-orange-400"
  },
  {
    icon: <Globe className="w-10 h-10" />,
    title: "Global Scale",
    description: "Built for the world, ready for millions",
    gradient: "from-blue-400 to-cyan-400"
  },
  {
    icon: <Palette className="w-10 h-10" />,
    title: "Beautiful Design",
    description: "Pixel-perfect interfaces that users love",
    gradient: "from-green-400 to-emerald-400"
  },
  {
    icon: <Shield className="w-10 h-10" />,
    title: "Secure by Default",
    description: "Your data, protected like digital gold",
    gradient: "from-red-400 to-pink-400"
  },
  {
    icon: <Heart className="w-10 h-10" />,
    title: "Community First",
    description: "Built by developers, for developers",
    gradient: "from-purple-400 to-indigo-400"
  }
]

export default function Features() {
  return (
    <section className="py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Crod Babylon</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We're not just another platform. We're your gateway to digital excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 h-full border border-white/10 overflow-hidden transition-all duration-300 hover:bg-white/10">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <motion.div 
                  className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.gradient} bg-opacity-20 mb-6`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>

                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-white/0 rounded-full blur-2xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}