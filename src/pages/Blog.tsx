import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development in 2025",
    excerpt: "Exploring the cutting-edge technologies that are reshaping how we build for the web",
    date: "2025-01-15",
    readTime: "5 min read",
    category: "Technology",
    gradient: "from-purple-600 to-indigo-600"
  },
  {
    id: 2,
    title: "Building Scalable AI Applications",
    excerpt: "A comprehensive guide to architecting AI-powered applications that can handle millions of users",
    date: "2025-01-10",
    readTime: "8 min read",
    category: "AI",
    gradient: "from-pink-600 to-rose-600"
  },
  {
    id: 3,
    title: "The Art of Digital Experience Design",
    excerpt: "How to create digital experiences that users love and remember",
    date: "2025-01-05",
    readTime: "6 min read",
    category: "Design",
    gradient: "from-blue-600 to-cyan-600"
  },
  {
    id: 4,
    title: "Quantum Computing for Developers",
    excerpt: "An introduction to quantum computing concepts for the modern developer",
    date: "2024-12-28",
    readTime: "10 min read",
    category: "Innovation",
    gradient: "from-green-600 to-emerald-600"
  }
]

const categories = ["All", "Technology", "AI", "Design", "Innovation"]

export default function Blog() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Crod <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Blog</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Insights, tutorials, and thoughts on the future of technology
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/blog/${post.id}`}>
                <div className={`h-48 bg-gradient-to-br ${post.gradient} opacity-20 relative`}>
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-purple-500/80 text-sm">
                    {post.category}
                  </span>
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <motion.div
                      className="flex items-center gap-2 text-purple-400 group-hover:gap-3 transition-all"
                      whileHover={{ x: 5 }}
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button className="px-8 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors">
            Load More Articles
          </button>
        </motion.div>
      </div>
    </div>
  )
}