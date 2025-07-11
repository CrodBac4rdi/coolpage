import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, X, RotateCcw, ChevronRight, Zap } from 'lucide-react'
import { cn } from '../utils/cn'

interface QuizQuestion {
  image: string
  correctAnswer: string
  options: string[]
  difficulty: 'easy' | 'medium' | 'hard'
}

// Quiz data - popular anime characters
const quizData: QuizQuestion[] = [
  {
    image: 'https://cdn.myanimelist.net/images/characters/7/487479.jpg',
    correctAnswer: 'Kaguya Shinomiya',
    options: ['Kaguya Shinomiya', 'Chika Fujiwara', 'Ai Hayasaka', 'Miko Iino'],
    difficulty: 'easy'
  },
  {
    image: 'https://cdn.myanimelist.net/images/characters/4/396282.jpg',
    correctAnswer: 'Zero Two',
    options: ['Zero Two', 'Ichigo', 'Kokoro', 'Miku'],
    difficulty: 'easy'
  },
  {
    image: 'https://cdn.myanimelist.net/images/characters/2/371635.jpg',
    correctAnswer: 'Tohru Honda',
    options: ['Tohru Honda', 'Kyo Sohma', 'Yuki Sohma', 'Kagura Sohma'],
    difficulty: 'medium'
  },
  {
    image: 'https://cdn.myanimelist.net/images/characters/9/493291.jpg',
    correctAnswer: 'Marin Kitagawa',
    options: ['Marin Kitagawa', 'Shizuku Kuroe', 'Sajuna Inui', 'Shinju Inui'],
    difficulty: 'easy'
  },
  {
    image: 'https://cdn.myanimelist.net/images/characters/10/480287.jpg',
    correctAnswer: 'Shouko Komi',
    options: ['Shouko Komi', 'Hitohito Tadano', 'Najimi Osana', 'Ren Yamai'],
    difficulty: 'easy'
  },
  {
    image: 'https://cdn.myanimelist.net/images/characters/11/224769.jpg',
    correctAnswer: 'Taiga Aisaka',
    options: ['Taiga Aisaka', 'Minori Kushieda', 'Ami Kawashima', 'Yuri Koigakubo'],
    difficulty: 'medium'
  },
  {
    image: 'https://cdn.myanimelist.net/images/characters/8/477925.jpg',
    correctAnswer: 'Violet Evergarden',
    options: ['Violet Evergarden', 'Cattleya Baudelaire', 'Iris Cannary', 'Erica Brown'],
    difficulty: 'easy'
  },
  {
    image: 'https://cdn.myanimelist.net/images/characters/9/318223.jpg',
    correctAnswer: 'Kaori Miyazono',
    options: ['Kaori Miyazono', 'Tsubaki Sawabe', 'Emi Igawa', 'Nagi Aiza'],
    difficulty: 'medium'
  },
  {
    image: 'https://cdn.myanimelist.net/images/characters/11/345877.jpg',
    correctAnswer: 'Mai Sakurajima',
    options: ['Mai Sakurajima', 'Tomoe Koga', 'Rio Futaba', 'Nodoka Toyohama'],
    difficulty: 'easy'
  },
  {
    image: 'https://cdn.myanimelist.net/images/characters/5/485960.jpg',
    correctAnswer: 'Shikimori',
    options: ['Shikimori', 'Izumi', 'Kamiya', 'Hachimitsu'],
    difficulty: 'hard'
  }
]

export default function AnimeQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)
  const [streak, setStreak] = useState(0)
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('anime_quiz_highscore')
    return saved ? parseInt(saved) : 0
  })

  // Shuffle questions on mount
  const [questions] = useState(() => 
    [...quizData].sort(() => Math.random() - 0.5).slice(0, 10)
  )

  // Timer effect
  useEffect(() => {
    if (!showResult && !gameOver && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer('')
    }
  }, [timeLeft, showResult, gameOver])

  const handleAnswer = (answer: string) => {
    if (showResult) return
    
    setSelectedAnswer(answer)
    setShowResult(true)
    
    const isCorrect = answer === questions[currentQuestion].correctAnswer
    if (isCorrect) {
      const points = questions[currentQuestion].difficulty === 'easy' ? 10 : 
                    questions[currentQuestion].difficulty === 'medium' ? 20 : 30
      const streakBonus = streak * 5
      setScore(score + points + streakBonus)
      setStreak(streak + 1)
    } else {
      setStreak(0)
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
        setTimeLeft(15)
      } else {
        setGameOver(true)
        if (score > highScore) {
          setHighScore(score)
          localStorage.setItem('anime_quiz_highscore', score.toString())
        }
      }
    }, 2000)
  }

  const resetGame = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameOver(false)
    setTimeLeft(15)
    setStreak(0)
  }

  const difficultyColors = {
    easy: 'bg-green-500',
    medium: 'bg-yellow-500',
    hard: 'bg-red-500'
  }

  return (
    <div className="min-h-[600px] bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-800 dark:to-purple-900 rounded-3xl p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Anime Character Quiz
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Can you name these anime characters?
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400">High Score</div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{highScore}</div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!gameOver ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              {/* Progress and Score */}
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Question {currentQuestion + 1} of {questions.length}
                </div>
                <div className="flex items-center gap-4">
                  {streak > 0 && (
                    <div className="flex items-center gap-1 text-orange-500">
                      <Zap className="w-5 h-5" />
                      <span className="font-bold">{streak}x Streak!</span>
                    </div>
                  )}
                  <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    Score: {score}
                  </div>
                </div>
              </div>

              {/* Timer Bar */}
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-6 overflow-hidden">
                <motion.div
                  className={cn(
                    "h-full transition-all duration-1000",
                    timeLeft > 10 ? "bg-green-500" : 
                    timeLeft > 5 ? "bg-yellow-500" : "bg-red-500"
                  )}
                  style={{ width: `${(timeLeft / 15) * 100}%` }}
                />
              </div>

              {/* Character Image */}
              <div className="relative mb-6">
                <div className={cn(
                  "absolute top-4 right-4 px-3 py-1 rounded-full text-white text-sm font-medium",
                  difficultyColors[questions[currentQuestion].difficulty]
                )}>
                  {questions[currentQuestion].difficulty}
                </div>
                <img
                  src={questions[currentQuestion].image}
                  alt="Guess the character"
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Character+Image'
                  }}
                />
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((option, index) => {
                  const isCorrect = option === questions[currentQuestion].correctAnswer
                  const isSelected = option === selectedAnswer
                  
                  return (
                    <motion.button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      disabled={showResult}
                      className={cn(
                        "p-4 rounded-xl font-medium transition-all",
                        showResult && isCorrect && "bg-green-500 text-white",
                        showResult && isSelected && !isCorrect && "bg-red-500 text-white",
                        !showResult && "bg-white dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/30",
                        showResult && !isSelected && !isCorrect && "bg-gray-200 dark:bg-gray-700 opacity-50"
                      )}
                      whileHover={!showResult ? { scale: 1.05 } : {}}
                      whileTap={!showResult ? { scale: 0.95 } : {}}
                    >
                      {option}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
              <h3 className="text-3xl font-bold mb-4">Quiz Complete!</h3>
              <div className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {score} Points
              </div>
              {score > highScore && (
                <p className="text-lg text-green-500 mb-6">New High Score! 🎉</p>
              )}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium flex items-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                  Play Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}