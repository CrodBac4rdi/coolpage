import { motion, AnimatePresence } from 'framer-motion'
import { Gamepad2, HelpCircle, Dice6, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { manhwaStories } from '../data/manhwaStories'
import { storyQuestions } from '../data/storyQuestions'

export default function Games() {
  const [selectedGame, setSelectedGame] = useState<string | null>('qa-game')
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState(0)
  const [diceResult, setDiceResult] = useState<number | null>(null)
  const [randomStory, setRandomStory] = useState<typeof manhwaStories[0] | null>(null)
  const [isRolling, setIsRolling] = useState(false)

  const games = [
    {
      id: 'qa-game',
      name: 'Story Q&A',
      icon: <HelpCircle className="w-6 h-6" />,
      description: 'Test your knowledge about our stories!',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'random-story',
      name: 'Story Dice',
      icon: <Dice6 className="w-6 h-6" />,
      description: 'Roll the dice to discover a random story!',
      color: 'from-green-500 to-teal-500'
    }
  ]

  // Get questions for current story
  const currentStory = manhwaStories[selectedStoryIndex]
  const currentStoryQuestions = storyQuestions.find(sq => sq.storyId === currentStory?.id)?.questions || [
    {
      question: "In welchem Genre ist diese Geschichte?",
      answer: currentStory?.genre?.join(", ") || "Romance"
    },
    {
      question: "Wie viele Kapitel hat diese Story?",
      answer: `${currentStory?.chapters?.length || 0} Kapitel`
    },
    {
      question: "Wer ist der Autor?",
      answer: currentStory?.author || "Digital Manhwa Studio"
    },
    {
      question: "Ist diese Story für Erwachsene?",
      answer: currentStory?.mature ? "Ja, 18+ Content" : "Nein, für alle Altersgruppen"
    }
  ]

  const handleRollDice = () => {
    setIsRolling(true)
    setRandomStory(null)
    
    // Animate dice roll
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      setDiceResult(Math.floor(Math.random() * 6) + 1)
      rollCount++
      
      if (rollCount > 10) {
        clearInterval(rollInterval)
        const finalResult = Math.floor(Math.random() * manhwaStories.length)
        setDiceResult(finalResult + 1)
        setRandomStory(manhwaStories[finalResult])
        setIsRolling(false)
      }
    }, 100)
  }

  const nextQuestion = () => {
    setShowAnswer(false)
    if (currentQuestion < (currentStoryQuestions.length - 1)) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setCurrentQuestion(0)
    }
  }

  const prevQuestion = () => {
    setShowAnswer(false)
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else {
      setCurrentQuestion(currentStoryQuestions.length - 1)
    }
  }

  const changeStory = (direction: 'next' | 'prev') => {
    setShowAnswer(false)
    setCurrentQuestion(0)
    if (direction === 'next') {
      setSelectedStoryIndex((selectedStoryIndex + 1) % manhwaStories.length)
    } else {
      setSelectedStoryIndex(selectedStoryIndex === 0 ? manhwaStories.length - 1 : selectedStoryIndex - 1)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-6">
            <Gamepad2 className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Mini Games</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Game Zone
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Take a break and play some fun mini-games!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Game Selector */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="space-y-2 sm:space-y-3">
              {games.map((game) => (
                  <motion.button
                    key={game.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedGame(game.id)}
                    className={`w-full p-3 sm:p-4 rounded-xl transition-all text-left ${
                      selectedGame === game.id
                        ? 'bg-white/20 border-2 border-white/30'
                        : 'bg-white/5 hover:bg-white/10 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-br ${game.color}`}>
                        {game.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                          {game.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">{game.description}</p>
                      </div>
                    </div>
                  </motion.button>
              ))}
            </div>

            {/* Game Stats */}
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                📊 Your Stats
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-purple-500/10 rounded-lg">
                  <span className="text-xs sm:text-sm">Q&A Score</span>
                  <span className="text-xs sm:text-sm font-bold">{score}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-green-500/10 rounded-lg">
                  <span className="text-xs sm:text-sm">Stories Discovered</span>
                  <span className="text-xs sm:text-sm font-bold">{randomStory ? 1 : 0}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-blue-500/10 rounded-lg">
                  <span className="text-xs sm:text-sm">Total Stories</span>
                  <span className="text-xs sm:text-sm font-bold">{manhwaStories.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Game Area */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <AnimatePresence mode="wait">
              {selectedGame === 'qa-game' && (
                <motion.div
                  key="qa-game"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-xl border border-white/10"
                >
                  <div className="max-w-2xl mx-auto">
                    {/* Story Selector */}
                    <div className="mb-6 flex items-center justify-between">
                      <button
                        onClick={() => changeStory('prev')}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div className="text-center">
                        <h3 className="text-xl font-bold">{manhwaStories[selectedStoryIndex]?.title}</h3>
                        <p className="text-sm text-gray-400">{manhwaStories[selectedStoryIndex]?.genre?.join(", ")}</p>
                      </div>
                      <button
                        onClick={() => changeStory('next')}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Question Card */}
                    <div className="bg-white/5 rounded-xl p-6 mb-4">
                      <div className="mb-4">
                        <span className="text-sm text-purple-400">Frage {currentQuestion + 1} von {currentStoryQuestions.length}</span>
                      </div>
                      <h4 className="text-lg font-semibold mb-4">
                        {currentStoryQuestions[currentQuestion]?.question}
                      </h4>
                      
                      <AnimatePresence>
                        {showAnswer && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-4 p-4 bg-green-500/20 rounded-lg border border-green-500/30"
                          >
                            <p className="text-green-300">
                              {currentStoryQuestions[currentQuestion]?.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Controls */}
                    <div className="flex gap-3">
                      <button
                        onClick={prevQuestion}
                        className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                      >
                        Vorherige
                      </button>
                      <button
                        onClick={() => {
                          setShowAnswer(!showAnswer)
                          if (!showAnswer) setScore(score + 1)
                        }}
                        className="flex-1 px-4 py-2 bg-purple-500/30 hover:bg-purple-500/40 rounded-lg transition-colors font-semibold"
                      >
                        {showAnswer ? 'Verstecken' : 'Antwort zeigen'}
                      </button>
                      <button
                        onClick={nextQuestion}
                        className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                      >
                        Nächste
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedGame === 'random-story' && (
                <motion.div
                  key="random-story"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-gradient-to-br from-green-900/20 to-teal-900/20 rounded-2xl sm:rounded-3xl p-8 sm:p-12 backdrop-blur-xl border border-white/10 text-center"
                >
                  <h3 className="text-2xl font-bold mb-6">Story Würfel</h3>
                  
                  {/* Dice Display */}
                  <div className="mb-8">
                    <motion.div
                      animate={isRolling ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 0.5, repeat: isRolling ? Infinity : 0 }}
                      className="inline-block"
                    >
                      <Dice6 className="w-24 h-24 mx-auto text-green-400" />
                    </motion.div>
                    {diceResult && (
                      <p className="mt-4 text-3xl font-bold text-green-300">
                        Story #{diceResult}
                      </p>
                    )}
                  </div>

                  {/* Roll Button */}
                  {!randomStory && (
                    <button
                      onClick={handleRollDice}
                      disabled={isRolling}
                      className="px-8 py-3 bg-green-500/30 hover:bg-green-500/40 rounded-xl transition-colors font-semibold flex items-center gap-2 mx-auto disabled:opacity-50"
                    >
                      <RefreshCw className={`w-5 h-5 ${isRolling ? 'animate-spin' : ''}`} />
                      {isRolling ? 'Würfelt...' : 'Würfeln!'}
                    </button>
                  )}

                  {/* Story Result */}
                  <AnimatePresence>
                    {randomStory && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-8 p-6 bg-white/5 rounded-xl"
                      >
                        <div className="text-4xl mb-4">{randomStory.coverEmoji}</div>
                        <h4 className="text-xl font-bold mb-2">{randomStory.title}</h4>
                        <p className="text-gray-400 mb-4">{randomStory.description}</p>
                        <div className="flex gap-3 justify-center">
                          <Link
                            to={`/reader/${randomStory.id}`}
                            className="px-6 py-2 bg-green-500/30 hover:bg-green-500/40 rounded-lg transition-colors font-semibold"
                          >
                            Story lesen
                          </Link>
                          <button
                            onClick={() => {
                              setRandomStory(null)
                              setDiceResult(null)
                            }}
                            className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                          >
                            Nochmal würfeln
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          {[
            { label: 'Total Stories', value: `${manhwaStories.length}`, emoji: '📚' },
            { label: 'Total Chapters', value: `${manhwaStories.reduce((acc, story) => acc + (story.chapters?.length || 0), 0)}`, emoji: '📖' },
            { label: 'Genres', value: `${new Set(manhwaStories.flatMap(s => s.genre || [])).size}`, emoji: '🎭' },
            { label: 'Fun Level', value: 'MAX', emoji: '🎉' }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-white/10"
            >
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{stat.emoji}</div>
              <div className="text-lg sm:text-2xl font-bold">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}