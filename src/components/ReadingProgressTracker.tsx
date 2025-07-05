import React, { useState, useEffect } from 'react';
import { Book, Trophy, TrendingUp, Clock, Award, Flame } from 'lucide-react';

interface ReadingProgress {
  bookId: string;
  title: string;
  currentPage: number;
  totalPages: number;
  startDate: Date;
  lastRead: Date;
  readingTime: number;
  cover: string;
}

export const ReadingProgressTracker: React.FC = () => {
  const [activeBooks, setActiveBooks] = useState<ReadingProgress[]>([
    {
      bookId: '1',
      title: 'The Midnight Library',
      currentPage: 156,
      totalPages: 288,
      startDate: new Date('2025-06-01'),
      lastRead: new Date(),
      readingTime: 240,
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop'
    },
    {
      bookId: '2',
      title: 'Project Hail Mary',
      currentPage: 89,
      totalPages: 482,
      startDate: new Date('2025-06-15'),
      lastRead: new Date('2025-06-20'),
      readingTime: 180,
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop'
    }
  ]);

  const [streakDays, setStreakDays] = useState(7);
  const [totalBooksRead, setTotalBooksRead] = useState(42);
  const [readingGoal, setReadingGoal] = useState(50);

  const calculateProgress = (current: number, total: number) => (current / total) * 100;

  const formatReadingTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const calculatePace = (book: ReadingProgress) => {
    const daysReading = Math.ceil((new Date().getTime() - book.startDate.getTime()) / (1000 * 60 * 60 * 24));
    const pagesPerDay = book.currentPage / daysReading;
    const daysLeft = Math.ceil((book.totalPages - book.currentPage) / pagesPerDay);
    return { pagesPerDay: Math.round(pagesPerDay), daysLeft };
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-white flex items-center gap-3">
          <Book className="w-8 h-8 text-purple-400" />
          READING TRACKER
        </h2>
        
        <div className="flex gap-4">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-3 flex items-center gap-2">
            <Flame className="w-6 h-6 text-white" />
            <div>
              <div className="text-2xl font-black text-white">{streakDays}</div>
              <div className="text-xs text-orange-100">DAY STREAK</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg p-3 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-white" />
            <div>
              <div className="text-2xl font-black text-white">{totalBooksRead}/{readingGoal}</div>
              <div className="text-xs text-purple-100">2025 GOAL</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {activeBooks.map((book) => {
          const progress = calculateProgress(book.currentPage, book.totalPages);
          const pace = calculatePace(book);
          
          return (
            <div key={book.bookId} className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="flex gap-4 p-4">
                <img 
                  src={book.cover} 
                  alt={book.title}
                  className="w-20 h-28 object-cover rounded shadow-lg"
                />
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{book.title}</h3>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Seite {book.currentPage} von {book.totalPages}</span>
                      <span>{progress.toFixed(0)}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 relative"
                        style={{ width: `${progress}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="bg-gray-700/50 rounded p-2">
                      <div className="flex items-center gap-1 text-gray-400 mb-1">
                        <Clock className="w-3 h-3" />
                        <span>Zeit</span>
                      </div>
                      <div className="font-bold text-white">{formatReadingTime(book.readingTime)}</div>
                    </div>
                    
                    <div className="bg-gray-700/50 rounded p-2">
                      <div className="flex items-center gap-1 text-gray-400 mb-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>Tempo</span>
                      </div>
                      <div className="font-bold text-white">{pace.pagesPerDay} S./Tag</div>
                    </div>
                    
                    <div className="bg-gray-700/50 rounded p-2">
                      <div className="flex items-center gap-1 text-gray-400 mb-1">
                        <Award className="w-3 h-3" />
                        <span>Fertig in</span>
                      </div>
                      <div className="font-bold text-white">{pace.daysLeft} Tagen</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
        <Book className="w-5 h-5" />
        NEUES BUCH STARTEN
      </button>
    </div>
  );
};