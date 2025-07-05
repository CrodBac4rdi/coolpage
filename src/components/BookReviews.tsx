import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Award, TrendingUp, Filter } from 'lucide-react';

interface Review {
  id: string;
  bookTitle: string;
  bookAuthor: string;
  bookCover: string;
  reviewer: string;
  reviewerAvatar: string;
  reviewerLevel: number;
  rating: number;
  title: string;
  content: string;
  likes: number;
  comments: number;
  date: Date;
  tags: string[];
  verified: boolean;
}

export const BookReviews: React.FC = () => {
  const [reviews] = useState<Review[]>([
    {
      id: '1',
      bookTitle: 'It Ends with Us',
      bookAuthor: 'Colleen Hoover',
      bookCover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
      reviewer: 'BookishSoul',
      reviewerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=8',
      reviewerLevel: 15,
      rating: 5,
      title: 'EMOTIONAL ACHTERBAHN - Bereit eure Taschentücher vor! 😭',
      content: 'Dieses Buch hat mich komplett zerstört. Colleen Hoover weiß wie man Herzen bricht und wieder zusammenfügt...',
      likes: 342,
      comments: 56,
      date: new Date('2025-07-04T14:30:00'),
      tags: ['emotional', 'romance', 'trigger-warning'],
      verified: true
    },
    {
      id: '2',
      bookTitle: 'Fourth Wing',
      bookAuthor: 'Rebecca Yarros',
      bookCover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
      reviewer: 'DragonRider',
      reviewerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=9',
      reviewerLevel: 23,
      rating: 5,
      title: 'BESTE FANTASY-ROMANCE 2024! Drachen + Romance = PERFECTION',
      content: 'Ich konnte nicht aufhören zu lesen! Die Spannung, die Romance, die DRACHEN! Alles perfekt!',
      likes: 567,
      comments: 123,
      date: new Date('2025-07-03T19:00:00'),
      tags: ['fantasy', 'romance', 'page-turner'],
      verified: true
    },
    {
      id: '3',
      bookTitle: 'The Silent Patient',
      bookAuthor: 'Alex Michaelides',
      bookCover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop',
      reviewer: 'ThrillerJunkie',
      reviewerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=10',
      reviewerLevel: 19,
      rating: 4,
      title: 'Plot-Twist des Jahres! Mind = Blown 🤯',
      content: 'Der Twist am Ende... ICH KANN NICHT MEHR! Muss sofort nochmal von vorne lesen.',
      likes: 234,
      comments: 89,
      date: new Date('2025-07-02T11:15:00'),
      tags: ['thriller', 'plot-twist', 'psychological'],
      verified: false
    }
  ]);

  const [sortBy, setSortBy] = useState('trending');

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
        }`}
      />
    ));
  };

  const getLevelColor = (level: number) => {
    if (level >= 20) return 'from-yellow-400 to-orange-500';
    if (level >= 15) return 'from-purple-400 to-pink-500';
    if (level >= 10) return 'from-blue-400 to-indigo-500';
    return 'from-gray-400 to-gray-600';
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-white flex items-center gap-3">
          <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
          BOOK REVIEWS
        </h2>

        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-purple-500 outline-none"
          >
            <option value="trending">Trending</option>
            <option value="newest">Neueste</option>
            <option value="rating">Beste Bewertung</option>
            <option value="most-liked">Beliebteste</option>
          </select>

          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-6 rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            REVIEW SCHREIBEN
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-gray-800 rounded-lg p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex gap-4 mb-4">
              <img
                src={review.bookCover}
                alt={review.bookTitle}
                className="w-20 h-28 object-cover rounded shadow-lg"
              />

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-white">{review.bookTitle}</h3>
                    <p className="text-sm text-gray-400">{review.bookAuthor}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {renderStars(review.rating)}
                  </div>
                </div>

                <h4 className="text-lg font-bold text-purple-400 mb-2">{review.title}</h4>
                <p className="text-gray-300 mb-3">{review.content}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {review.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={review.reviewerAvatar}
                        alt={review.reviewer}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{review.reviewer}</span>
                          {review.verified && (
                            <Award className="w-4 h-4 text-blue-400" title="Verifizierter Käufer" />
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <div className={`text-xs font-bold bg-gradient-to-r ${getLevelColor(review.reviewerLevel)} bg-clip-text text-transparent`}>
                            LEVEL {review.reviewerLevel}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors">
                      <ThumbsUp className="w-5 h-5" />
                      <span className="font-bold">{review.likes}</span>
                    </button>
                    
                    <button className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors">
                      <MessageSquare className="w-5 h-5" />
                      <span className="font-bold">{review.comments}</span>
                    </button>
                    
                    <span className="text-sm text-gray-500">
                      {review.date.toLocaleDateString('de-DE')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="text-purple-400 hover:text-purple-300 font-bold transition-colors">
          MEHR REVIEWS LADEN
        </button>
      </div>
    </div>
  );
};