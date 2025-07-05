import React, { useState } from 'react';
import { Trophy, Crown, Medal, TrendingUp, Fire, Book, Clock, Target } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  level: number;
  xp: number;
  booksRead: number;
  readingStreak: number;
  achievements: number;
  movement: 'up' | 'down' | 'same';
  movementValue?: number;
}

export const Leaderboards: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'alltime'>('weekly');
  const [category, setCategory] = useState<'xp' | 'books' | 'streak' | 'speed'>('xp');

  const [leaderboard] = useState<LeaderboardEntry[]>([
    {
      rank: 1,
      username: 'BookDragon92',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=11',
      level: 42,
      xp: 15420,
      booksRead: 89,
      readingStreak: 156,
      achievements: 45,
      movement: 'same'
    },
    {
      rank: 2,
      username: 'ReadingNinja',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=12',
      level: 38,
      xp: 14200,
      booksRead: 76,
      readingStreak: 89,
      achievements: 38,
      movement: 'up',
      movementValue: 2
    },
    {
      rank: 3,
      username: 'PageTurner',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=13',
      level: 35,
      xp: 13500,
      booksRead: 72,
      readingStreak: 45,
      achievements: 32,
      movement: 'down',
      movementValue: 1
    },
    {
      rank: 4,
      username: 'BookwormQueen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=14',
      level: 33,
      xp: 12800,
      booksRead: 68,
      readingStreak: 78,
      achievements: 29,
      movement: 'up',
      movementValue: 3
    },
    {
      rank: 5,
      username: 'LiteraryLegend',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=15',
      level: 31,
      xp: 11900,
      booksRead: 64,
      readingStreak: 34,
      achievements: 27,
      movement: 'same'
    }
  ]);

  const [userRank] = useState({
    rank: 42,
    username: 'Du',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
    level: 12,
    xp: 4200,
    booksRead: 23,
    readingStreak: 7,
    achievements: 8,
    movement: 'up' as const,
    movementValue: 5
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2: return <Medal className="w-6 h-6 text-gray-300" />;
      case 3: return <Medal className="w-6 h-6 text-orange-400" />;
      default: return <span className="text-2xl font-black text-gray-500">#{rank}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border-yellow-500/50';
      case 2: return 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-500/50';
      case 3: return 'bg-gradient-to-r from-orange-900/50 to-orange-800/50 border-orange-500/50';
      default: return 'bg-gray-800 border-gray-700';
    }
  };

  const getValue = (entry: LeaderboardEntry) => {
    switch (category) {
      case 'xp': return `${entry.xp.toLocaleString()} XP`;
      case 'books': return `${entry.booksRead} Bücher`;
      case 'streak': return `${entry.readingStreak} Tage`;
      case 'speed': return `${Math.round(entry.booksRead / 30 * 100) / 100} B/Tag`;
      default: return entry.xp;
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-white flex items-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-400" />
          LEADERBOARDS
        </h2>

        <div className="flex gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-purple-500 outline-none"
          >
            <option value="xp">XP Gesamt</option>
            <option value="books">Bücher gelesen</option>
            <option value="streak">Lese-Streak</option>
            <option value="speed">Lesegeschwindigkeit</option>
          </select>

          <div className="flex bg-gray-800 rounded-lg p-1">
            {(['daily', 'weekly', 'monthly', 'alltime'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-4 py-2 rounded font-bold text-sm transition-all duration-200 ${
                  timeframe === tf
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tf === 'daily' && 'TAG'}
                {tf === 'weekly' && 'WOCHE'}
                {tf === 'monthly' && 'MONAT'}
                {tf === 'alltime' && 'GESAMT'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {leaderboard.map((entry) => (
          <div
            key={entry.rank}
            className={`relative p-4 rounded-lg border-2 ${getRankStyle(entry.rank)} transition-all duration-300 hover:scale-[1.02]`}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12">
                {getRankIcon(entry.rank)}
              </div>

              <img
                src={entry.avatar}
                alt={entry.username}
                className="w-12 h-12 rounded-full ring-2 ring-purple-500/30"
              />

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">{entry.username}</h3>
                  <div className="bg-purple-600/20 text-purple-400 text-xs px-2 py-1 rounded font-bold">
                    LVL {entry.level}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Book className="w-4 h-4" />
                    {entry.booksRead}
                  </span>
                  <span className="flex items-center gap-1">
                    <Fire className="w-4 h-4" />
                    {entry.readingStreak}d
                  </span>
                  <span className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    {entry.achievements}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-black text-white">{getValue(entry)}</div>
                
                {entry.movement !== 'same' && (
                  <div className={`flex items-center justify-end gap-1 text-sm font-bold ${
                    entry.movement === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <TrendingUp className={`w-4 h-4 ${entry.movement === 'down' ? 'rotate-180' : ''}`} />
                    {entry.movementValue}
                  </div>
                )}
              </div>
            </div>

            {entry.rank <= 3 && (
              <div className="absolute -top-1 -right-1">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${
                  entry.rank === 1 ? 'from-yellow-400 to-orange-500' :
                  entry.rank === 2 ? 'from-gray-300 to-gray-500' :
                  'from-orange-400 to-orange-600'
                } flex items-center justify-center text-xs font-black text-gray-900 animate-pulse`}>
                  {entry.rank}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="relative mt-8 p-4 rounded-lg bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-2 border-purple-500">
        <div className="absolute -top-3 left-4 bg-gray-900 px-2">
          <span className="text-sm font-bold text-purple-400">DEINE POSITION</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12">
            <span className="text-2xl font-black text-purple-400">#{userRank.rank}</span>
          </div>

          <img
            src={userRank.avatar}
            alt={userRank.username}
            className="w-12 h-12 rounded-full ring-2 ring-purple-500"
          />

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">{userRank.username}</h3>
              <div className="bg-purple-600/20 text-purple-400 text-xs px-2 py-1 rounded font-bold">
                LVL {userRank.level}
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Book className="w-4 h-4" />
                {userRank.booksRead}
              </span>
              <span className="flex items-center gap-1">
                <Fire className="w-4 h-4" />
                {userRank.readingStreak}d
              </span>
              <span className="flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                {userRank.achievements}
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-black text-white">{getValue(userRank)}</div>
            
            <div className="flex items-center justify-end gap-1 text-sm font-bold text-green-400">
              <TrendingUp className="w-4 h-4" />
              {userRank.movementValue}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-black text-white">TOP 10</div>
          <div className="text-sm text-gray-400">Noch 32 Plätze!</div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-black text-white">WEEKLY</div>
          <div className="text-sm text-gray-400">Endet in 3 Tagen</div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <Fire className="w-8 h-8 text-orange-400 mx-auto mb-2" />
          <div className="text-2xl font-black text-white">+248 XP</div>
          <div className="text-sm text-gray-400">Heute verdient</div>
        </div>
      </div>
    </div>
  );
};