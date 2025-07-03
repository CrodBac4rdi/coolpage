import { motion } from 'framer-motion'
import { Mail, Send, MessageSquare, Clock, Heart, BookOpen, Users, Coffee } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    interest: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log('Form submitted:', formData)
      setSubmitStatus('success')
      
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '', interest: 'general' })
        setSubmitStatus('idle')
      }, 3000)
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: "birkner.daniel@googlemail.com",
      subdetails: "Romance stories & collaboration",
      emoji: "💌",
      japanese: "メール"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Response Time",
      details: "Within 24 hours",
      subdetails: "Usually much faster!",
      emoji: "⚡",
      japanese: "返信時間"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Community",
      details: "Discord & Social",
      subdetails: "Join the romance readers",
      emoji: "🌸",
      japanese: "コミュニティ"
    }
  ]

  const interests = [
    { value: 'general', label: 'General Inquiry', emoji: '💬' },
    { value: 'story', label: 'Story Feedback', emoji: '📖' },
    { value: 'collaboration', label: 'Collaboration', emoji: '🤝' },
    { value: 'technical', label: 'Technical Question', emoji: '💻' },
    { value: 'fanart', label: 'Fan Art / Content', emoji: '🎨' }
  ]

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30 mb-6">
            <MessageSquare className="w-4 h-4 text-pink-400" />
            <span className="text-sm text-pink-300">連絡 Connect</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Let's Create
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Romance Together
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Story ideas, feedback, collaboration, or just want to chat about romance? • 一緒に恋愛物語を作りましょう ✨
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            className="lg:col-span-1 space-y-4 sm:space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all group"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm sm:text-base text-white">{info.title}</h3>
                      <span className="text-2xl">{info.emoji}</span>
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base">{info.details}</p>
                    <p className="text-xs sm:text-sm text-gray-400 mb-2">{info.subdetails}</p>
                    <span className="text-xs text-purple-300 font-medium">{info.japanese}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Quick Stats */}
            <motion.div
              className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                Community Stats
              </h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">200+</div>
                  <div className="text-xs text-gray-400">Chapters</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">4</div>
                  <div className="text-xs text-gray-400">Stories</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">∞</div>
                  <div className="text-xs text-gray-400">Love</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-xs text-gray-400">Reading</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name • お名前</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 sm:py-4 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none transition-colors text-base"
                    placeholder="Romance Reader"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Your Email • メール</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 sm:py-4 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none transition-colors text-base"
                    placeholder="reader@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">What's this about? • 内容</label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full px-4 py-3 sm:py-4 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none transition-colors text-base"
                >
                  {interests.map(interest => (
                    <option key={interest.value} value={interest.value} className="bg-gray-800">
                      {interest.emoji} {interest.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject • 件名</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 sm:py-4 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none transition-colors text-base"
                  placeholder="Love your stories! 💕"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message • メッセージ</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 sm:py-4 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none transition-colors resize-none text-base"
                  rows={6}
                  placeholder="Tell me about your favorite chapter, story ideas, or just say hi! ✨"
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                className={`w-full px-6 sm:px-8 py-4 sm:py-5 rounded-xl font-semibold text-base sm:text-lg flex items-center justify-center gap-2 group transition-all ${
                  submitStatus === 'success'
                    ? 'bg-green-500'
                    : submitStatus === 'error'
                    ? 'bg-red-500'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                } ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-pulse">Sending...</span>
                    <Coffee className="w-5 h-5 animate-bounce" />
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <span>Message Sent! ✨</span>
                    <Heart className="w-5 h-5 text-red-300" />
                  </>
                ) : submitStatus === 'error' ? (
                  <>
                    <span>Error! Try Again 😅</span>
                  </>
                ) : (
                  <>
                    Send Message • 送信
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Social & Community */}
        <motion.div
          className="mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-purple-500/20 text-center">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 flex items-center justify-center gap-2">
              <BookOpen className="w-6 h-6 lg:w-8 lg:h-8 text-purple-400" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Join the Romance Community
              </span>
              <BookOpen className="w-6 h-6 lg:w-8 lg:h-8 text-purple-400" />
            </h3>
            <p className="text-gray-300 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg mb-8">
              Connect with fellow romance readers, get early access to new chapters, and be part of the story creation process • 
              恋愛小説コミュニティに参加して一緒に物語を楽しみましょう ✨
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {[
                { platform: 'Discord', emoji: '💬', japanese: 'チャット' },
                { platform: 'Twitter', emoji: '🐦', japanese: 'ツイッター' },
                { platform: 'GitHub', emoji: '👨‍💻', japanese: 'コード' },
                { platform: 'Email List', emoji: '📧', japanese: '通知' }
              ].map((social) => (
                <motion.div 
                  key={social.platform} 
                  className="px-3 sm:px-4 py-3 rounded-full bg-white/10 border border-white/20 hover:border-white/40 transition-all cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-lg sm:text-xl mb-1 group-hover:scale-110 transition-transform">{social.emoji}</div>
                  <div className="text-xs sm:text-sm font-medium">{social.platform}</div>
                  <div className="text-xs text-purple-300">{social.japanese}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}