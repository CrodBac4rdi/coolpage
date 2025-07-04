import { motion } from 'framer-motion'
import { Code, Zap, Globe, Palette, Shield, Heart } from 'lucide-react'

const features = [
  {
    icon: Code,
    title: "Next-Gen Development",
    description: "Cutting-edge tech stack for blazing fast applications",
    color: "text-accent-purple"
  },
  {
    icon: Zap,
    title: "Lightning Performance",
    description: "Optimized to the core, because milliseconds matter",
    color: "text-accent-amber"
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Built for the world, ready for millions",
    color: "text-accent-blue"
  },
  {
    icon: Palette,
    title: "Beautiful Design",
    description: "Pixel-perfect interfaces that users love",
    color: "text-accent-green"
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Your data, protected like digital gold",
    color: "text-accent-red"
  },
  {
    icon: Heart,
    title: "Community First",
    description: "Built by developers, for developers",
    color: "text-accent-pink"
  }
]

export default function ModernFeatures() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-gradient">Crod Babylon</span>
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            We're not just another platform. We're your gateway to digital excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="card h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-lg bg-surface-subtle mb-4 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2 text-primary">{feature.title}</h3>
                <p className="text-secondary">{feature.description}</p>

                {/* Hover Effect */}
                <div className="absolute inset-0 border border-transparent rounded-lg transition-all duration-300 group-hover:border-border-strong pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}