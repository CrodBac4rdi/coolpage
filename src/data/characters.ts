export interface Character {
  id: string
  name: string
  story: string
  storyId: string
  emoji: string
  role: string
  age?: string
  personality: string[]
  background: string
  secrets?: string[]
  relationships: string[]
  quotes: string[]
  appearance: string
  gradient: string
  profileImage?: string
}

export const characters: Character[] = [
  {
    id: "elena-santos",
    name: "Elena Santos",
    story: "Forbidden Desire",
    storyId: "forbidden-desire",
    emoji: "⚖️",
    role: "Erfolgreiche Anwältin",
    age: "29",
    personality: ["Intelligent", "Ehrgeizig", "Verletzlich", "Leidenschaftlich"],
    background: "Elena wuchs in ärmlichen Verhältnissen auf und erkämpfte sich ihren Weg an die Spitze der Rechtswelt. Sie ist Partner in einer der angesehensten Kanzleien der Stadt.",
    secrets: [
      "Hat ihre wahre Herkunft vor Kollegen verborgen",
      "Führt ein Doppelleben zwischen Arbeit und verbotener Liebe",
      "Kennt Marcus' dunkle Geheimnisse, aber kann nicht widerstehen"
    ],
    relationships: [
      "Marcus Reid - Verbotene Leidenschaft",
      "Sophia Kim - Beste Freundin und Kollegin",
      "Richard Santos - Entfremdeter Vater"
    ],
    quotes: [
      "Gerechtigkeit ist nicht immer das, was legal ist.",
      "Ich bin nicht die Frau, die sich von Gefühlen leiten lässt.",
      "Manchmal muss man alles riskieren für das, was man liebt."
    ],
    appearance: "Elegante schwarze Haare, smaragdgrüne Augen, trägt immer perfekt sitzende Business-Anzüge",
    gradient: "from-emerald-500/20 to-teal-500/20"
  },
  {
    id: "marcus-reid",
    name: "Marcus Reid",
    story: "Forbidden Desire", 
    storyId: "forbidden-desire",
    emoji: "🖤",
    role: "Mysteriöser Geschäftsmann",
    age: "34",
    personality: ["Charismatisch", "Geheimnisvoll", "Gefährlich", "Beschützend"],
    background: "Marcus hat sich aus schwierigen Verhältnissen hochgearbeitet, aber seine Methoden sind fragwürdig. Er kontrolliert ein Imperium aus legalen und weniger legalen Geschäften.",
    secrets: [
      "Leitet eine internationale Geldwäscheoperation",
      "Hat eine tragische Vergangenheit, die ihn formte",
      "Ist bereit, alles für Elena aufzugeben"
    ],
    relationships: [
      "Elena Santos - Verbotene Liebe",
      "Viktor Petrov - Geschäftspartner und Rivale",
      "Isabella - Ex-Verlobte mit gefährlichen Verbindungen"
    ],
    quotes: [
      "Macht ohne Moral ist nur Zerstörung.",
      "Elena, du bist das einzige Licht in meiner dunklen Welt.",
      "Manche Entscheidungen kann man nicht rückgängig machen."
    ],
    appearance: "Dunkle Haare, durchdringende blaue Augen, trägt immer maßgeschneiderte Anzüge",
    gradient: "from-slate-500/20 to-gray-500/20"
  },
  {
    id: "yoon-ah-choi",
    name: "Yoon-ah Choi",
    story: "The Transfer Student",
    storyId: "the-transfer-student",
    emoji: "📝",
    role: "Mysteriöse Transferschülerin",
    age: "17",
    personality: ["Entschlossen", "Traumatisiert", "Mutig", "Empathisch"],
    background: "Yoon-ah kommt von einer Schule, wo ihre beste Freundin Sae-rom Suizid beging wegen Mobbing. Sie hat es sich zur Mission gemacht, Ungerechtigkeit an Schulen zu bekämpfen.",
    secrets: [
      "Führt ein schwarzes Notizbuch mit dokumentierten Mobbing-Fällen",
      "Hat den Tod ihrer besten Freundin miterlebt",
      "Plant systematisch, das Mobbing-System zu entlarven"
    ],
    relationships: [
      "Min-ji Kim - Unerwartete Verbündete",
      "Sae-rom Park - Verstorbene beste Freundin",
      "Ji-ho Lee - Mitschüler, dem sie hilft"
    ],
    quotes: [
      "Schweigen macht uns alle zu Mittätern.",
      "Sae-rom verdient Gerechtigkeit, auch wenn es zu spät ist.",
      "Manchmal muss man das System von innen zerstören."
    ],
    appearance: "Schwarze Haare zu einem Pferdeschwanz, wachsame dunkle Augen, trägt die Schuluniform ordentlich",
    gradient: "from-blue-500/20 to-indigo-500/20"
  },
  {
    id: "zoe-zero-chen",
    name: "Zoe 'Zero' Chen",
    story: "Code Breakers",
    storyId: "code-breakers", 
    emoji: "💻",
    role: "Elite White-Hat Hackerin",
    age: "22",
    personality: ["Brillant", "Rebellisch", "Loyal", "Sarkastisch"],
    background: "Zoe ist eine der weltbesten Hackerinnen und arbeitet offiziell für CyberShield Corp. Inoffiziell deckt sie Verschwörungen auf und kämpft für digitale Gerechtigkeit.",
    secrets: [
      "Ihre DNA enthält einen biologischen Kill-Code",
      "Wurde von ihrer Tante für diesen Kampf vorbereitet",
      "Hat eine geklonte 'Schwester' namens Eve"
    ],
    relationships: [
      "Eve - Klon-Schwester und ehemalige Feindin",
      "Sarah Chen - Tante und Mentorin",
      "Kai Morrison - Partner und Liebe",
      "Pandora - KI-'Tochter'"
    ],
    quotes: [
      "Code ist Poesie, und ich bin die Dichterin.",
      "Die besten Hacks sind die, die niemand bemerkt.",
      "Familie ist keine Frage der DNA, sondern der Wahl."
    ],
    appearance: "Asymmetrischer blauer Haarschnitt, mehrere Piercings, trägt Hoodies und Cargo-Pants",
    gradient: "from-cyan-500/20 to-blue-500/20"
  },
  {
    id: "mira-nachtstern",
    name: "Dr. Mira Nachtstern", 
    story: "Dream Catcher",
    storyId: "dream-catcher",
    emoji: "🌙",
    role: "Traumtherapeutin & Traumwandlerin",
    age: "35",
    personality: ["Weise", "Mutig", "Empathisch", "Mystisch"],
    background: "Mira hat die seltene Gabe, in die Träume anderer einzudringen. Sie nutzt diese Fähigkeit, um Menschen mit Albträumen zu helfen und Traumparasiten zu bekämpfen.",
    secrets: [
      "Erbin einer Linie von Traumwächtern",
      "Besitzt magische Artefakte ihrer Großmutter",
      "Kann zwischen verschiedenen Traumebenen reisen"
    ],
    relationships: [
      "Luna Nachtstern - Nichte und Erbin",
      "Thomas - Patient und Verbündeter", 
      "Echo - Traumwesen aus anderer Dimension",
      "Lux - Erlöster Traumschatten"
    ],
    quotes: [
      "Träume sind Tore zu uns selbst.",
      "Albträume sind Lehrer in Verkleidung.",
      "In der Traumwelt sind wir alle gleich."
    ],
    appearance: "Silberne Strähnen im dunklen Haar, violette Augen, trägt eine magische Kette",
    gradient: "from-purple-500/20 to-indigo-500/20"
  },
  {
    id: "luna-park",
    name: "Luna Park",
    story: "Moonlight Academy",
    storyId: "moonlight-academy",
    emoji: "🌙",
    role: "Mondhexe & Schülerin",
    age: "16", 
    personality: ["Neugierig", "Stark-willed", "Beschützend", "Spontan"],
    background: "Luna entdeckt an ihrem 16. Geburtstag, dass sie eine mächtige Mondhexe ist. An der Moonlight Academy lernt sie, ihre Kräfte zu kontrollieren und kämpft gegen dunkle Mächte.",
    secrets: [
      "Ihre Mondkräfte sind stärker als die aller anderen",
      "Hat eine Verbindung zu einer uralten Mondgöttin",
      "Kann bei Vollmond ihre Gestalt wandeln"
    ],
    relationships: [
      "Kai Blackwood - Werwolf-Prinz und Partner",
      "Professor Nightshade - Mentorin",
      "Raven - Vampir-Freundin",
      "Die Schattenkreaturen - Erzfeinde"
    ],
    quotes: [
      "Das Mondlicht flüstert mir Geheimnisse zu.",
      "Stärke liegt nicht in der Macht, sondern im Herzen.",
      "Wir sind alle verbunden durch das Licht der Nacht."
    ],
    appearance: "Silbernes Haar, leuchtende blaue Augen, trägt einen Mondstein-Anhänger",
    gradient: "from-blue-400/20 to-purple-400/20"
  },
  {
    id: "ji-woo-park",
    name: "Park Ji-woo",
    story: "My Boss is a Cat?!",
    storyId: "my-boss-is-a-cat",
    emoji: "📋",
    role: "Persönliche Assistentin", 
    age: "26",
    personality: ["Organisiert", "Humor", "Loyal", "Adaptiv"],
    background: "Ji-woo ist die perfekte Assistentin, bis sie entdeckt, dass ihr CEO sich in eine Katze verwandelt. Sie muss nun sein Geheimnis hüten während sie langsam Gefühle für ihn entwickelt.",
    secrets: [
      "Weiß als einzige von Min-juns Verwandlung",
      "Führt ein Doppelleben als Katzen-'Mama'",
      "Hat eine Katzenallergie, die sie versteckt"
    ],
    relationships: [
      "Lee Min-jun - Boss und heimliche Liebe",
      "Mr. Whiskers - Min-juns Katzenform", 
      "Soo-jin - Beste Freundin und Kollegin",
      "Ihre Mutter - Sorgt sich um Ji-woos Liebesleben"
    ],
    quotes: [
      "Mein Boss ist seltsam, aber... bezaubernd seltsam.",
      "Wer hätte gedacht, dass Katzenfutter so teuer ist?",
      "Liebe kommt in den merkwürdigsten Formen."
    ],
    appearance: "Kurze braune Haare, große braune Augen, trägt professionelle aber niedliche Outfits",
    gradient: "from-orange-400/20 to-pink-400/20"
  },
  {
    id: "yuki-tanaka",
    name: "Yuki Tanaka",
    story: "Shadow in the Mirror", 
    storyId: "shadow-in-the-mirror",
    emoji: "🪞",
    role: "Highschool-Schülerin",
    age: "17",
    personality: ["Neugierig", "Mutig", "Verletzlich", "Entschlossen"],
    background: "Yuki findet auf dem Dachboden einen verfluchten Spiegel und wird in eine Welt voller Dämonen und Spiegelgeister hineingezogen. Sie muss lernen, mit übernatürlichen Kräften umzugehen.",
    secrets: [
      "Kann Geister und Dämonen sehen",
      "Hat eine Verbindung zur Spiegelwelt",
      "Ihr Spiegelbild hat ein Eigenleben"
    ],
    relationships: [
      "Ren Nakamura - Exorzist und Beschützer",
      "Das Spiegelbild - Dunkler Doppelgänger",
      "Akira - Bester Freund seit Kindheit",
      "Die Spiegel-Dämonen - Antagonisten"
    ],
    quotes: [
      "Spiegel lügen nie, aber sie zeigen nicht immer die Wahrheit.",
      "Manche Geheimnisse sind besser begraben.",
      "Mut ist nicht die Abwesenheit von Angst."
    ],
    appearance: "Lange schwarze Haare, dunkle Augen, trägt Schuluniform mit mystischen Amuletten",
    gradient: "from-gray-500/20 to-purple-500/20"
  }
]

export const getCharactersByStory = (storyId: string) => {
  return characters.filter(char => char.storyId === storyId)
}

export const getCharacterById = (id: string) => {
  return characters.find(char => char.id === id)
}