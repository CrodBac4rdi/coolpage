import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Play, Star, Calendar, X, Heart, Users, Globe, Clock } from 'lucide-react'

// Platform logos as SVG components
const NetflixLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#E50914">
    <path d="M5.398 0v18.845c0 .72-.198 1.128-.595 1.224-.137.033-.362.049-.675.049-1.045 0-2.09-.083-3.137-.247v4.873c1.464.28 2.584.454 3.359.523.775.068 1.551.103 2.329.103 1.213 0 2.123-.284 2.731-.853.607-.568.911-1.456.911-2.665V0h-4.923zm13.204 0v21.853c0 .72-.198 1.128-.595 1.224-.138.033-.363.049-.676.049-1.045 0-2.09-.083-3.136-.247V24h4.922V0h-4.922z"/>
  </svg>
)

const CrunchyrollLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#FF6600">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.75c-5.384 0-9.75-4.366-9.75-9.75S6.616 2.25 12 2.25s9.75 4.366 9.75 9.75-4.366 9.75-9.75 9.75zm0-17.5c-4.273 0-7.75 3.477-7.75 7.75s3.477 7.75 7.75 7.75 7.75-3.477 7.75-7.75S16.273 4.25 12 4.25z"/>
  </svg>
)

const PrimeLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#00A8E1">
    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
  </svg>
)

// Type definitions
type Platform = 'netflix' | 'crunchyroll' | 'prime'

interface Anime {
  id: string
  title: string
  titleJapanese: string
  description: string
  detailedDescription: string
  platforms: Platform[]
  releaseYear: number
  episodes: number
  rating: number
  popularity: number
  image: string
  genres: string[]
  studio: string
  director: string
  status: 'completed' | 'ongoing' | 'upcoming'
  source: string
  mainCharacters: string[]
  themes: string[]
  recommendedAge: string
  gutefrageMention: boolean
  malScore: number
  redditScore: number
}

// Echte beliebte Romance-Anime basierend auf deutscher Community und gutefrage.net
const animeData: Anime[] = [
  {
    id: 'kimi-no-na-wa',
    title: 'Your Name',
    titleJapanese: '君の名は。',
    description: 'Ein magischer Body-Swap-Romance zwischen zwei Teenagern, die sich durch Träume verbinden.',
    detailedDescription: 'Mitsuha, ein Mädchen aus einem ländlichen Dorf, und Taki, ein Junge aus Tokyo, beginnen mysteriöserweise ihre Körper zu tauschen. Während sie versuchen, ihr normales Leben zu führen, entwickelt sich eine tiefe Verbindung zwischen ihnen. Als die Körpertausche plötzlich aufhören, macht sich Taki auf die Suche nach Mitsuha und entdeckt eine schockierende Wahrheit über Zeit und Schicksal.',
    platforms: ['netflix', 'crunchyroll'],
    releaseYear: 2016,
    episodes: 1,
    rating: 4.9,
    popularity: 98,
    image: '🌟',
    genres: ['Romance', 'Drama', 'Supernatural'],
    studio: 'CoMix Wave Films',
    director: 'Makoto Shinkai',
    status: 'completed',
    source: 'Original',
    mainCharacters: ['Mitsuha Miyamizu', 'Taki Tachibana'],
    themes: ['Body Swap', 'Fated Love', 'Time Travel', 'Coming of Age'],
    recommendedAge: '13+',
    gutefrageMention: true,
    malScore: 8.4,
    redditScore: 9.2
  },
  {
    id: 'toradora',
    title: 'Toradora!',
    titleJapanese: 'とらドラ！',
    description: 'Eine explosive Romance-Comedy über zwei Schüler, die sich helfen, ihre jeweiligen Schwärme zu erobern.',
    detailedDescription: 'Ryuji Takasu sieht gefährlich aus, hat aber ein weiches Herz. Taiga Aisaka ist klein und süß, aber hat ein feuriges Temperament. Beide sind in die besten Freunde des anderen verliebt und beschließen, sich gegenseitig zu helfen. Während sie zusammenarbeiten, entwickeln sie langsam Gefühle füreinander in einer der beliebtesten Tsundere-Romanzen aller Zeiten.',
    platforms: ['crunchyroll'],
    releaseYear: 2008,
    episodes: 25,
    rating: 4.8,
    popularity: 95,
    image: '🐅',
    genres: ['Romance', 'Comedy', 'Drama', 'School'],
    studio: 'J.C.Staff',
    director: 'Tatsuyuki Nagai',
    status: 'completed',
    source: 'Light Novel',
    mainCharacters: ['Ryuji Takasu', 'Taiga Aisaka', 'Minori Kushieda'],
    themes: ['Tsundere', 'Fake Dating', 'Love Triangle', 'Christmas'],
    recommendedAge: '13+',
    gutefrageMention: true,
    malScore: 8.1,
    redditScore: 8.9
  },
  {
    id: 'horimiya',
    title: 'Horimiya',
    titleJapanese: 'ホリミヤ',
    description: 'Eine herzerwärmende Geschichte über zwei Schüler, die ihre wahren Persönlichkeiten voreinander enthüllen.',
    detailedDescription: 'Kyouko Hori ist die perfekte Schülerin, aber zu Hause kümmert sie sich um ihren kleinen Bruder. Izumi Miyamura wirkt wie ein Otaku, versteckt aber Tattoos und Piercings. Als sie sich zufällig außerhalb der Schule treffen, entdecken sie die verborgenen Seiten voneinander und entwickeln eine tiefe Bindung.',
    platforms: ['crunchyroll'],
    releaseYear: 2021,
    episodes: 13,
    rating: 4.7,
    popularity: 92,
    image: '💕',
    genres: ['Romance', 'Comedy', 'School', 'Slice of Life'],
    studio: 'Wit Studio',
    director: 'Masashi Ishihama',
    status: 'completed',
    source: 'Manga',
    mainCharacters: ['Kyouko Hori', 'Izumi Miyamura', 'Yuki Yoshikawa'],
    themes: ['Hidden Identity', 'Healthy Relationship', 'Character Development'],
    recommendedAge: '13+',
    gutefrageMention: true,
    malScore: 8.2,
    redditScore: 8.8
  },
  {
    id: 'kaguya-sama',
    title: 'Kaguya-sama: Love is War',
    titleJapanese: 'かぐや様は告らせたい',
    description: 'Ein Battle of Wits zwischen zwei Schülern, die sich weigern, ihre Liebe als erste zu gestehen.',
    detailedDescription: 'Kaguya Shinomiya und Miyuki Shirogane sind die Top-Schüler ihrer Elite-Schule und heimlich ineinander verliebt. Keiner will jedoch als erster gestehen, also führen sie elaborate psychologische Kriegsspiele, um den anderen dazu zu bringen, zuerst zu gestehen.',
    platforms: ['crunchyroll'],
    releaseYear: 2019,
    episodes: 37,
    rating: 4.9,
    popularity: 96,
    image: '🎭',
    genres: ['Romance', 'Comedy', 'Psychological', 'School'],
    studio: 'Wit Studio',
    director: 'Mamoru Hatakeyama',
    status: 'completed',
    source: 'Manga',
    mainCharacters: ['Kaguya Shinomiya', 'Miyuki Shirogane', 'Chika Fujiwara'],
    themes: ['Mind Games', 'Pride', 'Elite Society', 'Student Council'],
    recommendedAge: '13+',
    gutefrageMention: true,
    malScore: 8.4,
    redditScore: 9.1
  },
  {
    id: 'violet-evergarden',
    title: 'Violet Evergarden',
    titleJapanese: 'ヴァイオレット・エヴァーガーデン',
    description: 'Eine ehemalige Soldatin lernt durch das Schreiben von Briefen die Bedeutung von Liebe und Emotionen.',
    detailedDescription: 'Violet Evergarden, eine ehemalige Kindersoldatin, arbeitet als Auto Memory Doll und schreibt Briefe für andere. Während sie versucht, die letzten Worte ihres verstorbenen Majors zu verstehen - "Ich liebe dich" - entdeckt sie durch ihre Arbeit die Vielfalt menschlicher Emotionen und Liebe.',
    platforms: ['netflix'],
    releaseYear: 2018,
    episodes: 13,
    rating: 4.8,
    popularity: 91,
    image: '💌',
    genres: ['Romance', 'Drama', 'Military'],
    studio: 'Kyoto Animation',
    director: 'Taichi Ishidate',
    status: 'completed',
    source: 'Light Novel',
    mainCharacters: ['Violet Evergarden', 'Gilbert Bougainvillea'],
    themes: ['War Trauma', 'Letter Writing', 'Emotional Growth'],
    recommendedAge: '13+',
    gutefrageMention: true,
    malScore: 8.5,
    redditScore: 9.0
  },
  {
    id: 'weathering-with-you',
    title: 'Weathering with You',
    titleJapanese: '天気の子',
    description: 'Ein Junge trifft ein Mädchen, das das Wetter kontrollieren kann, in diesem visuell atemberaubenden Romance-Drama.',
    detailedDescription: 'Hodaka, ein Teenager, der von zu Hause weggelaufen ist, trifft Hina, ein Mädchen mit der mysteriösen Fähigkeit, das Wetter zu kontrollieren. Als sie beginnen, ihre Kraft zu nutzen, um Menschen zu helfen, müssen sie sich den Konsequenzen ihrer Handlungen und den Kräften der Natur stellen.',
    platforms: ['netflix', 'prime'],
    releaseYear: 2019,
    episodes: 1,
    rating: 4.6,
    popularity: 89,
    image: '🌧️',
    genres: ['Romance', 'Drama', 'Supernatural'],
    studio: 'CoMix Wave Films',
    director: 'Makoto Shinkai',
    status: 'completed',
    source: 'Original',
    mainCharacters: ['Hodaka Morishima', 'Hina Amano'],
    themes: ['Weather Control', 'Sacrifice', 'Growing Up'],
    recommendedAge: '13+',
    gutefrageMention: true,
    malScore: 7.5,
    redditScore: 8.3
  },
  {
    id: 'oregairu',
    title: 'My Teen Romantic Comedy SNAFU',
    titleJapanese: '俺の青春ラブコメはまちがっている。',
    description: 'Ein zynischer Loner wird gezwungen, anderen bei ihren Problemen zu helfen und entdeckt dabei wahre Verbindungen.',
    detailedDescription: 'Hachiman Hikigaya ist ein zynischer Schüler, der Menschen und Romantik verachtet. Nach einem Aufsatz über seine Weltanschauung wird er in den Freiwilligendienst-Club gesteckt, wo er Yukino Yukinoshita trifft. Zusammen helfen sie anderen Schülern und Hachiman lernt langsam den Wert echter Beziehungen.',
    platforms: ['crunchyroll'],
    releaseYear: 2013,
    episodes: 39,
    rating: 4.5,
    popularity: 88,
    image: '🎯',
    genres: ['Romance', 'Comedy', 'Drama', 'School'],
    studio: 'Brain\'s Base',
    director: 'Ai Yoshimura',
    status: 'completed',
    source: 'Light Novel',
    mainCharacters: ['Hachiman Hikigaya', 'Yukino Yukinoshita', 'Yui Yuigahama'],
    themes: ['Social Outcasts', 'Character Growth', 'Realistic Romance'],
    recommendedAge: '15+',
    gutefrageMention: true,
    malScore: 8.0,
    redditScore: 8.7
  },
  {
    id: 'fruits-basket',
    title: 'Fruits Basket',
    titleJapanese: 'フルーツバスケット',
    description: 'Eine Waise entdeckt eine Familie, die von den Tieren des chinesischen Tierkreises verflucht ist.',
    detailedDescription: 'Tohru Honda, eine verwaiste Schülerin, lebt bei der Sohma-Familie und entdeckt ihr dunkles Geheimnis: 13 Familienmitglieder verwandeln sich in Tierkreistiere, wenn sie von jemandem des anderen Geschlechts umarmt werden. Während Tohru versucht, ihnen zu helfen, entwickelt sie tiefe Beziehungen und findet Liebe.',
    platforms: ['crunchyroll', 'funimation'],
    releaseYear: 2019,
    episodes: 63,
    rating: 4.9,
    popularity: 94,
    image: '🍓',
    genres: ['Romance', 'Drama', 'Supernatural', 'Slice of Life'],
    studio: 'TMS Entertainment',
    director: 'Yoshihide Ibata',
    status: 'completed',
    source: 'Manga',
    mainCharacters: ['Tohru Honda', 'Kyo Sohma', 'Yuki Sohma'],
    themes: ['Family Curse', 'Healing', 'Acceptance', 'Found Family'],
    recommendedAge: '13+',
    gutefrageMention: true,
    malScore: 8.7,
    redditScore: 9.3
  },
  {
    id: 'rent-a-girlfriend',
    title: 'Rent-a-Girlfriend',
    titleJapanese: '彼女、お借りします',
    description: 'Ein College-Student mietet eine Freundin und gerät in komplizierte romantische Verwicklungen.',
    detailedDescription: 'Kazuya Kinoshita wird von seiner Freundin verlassen und mietet aus Verzweiflung eine Freundin über eine App. Chizuru Mizuhara scheint perfekt zu sein, aber ihre wahre Persönlichkeit ist ganz anders. Als ihre Familien sich einmischen, müssen sie ihre Fake-Beziehung aufrechterhalten.',
    platforms: ['crunchyroll'],
    releaseYear: 2020,
    episodes: 36,
    rating: 4.2,
    popularity: 85,
    image: '📱',
    genres: ['Romance', 'Comedy', 'Ecchi', 'Drama'],
    studio: 'TMS Entertainment',
    director: 'Kazuomi Koga',
    status: 'ongoing',
    source: 'Manga',
    mainCharacters: ['Kazuya Kinoshita', 'Chizuru Mizuhara', 'Mami Nanami'],
    themes: ['Fake Dating', 'Rental Services', 'Modern Romance'],
    recommendedAge: '16+',
    gutefrageMention: true,
    malScore: 6.9,
    redditScore: 7.2
  },
  {
    id: 'wotakoi',
    title: 'Wotakoi: Love is Hard for Otaku',
    titleJapanese: 'ヲタクに恋は難しい',
    description: 'Zwei erwachsene Otakus navigieren ihre Beziehung zwischen Arbeit und ihren Nerd-Hobbys.',
    detailedDescription: 'Narumi und Hirotaka sind Kindheitsfreunde, die sich nach Jahren im Büro wiedertreffen. Beide sind Otakus - sie mag BL-Manga und Otome-Games, er ist ein Gaming-Otaku. Sie beschließen zu daten, während sie versuchen, ihre Beziehung und ihre Otaku-Identitäten zu balancieren.',
    platforms: ['prime'],
    releaseYear: 2018,
    episodes: 11,
    rating: 4.6,
    popularity: 82,
    image: '🎮',
    genres: ['Romance', 'Comedy', 'Josei', 'Workplace'],
    studio: 'A-1 Pictures',
    director: 'Yoshimasa Hiraike',
    status: 'completed',
    source: 'Manga',
    mainCharacters: ['Narumi Momose', 'Hirotaka Nifuji', 'Hanako Koyanagi'],
    themes: ['Otaku Culture', 'Adult Romance', 'Gaming', 'Workplace Romance'],
    recommendedAge: '16+',
    gutefrageMention: true,
    malScore: 7.8,
    redditScore: 8.4
  },
  {
    id: 'my-love-story',
    title: 'My Love Story!!',
    titleJapanese: '俺物語!!',
    description: 'Ein sanftmütiger Riese erlebt seine erste Liebe mit Hilfe seines gut aussehenden besten Freundes.',
    detailedDescription: 'Takeo Goda ist groß, stark und hat ein großes Herz, aber Mädchen verlieben sich immer in seinen hübschen besten Freund Makoto. Das ändert sich, als er die süße Rinko rettet und sie sich tatsächlich in ihn verliebt. Eine herzerwärmende Geschichte über eine ungewöhnliche, aber wahre Liebe.',
    platforms: ['crunchyroll', 'funimation'],
    releaseYear: 2015,
    episodes: 24,
    rating: 4.7,
    popularity: 79,
    image: '💪',
    genres: ['Romance', 'Comedy', 'Shoujo'],
    studio: 'Madhouse',
    director: 'Morio Asaka',
    status: 'completed',
    source: 'Manga',
    mainCharacters: ['Takeo Goda', 'Rinko Yamato', 'Makoto Sunakawa'],
    themes: ['Unconventional Love', 'Friendship', 'Body Positivity'],
    recommendedAge: '13+',
    gutefrageMention: true,
    malScore: 7.9,
    redditScore: 8.6
  },
  {
    id: 'your-lie-in-april',
    title: 'Your Lie in April',
    titleJapanese: '四月は君の嘘',
    description: 'Ein traumatisierter Pianist findet durch ein lebhaftes Geigenmädchen zurück zur Musik und Liebe.',
    detailedDescription: 'Kousei Arima war ein Klavier-Wunderkind, bis der Tod seiner Mutter ihn traumatisierte und er keine Musik mehr hören konnte. Sein schwarz-weißes Leben verändert sich, als er die lebhafte Geigerin Kaori Miyazono trifft, die ihm hilft, die Musik und das Leben neu zu entdecken.',
    platforms: ['netflix', 'crunchyroll'],
    releaseYear: 2014,
    episodes: 22,
    rating: 4.8,
    popularity: 93,
    image: '🎹',
    genres: ['Romance', 'Drama', 'Music', 'School'],
    studio: 'A-1 Pictures',
    director: 'Kyohei Ishiguro',
    status: 'completed',
    source: 'Manga',
    mainCharacters: ['Kousei Arima', 'Kaori Miyazono', 'Tsubaki Sawabe'],
    themes: ['Music', 'Trauma', 'Coming of Age', 'Bittersweet Love'],
    recommendedAge: '15+',
    gutefrageMention: true,
    malScore: 8.6,
    redditScore: 9.1
  },
  {
    id: 'clannad',
    title: 'Clannad',
    titleJapanese: 'クラナド',
    description: 'Ein Delinquent hilft Mädchen mit ihren Problemen und entdeckt die Bedeutung von Familie und Liebe.',
    detailedDescription: 'Tomoya Okazaki ist ein unmotivierter Schüler, bis er Nagisa Furukawa trifft, ein krankes Mädchen, das davon träumt, den Drama-Club wiederzubeleben. Während er ihr und anderen Mädchen hilft, lernt er über Freundschaft, Familie und wahre Liebe in einer der emotionalsten Anime-Serien aller Zeiten.',
    platforms: ['crunchyroll', 'funimation'],
    releaseYear: 2007,
    episodes: 47,
    rating: 4.9,
    popularity: 91,
    image: '🌸',
    genres: ['Romance', 'Drama', 'Slice of Life', 'Supernatural'],
    studio: 'Kyoto Animation',
    director: 'Tatsuya Ishihara',
    status: 'completed',
    source: 'Visual Novel',
    mainCharacters: ['Tomoya Okazaki', 'Nagisa Furukawa', 'Kyou Fujibayashi'],
    themes: ['Family', 'Growing Up', 'Life Lessons', 'Supernatural Elements'],
    recommendedAge: '15+',
    gutefrageMention: true,
    malScore: 8.8,
    redditScore: 9.4
  },
  {
    id: 'weathering-with-you',
    title: 'Weathering with You',
    titleJapanese: '天気の子',
    description: 'Ein Junge aus der Provinz trifft in Tokyo ein Mädchen, das das Wetter kontrollieren kann.',
    detailedDescription: 'Hodaka läuft von zu Hause weg nach Tokyo und lebt in Armut. Er trifft Hina, ein Mädchen mit der mysteriösen Fähigkeit, den Himmel aufzuklaren. Als sie beginnen, ihre Kraft zu nutzen, um Menschen zu helfen, entdecken sie die dunklen Konsequenzen ihrer Handlungen und müssen zwischen persönlichem Glück und dem Wohl der Welt wählen.',
    platforms: ['netflix', 'prime'],
    releaseYear: 2019,
    episodes: 1,
    rating: 4.8,
    popularity: 94,
    image: '🌦️',
    genres: ['Romance', 'Drama', 'Supernatural', 'Fantasy'],
    studio: 'CoMix Wave Films',
    director: 'Makoto Shinkai',
    status: 'completed',
    source: 'Original',
    mainCharacters: ['Hodaka Morishima', 'Hina Amano', 'Nagi Amano'],
    themes: ['Weather Control', 'Sacrifice', 'Urban Fantasy', 'Environmental'],
    recommendedAge: '13+',
    gutefrageMention: true,
    malScore: 8.0,
    redditScore: 8.6
  },
  {
    id: 'violet-evergarden',
    title: 'Violet Evergarden',
    titleJapanese: 'ヴァイオレット・エヴァーガーデン',
    description: 'Eine ehemalige Kriegerin lernt über Emotionen und Liebe, während sie als Ghostwriter arbeitet.',
    detailedDescription: 'Violet war eine Soldatin in einem Krieg und versteht menschliche Emotionen nicht. Nach dem Krieg arbeitet sie als "Auto Memory Doll" - eine Ghostwriterin, die Briefe für andere schreibt. Durch ihre Arbeit lernt sie langsam, was Liebe bedeutet, besonders die letzten Worte ihres verstorbenen Vorgesetzten Major Gilbert.',
    platforms: ['netflix'],
    releaseYear: 2018,
    episodes: 13,
    rating: 4.9,
    popularity: 93,
    image: '💜',
    genres: ['Romance', 'Drama', 'Slice of Life', 'War'],
    studio: 'Kyoto Animation',
    director: 'Taichi Ishidate',
    status: 'completed',
    source: 'Light Novel',
    mainCharacters: ['Violet Evergarden', 'Gilbert Bougainvillea', 'Cattleya Baudelaire'],
    themes: ['Post-War', 'Emotional Growth', 'Letter Writing', 'PTSD'],
    recommendedAge: '15+',
    gutefrageMention: true,
    malScore: 8.5,
    redditScore: 9.0
  },
  {
    id: 'lovely-complex',
    title: 'Lovely Complex',
    titleJapanese: 'ラブリーコンプレックス',
    description: 'Eine große Schülerin und ein kleiner Schüler überwinden ihre Komplexe und verlieben sich.',
    detailedDescription: 'Risa ist ungewöhnlich groß für ein Mädchen und Otani ist klein für einen Jungen. Beide haben Komplexe wegen ihrer Größe und necken sich ständig. Langsam entwickeln sie Gefühle füreinander, aber beide sind zu stolz, um es zuzugeben. Eine herzerwärmende Geschichte über Selbstakzeptanz und wahre Liebe.',
    platforms: ['crunchyroll'],
    releaseYear: 2007,
    episodes: 24,
    rating: 4.6,
    popularity: 87,
    image: '📏',
    genres: ['Romance', 'Comedy', 'School', 'Slice of Life'],
    studio: 'Toei Animation',
    director: 'Konosuke Uda',
    status: 'completed',
    source: 'Manga',
    mainCharacters: ['Risa Koizumi', 'Atsushi Otani', 'Nobuko Ishihara'],
    themes: ['Height Complex', 'Self-Acceptance', 'Friendship to Love', 'Osaka Culture'],
    recommendedAge: '13+',
    gutefrageMention: true,
    malScore: 8.0,
    redditScore: 8.4
  },
  {
    id: 'my-love-story',
    title: 'My Love Story!!',
    titleJapanese: '俺物語!!',
    description: 'Ein großer, starker Junge findet endlich seine erste Liebe mit einem süßen Mädchen.',
    detailedDescription: 'Takeo ist groß, stark und furchterregend aussehend, aber hat ein goldenes Herz. Mädchen mögen ihn nie, sondern verlieben sich immer in seinen gutaussehenden besten Freund. Das ändert sich, als er die süße Rinko rettet und sie sich tatsächlich in ihn verliebt. Eine erfrischende Romance über einen unkonventionellen Helden.',
    platforms: ['crunchyroll'],
    releaseYear: 2015,
    episodes: 24,
    rating: 4.7,
    popularity: 85,
    image: '💪',
    genres: ['Romance', 'Comedy', 'Slice of Life', 'School'],
    studio: 'Madhouse',
    director: 'Morio Asaka',
    status: 'completed',
    source: 'Manga',
    mainCharacters: ['Takeo Gouda', 'Rinko Yamato', 'Makoto Sunakawa'],
    themes: ['Unconventional Romance', 'Friendship', 'Body Positivity', 'Pure Love'],
    recommendedAge: '13+',
    gutefrageMention: true,
    malScore: 7.9,
    redditScore: 8.3
  },
  {
    id: 'fruits-basket',
    title: 'Fruits Basket',
    titleJapanese: 'フルーツバスケット',
    description: 'Ein Waisenmädchen lebt mit einer Familie, die vom Zodiak-Fluch betroffen ist.',
    detailedDescription: 'Tohru Honda ist obdachlos und lebt in einem Zelt, als sie von der Sohma-Familie aufgenommen wird. Sie entdeckt, dass einige Familienmitglieder sich in Zodiak-Tiere verwandeln, wenn sie von jemandem des anderen Geschlechts umarmt werden. Tohru hilft ihnen, ihren Fluch zu brechen, während sie sich in Kyo verliebt.',
    platforms: ['crunchyroll'],
    releaseYear: 2019,
    episodes: 63,
    rating: 4.9,
    popularity: 96,
    image: '🍎',
    genres: ['Romance', 'Drama', 'Supernatural', 'Comedy'],
    studio: 'TMS Entertainment',
    director: 'Yoshihide Ibata',
    status: 'completed',
    source: 'Manga',
    mainCharacters: ['Tohru Honda', 'Kyo Sohma', 'Yuki Sohma', 'Shigure Sohma'],
    themes: ['Family Curse', 'Healing', 'Trauma Recovery', 'Zodiac Animals'],
    recommendedAge: '13+',
    gutefrageMention: true,
    malScore: 8.6,
    redditScore: 9.2
  },
  {
    id: 'rascal-does-not-dream',
    title: 'Rascal Does Not Dream of Bunny Girl Senpai',
    titleJapanese: '青春ブタ野郎はバニーガール先輩の夢を見ない',
    description: 'Ein Schüler hilft Mädchen, die von übernatürlichen Phänomenen betroffen sind.',
    detailedDescription: 'Sakuta trifft Mai, eine berühmte Schauspielerin, die ein Bunny-Girl-Kostüm in der Bibliothek trägt. Sie leidet unter dem "Pubertätssyndrom" - einem Phänomen, das Teenager mit emotionalen Problemen betrifft. Sakuta hilft ihr und anderen Mädchen, ihre Probleme zu lösen, während er sich in Mai verliebt.',
    platforms: ['crunchyroll'],
    releaseYear: 2018,
    episodes: 13,
    rating: 4.8,
    popularity: 91,
    image: '🐰',
    genres: ['Romance', 'Drama', 'Supernatural', 'School'],
    studio: 'CloverWorks',
    director: 'Soichi Masui',
    status: 'completed',
    source: 'Light Novel',
    mainCharacters: ['Sakuta Azusagawa', 'Mai Sakurajima', 'Rio Futaba'],
    themes: ['Adolescence Syndrome', 'Quantum Physics', 'Mental Health', 'Social Media'],
    recommendedAge: '15+',
    gutefrageMention: true,
    malScore: 8.2,
    redditScore: 8.8
  },
  {
    id: 'golden-time',
    title: 'Golden Time',
    titleJapanese: 'ゴールデンタイム',
    description: 'Ein Jurastudent mit Gedächtnisverlust navigiert durch College-Romance und Freundschaft.',
    detailedDescription: 'Banri verliert nach einem Unfall sein Gedächtnis und beginnt ein neues Leben als Jurastudent. Er trifft Koko, ein obsessives Mädchen, das in seinen Kindheitsfreund verliebt ist. Während Banri versucht, seine Vergangenheit zu verstehen, entwickelt er Gefühle für Koko in dieser College-Romance über Liebe, Freundschaft und Identität.',
    platforms: ['crunchyroll'],
    releaseYear: 2013,
    episodes: 24,
    rating: 4.5,
    popularity: 84,
    image: '📚',
    genres: ['Romance', 'Drama', 'Comedy', 'College'],
    studio: 'J.C.Staff',
    director: 'Chiaki Kon',
    status: 'completed',
    source: 'Light Novel',
    mainCharacters: ['Banri Tada', 'Koko Kaga', 'Mitsuo Yanagisawa'],
    themes: ['Memory Loss', 'College Life', 'Second Chances', 'Identity Crisis'],
    recommendedAge: '15+',
    gutefrageMention: true,
    malScore: 7.6,
    redditScore: 8.1
  },
  {
    id: 'nana',
    title: 'Nana',
    titleJapanese: 'ナナ',
    description: 'Zwei Frauen namens Nana mit unterschiedlichen Träumen teilen sich eine Wohnung in Tokyo.',
    detailedDescription: 'Nana Komatsu ist ein naives Mädchen, das ihrem Freund nach Tokyo folgt. Nana Osaki ist eine Punk-Rockerin mit dem Traum, berühmt zu werden. Die beiden treffen sich im Zug und werden später Mitbewohnerinnen. Ihre Geschichten verflechten sich durch Liebe, Freundschaft und die Schwierigkeiten des Erwachsenwerdens.',
    platforms: ['crunchyroll'],
    releaseYear: 2006,
    episodes: 47,
    rating: 4.8,
    popularity: 89,
    image: '🎸',
    genres: ['Romance', 'Drama', 'Slice of Life', 'Music'],
    studio: 'Madhouse',
    director: 'Morio Asaka',
    status: 'completed',
    source: 'Manga',
    mainCharacters: ['Nana Komatsu', 'Nana Osaki', 'Nobuo Terashima'],
    themes: ['Friendship', 'Music Industry', 'Adult Relationships', 'Tokyo Life'],
    recommendedAge: '17+',
    gutefrageMention: true,
    malScore: 8.5,
    redditScore: 8.9
  },
  {
    id: 'ao-haru-ride',
    title: 'Ao Haru Ride',
    titleJapanese: 'アオハライド',
    description: 'Eine Schülerin trifft ihren Jugendfreund wieder, aber er hat sich völlig verändert.',
    detailedDescription: 'Futaba war in der Mittelschule in Kou verliebt, aber er verschwand plötzlich. In der Oberschule trifft sie ihn wieder, aber er ist jetzt kalt und distanziert. Futaba versucht, den alten Kou zurückzugewinnen, während sie beide mit den Veränderungen des Erwachsenwerdens kämpfen.',
    platforms: ['crunchyroll'],
    releaseYear: 2014,
    episodes: 12,
    rating: 4.6,
    popularity: 86,
    image: '🌸',
    genres: ['Romance', 'Drama', 'School', 'Slice of Life'],
    studio: 'Production I.G',
    director: 'Ai Yoshimura',
    status: 'completed',
    source: 'Manga',
    mainCharacters: ['Futaba Yoshioka', 'Kou Mabuchi', 'Shuko Murao'],
    themes: ['Childhood Friends', 'Second Chances', 'Growing Apart', 'School Festival'],
    recommendedAge: '13+',
    gutefrageMention: true,
    malScore: 7.4,
    redditScore: 8.0
  }
]

export default function RomanceAnimeGuide() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all')
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null)

  // Filter anime based on search and platform
  const filteredAnime = useMemo(() => {
    try {
      return animeData.filter(anime => {
        const matchesSearch = 
          anime.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          anime.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          anime.genres.some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase()))
        
        const matchesPlatform = 
          selectedPlatform === 'all' || 
          anime.platforms.includes(selectedPlatform as Platform)
        
        return matchesSearch && matchesPlatform
      })
    } catch (error) {
      console.error('Error filtering anime:', error)
      return animeData
    }
  }, [searchTerm, selectedPlatform])

  const getPlatformColor = (platform: Platform) => {
    switch (platform) {
      case 'netflix': return 'text-red-500'
      case 'crunchyroll': return 'text-orange-500'
      case 'prime': return 'text-blue-500'
      default: return 'text-gray-500'
    }
  }

  const PlatformIcon = ({ platform }: { platform: Platform }) => {
    switch (platform) {
      case 'netflix': return <NetflixLogo />
      case 'crunchyroll': return <CrunchyrollLogo />
      case 'prime': return <PrimeLogo />
      default: return <Play className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900 pt-32 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🌸 Romance Anime Guide 🌸
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Die besten Romance-Anime auf Netflix, Crunchyroll & Prime Video
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-500" />
              Beliebt auf gutefrage.net
            </span>
            <span className="flex items-center gap-1">
              <Globe className="w-4 h-4 text-blue-500" />
              Verfügbar in Deutschland
            </span>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Suche nach Anime-Titel, Genre oder Beschreibung..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 md:py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Platform Filter */}
          <div className="flex items-center gap-2 md:gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-gray-300">
              <Filter className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">Filter:</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedPlatform('all')}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg border transition-all text-sm md:text-base ${
                  selectedPlatform === 'all'
                    ? 'bg-purple-600 border-purple-600 text-white'
                    : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600'
                }`}
              >
                Alle
              </button>
              <button
                onClick={() => setSelectedPlatform('netflix')}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg border transition-all flex items-center gap-1 md:gap-2 text-sm md:text-base ${
                  selectedPlatform === 'netflix'
                    ? 'bg-red-500/20 border-red-500 text-red-400'
                    : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600'
                }`}
              >
                <NetflixLogo />
                Netflix
              </button>
              <button
                onClick={() => setSelectedPlatform('crunchyroll')}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg border transition-all flex items-center gap-1 md:gap-2 text-sm md:text-base ${
                  selectedPlatform === 'crunchyroll'
                    ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                    : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600'
                }`}
              >
                <CrunchyrollLogo />
                Crunchyroll
              </button>
              <button
                onClick={() => setSelectedPlatform('prime')}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg border transition-all flex items-center gap-1 md:gap-2 text-sm md:text-base ${
                  selectedPlatform === 'prime'
                    ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                    : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600'
                }`}
              >
                <PrimeLogo />
                Prime
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mb-6 text-sm md:text-base"
        >
          {filteredAnime.length} Anime gefunden
        </motion.p>

        {/* Anime Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredAnime.map((anime, index) => (
            <motion.div
              key={anime.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div 
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedAnime(anime)}
              >
                {/* Anime Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{anime.image}</span>
                      <div>
                        <h3 className="font-bold text-white text-lg group-hover:text-purple-400 transition-colors">
                          {anime.title}
                        </h3>
                        <p className="text-gray-400 text-sm">{anime.titleJapanese}</p>
                      </div>
                    </div>
                  </div>
                  {anime.gutefrageMention && (
                    <div className="flex items-center gap-1 text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                      <Heart className="w-3 h-3" />
                      <span>Beliebt</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {anime.description}
                </p>

                {/* Info Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{anime.releaseYear}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{anime.episodes} EP</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{anime.rating}</span>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {anime.genres.slice(0, 3).map(genre => (
                    <span
                      key={genre}
                      className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                    >
                      {genre}
                    </span>
                  ))}
                  {anime.genres.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700/50 text-gray-400 rounded-full text-xs">
                      +{anime.genres.length - 3}
                    </span>
                  )}
                </div>

                {/* Platforms */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">Verfügbar auf:</span>
                  <div className="flex gap-2">
                    {anime.platforms.map(platform => (
                      <div
                        key={platform}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getPlatformColor(platform)}`}
                      >
                        <PlatformIcon platform={platform} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Anime Detail Modal */}
        <AnimatePresence>
          {selectedAnime && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedAnime(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-900 border border-gray-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{selectedAnime.image}</span>
                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          {selectedAnime.title}
                        </h2>
                        <p className="text-gray-400">{selectedAnime.titleJapanese}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                          <span>{selectedAnime.studio}</span>
                          <span>•</span>
                          <span>{selectedAnime.director}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedAnime(null)}
                      className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Stats Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{selectedAnime.rating}</div>
                      <div className="text-sm text-gray-400">Bewertung</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{selectedAnime.episodes}</div>
                      <div className="text-sm text-gray-400">Episoden</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{selectedAnime.malScore}</div>
                      <div className="text-sm text-gray-400">MAL Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{selectedAnime.popularity}%</div>
                      <div className="text-sm text-gray-400">Beliebtheit</div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Beschreibung</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedAnime.detailedDescription}
                    </p>
                  </div>

                  {/* Genres and Themes */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Genres</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedAnime.genres.map(genre => (
                          <span
                            key={genre}
                            className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Themen</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedAnime.themes.map(theme => (
                          <span
                            key={theme}
                            className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                          >
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Characters */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Hauptcharaktere</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedAnime.mainCharacters.map(character => (
                        <div key={character} className="flex items-center gap-2 text-gray-300">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>{character}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Where to Watch */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Wo schauen?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedAnime.platforms.map(platform => (
                        <div
                          key={platform}
                          className={`flex items-center gap-3 p-4 rounded-lg border ${
                            platform === 'netflix' ? 'bg-red-500/10 border-red-500/30' :
                            platform === 'crunchyroll' ? 'bg-orange-500/10 border-orange-500/30' :
                            platform === 'prime' ? 'bg-blue-500/10 border-blue-500/30' :
                            'bg-purple-500/10 border-purple-500/30'
                          }`}
                        >
                          <PlatformIcon platform={platform} />
                          <div>
                            <div className={`font-medium ${getPlatformColor(platform)}`}>
                              {platform === 'netflix' ? 'Netflix' :
                               platform === 'crunchyroll' ? 'Crunchyroll' :
                               platform === 'prime' ? 'Prime Video' : platform}
                            </div>
                            <div className="text-sm text-gray-400">
                              {selectedAnime.recommendedAge} • {selectedAnime.status === 'completed' ? 'Abgeschlossen' : 'Laufend'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Community Info */}
                  {selectedAnime.gutefrageMention && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-green-400 mb-2">
                        <Heart className="w-5 h-5" />
                        <span className="font-medium">Community Favorit</span>
                      </div>
                      <p className="text-sm text-gray-300">
                        Dieser Anime wird häufig auf gutefrage.net empfohlen und ist besonders beliebt in der deutschen Anime-Community.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
