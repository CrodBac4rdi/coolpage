import { motion } from 'framer-motion'
import { Book, Heart, Sparkles, Coffee, Moon, Sun, Star } from 'lucide-react'
import { useState } from 'react'

interface Chapter {
  id: number
  title: string
  emoji: string
  content: string[]
}

export default function Manhwa() {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [favorites, setFavorites] = useState<number[]>([])

  const story: Chapter[] = [
    {
      id: 1,
      title: "Coffee Shop Encounter",
      emoji: "☕",
      content: [
        "The rain poured outside the small coffee shop, creating a cozy atmosphere inside. Luna sat by the window, her laptop open but her mind wandering as she watched the droplets race down the glass.",
        "\"One caramel macchiato for... Luna?\" a warm voice called out.",
        "She looked up to see the new barista - tall, with messy dark hair and the kindest brown eyes she'd ever seen. His name tag read 'Kai'.",
        "\"That's me,\" she said, trying not to blush as their fingers briefly touched when he handed her the cup.",
        "\"Nice laptop sticker collection,\" Kai smiled, noticing her anime and gaming stickers. \"Is that a Studio Ghibli one?\"",
        "Luna's heart skipped. Finally, someone who understood her interests!",
        "\"Yeah! Are you a fan?\" she asked eagerly.",
        "\"The biggest,\" he grinned. \"My shift ends in an hour. Want to talk about Spirited Away over another coffee? On me.\"",
        "And that's how it all began..."
      ]
    },
    {
      id: 2,
      title: "Midnight Gaming Session",
      emoji: "🎮",
      content: [
        "Two weeks had passed since their first coffee date. Luna found herself at Kai's apartment for their first gaming night.",
        "\"Ready to lose?\" Kai teased, handing her a controller.",
        "\"In your dreams!\" Luna shot back, selecting her character in their favorite fighting game.",
        "Hours flew by as they played, ordered pizza, and shared stories about their worst gaming fails.",
        "\"You know,\" Kai said during a loading screen, \"I've never met anyone who gets as competitive as me about Mario Kart.\"",
        "\"Is that a challenge?\" Luna raised an eyebrow.",
        "\"Maybe,\" he said, moving slightly closer on the couch. \"Winner gets to pick the next date spot?\"",
        "\"You're on!\" Luna agreed, her heart racing - and not just from the competition.",
        "As the night went on, they found themselves sitting closer and closer, until Luna's head rested on Kai's shoulder.",
        "\"This is nice,\" she whispered.",
        "\"Yeah,\" he agreed softly. \"Really nice.\""
      ]
    },
    {
      id: 3,
      title: "Festival Under the Stars",
      emoji: "🌟",
      content: [
        "The summer festival was in full swing. Colorful lanterns hung everywhere, and the air smelled of street food and excitement.",
        "\"You look beautiful,\" Kai said, admiring Luna in her yukata.",
        "\"You clean up pretty well yourself,\" she replied, taking in his festival attire.",
        "They tried every game booth, with Kai determined to win Luna the giant stuffed cat she'd been eyeing.",
        "\"Kai, you've spent a fortune already!\" Luna laughed as he missed another ring toss.",
        "\"One more try,\" he insisted. This time, miraculously, he won.",
        "\"My hero,\" Luna giggled, hugging the enormous plush cat.",
        "As fireworks began to light up the sky, Kai took her hand. \"Luna, these past months have been amazing.\"",
        "\"They really have,\" she agreed, squeezing his hand.",
        "\"I think I'm falling for you,\" he confessed, his eyes reflecting the colorful explosions above.",
        "\"I already fell,\" Luna admitted, standing on her tiptoes.",
        "Under the fireworks and stars, they shared their first kiss, sweet and perfect like the moment itself."
      ]
    },
    {
      id: 4,
      title: "Rainy Day Confessions",
      emoji: "🌧️",
      content: [
        "Six months had passed. They were back at the coffee shop where it all began, rain pattering against the windows once more.",
        "\"Remember when we first met here?\" Kai asked, holding Luna's hand across the table.",
        "\"How could I forget? You nearly dropped my coffee because you were so nervous,\" Luna teased.",
        "\"I was not!\" he protested, then grinned. \"Okay, maybe a little.\"",
        "They sat in comfortable silence, watching the rain and sipping their drinks.",
        "\"Luna,\" Kai suddenly said, \"I have something to tell you.\"",
        "Her heart clenched with worry. \"What is it?\"",
        "\"I got accepted to the game development program... in Tokyo.\"",
        "The words hung heavy between them. Luna felt tears prick her eyes.",
        "\"But,\" Kai continued quickly, \"I also found out they have an online option. Or... you could come with me?\"",
        "\"Kai, I...\" Luna was speechless.",
        "\"I love you, Luna. I don't want to do this without you. Whether it's here, there, or anywhere - as long as we're together.\"",
        "Luna's tears fell freely now, but they were happy tears. \"I love you too. Let's figure it out together.\""
      ]
    },
    {
      id: 5,
      title: "Cherry Blossom Promise",
      emoji: "🌸",
      content: [
        "One year later. Tokyo's cherry blossoms were in full bloom as Luna and Kai walked through the park, hand in hand.",
        "\"I can't believe we actually did it,\" Luna marveled, taking photos of the pink petals.",
        "\"Best decision ever,\" Kai agreed, then stopped walking. \"Actually, I have another decision to make.\"",
        "Luna turned to find him on one knee, a small box in his hand.",
        "\"Luna, you turned my life into the most beautiful adventure. You're my player two, my coffee buddy, my everything.\"",
        "Luna's hands flew to her mouth, tears streaming down her face.",
        "\"Will you marry me and continue this game called life together?\"",
        "\"YES!\" Luna practically shouted, not caring who heard. \"A thousand times yes!\"",
        "As Kai slipped the ring on her finger - a delicate band with a small star-shaped diamond - cherry blossom petals swirled around them like nature's own celebration.",
        "\"I love you to the moon and back,\" Kai whispered.",
        "\"I love you to the arcade and back,\" Luna replied, making him laugh.",
        "And under the cherry blossoms of their new city, they kissed, ready for whatever levels life would throw at them next.",
        "The End... or rather, The Beginning ❤️"
      ]
    },
    {
      id: 6,
      title: "Moving Day Chaos",
      emoji: "📦",
      content: [
        "Three months after the proposal. Moving boxes filled their Tokyo apartment as Luna and Kai prepared for their next adventure.",
        "\"I can't believe we're actually moving in together officially,\" Luna said, taping up another box labeled 'Gaming Gear - FRAGILE!!!'",
        "\"I can't believe you have THREE gaming chairs,\" Kai teased, struggling with a particularly heavy box.",
        "\"Says the guy with five mechanical keyboards,\" Luna shot back with a grin.",
        "They worked in comfortable rhythm, occasionally stealing kisses between boxes. Their cats, Pixel and Sprite, supervised from their perch on the windowsill.",
        "\"Hey, look what I found!\" Kai held up a photo from their first gaming night together.",
        "Luna's eyes softened. \"We've come so far from that night.\"",
        "\"The best player two upgrade of my life,\" Kai said, pulling her close.",
        "As the sun set over Tokyo, they sat among the boxes, eating takeout ramen and planning their future gaming setup.",
        "\"Ready for this new level?\" Luna asked.",
        "\"With you? Always,\" Kai replied, and they sealed it with a kiss."
      ]
    },
    {
      id: 7,
      title: "The Tournament",
      emoji: "🏆",
      content: [
        "The esports arena buzzed with energy. Luna adjusted her headset nervously while Kai gave her shoulders a reassuring squeeze.",
        "\"You've got this, champion,\" he whispered. \"Show them what you're made of.\"",
        "It was Luna's first major tournament, and she'd made it to the finals. Kai wore her team colors proudly in the audience.",
        "The match began. Luna's fingers flew across the keyboard, her concentration absolute. Every move was calculated, every strategy perfect.",
        "In the crowd, Kai cheered louder than anyone, holding up a sign that read 'That's My Fiancée!'",
        "The final round came down to the wire. Luna's heart pounded as she executed her signature combo.",
        "\"VICTORY!\" flashed across the screen.",
        "Luna jumped up, tears of joy streaming down her face. Kai rushed onto the stage, lifting her in a spinning hug.",
        "\"I knew you could do it!\" he exclaimed.",
        "\"I had the best coach,\" Luna laughed, kissing him as confetti rained down.",
        "That night, they celebrated with their gaming friends, the trophy sitting proudly on their table.",
        "\"Next year, we enter the couples tournament,\" Luna declared.",
        "\"Game on,\" Kai grinned."
      ]
    },
    {
      id: 8,
      title: "Wedding Bells & Power-Ups",
      emoji: "💒",
      content: [
        "The wedding venue was a perfect blend of elegance and geek chic. Fairy lights twinkled like stars, and each table was named after a different game world.",
        "Luna stood before the mirror in her dress, a subtle pattern of cherry blossoms embroidered along the hem - a nod to their Tokyo proposal.",
        "\"You look like a princess from a JRPG,\" her best friend said, fixing her veil.",
        "\"The kind that saves herself AND the kingdom,\" Luna laughed nervously.",
        "Meanwhile, Kai adjusted his boutonniere - a tiny controller pin hidden among the flowers. His groomsmen all wore matching Triforce cufflinks.",
        "The ceremony began. As Luna walked down the aisle to a orchestral version of their favorite game soundtrack, Kai's eyes filled with tears.",
        "\"Player One, ready?\" the officiant asked Kai.",
        "\"Ready,\" he said, voice thick with emotion.",
        "\"Player Two, ready?\" they asked Luna.",
        "\"Always ready,\" she beamed.",
        "They exchanged rings engraved with 'GG WP' - Good Game, Well Played.",
        "\"You may now kiss your co-op partner for life!\"",
        "As they kissed, their friends released butterfly confetti, and someone definitely played the victory fanfare.",
        "At the reception, their first dance was to 'Sweden' from Minecraft, and yes, there was a gaming tournament instead of a bouquet toss.",
        "\"Best quest reward ever,\" Kai whispered.",
        "\"Achievement unlocked: Happily Ever After,\" Luna whispered back."
      ]
    },
    {
      id: 9,
      title: "New Game Plus",
      emoji: "👶",
      content: [
        "Two years later. Luna stared at the test in her hands, heart racing. Two pink lines.",
        "\"Kai!\" she called, voice shaking.",
        "He rushed in, concerned. \"What's wrong? Did the PC crash again?\"",
        "Wordlessly, she showed him the test. His eyes widened, then filled with tears.",
        "\"We're... we're having a player three?\" he whispered.",
        "Luna nodded, laughing and crying at the same time. Kai swept her into his arms, spinning her gently.",
        "\"We're going to be parents,\" he said in wonder.",
        "\"Ready for the hardest game of our lives?\" Luna asked.",
        "\"Tutorial mode is going to be rough,\" Kai laughed, hand moving to her still-flat stomach.",
        "They spent the evening planning - not just the nursery (definitely space-themed), but their future as a family of gamers.",
        "\"Our kid is going to have the coolest parents,\" Kai said proudly.",
        "\"Just wait until we teach them their first combo,\" Luna grinned.",
        "As they curled up together, controller set aside for once, they knew their greatest adventure was just beginning.",
        "Game Start: Parent Mode - Loading..."
      ]
    },
    {
      id: 10,
      title: "The Legacy Continues",
      emoji: "🌟",
      content: [
        "Five years later. The sound of button mashing filled the living room, but it wasn't Luna or Kai at the controls.",
        "\"I won! I won!\" little Hana jumped up and down, controller still in her tiny hands.",
        "\"You sure did, sweetie,\" Kai said, high-fiving his daughter. \"You beat your old man fair and square.\"",
        "\"Mama, did you see? I did the combo you taught me!\" Hana ran to Luna, who was working on her latest game design.",
        "\"I saw everything, my little champion,\" Luna said, pulling her daughter onto her lap. \"You're getting better every day.\"",
        "Their home was a perfect blend of family life and gaming paradise. Hana's drawings of game characters covered the fridge, right next to her parents' tournament trophies.",
        "\"Tell me the story again,\" Hana asked, settling between her parents. \"About how you met.\"",
        "Luna and Kai exchanged smiles. \"Well, it was a rainy day at a coffee shop...\" Luna began.",
        "\"And Daddy was nervous!\" Hana giggled.",
        "\"Very nervous,\" Kai admitted. \"But your mom had the coolest laptop stickers.\"",
        "As they told their story, Hana listened with wide eyes, already dreaming of her own adventures.",
        "Outside, the rain began to fall, just like that first day.",
        "\"And they lived happily ever after?\" Hana asked sleepily.",
        "\"No, sweetheart,\" Luna said, kissing her head. \"They lived happily ever now.\"",
        "In the glow of the TV screen, three controllers sat side by side - a family of gamers, writing their story one level at a time.",
        "Continue? → Yes ❤️"
      ]
    }
  ]

  const toggleFavorite = (chapterId: number) => {
    setFavorites(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30 mb-6">
            <Book className="w-4 h-4 text-pink-400" />
            <span className="text-sm text-pink-300">Manhwa Romance</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-red-400">
              Pixels of Love
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A heartwarming tale of two gamers finding love in the most unexpected place
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chapter List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 sticky top-24">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                Chapters
              </h2>
              <div className="space-y-2">
                {story.map((chapter, index) => (
                  <motion.button
                    key={chapter.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentChapter(index)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      currentChapter === index
                        ? 'bg-gradient-to-r from-pink-500/30 to-red-500/30 border border-pink-500/50'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{chapter.emoji}</span>
                        <div>
                          <p className="font-semibold">Chapter {chapter.id}</p>
                          <p className="text-sm text-gray-400">{chapter.title}</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(chapter.id)
                        }}
                        className="p-2 hover:scale-110 transition-transform"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favorites.includes(chapter.id)
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-400'
                          }`}
                        />
                      </button>
                    </div>
                  </motion.button>
                ))}
              </div>
              
              {/* Reading Stats */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl">
                <p className="text-sm text-gray-300 mb-2">Your Reading Stats</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">
                    Chapters Read: {currentChapter + 1}/10
                  </p>
                  <p className="text-xs text-gray-400">
                    Favorites: {favorites.length}
                  </p>
                  <p className="text-xs text-gray-400">
                    Romance Level: {currentChapter >= 2 ? '💕 Maximum' : '💗 Building'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Story Content */}
          <motion.div
            key={currentChapter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <span className="text-4xl">{story[currentChapter].emoji}</span>
                  {story[currentChapter].title}
                </h2>
                <div className="flex items-center gap-2">
                  {currentChapter === 0 && <Sun className="w-5 h-5 text-yellow-400" />}
                  {currentChapter === 1 && <Moon className="w-5 h-5 text-blue-400" />}
                  {currentChapter === 2 && <Star className="w-5 h-5 text-purple-400" />}
                  {currentChapter === 3 && <Coffee className="w-5 h-5 text-amber-400" />}
                  {currentChapter === 4 && <Heart className="w-5 h-5 text-red-400" />}
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                {story[currentChapter].content.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-gray-300 leading-relaxed mb-4 text-lg"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentChapter(Math.max(0, currentChapter - 1))}
                  disabled={currentChapter === 0}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Previous Chapter
                </button>
                <button
                  onClick={() => setCurrentChapter(Math.min(story.length - 1, currentChapter + 1))}
                  disabled={currentChapter === story.length - 1}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next Chapter
                </button>
              </div>
            </div>

            {/* Fun Reader Reactions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-6 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10"
            >
              <p className="text-sm text-gray-400 mb-3">Reader Reactions</p>
              <div className="flex gap-3 flex-wrap">
                {['😍', '🥺', '💕', '😭', '🥰', '✨', '💗', '🌸'].map((emoji, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-2xl hover:drop-shadow-glow"
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}