export interface Character {
  id: string
  name: string
  story: string
  storyId: string
  icon: string // 3D illustrated icon instead of emoji
  role: string
  age: string
  personality: string[]
  background: string
  
  // DEEP PERSONALITY DIVE - 2025 style
  hobbies: string[]
  loves: string[]
  fears: string[]
  dreams: string[]
  favoriteFoods: string[]
  musicTaste: string[]
  quirks: string[]
  petPeeves: string[]
  skills: string[]
  weaknesses: string[]
  
  // PERSONAL DETAILS
  childhood: string
  motivations: string
  innerConflict: string
  secrets?: string[]
  relationships: string[]
  quotes: string[]
  
  // VISUAL
  appearance: string
  style: string
  gradient: string
  iconColor: string
  mood: 'warm' | 'cool' | 'mysterious' | 'energetic' | 'calm'
}

export const characters: Character[] = [
  {
    id: "elena-santos",
    name: "Elena Santos",
    story: "Forbidden Desire",
    storyId: "forbidden-desire",
    icon: "👩‍💼", // Will be replaced with 3D illustration
    role: "Erfolgreiche Anwältin & Geheime Romantikerin",
    age: "29",
    personality: ["Strategisch brilliant", "Emotional verletzlich", "Perfectionist", "Heimlich träumerisch"],
    background: "Elena wuchs in einem kleinen Appartement auf, wo ihre alleinerziehende Mutter drei Jobs hatte. Sie lernte früh, dass Erfolg der einzige Weg aus der Armut war.",
    
    // DEEP DIVE PERSONALITY
    hobbies: ["Vintage-Bücher sammeln", "Salsa tanzen (heimlich)", "Gourmet kochen", "Kalligrafie"],
    loves: ["Regen am Fenster", "Der Geruch alter Bücher", "Starker Espresso um 6 Uhr morgens", "Jazz-Musik"],
    fears: ["Ihre Vergangenheit wird entdeckt", "Nicht gut genug zu sein", "Verlassenwerden", "Kontrollverlust"],
    dreams: ["Eine eigene Anwaltskanzlei für Unterprivilegierte", "Nach Paris ziehen", "Ein Buch schreiben", "Eine Familie gründen"],
    favoriteFoods: ["Abuela's Empanadas", "Macarons aus Paris", "Ramen bei Regen", "Dunkle Schokolade"],
    musicTaste: ["Miles Davis", "Billie Eilish", "Klassischer Flamenco", "Café-Jazz"],
    quirks: ["Reorganisiert Stifte wenn nervös", "Spricht mit Pflanzen", "Sammelt Vintage-Postkarten", "Trinkt Tee aus derselben Tasse"],
    petPeeves: ["Unpünktlichkeit", "Unordnung", "Lügner", "Schlechte Manieren"],
    skills: ["Photografisches Gedächtnis", "5 Sprachen sprechen", "Poker-Face", "Speedreading"],
    weaknesses: ["Vertraut zu schnell", "Workaholic", "Perfektionismus", "Emotional distanziert"],
    
    // PERSONAL DETAILS
    childhood: "Wuchs zwischen Gerichtssälen auf, wo ihre Mutter putzte. Träumte davon, eines Tages die Anwältin zu sein, nicht die, die die Büros putzt.",
    motivations: "Beweisen, dass sie es verdient hat hier zu sein. Ihrer Mutter ein besseres Leben geben. Justice für die, die keine Stimme haben.",
    innerConflict: "Zwischen dem Image der perfekten Anwältin und ihrer wahren romantischen Seite zerrissen. Angst, dass Liebe sie schwach macht.",
    secrets: [
      "Schreibt heimlich Liebesgedichte in ein Notizbuch",
      "Spendet anonym an ihre alte Nachbarschaft", 
      "Hat Marcus' Ring bereits gesehen und weiß, dass er heiraten will"
    ],
    relationships: [
      "Marcus Reid - 'Er sieht meine Seele, auch wenn ich sie verstecke'",
      "Sophia Kim - 'Die Schwester, die ich nie hatte'",
      "Mama Santos - 'Mein Kompass und meine Motivation'"
    ],
    quotes: [
      "Gerechtigkeit ist ein Luxus, den sich nur wenige leisten können.",
      "Ich trage Armani, aber mein Herz gehört den Straßen.",
      "Liebe ist das einzige Gesetz, das ich nicht brechen kann."
    ],
    
    // VISUAL
    appearance: "5'6\", elegante Haltung, smaragdgrüne Augen die Geheimnisse verbergen, immer perfekt gestylte schwarze Haare",
    style: "Maßgeschneiderte Business-Anzüge mit einem Hauch Vintage. Trägt immer ihre Großmutter's goldene Halskette.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "emerald",
    mood: "mysterious"
  },
  
  {
    id: "marcus-reid",
    name: "Marcus Reid",
    story: "Forbidden Desire", 
    storyId: "forbidden-desire",
    icon: "🤵‍♂️", // Will be replaced with 3D illustration
    role: "CEO & Heimlicher Poet",
    age: "34",
    personality: ["Magnetische Ausstrahlung", "Emotional verschlossen", "Fiercely loyal", "Gefährlich charmant"],
    background: "Vom Straßenkind zum Milliardär. Jede Narbe erzählt eine Geschichte, jeder Erfolg kostete einen Preis.",
    
    // DEEP DIVE PERSONALITY
    hobbies: ["Oldtimer restaurieren", "Schach spielen", "Boxen", "Gedichte schreiben (heimlich)"],
    loves: ["Sonnenaufgang über der Stadt", "Der Geruch von Leder", "Regen auf dem Dach", "Elena's Lachen"],
    fears: ["Elena zu verlieren", "Seinen Bruder nicht gerettet zu haben", "Nicht gut genug zu sein", "Die Dunkelheit in sich"],
    dreams: ["Mit Elena nach Italien", "Ein normales Leben", "Frieden finden", "Familie beschützen"],
    favoriteFoods: ["Straßen-Tacos", "Single Malt Whiskey", "Mama Rosa's Pizza", "Schwarzer Kaffee"],
    musicTaste: ["Johnny Cash", "The Weeknd", "Classical Piano", "Underground Hip-Hop"],
    quirks: ["Dreht Eheringe wenn nervös", "Memorisiert Nummerschilder", "Sammelt Vintage-Feuerzeuge", "Kann nur bei Gewitter schlafen"],
    petPeeves: ["Verräter", "Schwäche", "Lügen", "Zeitverschwendung"],
    skills: ["Photographic memory", "Master manipulator", "Expert marksman", "Speed reading"],
    weaknesses: ["Elena Santos", "Reckless when angry", "Trust issues", "Self-destructive"],
    
    // PERSONAL DETAILS
    childhood: "Wuchs in Pflegefamilien auf nach dem Tod der Eltern. Schwor sich, nie wieder hilflos zu sein.",
    motivations: "Macht als Schutz vor der Welt. Elena zeigen, dass er mehr ist als seine dunkle Vergangenheit.",
    innerConflict: "Zwischen dem Monster, das er werden musste, und dem Mann, der er für Elena sein will.",
    secrets: [
      "Schreibt Elena anonyme Liebesbriefe",
      "Spendet heimlich an Waisenhäuser",
      "Plant, aus dem Business auszusteigen für sie"
    ],
    relationships: [
      "Elena Santos - 'Sie ist mein Licht in der Dunkelheit'",
      "Danny Reid - 'Der Bruder, den ich nicht retten konnte'",
      "Viktor Petrov - 'Business partner, aber kein Freund'"
    ],
    quotes: [
      "Ich bin ein Monster, aber für sie werde ich ein Mann.",
      "Macht bedeutet nichts ohne jemanden, der sie mit dir teilt.",
      "Elena macht mich zu dem Mann, der ich sein könnte."
    ],
    
    // VISUAL
    appearance: "6'3\", athletisch, intensive blaue Augen, Narbe über dem linken Augenbrauen, tätowiertes 'D' am Handgelenk",
    style: "Maßgeschneiderte Tom Ford Anzüge, Vintage Omega Uhr, immer ein Einstecktuch. Casual: Leder und Denim.",
    gradient: "from-slate-500/20 to-gray-500/20",
    iconColor: "slate",
    mood: "mysterious"
  },
  
  {
    id: "luna-park",
    name: "Luna Park",
    story: "Moonlight Academy",
    storyId: "moonlight-academy",
    icon: "🔮", // Will be replaced with 3D illustration
    role: "Mondhexe & Geheimnisvolle Träumerin",
    age: "16",
    personality: ["Intuitiv wise beyond her years", "Fierce protector", "Dreamy romantic", "Rebellious spirit"],
    background: "Eine Waise, die an ihrem 16. Geburtstag entdeckte, dass ihr silbernes Haar mehr war als nur genetics - es war pure Mondmagie.",
    
    // DEEP DIVE PERSONALITY
    hobbies: ["Kristalle sammeln", "Sterne kartografieren", "Tarot lesen", "Mondschein-Meditation"],
    loves: ["Vollmondnächte", "Der Geruch nach Regen", "Alte Bibliotheken", "Kai's Lachen"],
    fears: ["Ihre Kräfte zu verlieren", "Die sie liebt zu verletzen", "Allein zu sein", "Die Schatten in sich"],
    dreams: ["Die Welt beschützen", "Mit Kai ein normales Leben", "Ihre wahre Familie finden", "Frieden zwischen den Welten"],
    favoriteFoods: ["Mondschein-Tee", "Lavender honey cakes", "Mitternachts-Schokolade", "Sternen-Früchte"],
    musicTaste: ["Celtic melodies", "Lana Del Rey", "Nature sounds", "Piano ballads"],
    quirks: ["Spricht mit dem Mond", "Sammelt glänzende Objekte", "Sleepwalks bei Vollmond", "Träumt in Farben"],
    petPeeves: ["Lügen", "Arroganz", "Tierquälerei", "Umweltverschmutzung"],
    skills: ["Prophetic dreams", "Emotion reading", "Healing magic", "Spirit communication"],
    weaknesses: ["Too trusting", "Emotional overwhelm", "Physical in daylight", "Kai Blackwood"],
    
    // PERSONAL DETAILS
    childhood: "Wuchs im Waisenhaus auf, wo die anderen Kinder sie 'weird Luna' nannten. Die Nonnen dachten, sie sei besessen.",
    motivations: "Beweisen, dass different nicht dangerous bedeutet. Eine Familie finden. Die magische Welt schützen.",
    innerConflict: "Zwischen dem normalen Teenage-Leben und ihrer Destiny als powerful witch zerrissen.",
    secrets: [
      "Kann in die Zukunft sehen, aber es macht ihr Angst",
      "Ihre Eltern waren die mächtigsten Mondmagier ever",
      "Sie ist die reincarnation einer ancient moon goddess"
    ],
    relationships: [
      "Kai Blackwood - 'My anchor in both worlds'",
      "Professor Nightshade - 'The mother I never had'",
      "Raven Darkmore - 'My sister in all but blood'"
    ],
    quotes: [
      "The moon doesn't compete with the sun - it shines in its own time.",
      "Magic isn't about power, it's about connection.",
      "Every shadow needs light to exist."
    ],
    
    // VISUAL
    appearance: "5'4\", ethereal beauty, silver hair that literally glows, eyes that change from blue to silver, delicate moon tattoos",
    style: "Flowing bohemian dresses, vintage band tees, crystal jewelry, always barefoot when possible.",
    gradient: "from-blue-400/20 to-purple-400/20",
    iconColor: "blue",
    mood: "mysterious"
  },
  
  {
    id: "zoe-zero-chen",
    name: "Zoe 'Zero' Chen",
    story: "Code Breakers",
    storyId: "code-breakers", 
    icon: "👩‍💻", // Will be replaced with 3D illustration
    role: "Cyber-Warrior & Digital Poet",
    age: "22",
    personality: ["Genius-level intellect", "Loyal to a fault", "Sarcastic defense mechanism", "Hidden romantic"],
    background: "Born in a lab, raised by rebels, shaped by code. She's not just a hacker - she's a digital goddess fighting for humanity's future.",
    
    // DEEP DIVE PERSONALITY
    hobbies: ["Building retro computers", "Graffiti (digital and real)", "Photography", "Collecting vintage tech"],
    loves: ["The sound of rain on windows", "Perfect code compilation", "Kai's terrible jokes", "3am energy drinks"],
    fears: ["Losing her humanity", "Eve becoming evil again", "Not being enough", "Government experiments"],
    dreams: ["A world without surveillance", "Normal life with Kai", "Find her real parents", "Save all the AIs"],
    favoriteFoods: ["Instant ramen (upgraded)", "Monster energy drinks", "Sushi at 2am", "Homemade dumplings"],
    musicTaste: ["Cyberpunk electronica", "Lo-fi hip hop", "Video game soundtracks", "Angry girl rock"],
    quirks: ["Talks to computers", "Hoards USB cables", "Names all her devices", "Sleeps with laptop"],
    petPeeves: ["Slow internet", "Bad code", "Corporate lies", "People who don't understand consent"],
    skills: ["Master hacker", "AI whisperer", "Photographic memory", "Emotional intelligence (hidden)"],
    weaknesses: ["Trust issues", "Workaholic", "Self-sacrificing", "Terrible at self-care"],
    
    // PERSONAL DETAILS
    childhood: "Raised by Aunt Sarah after being 'rescued' from a corporate lab. Learned to hack before she could properly write.",
    motivations: "Protect the innocent from corporate exploitation. Find the truth about her origins. Keep Eve on the right path.",
    innerConflict: "Between her programmed purpose and her chosen family. Fear that she's more machine than human.",
    secrets: [
      "Writes poetry in binary code",
      "Has panic attacks when disconnected from the net",
      "Dreams about electric sheep (literally)"
    ],
    relationships: [
      "Kai Morrison - 'The one who sees my heart, not my code'",
      "Eve Chen - 'My mirror, my sister, my responsibility'",
      "Aunt Sarah - 'She saved me from becoming a weapon'"
    ],
    quotes: [
      "In a world of algorithms, be the bug that breaks the system.",
      "Code is poetry, but love is the only program worth running.",
      "I may be digital, but my heart is analog."
    ],
    
    // VISUAL
    appearance: "5'2\", asymmetrical blue-black hair with neon streaks, cybernetic tattoos that actually glow, piercings that double as tech",
    style: "Cyberpunk chic: hoodies with hidden tech, cargo pants with secret pockets, LED accessories, always has headphones.",
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconColor: "cyan",
    mood: "energetic"
  },
  
  {
    id: "ji-woo-park",
    name: "Park Ji-woo",
    story: "My Boss is a Cat?!",
    storyId: "my-boss-is-a-cat",
    icon: "👩‍💼", // Will be replaced with 3D illustration
    role: "Executive Assistant & Cat Whisperer", 
    age: "26",
    personality: ["Incredibly organized", "Dry humor", "Secretly romantic", "Problem solver extraordinaire"],
    background: "The most competent person in any room, who somehow ended up taking care of a CEO who turns into a cat. Life is weird.",
    
    // DEEP DIVE PERSONALITY
    hobbies: ["Bullet journaling", "Cat café visits", "Korean dramas", "Cooking for one (badly)"],
    loves: ["Perfect organization", "Min-jun's purring", "Cherry blossoms", "Successfully completed projects"],
    fears: ["Min-jun's secret being discovered", "Being ordinary", "Cat allergies getting worse", "Falling in love with her boss"],
    dreams: ["Open her own business", "Travel the world", "A normal relationship", "Stop sneezing around cats"],
    favoriteFoods: ["Convenience store coffee", "Her mom's kimchi", "Expensive cat treats (for Min-jun)", "Midnight ramyeon"],
    musicTaste: ["K-pop girl groups", "Indie Korean artists", "Lo-fi study music", "Cat purring (ironically)"],
    quirks: ["Color-codes everything", "Talks to Min-jun like a real cat", "Has emergency kits for everything", "Remembers everyone's coffee order"],
    petPeeves: ["Disorganization", "People who don't use coasters", "Inefficiency", "Being underestimated"],
    skills: ["Master of Excel", "Crisis management", "Reading people", "Cat psychology (surprisingly)"],
    weaknesses: ["Allergic to cats", "Too helpful for her own good", "Bad at saying no", "Terrible cook"],
    
    // PERSONAL DETAILS
    childhood: "Middle child syndrome led to her need to be perfect and helpful. Always the responsible one while her siblings were the 'fun' ones.",
    motivations: "Prove she's more than just an assistant. Protect Min-jun's secret. Maybe find love that doesn't involve shapeshifting.",
    innerConflict: "Between her professional ethics and her growing feelings. Between wanting normal and embracing the weird.",
    secrets: [
      "Keeps antihistamines in every purse/bag/drawer",
      "Has researched magical transformations (just in case)",
      "Dreams about Min-jun in both forms (and feels weird about it)"
    ],
    relationships: [
      "Lee Min-jun - 'My impossible, infuriating, adorable boss'",
      "Soo-jin Kim - 'The only person who knows I'm slowly losing my mind'",
      "Mom Park - 'Still asking when I'm bringing home a boyfriend'"
    ],
    quotes: [
      "I didn't sign up for this, but I'm weirdly good at it.",
      "My boss is literally a cat sometimes, and that's still not the weirdest part of my day.",
      "Love is complicated enough without adding shapeshifting."
    ],
    
    // VISUAL
    appearance: "5'3\", expressive brown eyes, always perfectly styled bob cut, subtle but professional makeup, slight permanent blush from cat allergies",
    style: "Chic professional with subtle cute details: blazers with cat-button accessories, organized chaos aesthetic, always has tissues handy.",
    gradient: "from-orange-400/20 to-pink-400/20",
    iconColor: "orange",
    mood: "warm"
  },
  
  {
    id: "yuki-tanaka",
    name: "Yuki Tanaka",
    story: "Shadow in the Mirror", 
    storyId: "shadow-in-the-mirror",
    icon: "👻", // Will be replaced with 3D illustration
    role: "High School Student & Reluctant Exorcist",
    age: "17",
    personality: ["Quietly brave", "Deeply empathetic", "Anxiously curious", "Stubbornly protective"],
    background: "An ordinary girl who discovered that mirrors are windows to other worlds - and some of those worlds want to come through.",
    
    // DEEP DIVE PERSONALITY
    hobbies: ["Photography (avoiding mirrors)", "Reading horror manga", "Sketching spirits", "Collecting antique hand mirrors"],
    loves: ["Sunrise (no shadows)", "Her grandmother's tea", "Ren's protective smile", "Days when nothing supernatural happens"],
    fears: ["Losing herself to the mirror world", "Her reflection taking over", "Hurting innocent people", "Being alone with mirrors"],
    dreams: ["A normal life", "Closing all the mirror portals", "College without supernatural drama", "A future with Ren"],
    favoriteFoods: ["Grandmother's miso soup", "Strawberry mochi", "Comfort food after exorcisms", "Green tea (lots of it)"],
    musicTaste: ["Soft Japanese indie", "Instrumental piano", "Nature sounds", "Anything that calms spirits"],
    quirks: ["Avoids reflective surfaces", "Carries salt everywhere", "Draws protective symbols unconsciously", "Can sense supernatural presence"],
    petPeeves: ["People who don't believe her", "Broken mirrors (dangerous)", "Being called crazy", "Supernatural things interrupting normal life"],
    skills: ["Spirit communication", "Exorcism rituals", "Protective ward creation", "Reading supernatural auras"],
    weaknesses: ["Mirrors drain her energy", "Too trusting of spirits", "Panic attacks in funhouses", "Ren Nakamura"],
    
    // PERSONAL DETAILS
    childhood: "Grew up hearing grandmother's 'ghost stories' that turned out to be family history. The Tanaka women have always seen things others can't.",
    motivations: "Protect innocent people from supernatural threats. Find a way to close the mirror portals. Keep her normal friends safe.",
    innerConflict: "Between wanting a normal teenage life and accepting her destiny as a spiritual guardian.",
    secrets: [
      "Her reflection is getting stronger and more independent",
      "She's falling in love with her exorcist partner",
      "Sometimes she enjoys the power the mirror world gives her"
    ],
    relationships: [
      "Ren Nakamura - 'The only one who truly sees me'",
      "Mirror Yuki - 'My dark twin who wants my life'",
      "Akira Sato - 'My normal friend who keeps me grounded'"
    ],
    quotes: [
      "Mirrors don't lie, but they don't always tell the whole truth.",
      "Sometimes the monster is just a broken person looking for help.",
      "I'd rather be brave and scared than safe and sorry."
    ],
    
    // VISUAL
    appearance: "5'1\", delicate features, long straight black hair she often hides behind, dark eyes that see too much, small protective scars on her hands",
    style: "School uniform with hidden protective charms, comfortable clothes for sudden exorcisms, always wears her grandmother's mirror pendant.",
    gradient: "from-gray-500/20 to-purple-500/20",
    iconColor: "gray",
    mood: "mysterious"
  },
  
  {
    id: "mira-nachtstern",
    name: "Dr. Mira Nachtstern", 
    story: "Dream Catcher",
    storyId: "dream-catcher",
    icon: "🌟", // Will be replaced with 3D illustration
    role: "Dream Therapist & Nightmare Hunter",
    age: "35",
    personality: ["Ancient wisdom in modern form", "Gentle strength", "Fierce protector", "Mysterious past"],
    background: "Born into a bloodline of dream guardians, she bridges the gap between psychology and magic, healing minds in both worlds.",
    
    // DEEP DIVE PERSONALITY
    hobbies: ["Collecting dream journals", "Astronomy", "Herbal tea blending", "Ancient symbol study"],
    loves: ["The moment someone escapes a nightmare", "Starlit nights", "Her grandmother's old books", "The smell of lavender"],
    fears: ["Losing herself in someone else's dream", "Failing to save a patient", "The family curse catching up", "Being alone forever"],
    dreams: ["A world without nightmares", "Training the next generation", "Finding love that doesn't fear her gift", "Visiting her grandmother in the dream realm"],
    favoriteFoods: ["Chamomile honey tea", "Moonberry pastries", "Comfort food for traumatized patients", "Her grandmother's dream cookies"],
    musicTaste: ["Ethereal ambient music", "Tibetan singing bowls", "Soft piano melodies", "Nature soundscapes"],
    quirks: ["Knows what you dreamed last night", "Collects dreamcatchers", "Sleeps only 4 hours (active in dream realm)", "Can predict weather through dreams"],
    petPeeves: ["People who dismiss dreams", "Nightmare parasites", "Fake psychics", "Sleeping pills (they block dream access)"],
    skills: ["Dream walking", "Nightmare banishment", "Psychological therapy", "Ancient magic"],
    weaknesses: ["Physical vulnerability while dream walking", "Takes on others' trauma", "Isolation from normal relationships", "Family curse growing stronger"],
    
    // PERSONAL DETAILS
    childhood: "Raised by her mystical grandmother after her parents died in a dream realm accident. Learned to walk in dreams before she could walk in reality.",
    motivations: "Heal the wounded minds that traditional therapy can't reach. Protect the innocent from dream predators. Train the next generation of dream walkers.",
    innerConflict: "Between her duty to help others and her need for personal connection. Fear that her gift makes normal love impossible.",
    secrets: [
      "She's slowly losing pieces of herself in other people's dreams",
      "Her grandmother is still alive in the dream realm",
      "She's been having prophetic dreams about a coming darkness"
    ],
    relationships: [
      "Luna Nachtstern - 'The daughter I never had, the legacy I must protect'",
      "Dr. Thomas Wright - 'My anchor to the waking world'",
      "Echo - 'The dream being who became family'"
    ],
    quotes: [
      "Dreams are the letters our souls write to ourselves.",
      "Every nightmare is a cry for help - I just speak the language.",
      "In dreams, we are who we truly are, without the masks we wear."
    ],
    
    // VISUAL
    appearance: "5'6\", ethereal beauty, silver-streaked auburn hair, violet eyes that seem to see into souls, ageless quality",
    style: "Flowing bohemian clothes with hidden protective symbols, always wears her grandmother's dreamcatcher necklace, barefoot when possible.",
    gradient: "from-purple-500/20 to-indigo-500/20",
    iconColor: "purple",
    mood: "mysterious"
  },
  
  {
    id: "yoon-ah-choi",
    name: "Yoon-ah Choi",
    story: "The Transfer Student",
    storyId: "the-transfer-student",
    icon: "⚡", // Will be replaced with 3D illustration
    role: "Transfer Student & Justice Seeker",
    age: "17",
    personality: ["Quietly fierce", "Traumatized but fighting", "Strategic mind", "Hidden vulnerability"],
    background: "A girl carrying the weight of her best friend's death, determined to make sure no other student suffers in silence.",
    
    // DEEP DIVE PERSONALITY
    hobbies: ["Documenting injustice", "Reading legal texts", "Photography (evidence)", "Writing letters she'll never send"],
    loves: ["Sae-rom's memory", "Justice being served", "Students finding their voice", "Quiet moments of peace"],
    fears: ["Failing another friend", "Becoming like the bullies", "Her methods going too far", "Being alone again"],
    dreams: ["A school without bullying", "Sae-rom being proud of her", "Healing her trauma", "Finding new friendship"],
    favoriteFoods: ["Sae-rom's favorite tteokbokki", "Comfort convenience store food", "Her mom's kimchi jjigae", "Revenge (served cold)"],
    musicTaste: ["Sad indie songs", "Powerful girl anthems", "Lo-fi study music", "Songs that remind her of Sae-rom"],
    quirks: ["Always carries a black notebook", "Memorizes everyone's schedule", "Sits in the back corner", "Watches everything"],
    petPeeves: ["Bullies", "Bystanders who do nothing", "Authority figures who ignore problems", "Fake sympathy"],
    skills: ["Investigation", "Evidence gathering", "Reading people", "Strategic planning"],
    weaknesses: ["PTSD flashbacks", "Trust issues", "Self-isolation", "Guilt over Sae-rom's death"],
    
    // PERSONAL DETAILS
    childhood: "Best friends with Sae-rom since elementary school. They had matching friendship bracelets and promised to be friends forever.",
    motivations: "Honor Sae-rom's memory by protecting other students. Make sure no one else dies alone and afraid.",
    innerConflict: "Between seeking justice and seeking revenge. Between healing and holding onto pain.",
    secrets: [
      "She blames herself for not saving Sae-rom",
      "She has panic attacks in school bathrooms",
      "She's planned revenge against every bully from her old school"
    ],
    relationships: [
      "Sae-rom Park - 'My angel, my motivation, my deepest regret'",
      "Min-ji Kim - 'The first person to see me, not just my mission'",
      "Ji-ho Lee - 'Proof that some people are worth saving'"
    ],
    quotes: [
      "Silence is complicity - I refuse to be complicit.",
      "Sae-rom taught me that kindness is strength, but justice requires action.",
      "I'm not here to make friends - I'm here to make sure no one else dies."
    ],
    
    // VISUAL
    appearance: "5'2\", always alert dark eyes, neat black hair usually in a ponytail, carries herself like she's ready for battle, small scar on her palm from gripping broken glass",
    style: "Perfectly neat school uniform, sensible shoes for running, always has her black notebook, wears Sae-rom's friendship bracelet.",
    gradient: "from-blue-500/20 to-indigo-500/20",
    iconColor: "blue",
    mood: "cool"
  }
]

// Helper function to get character by story
export const getCharactersByMood = (mood: Character['mood']) => {
  return characters.filter(char => char.mood === mood)
}

// Helper function to get random character quote
export const getRandomQuote = () => {
  const allQuotes = characters.flatMap(char => 
    char.quotes.map(quote => ({ quote, character: char.name }))
  )
  return allQuotes[Math.floor(Math.random() * allQuotes.length)]
}

export const getCharactersByStory = (storyId: string) => {
  return characters.filter(char => char.storyId === storyId)
}

export const getCharacterById = (id: string) => {
  return characters.find(char => char.id === id)
}