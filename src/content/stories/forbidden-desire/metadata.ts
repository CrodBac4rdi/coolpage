import type { EnhancedStory } from '../../../types/story'

const forbiddenDesireMetadata: EnhancedStory = {
  id: "forbidden-desire",
  title: "Forbidden Desire",
  description: "Eine leidenschaftliche Liebesgeschichte zwischen einer ambitionierten Projektleiterin und ihrem neuen Chef. Verbotene Anziehung, gefährliche Spiele und brennende Leidenschaft.",
  synopsis: `Elena Rodriguez ist eine brillante Projektleiterin, die seit drei Jahren hart für ihre Karriere gearbeitet hat. Als der charismatische Alexander Stone als neuer Creative Director eingestellt wird, ändert sich alles.

Was als professionelle Zusammenarbeit beginnt, entwickelt sich schnell zu einer verbotenen Anziehung, die beide nicht ignorieren können. Trotz der Firmenregeln und der Risiken für ihre Karrieren können sie nicht voneinander lassen.

Eine Geschichte von Leidenschaft, Vertrauen und der Macht der wahren Liebe, die alle Hindernisse überwindet.`,
  
  author: "Crod Babylon",
  genre: ["Romance", "Drama", "Mature"],
  mature: true,
  coverEmoji: "🔥",
  gradient: "from-red-500/20 to-pink-500/20",
  tags: ["CEO Romance", "Workplace Romance", "Forbidden Love", "Passionate", "Steamy", "Emotional Journey"],
  
  status: "completed",
  language: "de",
  
  totalWordCount: 25000,
  estimatedReadTime: 125, // 25000 words / 200 words per minute
  lastUpdated: "2024-12-04T10:30:00Z",
  createdAt: "2024-11-01T09:00:00Z",
  
  contentWarnings: ["Mature Content", "Sexual Themes", "Workplace Romance"],
  
  themeColors: {
    primary: "#dc2626", // red-600
    secondary: "#ec4899", // pink-500
    accent: "#f97316"    // orange-500
  },
  
  bookmarkable: true,
  commentable: true,
  shareable: true,
  
  chapters: [
    {
      id: 1,
      title: "Verbotene Anziehung",
      subtitle: "Der erste Funke zwischen Elena und Alexander",
      emoji: "🔥",
      arc: "Forbidden Attraction",
      content: "", // Will be loaded dynamically
      wordCount: 1800,
      readTime: 9,
      mood: "romantic",
      metadata: {
        pov: "Elena Rodriguez",
        setting: "Bürogebäude, Konferenzraum und Alexanders Büro",
        characters: ["Elena Rodriguez", "Alexander Stone"],
        themes: ["Erste Begegnung", "Sofortige Anziehung", "Professionelle Grenzen"],
        timeline: "Tag 1"
      },
      media: {
        backgroundGradient: "from-red-500/10 to-pink-500/10",
        moodMusic: "romantic-tension"
      },
      publishedAt: "2024-11-01T09:00:00Z"
    },
    {
      id: 2,
      title: "Hingabe und Erwachen",
      subtitle: "Die erste Nacht und ihre Konsequenzen",
      emoji: "🌅",
      arc: "Forbidden Attraction", 
      content: "",
      wordCount: 2200,
      readTime: 11,
      mood: "dramatic",
      metadata: {
        pov: "Elena Rodriguez & Alexander Stone",
        setting: "Alexanders Penthouse, Büro am nächsten Tag",
        characters: ["Elena Rodriguez", "Alexander Stone"],
        themes: ["Leidenschaft", "Reue", "Innerer Konflikt", "Vermeidung"],
        timeline: "Tag 2-7"
      },
      media: {
        backgroundGradient: "from-orange-500/10 to-red-500/10",
        moodMusic: "passionate-conflict"
      },
      publishedAt: "2024-11-01T09:30:00Z"
    },
    {
      id: 3,
      title: "Zweifel und Eifersucht",
      subtitle: "Marcus' Gift und Alexanders Reaktion",
      emoji: "💔",
      arc: "First Steps",
      content: "",
      wordCount: 1900,
      readTime: 10,
      mood: "tension",
      metadata: {
        pov: "Elena Rodriguez",
        setting: "Büro, Toilette, Alexanders Büro",
        characters: ["Elena Rodriguez", "Alexander Stone", "Marcus"],
        themes: ["Manipulation", "Zweifel", "Eifersucht", "Vertrauen"],
        timeline: "Tag 8-10"
      },
      media: {
        backgroundGradient: "from-slate-500/10 to-red-500/10",
        moodMusic: "tension-conflict"
      },
      publishedAt: "2024-11-01T10:00:00Z"
    }
  ]
}

export default forbiddenDesireMetadata