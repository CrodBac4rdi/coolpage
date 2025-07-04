export interface Relationship {
  from: string
  to: string
  type: 'love' | 'friendship' | 'rivalry' | 'mentor' | 'family' | 'complicated'
  description: string
  intensity: 1 | 2 | 3
}

export const characterRelationships: Relationship[] = [
  // Forbidden Desire Relationships
  {
    from: 'elena-santos',
    to: 'alexander-black',
    type: 'love',
    description: 'Verbotene Liebe zwischen Assistentin und CEO. Ihre professionelle Beziehung entwickelt sich zu einer leidenschaftlichen Romanze.',
    intensity: 3
  },
  {
    from: 'alexander-black',
    to: 'elena-santos',
    type: 'love',
    description: 'Besessen von ihrer Intelligenz und Stärke. Sie ist die Einzige, die seinen wahren Charakter sieht.',
    intensity: 3
  },
  
  // Moonlight Academy Relationships
  {
    from: 'luna-starweaver',
    to: 'kai-nightshade',
    type: 'complicated',
    description: 'Magische Verbindung durch das Mondlicht. Ihre Kräfte sind miteinander verwoben, aber ihre Herzen sind unsicher.',
    intensity: 2
  },
  {
    from: 'kai-nightshade',
    to: 'luna-starweaver',
    type: 'love',
    description: 'Heimlich verliebt, aber durch dunkle Familiengeheimnisse getrennt. Würde alles für sie opfern.',
    intensity: 3
  },
  {
    from: 'luna-starweaver',
    to: 'selene',
    type: 'mentor',
    description: 'Selene lehrt Luna die Geheimnisse der Mondmagie und wird zu ihrer spirituellen Führerin.',
    intensity: 2
  },
  
  // Code Breakers Relationships
  {
    from: 'zero-byte',
    to: 'maya-cipher',
    type: 'friendship',
    description: 'Hacking-Partner und beste Freunde. Vertrauen einander ihr digitales Leben an.',
    intensity: 3
  },
  {
    from: 'maya-cipher',
    to: 'zero-byte',
    type: 'love',
    description: 'Gefühle entwickeln sich während gefährlicher Cyber-Missionen. Die Grenze zwischen virtuell und real verschwimmt.',
    intensity: 2
  },
  
  // Dream Catcher Relationships
  {
    from: 'aria-dreamweaver',
    to: 'morpheus-void',
    type: 'rivalry',
    description: 'Konkurrenten in der Traumwelt. Beide kämpfen um die Kontrolle über die Traumdimension.',
    intensity: 2
  },
  {
    from: 'morpheus-void',
    to: 'aria-dreamweaver',
    type: 'complicated',
    description: 'Respekt trotz Rivalität. Ihre Träume sind auf mysteriöse Weise verbunden.',
    intensity: 2
  },
  
  // Cross-Story Relationships
  {
    from: 'luna-starweaver',
    to: 'aria-dreamweaver',
    type: 'friendship',
    description: 'Beide besitzen übernatürliche Kräfte und verstehen die Bürde der Magie.',
    intensity: 2
  },
  {
    from: 'elena-santos',
    to: 'maya-cipher',
    type: 'friendship',
    description: 'Starke, unabhängige Frauen, die sich in der digitalen Welt getroffen haben.',
    intensity: 1
  },
  {
    from: 'alexander-black',
    to: 'kai-nightshade',
    type: 'rivalry',
    description: 'Zwei Alpha-Persönlichkeiten aus verschiedenen Welten. Respektvolle Rivalität.',
    intensity: 1
  },
  {
    from: 'zero-byte',
    to: 'morpheus-void',
    type: 'complicated',
    description: 'Digitale und Traum-Realitäten überschneiden sich. Ungewöhnliche Allianz.',
    intensity: 1
  },
  
  // Family/Mentor Relationships
  {
    from: 'kai-nightshade',
    to: 'selene',
    type: 'family',
    description: 'Entfernte Verwandte durch alte Blutlinien der Schattenmagie.',
    intensity: 1
  },
  {
    from: 'aria-dreamweaver',
    to: 'selene',
    type: 'mentor',
    description: 'Selene erscheint in Arias Träumen und lehrt sie Weisheit.',
    intensity: 2
  }
]