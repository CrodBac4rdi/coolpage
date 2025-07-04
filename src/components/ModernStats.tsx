import { motion } from 'framer-motion'
import { Book, Zap, Users, Heart, Star, TrendingUp } from 'lucide-react'

const stats = [
  {
    icon: Book,
    value: '12',
    label: 'Original Stories',
    description: 'Carefully crafted narratives',
    color: 'text-accent-purple'
  },
  {
    icon: Zap,
    value: '500+',
    label: 'Chapters',
    description: 'Hours of immersive reading',
    color: 'text-accent-blue'
  },
  {
    icon: Users,
    value: '50+',
    label: 'Characters',
    description: 'Unforgettable personalities',
    color: 'text-accent-pink'
  },
  {
    icon: Heart,
    value: '1M+',
    label: 'Words Written',
    description: 'Pure storytelling passion',
    color: 'text-accent-red'
  },
  {
    icon: Star,
    value: '4.9',
    label: 'User Rating',
    description: 'Loved by readers',
    color: 'text-accent-amber'
  },
  {
    icon: TrendingUp,
    value: '10k+',
    label: 'Active Readers',
    description: 'Growing community',
    color: 'text-accent-green'
  }
]

export default function ModernStats() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface-subtle">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Impact
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Building a universe of stories that touch hearts and inspire minds
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="card group hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-surface-subtle ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-primary mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-tertiary">
                    {stat.description}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}