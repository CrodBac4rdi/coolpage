import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Star, Calendar, X, Heart, Users, Globe, Clock, Award, BookOpen } from 'lucide-react'

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
type Platform = 'netflix' | 'crunchyroll' | 'prime' | 'funimation'
type DetailLevel = 'overview' | 'details' | 'deep-dive'

interface Anime {
  id: string
  title: string
  titleJapanese: string
  description: string
  detailedDescription: string
  deepDiveInfo: {
    plotAnalysis: string
    characterDevelopment: string
    culturalContext: string
    recommendations: string[]
    trivia: string[]
  }
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

// Curated anime data without duplicates
const animeData: Anime[] = [
  {
    id: 'your-name',
    title: 'Your Name',
    titleJapanese: '君の名は。',
    description: 'Zwei Teenager tauschen mysteriös ihre Körper und verlieben sich, ohne sich jemals getroffen zu haben.',
    detailedDescription: 'Mitsuha lebt in einer kleinen Stadt in den Bergen und träumt vom Leben in Tokyo. Taki ist ein Oberschüler in Tokyo. Eines Tages beginnen sie mysterös, ihre Körper zu tauschen. Während sie versuchen, das Geheimnis zu lösen, entwickeln sie tiefe Gefühle füreinander.',
    deepDiveInfo: {
      plotAnalysis: 'Der Film verwendet komplexe Zeitlinien und übernatürliche Elemente, um eine Geschichte über Schicksal und Verbindung zu erzählen. Die Körpertausch-Mechanik dient als Metapher für das Verständnis des anderen Geschlechts und das Überwinden von Barrieren.',
      characterDevelopment: 'Mitsuha und Taki wachsen durch ihre Erfahrungen und lernen, Verantwortung für ihre Handlungen zu übernehmen. Der Film zeigt, wie sie sich durch die Augen des anderen selbst besser verstehen lernen.',
      culturalContext: 'Der Film thematisiert den Kontrast zwischen traditionellem ländlichen Leben und modernem Stadtleben in Japan. Die Kuchisake-Sake-Zeremonie und der Komet haben tiefe spirituelle Bedeutungen in der japanischen Kultur.',
      recommendations: ['Weathering with You', 'The Garden of Words', 'A Silent Voice'],
      trivia: ['Höchstgrossierender Anime-Film aller Zeiten (bis 2019)', 'Makoto Shinkai schrieb das Drehbuch vor dem Manga', 'Real existierende Orte in Hida und Tokyo dienten als Inspiration']
    },
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
    detailedDescription: 'Ryuji Takasu sieht gefährlich aus, hat aber ein weiches Herz. Taiga Aisaka ist klein und süß, aber hat ein feuriges Temperament. Beide sind in die besten Freunde des anderen verliebt und beschließen, sich gegenseitig zu helfen.',
    deepDiveInfo: {
      plotAnalysis: 'Toradora! ist ein Meisterwerk der Tsundere-Trope und zeigt, wie sich scheinbar gegensätzliche Charaktere ergänzen. Die Serie baut langsam eine authentische Beziehung zwischen den Protagonisten auf.',
      characterDevelopment: 'Taiga lernt, ihre Verletzlichkeit zu zeigen, während Ryuji lernt, für sich selbst einzustehen. Beide überwinden ihre Unsicherheiten durch ihre Beziehung.',
      culturalContext: 'Die Serie spielt während der japanischen Schulzeit und thematisiert typische Probleme von Teenagern, einschließlich Familiendynamik und sozialer Erwartungen.',
      recommendations: ['Golden Time', 'Lovely Complex', 'Kaguya-sama: Love is War'],
      trivia: ['Taiga ist einer der beliebtesten Tsundere-Charaktere aller Zeiten', 'Die Christmas-Episode gilt als eine der besten Romance-Episoden im Anime', 'Light Novel gewann mehrere Preise']
    },
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
    id: 'violet-evergarden',
    title: 'Violet Evergarden',
    titleJapanese: 'ヴァイオレット・エヴァーガーデン',
    description: 'Eine ehemalige Soldatin lernt durch das Schreiben von Briefen die Bedeutung von Liebe und Emotionen.',
    detailedDescription: 'Violet Evergarden, eine ehemalige Kindersoldatin, arbeitet als Auto Memory Doll und schreibt Briefe für andere. Während sie versucht, die letzten Worte ihres verstorbenen Majors zu verstehen - "Ich liebe dich" - entdeckt sie durch ihre Arbeit die Vielfalt menschlicher Emotionen.',
    deepDiveInfo: {
      plotAnalysis: 'Die Serie ist eine Meditation über Trauma, Heilung und die Kraft der Kommunikation. Jede Episode erforscht verschiedene Aspekte der menschlichen Erfahrung durch Violets Briefschreibarbeit.',
      characterDevelopment: 'Violet entwickelt sich von einer emotionslosen Soldatin zu einem Menschen, der Liebe, Trauer und Mitgefühl versteht. Ihre Reise ist eine der bewegendsten Character-Arcs im Anime.',
      culturalContext: 'Die Serie reflektiert die Nachwirkungen des Krieges und die Bedeutung von Kommunikation in der zwischenmenschlichen Heilung, thematisiert auch PTSD und Kriegstrauma.',
      recommendations: ['A Silent Voice', 'March Comes in Like a Lion', 'Clannad'],
      trivia: ['Kyoto Animation\'s visuell beeindruckendste Arbeit', 'Gewann mehrere Animation-Preise', 'Basiert auf einem preisgekrönten Light Novel']
    },
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
    id: 'kaguya-sama',
    title: 'Kaguya-sama: Love is War',
    titleJapanese: 'かぐや様は告らせたい',
    description: 'Ein Battle of Wits zwischen zwei Schülern, die sich weigern, ihre Liebe als erste zu gestehen.',
    detailedDescription: 'Kaguya Shinomiya und Miyuki Shirogane sind die Top-Schüler ihrer Elite-Schule und heimlich ineinander verliebt. Keiner will jedoch als erster gestehen, also führen sie elaborate psychologische Kriegsspiele.',
    deepDiveInfo: {
      plotAnalysis: 'Die Serie ist eine brillante Dekonstruktion von Romance-Tropes, die Stolz und Verwundbarkeit in Beziehungen thematisiert. Jede Episode ist ein cleveres Spiel zwischen den Protagonisten.',
      characterDevelopment: 'Sowohl Kaguya als auch Miyuki lernen, ihre Masken fallen zu lassen und authentische Emotionen zu zeigen. Die Serie zeigt, wie Elite-Bildung emotionale Entwicklung hemmen kann.',
      culturalContext: 'Kritisiert subtil das japanische Elite-Bildungssystem und die Pressionen, die auf hochbegabte Schüler ausgeübt werden.',
      recommendations: ['Toradora!', 'Rent-a-Girlfriend', 'The Quintessential Quintuplets'],
      trivia: ['Chika Dance wurde ein Internet-Meme', 'Manga verkaufte über 18 Millionen Exemplare', 'Gewann den Shogakukan Manga Award']
    },
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
    id: 'horimiya',
    title: 'Horimiya',
    titleJapanese: 'ホリミヤ',
    description: 'Eine herzerwärmende Geschichte über zwei Schüler, die ihre wahren Persönlichkeiten voreinander enthüllen.',
    detailedDescription: 'Kyouko Hori ist die perfekte Schülerin, aber zu Hause kümmert sie sich um ihren kleinen Bruder. Izumi Miyamura wirkt wie ein Otaku, versteckt aber Tattoos und Piercings. Als sie sich treffen, entdecken sie die verborgenen Seiten voneinander.',
    deepDiveInfo: {
      plotAnalysis: 'Horimiya erforscht die Diskrepanz zwischen öffentlichen und privaten Persönlichkeiten und zeigt, wie wahre Intimität entsteht, wenn Menschen ihre authentischen Selbst zeigen.',
      characterDevelopment: 'Beide Protagonisten lernen, sich selbst zu akzeptieren und ihre verschiedenen Facetten zu integrieren. Die Serie zeigt gesunde Beziehungsdynamiken.',
      culturalContext: 'Thematisiert den Druck in der japanischen Gesellschaft, perfekte Fassaden aufrechtzuerhalten, und die Befreiung, die mit Authentizität kommt.',
      recommendations: ['My Love Story!!', 'Wotakoi', 'Lovely Complex'],
      trivia: ['Ursprünglich ein Webmanga', 'Lief über 10 Jahre als Webcomic', 'Wit Studio\'s erste Romance-Serie']
    },
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
    id: 'your-lie-in-april',
    title: 'Your Lie in April',
    titleJapanese: '四月は君の嘘',
    description: 'Ein traumatisierter Pianist findet durch ein lebhaftes Geigenmädchen zurück zur Musik und Liebe.',
    detailedDescription: 'Kousei Arima war ein Klavier-Wunderkind, bis der Tod seiner Mutter ihn traumatisierte. Sein schwarz-weißes Leben verändert sich, als er die lebhafte Geigerin Kaori Miyazono trifft.',
    deepDiveInfo: {
      plotAnalysis: 'Die Serie ist eine Metapher für Heilung durch Kunst und zeigt, wie Musik emotionale Barrieren durchbrechen kann. Die "Lüge" im Titel hat mehrere Bedeutungsebenen.',
      characterDevelopment: 'Kousei lernt, seine Traumata zu verarbeiten und wieder zu leben. Kaori hilft ihm dabei, seine Leidenschaft für Musik und das Leben wiederzuentdecken.',
      culturalContext: 'Reflektiert die intensive Musikausbildung in Japan und den Druck auf junge Talente. Thematisiert auch Trauer und den Umgang mit Verlust.',
      recommendations: ['Violet Evergarden', 'Clannad', 'Anohana'],
      trivia: ['Soundtrack von echten klassischen Stücken', 'Gewann mehrere Anime-Preise', 'Live-Action-Film wurde 2016 veröffentlicht']
    },
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
    id: 'fruits-basket',
    title: 'Fruits Basket',
    titleJapanese: 'フルーツバスケット',
    description: 'Eine Waise entdeckt eine Familie, die von den Tieren des chinesischen Tierkreises verflucht ist.',
    detailedDescription: 'Tohru Honda lebt bei der Sohma-Familie und entdeckt ihr Geheimnis: 13 Familienmitglieder verwandeln sich in Tierkreistiere. Tohru hilft ihnen, während sie tiefe Beziehungen entwickelt.',
    deepDiveInfo: {
      plotAnalysis: 'Die Serie nutzt das Tierkreis-System als Metapher für familiäre Traumata und Generationskonflikte. Jedes Tier repräsentiert verschiedene Aspekte menschlicher Natur.',
      characterDevelopment: 'Tohru hilft jedem Sohma-Mitglied, ihre Traumata zu heilen. Die Serie zeigt, wie Liebe und Akzeptanz Generationen von Schmerz heilen können.',
      culturalContext: 'Basiert auf dem chinesischen Tierkreis und japanischen Familientraditionen. Thematisiert häusliche Gewalt und emotionalen Missbrauch.',
      recommendations: ['Clannad', 'Violet Evergarden', 'Your Lie in April'],
      trivia: ['Manga lief über 20 Jahre', '2019 Reboot war komplett neu animiert', 'Tohru ist eine der beliebtesten Shoujo-Protagonistinnen']
    },
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
    id: 'weathering-with-you',
    title: 'Weathering with You',
    titleJapanese: '天気の子',
    description: 'Ein Junge trifft ein Mädchen, das das Wetter kontrollieren kann, in diesem visuell atemberaubenden Romance-Drama.',
    detailedDescription: 'Hodaka läuft von zu Hause weg nach Tokyo und trifft Hina, ein Mädchen mit der Fähigkeit, das Wetter zu kontrollieren. Sie müssen zwischen persönlichem Glück und dem Wohl der Welt wählen.',
    deepDiveInfo: {
      plotAnalysis: 'Der Film erforscht Umweltthemen und die Auswirkungen des Klimawandels auf persönliche Beziehungen. Die Wettermagie dient als Metapher für die Verbindung zwischen Mensch und Natur.',
      characterDevelopment: 'Hodaka und Hina lernen, Verantwortung zu übernehmen und schwere Entscheidungen zu treffen. Ihre Liebe wird durch externe Kräfte auf die Probe gestellt.',
      culturalContext: 'Spiegelt moderne Umweltsorgen in Japan wider und thematisiert urbane Probleme wie Obdachlosigkeit und Arbeitslosigkeit bei Jugendlichen.',
      recommendations: ['Your Name', 'The Garden of Words', 'Children of the Weather'],
      trivia: ['Shinkai\'s Nachfolger zu "Your Name"', 'Thematisiert Klimawandel direkt', 'Rekordverdächtige Regen-Animationen']
    },
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
    id: 'clannad',
    title: 'Clannad',
    titleJapanese: 'クラナド',
    description: 'Ein Delinquent hilft Mädchen mit ihren Problemen und entdeckt die Bedeutung von Familie und Liebe.',
    detailedDescription: 'Tomoya Okazaki trifft Nagisa Furukawa und hilft ihr, den Drama-Club wiederzubeleben. Dabei lernt er über Freundschaft, Familie und wahre Liebe in einer der emotionalsten Serien aller Zeiten.',
    deepDiveInfo: {
      plotAnalysis: 'Die Serie erforscht den Kreislauf des Lebens und wie Entscheidungen Generationen beeinflussen. After Story ist eine der stärksten Darstellungen von Ehe und Elternschaft im Anime.',
      characterDevelopment: 'Tomoya entwickelt sich von einem apathischen Teenager zu einem liebevollen Ehemann und Vater. Die Serie zeigt realistische Beziehungsentwicklung.',
      culturalContext: 'Thematisiert japanische Familienwerte und die Bedeutung von Gemeinschaft. Die übernatürlichen Elemente symbolisieren emotionale Heilung.',
      recommendations: ['Your Lie in April', 'Fruits Basket', 'Anohana'],
      trivia: ['After Story gilt als einer der besten Anime aller Zeiten', 'Visual Novel hatte über 10 Routen', 'Dango-Song wurde ein kulturelles Phänomen']
    },
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
    id: 'my-love-story',
    title: 'My Love Story!!',
    titleJapanese: '俺物語!!',
    description: 'Ein sanftmütiger Riese erlebt seine erste Liebe mit Hilfe seines gut aussehenden besten Freundes.',
    detailedDescription: 'Takeo Goda ist groß, stark und hat ein großes Herz, aber Mädchen verlieben sich immer in seinen hübschen besten Freund. Das ändert sich, als er die süße Rinko rettet.',
    deepDiveInfo: {
      plotAnalysis: 'Die Serie dekonstruiert männliche Schönheitsstandards und zeigt, dass wahre Liebe über Aussehen hinausgeht. Takeo bricht das Klischee des romantischen Helden.',
      characterDevelopment: 'Takeo lernt, sich selbst zu lieben und seine Stärken zu erkennen. Rinko zeigt, dass Liebe nicht oberflächlich sein muss.',
      culturalContext: 'Kritisiert japanische Schönheitsideale und zeigt alternative Männlichkeitsvorstellungen. Thematisiert auch Freundschaft und Loyalität.',
      recommendations: ['Lovely Complex', 'Wotakoi', 'Horimiya'],
      trivia: ['Takeo ist einer der physisch stärksten Romance-Protagonisten', 'Manga gewann mehrere Shoujo-Preise', 'Madhouse\'s erste Shoujo-Adaption']
    },
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
    id: 'bunny-girl-senpai',
    title: 'Rascal Does Not Dream of Bunny Girl Senpai',
    titleJapanese: '青春ブタ野郎はバニーガール先輩の夢を見ない',
    description: 'Ein Schüler hilft Mädchen, die von übernatürlichen Phänomenen des "Pubertätssyndroms" betroffen sind.',
    detailedDescription: 'Sakuta trifft Mai, eine berühmte Schauspielerin im Bunny-Girl-Kostüm, die vom Pubertätssyndrom betroffen ist - einem Phänomen, das Teenager mit emotionalen Problemen unsichtbar macht. Während er ihr hilft, entwickeln sich tiefe Gefühle.',
    deepDiveInfo: {
      plotAnalysis: 'Die Serie nutzt übernatürliche Elemente als Metapher für moderne Teenager-Probleme wie Social Media, Mobbing und Identitätskrisen. Jeder Arc erforscht verschiedene psychologische Aspekte der Adoleszenz.',
      characterDevelopment: 'Sakuta entwickelt sich von einem zynischen Außenseiter zu jemandem, der anderen wirklich hilft. Mai lernt, ihre Verletzlichkeit zu zeigen und authentische Beziehungen zu pflegen.',
      culturalContext: 'Reflektiert moderne japanische Gesellschaftsprobleme wie Cybermobbing, Leistungsdruck und die Auswirkungen von Social Media auf Jugendliche.',
      recommendations: ['Monogatari Series', 'Oregairu', 'Kokoro Connect'],
      trivia: ['Basiert auf Quantenphysik-Theorien', 'Mai Sakurajima ist ein beliebter Waifu-Charakter', 'Film "Dreaming Girl" gewann mehrere Preise']
    },
    platforms: ['crunchyroll'],
    releaseYear: 2018,
    episodes: 13,
    rating: 4.8,
    popularity: 94,
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
    id: 'kimi-ni-todoke',
    title: 'Kimi ni Todoke',
    titleJapanese: '君に届け',
    description: 'Ein schüchternes Mädchen, das wie Sadako aussieht, findet Freunde und Liebe mit Hilfe des beliebtesten Jungen.',
    detailedDescription: 'Sawako Kuronuma wird wegen ihres Aussehens wie der Horror-Charakter Sadako gemieden. Ihr Leben ändert sich, als der beliebte Kazehaya freundlich zu ihr ist und ihr hilft, echte Freundschaften zu schließen.',
    deepDiveInfo: {
      plotAnalysis: 'Die Serie zeigt, wie oberflächliche Urteile Menschen verletzen können und wie wahre Freundschaft und Liebe Barrieren überwinden. Sawakos Entwicklung ist ein langsamer, aber authentischer Prozess.',
      characterDevelopment: 'Sawako lernt, sich zu öffnen und ihre Persönlichkeit zu zeigen. Kazehaya erkennt, dass auch er Unsicherheiten hat und lernt, seine Gefühle zu kommunizieren.',
      culturalContext: 'Thematisiert das japanische Konzept von "Kuuki wo yomu" (die Atmosphäre lesen) und wie Missverständnisse in der indirekten Kommunikation entstehen.',
      recommendations: ['Lovely Complex', 'Say I Love You', 'Ao Haru Ride'],
      trivia: ['Einer der beliebtesten Shoujo-Manga aller Zeiten', 'Sawako ist ein Symbol für introvertierte Charaktere', 'Live-Action-Film wurde mehrfach adaptiert']
    },
    platforms: ['crunchyroll'],
    releaseYear: 2009,
    episodes: 38,
    rating: 4.7,
    popularity: 89,
    image: '🌻',
    genres: ['Romance', 'Slice of Life', 'School', 'Shoujo'],
    studio: 'Production I.G',
    director: 'Hiro Kaburagi',
    status: 'completed',
    source: 'Manga',
    mainCharacters: ['Sawako Kuronuma', 'Shouta Kazehaya', 'Chizuru Yoshida'],
    themes: ['Overcoming Shyness', 'First Love', 'Friendship', 'Misunderstandings'],
    recommendedAge: '13+',
    gutefrageMention: true,
    malScore: 8.0,
    redditScore: 8.5
  },
  {
    id: 'akagami-no-shirayuki',
    title: 'Snow White with the Red Hair',
    titleJapanese: '赤髪の白雪姫',
    description: 'Eine Kräuterheilerin mit roten Haaren verliebt sich in einen Prinzen in einem märchenhaften Setting.',
    detailedDescription: 'Shirayuki flieht vor einem Prinzen, der sie zur Konkubine machen will, und trifft Zen, einen anderen Prinzen. Sie wird Hofapothekerin und ihre Beziehung entwickelt sich langsam in einer märchenhaften Welt.',
    deepDiveInfo: {
      plotAnalysis: 'Die Serie dekonstruiert das Märchen-Genre, indem sie eine starke, unabhängige Protagonistin präsentiert, die ihre eigenen Ziele verfolgt. Die Romance entwickelt sich organisch ohne Drama.',
      characterDevelopment: 'Shirayuki bleibt ihrer Identität treu, während sie navigiert zwischen Liebe und Karriere. Zen lernt, seine Privilegien zu verstehen und wird ein besserer Prinz.',
      culturalContext: 'Kombiniert europäische Märchen-Ästhetik mit japanischen Werten von harter Arbeit und Bescheidenheit.',
      recommendations: ['Spice and Wolf', 'The Ancient Magus Bride', 'Yona of the Dawn'],
      trivia: ['Seltenes Beispiel für gesunde Beziehung ohne toxische Elemente', 'Shirayuki ist eine der stärksten Shoujo-Protagonistinnen', 'Wunderschöne mittelalterliche Weltanschauung']
    },
    platforms: ['funimation'],
    releaseYear: 2015,
    episodes: 24,
    rating: 4.6,
    popularity: 86,
    image: '🍎',
    genres: ['Romance', 'Drama', 'Fantasy', 'Shoujo'],
    studio: 'Bones',
    director: 'Masahiro Ando',
    status: 'completed',
    source: 'Manga',
    mainCharacters: ['Shirayuki', 'Zen Wistaria', 'Mitsuhide Louen'],
    themes: ['Independent Woman', 'Royal Romance', 'Career vs Love', 'Medieval Fantasy'],
    recommendedAge: '13+',
    gutefrageMention: true,
    malScore: 7.8,
    redditScore: 8.3
  },
  {
    id: 'chainsaw-man',
    title: 'Chainsaw Man',
    titleJapanese: 'チェンソーマン',
    description: 'Ein Teenager wird zu einem Dämonenjäger und navigiert durch komplexe Beziehungen in einer düsteren Welt.',
    detailedDescription: 'Denji wird zum Chainsaw Man und arbeitet für die Dämonenjäger-Behörde. Während er gegen Dämonen kämpft, entwickelt er komplizierte Gefühle für Makima und andere Charaktere.',
    deepDiveInfo: {
      plotAnalysis: 'Die Serie dekonstruiert typische Shonen-Tropes und zeigt toxische Beziehungen sowie die Auswirkungen von Manipulation und Trauma. Romance ist komplex und oft ungesund.',
      characterDevelopment: 'Denji lernt über verschiedene Arten von Liebe und Beziehungen, oft durch schmerzhafte Erfahrungen. Seine Naivität führt zu komplexen emotionalen Situationen.',
      culturalContext: 'Reflektiert moderne Beziehungsdynamiken und die Auswirkungen von Manipulation in der digitalen Ära.',
      recommendations: ['Attack on Titan', 'Jujutsu Kaisen', 'Hell\'s Paradise'],
      trivia: ['Wurde 2025 einer der meistdiskutierten Anime', 'Makima ist ein kontrovers diskutierter Charakter', 'Manga gewann mehrere internationale Preise']
    },
    platforms: ['crunchyroll'],
    releaseYear: 2022,
    episodes: 12,
    rating: 4.5,
    popularity: 97,
    image: '⚡',
    genres: ['Action', 'Romance', 'Supernatural', 'Dark'],
    studio: 'Studio MAPPA',
    director: 'Ryu Nakayama',
    status: 'ongoing',
    source: 'Manga',
    mainCharacters: ['Denji', 'Makima', 'Power'],
    themes: ['Toxic Relationships', 'Manipulation', 'Coming of Age', 'Trauma'],
    recommendedAge: '17+',
    gutefrageMention: true,
    malScore: 8.7,
    redditScore: 9.0
  },
  {
    id: 'jujutsu-kaisen',
    title: 'Jujutsu Kaisen',
    titleJapanese: '呪術廻戦',
    description: 'Ein Schüler wird zum Jujutsu-Zauberer und entwickelt tiefe Bindungen zu seinen Mitschülern.',
    detailedDescription: 'Yuji Itadori wird zur Jujutsu-Schule geschickt, nachdem er einen mächtigen Fluch verschluckt hat. Während er kämpft, entwickelt er starke Beziehungen zu Nobara, Megumi und anderen.',
    deepDiveInfo: {
      plotAnalysis: 'Obwohl primär ein Action-Anime, zeigt die Serie subtile romantische Untertöne und tiefe emotionale Verbindungen zwischen den Charakteren. Die Beziehungen sind komplex und bedeutungsvoll.',
      characterDevelopment: 'Yuji lernt über Opferbereitschaft und Liebe zu Freunden. Die Charaktere entwickeln sich durch gemeinsame Kämpfe und Verluste.',
      culturalContext: 'Moderne Darstellung japanischer Folklore und urbaner Legenden, kombiniert mit zeitgenössischen Themen.',
      recommendations: ['Demon Slayer', 'My Hero Academia', 'Chainsaw Man'],
      trivia: ['Wurde 2025 zu einem der populärsten Anime', 'Nobara ist ein beliebter starker weiblicher Charakter', 'Gojo Satoru ist ein Internet-Phänomen']
    },
    platforms: ['crunchyroll'],
    releaseYear: 2020,
    episodes: 24,
    rating: 4.6,
    popularity: 96,
    image: '👁️',
    genres: ['Action', 'Romance', 'Supernatural', 'School'],
    studio: 'Studio MAPPA',
    director: 'Sunghoo Park',
    status: 'ongoing',
    source: 'Manga',
    mainCharacters: ['Yuji Itadori', 'Nobara Kugisaki', 'Megumi Fushiguro'],
    themes: ['Friendship', 'Sacrifice', 'Growing Up', 'Supernatural Powers'],
    recommendedAge: '15+',
    gutefrageMention: true,
    malScore: 8.5,
    redditScore: 9.1
  },
  {
    id: 'demon-slayer',
    title: 'Demon Slayer',
    titleJapanese: '鬼滅の刃',
    description: 'Ein Junge wird Dämonenjäger, um seine zur Dämonin verwandelte Schwester zu retten.',
    detailedDescription: 'Tanjiro Kamado wird Dämonenjäger, nachdem seine Familie von Dämonen getötet wurde und seine Schwester Nezuko zu einem Dämon verwandelt wurde. Während seiner Reise entwickelt er tiefe Bindungen zu anderen Jägern.',
    deepDiveInfo: {
      plotAnalysis: 'Die Serie zeigt familiäre Liebe und Kameradschaft als zentrale Themen. Romantische Elemente sind subtil, aber bedeutungsvoll, besonders in späteren Arcs.',
      characterDevelopment: 'Tanjiro zeigt bedingungslose Liebe zu seiner Schwester und lernt, anderen zu vertrauen. Andere Charaktere entwickeln romantische Gefühle im Laufe der Serie.',
      culturalContext: 'Basiert auf der Taisho-Ära Japans und zeigt traditionelle Werte von Familie und Ehre.',
      recommendations: ['My Hero Academia', 'Jujutsu Kaisen', 'Attack on Titan'],
      trivia: ['Wurde 2025 einer der erfolgreichsten Anime-Filme', 'Nezuko ist ein beliebter Charakter trotz minimaler Dialoge', 'Revolutionierte Anime-Animation mit CGI-Integration']
    },
    platforms: ['crunchyroll', 'netflix'],
    releaseYear: 2019,
    episodes: 32,
    rating: 4.7,
    popularity: 98,
    image: '⚔️',
    genres: ['Action', 'Romance', 'Historical', 'Supernatural'],
    studio: 'Ufotable',
    director: 'Haruo Sotozaki',
    status: 'ongoing',
    source: 'Manga',
    mainCharacters: ['Tanjiro Kamado', 'Nezuko Kamado', 'Zenitsu Agatsuma'],
    themes: ['Family Love', 'Determination', 'Friendship', 'Redemption'],
    recommendedAge: '13+',
    gutefrageMention: true,
    malScore: 8.7,
    redditScore: 9.2
  },
  {
    id: 'attack-on-titan',
    title: 'Attack on Titan',
    titleJapanese: '進撃の巨人',
    description: 'Menschen kämpfen gegen riesige Titanen, während komplexe Beziehungen und Romanzen entstehen.',
    detailedDescription: 'Eren, Mikasa und Armin kämpfen gegen Titanen, die die Menschheit bedrohen. Während der epischen Schlacht entwickeln sich komplexe romantische Beziehungen und tiefe emotionale Verbindungen.',
    deepDiveInfo: {
      plotAnalysis: 'Die Serie nutzt Krieg und Überleben als Hintergrund für tiefe menschliche Beziehungen. Romantische Elemente sind subtil, aber kraftvoll, besonders Mikasas Gefühle für Eren.',
      characterDevelopment: 'Eren entwickelt sich von einem naiven Jungen zu einem komplexen Charakter. Mikasa lernt, ihre eigenen Wünsche zu verfolgen, nicht nur Eren zu beschützen.',
      culturalContext: 'Reflektiert historische Traumata und die Auswirkungen von Krieg auf persönliche Beziehungen.',
      recommendations: ['Fullmetal Alchemist', 'Death Note', 'Code Geass'],
      trivia: ['Finale 2021 wurde weltweit diskutiert', 'Mikasa und Eren sind ein beliebtes Paar', 'Serie revolutionierte das Dark Fantasy-Genre']
    },
    platforms: ['crunchyroll', 'netflix'],
    releaseYear: 2013,
    episodes: 87,
    rating: 4.9,
    popularity: 99,
    image: '🗡️',
    genres: ['Action', 'Romance', 'Drama', 'Dark Fantasy'],
    studio: 'Studio MAPPA',
    director: 'Tetsuro Araki',
    status: 'completed',
    source: 'Manga',
    mainCharacters: ['Eren Yeager', 'Mikasa Ackerman', 'Armin Arlert'],
    themes: ['War', 'Freedom', 'Sacrifice', 'Unrequited Love'],
    recommendedAge: '16+',
    gutefrageMention: true,
    malScore: 9.0,
    redditScore: 9.4
  },
  {
    id: 'spy-x-family',
    title: 'Spy x Family',
    titleJapanese: 'スパイファミリー',
    description: 'Ein Spion, eine Assassinin und ein telepathisches Kind bilden eine Fake-Familie und entwickeln echte Gefühle.',
    detailedDescription: 'Loid Forger muss eine Familie vortäuschen für seine Mission. Er heiratet Yor, eine Assassinin, und adoptiert Anya, ein telepathisches Kind. Während sie ihre Geheimnisse verbergen, entwickeln sie echte familiäre Bindungen.',
    deepDiveInfo: {
      plotAnalysis: 'Die Serie zeigt, wie eine Fake-Familie zu einer echten wird. Die Romance zwischen Loid und Yor entwickelt sich langsam, während sie lernen, einander zu vertrauen.',
      characterDevelopment: 'Loid lernt, echte Gefühle zu entwickeln jenseits seiner Spion-Persona. Yor entdeckt, was es bedeutet, eine Mutter und Ehefrau zu sein.',
      culturalContext: 'Spielt im Kalten Krieg und zeigt, wie politische Spannungen persönliche Beziehungen beeinflussen.',
      recommendations: ['Kaguya-sama', 'The Way of the Househusband', 'Monthly Girls Nozaki-kun'],
      trivia: ['Wurde 2025 zu einem der beliebtesten Family-Anime', 'Anya wurde ein Meme-Phänomen', 'Mischt perfekt Comedy mit Romance']
    },
    platforms: ['crunchyroll'],
    releaseYear: 2022,
    episodes: 25,
    rating: 4.8,
    popularity: 97,
    image: '🕵️',
    genres: ['Romance', 'Comedy', 'Action', 'Family'],
    studio: 'Wit Studio',
    director: 'Kazuhiro Furuhashi',
    status: 'ongoing',
    source: 'Manga',
    mainCharacters: ['Loid Forger', 'Yor Forger', 'Anya Forger'],
    themes: ['Fake Family', 'Slow Burn Romance', 'Secret Identities', 'Found Family'],
    recommendedAge: '13+',
    gutefrageMention: true,
    malScore: 8.6,
    redditScore: 9.0
  },
  {
    id: 'dress-up-darling',
    title: 'My Dress-Up Darling',
    titleJapanese: 'その着せ替え人形は恋をする',
    description: 'Ein schüchterner Junge, der Hina-Dolls macht, hilft einem Mädchen beim Cosplay und sie verlieben sich.',
    detailedDescription: 'Wakana Gojo ist ein introvertierter Schüler, der Hina-Dolls liebt. Marin Kitagawa bittet ihn, Cosplay-Kostüme zu machen. Während sie zusammenarbeiten, entwickeln sie eine süße Romance.',
    deepDiveInfo: {
      plotAnalysis: 'Die Serie zeigt, wie gemeinsame Interessen und gegenseitiger Respekt die Basis für eine gesunde Beziehung bilden. Beide Charaktere wachsen durch ihre Hobbys.',
      characterDevelopment: 'Wakana gewinnt Selbstvertrauen durch Marins Unterstützung. Marin lernt, tiefere Gefühle zu entwickeln jenseits ihrer oberflächlichen Interessen.',
      culturalContext: 'Thematisiert Otaku-Kultur und Cosplay in der modernen japanischen Gesellschaft ohne Stigmatisierung.',
      recommendations: ['Horimiya', 'Wotakoi', 'Recovery of an MMO Junkie'],
      trivia: ['Wurde 2025 zu einem der beliebtesten Romance-Anime', 'Marin ist ein beliebter Waifu-Charakter', 'Zeigt authentische Cosplay-Kultur']
    },
    platforms: ['crunchyroll', 'funimation'],
    releaseYear: 2022,
    episodes: 12,
    rating: 4.7,
    popularity: 95,
    image: '🎭',
    genres: ['Romance', 'Comedy', 'School', 'Slice of Life'],
    studio: 'Studio Gokumi',
    director: 'Keisuke Shinohara',
    status: 'ongoing',
    source: 'Manga',
    mainCharacters: ['Wakana Gojo', 'Marin Kitagawa'],
    themes: ['Cosplay', 'Otaku Culture', 'Healthy Relationship', 'Hobby Romance'],
    recommendedAge: '15+',
    gutefrageMention: true,
    malScore: 8.2,
    redditScore: 8.7
  },
  {
    id: 'rent-a-girlfriend',
    title: 'Rent-a-Girlfriend',
    titleJapanese: '彼女、お借りします',
    description: 'Ein College-Student mietet eine Freundin und gerät in komplizierte romantische Verwicklungen.',
    detailedDescription: 'Kazuya wird von seiner Freundin verlassen und mietet aus Verzweiflung eine Freundin über eine App. Chizuru scheint perfekt, aber ihre wahre Persönlichkeit ist anders. Als ihre Familien sich einmischen, müssen sie ihre Fake-Beziehung aufrechterhalten.',
    deepDiveInfo: {
      plotAnalysis: 'Die Serie erforscht moderne Dating-Kultur und die Kommerzialisierung von Beziehungen. Sie zeigt die Probleme von Fake-Beziehungen und emotionaler Abhängigkeit.',
      characterDevelopment: 'Kazuya lernt langsam, echter zu werden und seine Unsicherheiten zu überwinden. Chizuru kämpft zwischen ihrer professionellen Rolle und echten Gefühlen.',
      culturalContext: 'Reflektiert die moderne japanische Dating-Kultur und den Trend von Rental-Services in Tokyo.',
      recommendations: ['Love is War', 'Domestic Girlfriend', 'Nisekoi'],
      trivia: ['Sehr kontrovers diskutiert auf gutefrage.net 2025', 'Chizuru ist ein beliebter aber polarisierender Charakter', 'Manga läuft seit 2017']
    },
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
    themes: ['Fake Dating', 'Rental Services', 'Modern Romance', 'Insecurity'],
    recommendedAge: '16+',
    gutefrageMention: true,
    malScore: 6.9,
    redditScore: 7.2
  },
  {
    id: 'nisekoi',
    title: 'Nisekoi',
    titleJapanese: 'ニセコイ',
    description: 'Ein Schüler muss eine Fake-Beziehung mit der Tochter eines rivalisierenden Gangster-Clans führen.',
    detailedDescription: 'Raku Ichijo, Sohn eines Yakuza-Bosses, muss mit Chitoge Kirisaki, Tochter eines rivalisierenden Clans, eine falsche Beziehung führen, um Frieden zwischen den Familien zu schaffen. Währenddessen sucht er nach seinem Kindheitsversprechen.',
    deepDiveInfo: {
      plotAnalysis: 'Klassische Fake-Dating-Trope mit Harem-Elementen. Die Serie spielt mit dem Konzept von Schicksal vs. Wahl in der Liebe.',
      characterDevelopment: 'Raku lernt, zwischen Vergangenheit und Gegenwart zu wählen. Chitoge entwickelt sich von einer aggressiven Tsundere zu einem verletzlichen Charakter.',
      culturalContext: 'Zeigt moderne Yakuza-Kultur in der Populärkultur und japanische Harem-Comedy-Tropes.',
      recommendations: ['Love is War', 'Toradora!', 'The Quintessential Quintuplets'],
      trivia: ['Wurde 2025 oft als "Guilty Pleasure" auf gutefrage.net erwähnt', 'Chitoge vs. Onodera war ein großer Waifu-War', 'Live-Action-Film wurde 2018 veröffentlicht']
    },
    platforms: ['crunchyroll'],
    releaseYear: 2014,
    episodes: 32,
    rating: 4.4,
    popularity: 87,
    image: '🔑',
    genres: ['Romance', 'Comedy', 'Harem', 'School'],
    studio: 'Shaft',
    director: 'Akiyuki Shinbo',
    status: 'completed',
    source: 'Manga',
    mainCharacters: ['Raku Ichijo', 'Chitoge Kirisaki', 'Kosaki Onodera'],
    themes: ['Fake Dating', 'Childhood Promise', 'Love Triangle', 'Yakuza'],
    recommendedAge: '13+',
    gutefrageMention: true,
    malScore: 7.6,
    redditScore: 8.0
  },
  {
    id: 'quintessential-quintuplets',
    title: 'The Quintessential Quintuplets',
    titleJapanese: '五等分の花嫁',
    description: 'Ein armer Schüler wird Tutor für fünf eineiige Zwillingsschwestern und alle verlieben sich in ihn.',
    detailedDescription: 'Fuutarou Uesugi wird als Tutor für die Nakano-Quintuplets eingestellt - fünf schöne aber verschiedene Schwestern. Während er ihnen beim Studieren hilft, entwickeln alle Gefühle für ihn.',
    deepDiveInfo: {
      plotAnalysis: 'Moderne Harem-Serie, die jeder Schwester eine eigene Persönlichkeit und Entwicklung gibt. Das "Braut-Spiel" sorgt für Spannung über die ganze Serie.',
      characterDevelopment: 'Fuutarou wird von einem arroganten Einzelgänger zu jemandem, der anderen hilft. Jede Schwester wächst durch seine Hilfe.',
      culturalContext: 'Zeigt den Druck des japanischen Bildungssystems und familiäre Verantwortung.',
      recommendations: ['Nisekoi', 'Love is War', 'We Never Learn'],
      trivia: ['Finale sorgte 2025 noch für Diskussionen auf gutefrage.net', 'Jede Schwester hat treue Fanbase', 'Erfolgreichster Harem-Anime der 2020er']
    },
    platforms: ['crunchyroll'],
    releaseYear: 2019,
    episodes: 24,
    rating: 4.5,
    popularity: 90,
    image: '👭',
    genres: ['Romance', 'Comedy', 'Harem', 'School'],
    studio: 'Tezuka Productions',
    director: 'Satoshi Kuwabara',
    status: 'completed',
    source: 'Manga',
    mainCharacters: ['Fuutarou Uesugi', 'Ichika Nakano', 'Nino Nakano', 'Miku Nakano', 'Yotsuba Nakano', 'Itsuki Nakano'],
    themes: ['Tutoring', 'Harem', 'Family', 'Academic Pressure'],
    recommendedAge: '13+',
    gutefrageMention: true,
    malScore: 7.8,
    redditScore: 8.4
  },
  {
    id: 'oregairu',
    title: 'My Teen Romantic Comedy SNAFU',
    titleJapanese: '俺の青春ラブコメはまちがっている。',
    description: 'Ein zynischer Loner wird gezwungen, anderen bei ihren Problemen zu helfen und entdeckt dabei wahre Verbindungen.',
    detailedDescription: 'Hachiman Hikigaya ist ein zynischer Schüler, der Menschen verachtet. Nach einem kontroversen Aufsatz wird er in den Freiwilligendienst-Club gesteckt, wo er Yukino und Yui trifft.',
    deepDiveInfo: {
      plotAnalysis: 'Tiefe psychologische Analyse von Teenagerproblemen und sozialen Dynamiken. Zeigt realistische Charakterentwicklung ohne typische Anime-Tropes.',
      characterDevelopment: 'Hachiman lernt, dass seine Isolation ihn und andere verletzt. Yukino und Yui wachsen durch ihre komplizierte Dreiecksbeziehung.',
      culturalContext: 'Kritisiert japanische Schulkultur und den Druck zur sozialen Konformität.',
      recommendations: ['Bunny Girl Senpai', 'Classroom of the Elite', 'ReLIFE'],
      trivia: ['Gilt als "intelligentester" Romance-Anime auf gutefrage.net', 'Hachiman ist ein beliebter Anti-Hero', 'Light Novel gewann mehrere Literaturpreise']
    },
    platforms: ['crunchyroll'],
    releaseYear: 2013,
    episodes: 39,
    rating: 4.6,
    popularity: 88,
    image: '🎯',
    genres: ['Romance', 'Comedy', 'Drama', 'School'],
    studio: 'Brain\'s Base',
    director: 'Ai Yoshimura',
    status: 'completed',
    source: 'Light Novel',
    mainCharacters: ['Hachiman Hikigaya', 'Yukino Yukinoshita', 'Yui Yuigahama'],
    themes: ['Social Outcasts', 'Character Growth', 'Realistic Romance', 'Cynicism'],
    recommendedAge: '15+',
    gutefrageMention: true,
    malScore: 8.0,
    redditScore: 8.7
  },
  {
    id: 'wotakoi',
    title: 'Wotakoi: Love is Hard for Otaku',
    titleJapanese: 'ヲタクに恋は難しい',
    description: 'Zwei erwachsene Otakus navigieren ihre Beziehung zwischen Arbeit und ihren Nerd-Hobbys.',
    detailedDescription: 'Narumi versteckt ihre Otaku-Seite bei der Arbeit, bis sie ihren Kindheitsfreund Hirotaka wiedertrifft. Beide sind Otakus und beschließen zu daten, während sie ihre Hobbys und Beziehung balancieren.',
    deepDiveInfo: {
      plotAnalysis: 'Zeigt erwachsene Beziehungen und wie Hobbys Beziehungen beeinflussen können. Einer der wenigen Anime über arbeitende Erwachsene.',
      characterDevelopment: 'Narumi lernt, sich selbst zu akzeptieren. Hirotaka entwickelt emotionale Intelligenz jenseits von Games.',
      culturalContext: 'Thematisiert Otaku-Kultur im modernen Japan und die Balance zwischen Arbeit und Hobbys.',
      recommendations: ['Recovery of an MMO Junkie', 'My Dress-Up Darling', 'New Game!'],
      trivia: ['Sehr beliebt bei Adult-Anime-Fans auf gutefrage.net', 'Zeigt gesunde Otaku-Beziehungen', 'Basiert auf einem Webcomic']
    },
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
    id: 'golden-time',
    title: 'Golden Time',
    titleJapanese: 'ゴールデンタイム',
    description: 'Ein Jurastudent mit Gedächtnisverlust navigiert durch College-Romance und komplizierte Vergangenheit.',
    detailedDescription: 'Banri Tada verliert nach einem Unfall sein Gedächtnis und beginnt ein neues Leben im College. Er trifft die obsessive Kouko und entwickelt eine komplizierte Beziehung, während seine Vergangenheit zurückkehrt.',
    deepDiveInfo: {
      plotAnalysis: 'Zeigt College-Romance mit psychologischen Elementen. Thematisiert Identitätsverlust und die Frage, wer wir ohne unsere Erinnerungen sind.',
      characterDevelopment: 'Banri kämpft mit zwei Identitäten. Kouko lernt, weniger besitzergreifend zu werden und echte Liebe zu verstehen.',
      culturalContext: 'Seltene Darstellung des japanischen College-Lebens statt Highschool. Zeigt erwachsenere Beziehungsprobleme.',
      recommendations: ['Toradora!', 'Oregairu', 'ReLIFE'],
      trivia: ['Vom selben Autor wie Toradora!', 'College-Setting ist ungewöhnlich für Romance-Anime', 'Behandelt ernste psychologische Themen']
    },
    platforms: ['crunchyroll'],
    releaseYear: 2013,
    episodes: 24,
    rating: 4.4,
    popularity: 84,
    image: '📚',
    genres: ['Romance', 'Drama', 'Comedy', 'College'],
    studio: 'J.C.Staff',
    director: 'Chiaki Kon',
    status: 'completed',
    source: 'Light Novel',
    mainCharacters: ['Banri Tada', 'Kouko Kaga', 'Linda'],
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
    detailedDescription: 'Nana Komatsu folgt ihrem Freund nach Tokyo. Nana Osaki ist eine Punk-Rockerin mit Ambitionen. Beide treffen sich im Zug und werden Mitbewohnerinnen, ihre Leben verflechten sich durch Liebe und Freundschaft.',
    deepDiveInfo: {
      plotAnalysis: 'Mature Romance, die realistische Erwachsenenprobleme zeigt. Fokus auf weibliche Freundschaft und die Schwierigkeiten des Erwachsenwerdens.',
      characterDevelopment: 'Beide Nanas wachsen durch ihre Freundschaft und lernen, unabhängiger zu werden. Komplexe Charakterentwicklung über mehrere Beziehungen.',
      culturalContext: 'Zeigt die Musik-Szene und das Leben junger Erwachsener in Tokyo. Thematisiert Drogen, Sex und realistische Probleme.',
      recommendations: ['Paradise Kiss', 'Honey and Clover', 'Beck'],
      trivia: ['Manga pausiert seit 2009 wegen Krankheit der Autorin', 'Sehr beliebte Live-Action-Filme', 'Gilt als erwachsenster Romance-Anime']
    },
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
    id: 'lovely-complex',
    title: 'Lovely Complex',
    titleJapanese: 'ラブリーコンプレックス',
    description: 'Eine große Schülerin und ein kleiner Schüler überwinden ihre Komplexe und verlieben sich.',
    detailedDescription: 'Risa ist ungewöhnlich groß für ein japanisches Mädchen, Otani ist klein für einen Jungen. Beide haben Komplexe wegen ihrer Größe und necken sich ständig, bis sie merken, dass sie perfekt zueinander passen.',
    deepDiveInfo: {
      plotAnalysis: 'Behandelt Körperkomplexe und Selbstakzeptanz. Zeigt, wie physische Unterschiede in Beziehungen überwunden werden können.',
      characterDevelopment: 'Risa lernt, stolz auf ihre Größe zu sein. Otani akzeptiert, dass Liebe wichtiger ist als gesellschaftliche Erwartungen.',
      culturalContext: 'Spielt in Osaka und zeigt die lokale Kultur. Thematisiert japanische Schönheitsstandards.',
      recommendations: ['My Love Story!!', 'Kimi ni Todoke', 'Say I Love You'],
      trivia: ['Osaka-Dialekt macht es authentisch', 'Behandelt ernste Body-Image-Issues mit Humor', 'Sehr beliebte Comedy-Romance']
    },
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
    id: 'ao-haru-ride',
    title: 'Ao Haru Ride',
    titleJapanese: 'アオハライド',
    description: 'Eine Schülerin trifft ihren Jugendfreund wieder, aber er hat sich völlig verändert.',
    detailedDescription: 'Futaba war in der Mittelschule in Kou verliebt, aber er verschwand plötzlich. In der Oberschule trifft sie ihn wieder, aber er ist jetzt kalt und distanziert geworden.',
    deepDiveInfo: {
      plotAnalysis: 'Thematisiert, wie Menschen sich verändern und wie Vergangenheit die Gegenwart beeinflusst. Zeigt den Schmerz von unerfüllten Jugendträumen.',
      characterDevelopment: 'Futaba lernt, mit Veränderung umzugehen. Kou verarbeitet sein Trauma und öffnet sich wieder.',
      culturalContext: 'Zeigt typische japanische Schulprobleme und den Druck, sich anzupassen.',
      recommendations: ['Say I Love You', 'Kimi ni Todoke', 'Orange'],
      trivia: ['Sehr emotional und melancholisch', 'Behandelt Trauer und Verlust', 'Beliebter Shoujo-Manga']
    },
    platforms: ['crunchyroll'],
    releaseYear: 2014,
    episodes: 12,
    rating: 4.5,
    popularity: 86,
    image: '🌸',
    genres: ['Romance', 'Drama', 'School', 'Slice of Life'],
    studio: 'Production I.G',
    director: 'Ai Yoshimura',
    status: 'completed',
    source: 'Manga',
    mainCharacters: ['Futaba Yoshioka', 'Kou Mabuchi', 'Shuko Murao'],
    themes: ['Childhood Friends', 'Second Chances', 'Growing Apart', 'Trauma'],
    recommendedAge: '13+',
    gutefrageMention: true,
    malScore: 7.4,
    redditScore: 8.0
  }
]

export default function RomanceAnimeGuide() {
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null)
  const [detailLevel, setDetailLevel] = useState<DetailLevel>('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<string>('')
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | ''>('')

  const filteredAnime = useMemo(() => {
    return animeData.filter(anime => {
      const matchesSearch = anime.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           anime.titleJapanese.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           anime.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesGenre = !selectedGenre || anime.genres.includes(selectedGenre)
      const matchesPlatform = !selectedPlatform || anime.platforms.includes(selectedPlatform)
      
      return matchesSearch && matchesGenre && matchesPlatform
    })
  }, [searchTerm, selectedGenre, selectedPlatform])

  const allGenres = useMemo(() => {
    const genres = new Set<string>()
    animeData.forEach(anime => anime.genres.forEach(genre => genres.add(genre)))
    return Array.from(genres).sort()
  }, [])

  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case 'netflix': return <NetflixLogo />
      case 'crunchyroll': return <CrunchyrollLogo />
      case 'prime': return <PrimeLogo />
      case 'funimation': return <div className="w-5 h-5 bg-purple-500 rounded text-white text-xs flex items-center justify-center">F</div>
      default: return null
    }
  }

  const renderDetailContent = () => {
    if (!selectedAnime) return null

    switch (detailLevel) {
      case 'overview':
        return (
          <div className="space-y-4">
            <p className="text-gray-300">{selectedAnime.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Studio:</span>
                <span className="text-white ml-2">{selectedAnime.studio}</span>
              </div>
              <div>
                <span className="text-gray-400">Episoden:</span>
                <span className="text-white ml-2">{selectedAnime.episodes}</span>
              </div>
              <div>
                <span className="text-gray-400">Jahr:</span>
                <span className="text-white ml-2">{selectedAnime.releaseYear}</span>
              </div>
              <div>
                <span className="text-gray-400">Altersempfehlung:</span>
                <span className="text-white ml-2">{selectedAnime.recommendedAge}</span>
              </div>
            </div>
          </div>
        )
      case 'details':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-white mb-2">Detaillierte Beschreibung</h4>
              <p className="text-gray-300">{selectedAnime.detailedDescription}</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Hauptcharaktere</h4>
              <div className="flex flex-wrap gap-2">
                {selectedAnime.mainCharacters.map((character, index) => (
                  <span key={index} className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                    {character}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Themen</h4>
              <div className="flex flex-wrap gap-2">
                {selectedAnime.themes.map((theme, index) => (
                  <span key={index} className="bg-pink-600/20 text-pink-300 px-3 py-1 rounded-full text-sm">
                    {theme}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400">{selectedAnime.malScore}</div>
                <div className="text-sm text-gray-400">MyAnimeList</div>
              </div>
              <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-orange-400">{selectedAnime.redditScore}</div>
                <div className="text-sm text-gray-400">Reddit Score</div>
              </div>
            </div>
          </div>
        )
      case 'deep-dive':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Plot-Analyse
              </h4>
              <p className="text-gray-300">{selectedAnime.deepDiveInfo.plotAnalysis}</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Charakterentwicklung
              </h4>
              <p className="text-gray-300">{selectedAnime.deepDiveInfo.characterDevelopment}</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Kultureller Kontext
              </h4>
              <p className="text-gray-300">{selectedAnime.deepDiveInfo.culturalContext}</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Ähnliche Anime
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedAnime.deepDiveInfo.recommendations.map((rec, index) => (
                  <span key={index} className="bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-sm">
                    {rec}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Interessante Fakten
              </h4>
              <ul className="space-y-2">
                {selectedAnime.deepDiveInfo.trivia.map((fact, index) => (
                  <li key={index} className="text-gray-300 flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Romance Anime Guide
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Entdecke die besten Romance-Anime aller Zeiten - von klassischen Liebesgeschichten bis hin zu modernen Meisterwerken.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Suche nach Anime..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
          
          <div className="flex gap-4 flex-wrap">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
            >
              <option value="">Alle Genres</option>
              {allGenres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value as Platform | '')}
              className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
            >
              <option value="">Alle Plattformen</option>
              <option value="netflix">Netflix</option>
              <option value="crunchyroll">Crunchyroll</option>
              <option value="prime">Prime Video</option>
              <option value="funimation">Funimation</option>
            </select>
          </div>
        </div>

        {/* Anime Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                {/* Header */}
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
                  {anime.genres.slice(0, 3).map((genre, i) => (
                    <span key={i} className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs">
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Platforms */}
                <div className="flex items-center gap-2">
                  {anime.platforms.map((platform, i) => (
                    <div key={i} className="flex items-center gap-1 bg-gray-700/50 px-2 py-1 rounded">
                      {getPlatformIcon(platform)}
                      <span className="text-xs text-gray-300 capitalize">{platform}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Anime Detail Modal */}
        <AnimatePresence>
          {selectedAnime && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={(e) => e.target === e.currentTarget && setSelectedAnime(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-gray-800 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{selectedAnime.image}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedAnime.title}</h2>
                      <p className="text-gray-400">{selectedAnime.titleJapanese}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAnime(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Detail Level Navigation */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setDetailLevel('overview')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      detailLevel === 'overview' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Übersicht
                  </button>
                  <button
                    onClick={() => setDetailLevel('details')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      detailLevel === 'details' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Details
                  </button>
                  <button
                    onClick={() => setDetailLevel('deep-dive')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      detailLevel === 'deep-dive' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Deep Dive
                  </button>
                </div>

                {/* Content */}
                {renderDetailContent()}

                {/* Platforms */}
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <h4 className="font-bold text-white mb-3">Verfügbar auf:</h4>
                  <div className="flex items-center gap-3">
                    {selectedAnime.platforms.map((platform, i) => (
                      <div key={i} className="flex items-center gap-2 bg-gray-700/50 px-3 py-2 rounded-lg">
                        {getPlatformIcon(platform)}
                        <span className="text-sm text-gray-300 capitalize">{platform}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
