import { motion } from 'framer-motion'
import { Users, Code2, Coffee, Rocket } from 'lucide-react'

const stats = [
  { icon: <Users className="w-6 h-6" />, value: "100K+", label: "Happy Developers" },
  { icon: <Code2 className="w-6 h-6" />, value: "1M+", label: "Lines of Code" },
  { icon: <Coffee className="w-6 h-6" />, value: "∞", label: "Coffee Consumed" },
  { icon: <Rocket className="w-6 h-6" />, value: "2025", label: "Future Ready" }
]

export default function Stats() {
  return (
    <section className="py-20 px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
                <motion.div
                  className="inline-flex p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {stat.icon}
                </motion.div>
                <motion.h3 
                  className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring" }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      </div>
    </section>
  )
}