import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Heart, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

const blogPosts = [
  {
    id: 1,
    title: "Writing Romance That Makes Hearts Race",
    excerpt: "The art of crafting emotional tension and passionate moments that leave readers breathless",
    date: "2025-01-15",
    readTime: "8 min read",
    category: "Writing Tips",
    gradient: "from-red-500/20 to-pink-500/20",
    emoji: "💕",
    japanese: "恋愛執筆術"
  },
  {
    id: 2,
    title: "From Code to Characters: My Journey",
    excerpt: "How I transformed from a developer into a digital romance storyteller",
    date: "2025-01-10", 
    readTime: "6 min read",
    category: "Personal",
    gradient: "from-purple-500/20 to-indigo-500/20",
    emoji: "🌸",
    japanese: "私の旅路"
  },
  {
    id: 3,
    title: "Best Manhwa Recommendations 2025",
    excerpt: "Must-read romance manhwas that will steal your heart and keep you up all night",
    date: "2025-01-05",
    readTime: "10 min read",
    category: "Reviews",
    gradient: "from-pink-500/20 to-rose-500/20",
    emoji: "📚",
    japanese: "おすすめ漫画"
  },
  {
    id: 4,
    title: "Building Interactive Love Stories",
    excerpt: "The technical magic behind reader choices and multiple story paths",
    date: "2024-12-28",
    readTime: "7 min read",
    category: "Behind the Scenes",
    gradient: "from-cyan-500/20 to-blue-500/20",
    emoji: "⚡",
    japanese: "技術解説"
  },
  {
    id: 5,
    title: "Character Development in Romance",
    excerpt: "Creating believable characters that readers fall in love with",
    date: "2024-12-20",
    readTime: "9 min read",
    category: "Writing Tips",
    gradient: "from-emerald-500/20 to-green-500/20",
    emoji: "👥",
    japanese: "キャラクター創造"
  },
  {
    id: 6,
    title: "The Psychology of Romance Readers",
    excerpt: "Understanding what makes romance stories so addictive and emotionally powerful",
    date: "2024-12-15",
    readTime: "5 min read",
    category: "Insights",
    gradient: "from-orange-500/20 to-amber-500/20",
    emoji: "🧠",
    japanese: "読者心理学"
  }
]

const categories = ["All", "Writing Tips", "Reviews", "Behind the Scenes", "Personal", "Insights"]

export default function Blog() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30 mb-6">
            <BookOpen className="w-4 h-4 text-pink-400" />
            <span className="text-sm text-pink-300">日記 Chronicles</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Manhwa <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Chronicles</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Behind the scenes of digital romance • 恋愛小説制作の舞台裏 ✨
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/20 hover:border-white/40 transition-all text-sm font-medium hover:scale-105"
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Featured Post */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 group">
            <Link to={`/blog/${blogPosts[0].id}`}>
              <div className="grid lg:grid-cols-2 gap-8 p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 rounded-full bg-purple-500/30 text-sm font-medium">
                      Featured • 特集
                    </span>
                    <span className="text-4xl">{blogPosts[0].emoji}</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold group-hover:text-purple-200 transition-colors">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(blogPosts[0].date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {blogPosts[0].readTime}
                    </span>
                  </div>
                  <motion.div
                    className="flex items-center gap-2 text-purple-400 group-hover:gap-3 transition-all font-medium"
                    whileHover={{ x: 5 }}
                  >
                    Read Full Article
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="aspect-square w-full max-w-sm bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                    {blogPosts[0].emoji}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 group hover:border-white/20 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link to={`/blog/${post.id}`}>
                <div className={`h-40 bg-gradient-to-br ${post.gradient} relative flex items-center justify-center`}>
                  <div className="text-5xl opacity-80 group-hover:scale-110 transition-transform">
                    {post.emoji}
                  </div>
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/30 backdrop-blur text-xs font-medium">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-3 group-hover:text-purple-200 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-300 mb-4 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <div className="text-xs text-purple-300 font-medium">
                      {post.japanese}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          className="mt-16 p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl border border-purple-500/20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 lg:w-8 lg:h-8 text-red-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Stay Updated
            </span>
            <Heart className="w-6 h-6 lg:w-8 lg:h-8 text-red-400" />
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Get notified when new stories drop and behind-the-scenes content is published • 新作通知を受け取る
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
            />
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>

        {/* Load More */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <button className="px-8 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all hover:scale-105 font-medium">
            Load More Chronicles • もっと読む
          </button>
        </motion.div>
      </div>
    </div>
  )
}