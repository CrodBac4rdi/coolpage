import React, { useState } from 'react';
import { Trophy, Star, Zap, Target, Medal, Crown, Sparkles, Lock } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedDate?: Date;
}

export const AchievementSystem: React.FC = () => {
  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'BOOKWORM',
      description: 'Lies 10 Bücher',
      icon: <Trophy className="w-8 h-8" />,
      unlocked: true,
      progress: 10,
      maxProgress: 10,
      rarity: 'common',
      unlockedDate: new Date('2025-05-15')
    },
    {
      id: '2',
      title: 'SPEED READER',
      description: 'Lies 5 Bücher in einem Monat',
      icon: <Zap className="w-8 h-8" />,
      unlocked: true,
      progress: 5,
      maxProgress: 5,
      rarity: 'rare',
      unlockedDate: new Date('2025-06-01')
    },
    {
      id: '3',
      title: 'GENRE MASTER',
      description: 'Lies 10 verschiedene Genres',
      icon: <Star className="w-8 h-8" />,
      unlocked: false,
      progress: 7,
      maxProgress: 10,
      rarity: 'rare'
    },
    {
      id: '4',
      title: 'READING LEGEND',
      description: 'Lies 100 Bücher',
      icon: <Crown className="w-8 h-8" />,
      unlocked: false,
      progress: 42,
      maxProgress: 100,
      rarity: 'legendary'
    },
    {
      id: '5',
      title: 'NIGHT OWL',
      description: 'Lies 20 Stunden nachts',
      icon: <Medal className="w-8 h-8" />,
      unlocked: false,
      progress: 12,
      maxProgress: 20,
      rarity: 'epic'
    },
    {
      id: '6',
      title: 'COMPLETIONIST',
      description: 'Beende 50 Bücher ohne Unterbrechung',
      icon: <Target className="w-8 h-8" />,
      unlocked: false,
      progress: 23,
      maxProgress: 50,
      rarity: 'epic'
    }
  ]);

  const [totalPoints] = useState(4200);
  const [level] = useState(12);
  const [nextLevelProgress] = useState(75);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-500';
      case 'rare': return 'border-blue-500';
      case 'epic': return 'border-purple-500';
      case 'legendary': return 'border-yellow-500';
      default: return 'border-gray-500';
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-white flex items-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-400" />
          ACHIEVEMENTS
        </h2>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-3xl font-black text-yellow-400">{totalPoints}</div>
            <div className="text-xs text-gray-400 uppercase">Total XP</div>
          </div>
          
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-purple-500 flex items-center justify-center bg-gray-800">
              <div className="text-center">
                <div className="text-2xl font-black text-white">{level}</div>
                <div className="text-xs text-purple-400">LEVEL</div>
              </div>
            </div>
            <svg className="absolute inset-0 w-20 h-20 -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="38"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-gray-700"
              />
              <circle
                cx="40"
                cy="40"
                r="38"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 38}`}
                strokeDashoffset={`${2 * Math.PI * 38 * (1 - nextLevelProgress / 100)}`}
                className="text-purple-400 transition-all duration-500"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`relative overflow-hidden rounded-lg border-2 ${getRarityBorder(achievement.rarity)} ${
              achievement.unlocked ? 'bg-gray-800' : 'bg-gray-800/50'
            } p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl`}
          >
            {!achievement.unlocked && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                <Lock className="w-8 h-8 text-gray-500" />
              </div>
            )}

            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${getRarityColor(achievement.rarity)} opacity-20 blur-2xl`} />
            
            <div className="flex items-start gap-3 mb-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${getRarityColor(achievement.rarity)} text-white`}>
                {achievement.icon}
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-white text-sm">{achievement.title}</h3>
                <p className="text-xs text-gray-400">{achievement.description}</p>
              </div>
              
              {achievement.unlocked && (
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400">
                <span>Progress</span>
                <span>{achievement.progress}/{achievement.maxProgress}</span>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getRarityColor(achievement.rarity)} transition-all duration-500`}
                  style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                />
              </div>
              
              {achievement.unlocked && achievement.unlockedDate && (
                <div className="text-xs text-gray-500 text-right">
                  Freigeschaltet: {achievement.unlockedDate.toLocaleDateString('de-DE')}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg p-4 border border-purple-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold text-white mb-1">NÄCHSTE BELOHNUNG</h4>
            <p className="text-sm text-gray-300">Erreiche Level 15 für exklusive Theme-Freischaltung!</p>
          </div>
          <div className="text-3xl font-black text-purple-400">
            {15 - level} LEVEL
          </div>
        </div>
      </div>
    </div>
  );
};