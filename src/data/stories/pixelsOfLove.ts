export interface Chapter {
  id: number
  title: string
  emoji: string
  content: string[]
  arc?: string
}

export const pixelsOfLoveStory: Chapter[] = [
  // Die gaming-fokussierte Story bleibt hier erstmal
  {
    id: 1,
    title: "Coffee Shop Encounter",
    emoji: "☕",
    arc: "First Encounters",
    content: [
      "The rain poured outside the small coffee shop, creating a cozy atmosphere inside. Luna sat by the window, her laptop open but her mind wandering as she watched the droplets race down the glass.",
      "\"One caramel macchiato for... Luna?\" a warm voice called out.",
      "She looked up to see the new barista - tall, with messy dark hair and the kindest brown eyes she'd ever seen. His name tag read 'Kai'.",
      "\"That's me,\" she said, trying not to blush as their fingers briefly touched when he handed her the cup.",
      "\"Nice laptop sticker collection,\" Kai smiled, noticing her anime and gaming stickers. \"Is that a Studio Ghibli one?\"",
      "Luna's heart skipped. Finally, someone who understood her interests!",
      "\"Yeah! Are you a fan?\" she asked eagerly.",
      "\"The biggest,\" he grinned. \"My shift ends in an hour. Want to talk about Spirited Away over another coffee? On me.\"",
      "And that's how it all began..."
    ]
  }
  // Weitere Kapitel hier...
]