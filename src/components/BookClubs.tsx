import React, { useState } from 'react';
import { Users, Calendar, MessageCircle, BookOpen, Crown, Lock, Sparkles, Clock } from 'lucide-react';

interface BookClub {
  id: string;
  name: string;
  description: string;
  currentBook: {
    title: string;
    author: string;
    cover: string;
    progress: number;
  };
  members: number;
  maxMembers: number;
  nextMeeting: Date;
  category: string;
  isPrivate: boolean;
  isPremium: boolean;
  host: string;
  hostAvatar: string;
}

export const BookClubs: React.FC = () => {
  const [clubs] = useState<BookClub[]>([
    {
      id: '1',
      name: 'MIDNIGHT READERS',
      description: 'Für alle Nachteulen die bis 3 Uhr morgens lesen!',
      currentBook: {
        title: 'The Seven Husbands of Evelyn Hugo',
        author: 'Taylor Jenkins Reid',
        cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
        progress: 65
      },
      members: 28,
      maxMembers: 30,
      nextMeeting: new Date('2025-07-08T22:00:00'),
      category: 'romance',
      isPrivate: false,
      isPremium: false,
      host: 'NightOwl23',
      hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5'
    },
    {
      id: '2',
      name: 'FANTASY ELITE',
      description: 'Nur für die krassesten Fantasy-Fans! 🐉',
      currentBook: {
        title: 'The Way of Kings',
        author: 'Brandon Sanderson',
        cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
        progress: 42
      },
      members: 45,
      maxMembers: 50,
      nextMeeting: new Date('2025-07-07T19:00:00'),
      category: 'fantasy',
      isPrivate: true,
      isPremium: true,
      host: 'DragonMaster',
      hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=6'
    },
    {
      id: '3',
      name: 'COFFEE & CRIME',
      description: 'Thriller + Kaffee = Perfekter Sonntag ☕',
      currentBook: {
        title: 'The Girl with the Dragon Tattoo',
        author: 'Stieg Larsson',
        cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop',
        progress: 88
      },
      members: 19,
      maxMembers: 25,
      nextMeeting: new Date('2025-07-06T10:00:00'),
      category: 'thriller',
      isPrivate: false,
      isPremium: false,
      host: 'CrimeBuff',
      hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=7'
    }
  ]);

  const [userClubs] = useState(['1', '3']);

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'romance': return 'from-pink-500 to-purple-500';
      case 'fantasy': return 'from-purple-500 to-indigo-500';
      case 'thriller': return 'from-red-500 to-orange-500';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const getTimeUntilMeeting = (date: Date) => {
    const hours = Math.floor((date.getTime() - new Date().getTime()) / (1000 * 60 * 60));
    if (hours < 24) return `in ${hours} Stunden`;
    const days = Math.floor(hours / 24);
    return `in ${days} Tagen`;
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-white flex items-center gap-3">
          <Users className="w-8 h-8 text-purple-400" />
          BOOK CLUBS
        </h2>
        
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-6 rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          CLUB ERSTELLEN
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div
            key={club.id}
            className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <div className={`h-2 bg-gradient-to-r ${getCategoryStyle(club.category)}`} />
            
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-black text-white mb-1 flex items-center gap-2">
                    {club.name}
                    {club.isPremium && <Crown className="w-5 h-5 text-yellow-400" />}
                    {club.isPrivate && <Lock className="w-4 h-4 text-gray-400" />}
                  </h3>
                  <p className="text-sm text-gray-400">{club.description}</p>
                </div>
              </div>

              <div className="flex gap-3 mb-4">
                <img
                  src={club.currentBook.cover}
                  alt={club.currentBook.title}
                  className="w-16 h-24 object-cover rounded shadow-lg"
                />
                
                <div className="flex-1">
                  <h4 className="font-bold text-white text-sm mb-1">{club.currentBook.title}</h4>
                  <p className="text-xs text-gray-400 mb-2">{club.currentBook.author}</p>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Progress</span>
                      <span>{club.currentBook.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${getCategoryStyle(club.category)} transition-all duration-500`}
                        style={{ width: `${club.currentBook.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{club.members}/{club.maxMembers} Mitglieder</span>
                  </div>
                  
                  {club.members >= club.maxMembers && (
                    <span className="text-xs text-red-400 font-bold">VOLL</span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>Nächstes Treffen {getTimeUntilMeeting(club.nextMeeting)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <img
                    src={club.hostAvatar}
                    alt={club.host}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-400">
                    Host: <span className="text-purple-400 font-bold">{club.host}</span>
                  </span>
                </div>
              </div>

              {userClubs.includes(club.id) ? (
                <div className="flex gap-2">
                  <button className="flex-1 bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    CHAT
                  </button>
                  <button className="flex-1 bg-gray-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors">
                    VERLASSEN
                  </button>
                </div>
              ) : (
                <button
                  disabled={club.members >= club.maxMembers}
                  className={`w-full font-bold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                    club.members >= club.maxMembers
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  {club.members >= club.maxMembers ? 'WARTELISTE' : 'BEITRETEN'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg p-6 border border-purple-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Crown className="w-6 h-6 text-yellow-400" />
              PREMIUM BOOK CLUBS
            </h4>
            <p className="text-gray-300">Exklusive Clubs mit Autoren-Meetups, Early Access und mehr!</p>
          </div>
          <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-black py-3 px-6 rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            UPGRADE
          </button>
        </div>
      </div>
    </div>
  );
};