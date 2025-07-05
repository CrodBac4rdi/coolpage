import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Reply, TrendingUp, Users, Hash, Fire, Clock } from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  author: string;
  avatar: string;
  content: string;
  category: string;
  likes: number;
  replies: number;
  views: number;
  timestamp: Date;
  isPinned?: boolean;
  isHot?: boolean;
}

export const CommunityForum: React.FC = () => {
  const [posts] = useState<ForumPost[]>([
    {
      id: '1',
      title: 'KRASSE PLOT-TWIST in "The Silent Patient" - WER HAT ES KOMMEN SEHEN?!',
      author: 'BookNinja42',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      content: 'Alter, ich bin grade fertig geworden und mein Kopf explodiert immer noch...',
      category: 'thriller',
      likes: 234,
      replies: 89,
      views: 1420,
      timestamp: new Date('2025-07-05T10:30:00'),
      isPinned: true,
      isHot: true
    },
    {
      id: '2',
      title: 'Suche Romance-Empfehlungen mit STARKEN Heldinnen 💪',
      author: 'ReadingQueen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
      content: 'Bin auf der Suche nach Romance mit badass Protagonistinnen. Keine damsels in distress!',
      category: 'romance',
      likes: 156,
      replies: 45,
      views: 890,
      timestamp: new Date('2025-07-05T09:15:00'),
      isHot: true
    },
    {
      id: '3',
      title: 'Book Club Start: "Project Hail Mary" - Wer ist dabei?',
      author: 'SciFiMaster',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
      content: 'Starte einen Book Club für Andy Weirs neues Meisterwerk! Treffen jeden Sonntag.',
      category: 'bookclub',
      likes: 78,
      replies: 23,
      views: 456,
      timestamp: new Date('2025-07-05T08:00:00')
    },
    {
      id: '4',
      title: 'Die BESTEN Fantasy-Welten ranked - Change my mind!',
      author: 'FantasyFreak',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
      content: '1. Middle-Earth, 2. Hogwarts, 3. Westeros... Kommt at me!',
      category: 'fantasy',
      likes: 312,
      replies: 156,
      views: 2100,
      timestamp: new Date('2025-07-04T22:30:00'),
      isHot: true
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'ALLE', icon: <Hash className="w-4 h-4" />, color: 'text-gray-400' },
    { id: 'hot', name: 'TRENDING', icon: <Fire className="w-4 h-4" />, color: 'text-orange-500' },
    { id: 'romance', name: 'ROMANCE', icon: <MessageSquare className="w-4 h-4" />, color: 'text-pink-500' },
    { id: 'thriller', name: 'THRILLER', icon: <MessageSquare className="w-4 h-4" />, color: 'text-red-500' },
    { id: 'fantasy', name: 'FANTASY', icon: <MessageSquare className="w-4 h-4" />, color: 'text-purple-500' },
    { id: 'bookclub', name: 'BOOK CLUBS', icon: <Users className="w-4 h-4" />, color: 'text-blue-500' }
  ];

  const getTimeAgo = (date: Date) => {
    const hours = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'gerade eben';
    if (hours < 24) return `vor ${hours}h`;
    const days = Math.floor(hours / 24);
    return `vor ${days}d`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'romance': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'thriller': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'fantasy': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'bookclub': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : selectedCategory === 'hot'
    ? posts.filter(p => p.isHot)
    : posts.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-gray-900 rounded-lg shadow-2xl">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-purple-400" />
            COMMUNITY FORUM
          </h2>
          
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-6 rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            NEUER POST
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-white text-gray-900 shadow-lg transform scale-105'
                  : `bg-gray-800 ${cat.color} hover:bg-gray-700`
              }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-gray-800">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="p-6 hover:bg-gray-800/50 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex gap-4">
              <img
                src={post.avatar}
                alt={post.author}
                className="w-12 h-12 rounded-full ring-2 ring-purple-500/30"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      {post.isPinned && (
                        <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded font-bold">
                          PINNED
                        </span>
                      )}
                      {post.isHot && (
                        <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded font-bold flex items-center gap-1">
                          <Fire className="w-3 h-3" />
                          HOT
                        </span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded font-bold border ${getCategoryColor(post.category)}`}>
                        {post.category.toUpperCase()}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white hover:text-purple-400 transition-colors">
                      {post.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {getTimeAgo(post.timestamp)}
                  </div>
                </div>

                <p className="text-gray-400 mb-3">{post.content}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="font-bold text-purple-400">{post.author}</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <button className="flex items-center gap-1 text-gray-400 hover:text-purple-400 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="font-bold">{post.likes}</span>
                    </button>
                    
                    <button className="flex items-center gap-1 text-gray-400 hover:text-purple-400 transition-colors">
                      <Reply className="w-4 h-4" />
                      <span className="font-bold">{post.replies}</span>
                    </button>
                    
                    <div className="flex items-center gap-1 text-gray-500">
                      <TrendingUp className="w-4 h-4" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-gray-800">
        <button className="w-full py-3 text-center text-purple-400 hover:text-purple-300 font-bold transition-colors">
          MEHR POSTS LADEN
        </button>
      </div>
    </div>
  );
};