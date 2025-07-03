import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'

const featureList = [
  {
    title: "AI-Powered Development",
    description: "Leverage cutting-edge AI to accelerate your development workflow",
    features: [
      "Smart code completion",
      "Automated testing",
      "Intelligent debugging",
      "Performance optimization"
    ]
  },
  {
    title: "Real-time Collaboration",
    description: "Work together seamlessly, no matter where you are",
    features: [
      "Live code sharing",
      "Instant messaging",
      "Video conferencing",
      "Project management"
    ]
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade security for your most sensitive projects",
    features: [
      "End-to-end encryption",
      "Multi-factor authentication",
      "Role-based access control",
      "Audit logging"
    ]
  },
  {
    title: "Global Infrastructure",
    description: "Deploy anywhere, scale everywhere",
    features: [
      "99.99% uptime SLA",
      "Global CDN",
      "Auto-scaling",
      "Multi-region deployment"
    ]
  }
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Powerful Features</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Everything You Need to
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Build Amazing Things
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From ideation to deployment, we've got you covered with enterprise-grade tools and features.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {featureList.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-300 mb-6">{feature.description}</p>
              <ul className="space-y-3">
                {feature.features.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers building the future with Crod Babylon
          </p>
          <motion.button
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-full font-semibold text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Free Trial
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}