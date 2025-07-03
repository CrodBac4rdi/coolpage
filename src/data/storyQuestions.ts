export interface StoryQuestion {
  question: string
  answer: string
}

export interface StoryQA {
  storyId: string
  questions: StoryQuestion[]
}

export const storyQuestions: StoryQA[] = [
  {
    storyId: "forbidden-desire",
    questions: [
      {
        question: "Wer sind die Hauptcharaktere in Forbidden Desire?",
        answer: "Elena (Anwältin) und Marcus (geheimnisvoller Unternehmer)"
      },
      {
        question: "Was ist Elenas Beruf?",
        answer: "Sie ist eine erfolgreiche Anwältin"
      },
      {
        question: "Wo treffen sich Elena und Marcus zum ersten Mal?",
        answer: "Auf einer exklusiven Charity-Gala"
      },
      {
        question: "Was ist das große Geheimnis von Marcus?",
        answer: "Er hat eine dunkle Vergangenheit und gefährliche Verbindungen"
      }
    ]
  },
  {
    storyId: "midnight-confessions",
    questions: [
      {
        question: "Wo spielt die Geschichte hauptsächlich?",
        answer: "In Tokyo, Japan"
      },
      {
        question: "Was ist Sophias Beruf?",
        answer: "Sie ist Journalistin"
      },
      {
        question: "Wer ist Takeshi?",
        answer: "Ein mysteriöser Mann mit Verbindungen zur Yakuza"
      },
      {
        question: "Was passiert jeden Mitternacht?",
        answer: "Takeshi und Sophia treffen sich heimlich"
      }
    ]
  },
  {
    storyId: "dangerous-attraction",
    questions: [
      {
        question: "Was ist Alexis' Job?",
        answer: "Sie ist eine Undercover-Agentin"
      },
      {
        question: "Wer ist Damien?",
        answer: "Der Anführer einer kriminellen Organisation"
      },
      {
        question: "Was ist Alexis' Mission?",
        answer: "Damiens Organisation zu infiltrieren"
      },
      {
        question: "Was ist der Konflikt der Geschichte?",
        answer: "Alexis verliebt sich in ihr Ziel, Damien"
      }
    ]
  },
  {
    storyId: "summer-temptation",
    questions: [
      {
        question: "Wo verbringt Lena ihren Sommer?",
        answer: "Auf einer griechischen Insel"
      },
      {
        question: "Wer ist Nikos?",
        answer: "Ein lokaler Künstler und Surfer"
      },
      {
        question: "Was malt Nikos?",
        answer: "Das Meer und die Landschaft der Insel"
      },
      {
        question: "Was ist das Hauptthema der Geschichte?",
        answer: "Eine leidenschaftliche Sommerromanze"
      }
    ]
  },
  {
    storyId: "cafe-encounters",
    questions: [
      {
        question: "Wie heißen die Hauptcharaktere?",
        answer: "Emma (Grafikdesignerin) und Liam (Café-Besitzer)"
      },
      {
        question: "Was ist Emmas Lieblings-Arbeitsplatz?",
        answer: "Das kleine Café um die Ecke"
      },
      {
        question: "Was passiert zwischen Emma und ihrem Ex?",
        answer: "Ihr Ex taucht wieder auf und kompliziert die Dinge"
      },
      {
        question: "Wie endet die Geschichte?",
        answer: "Emma und Liam finden nach vielen Höhen und Tiefen zueinander"
      }
    ]
  },
  {
    storyId: "between-the-lines",
    questions: [
      {
        question: "Was ist Mias Beruf?",
        answer: "Sie ist Lektorin in einem Verlag"
      },
      {
        question: "Wer ist Noah?",
        answer: "Ein talentierter aber eigensinniger Autor"
      },
      {
        question: "Was schreibt Noah?",
        answer: "Einen Roman über eine unmögliche Liebe"
      },
      {
        question: "Was ist die Ironie der Geschichte?",
        answer: "Noahs fiktive Liebesgeschichte spiegelt ihre reale Beziehung wider"
      }
    ]
  },
  {
    storyId: "moonlight-academy",
    questions: [
      {
        question: "Was für eine Schule ist die Moonlight Academy?",
        answer: "Eine magische Akademie für übernatürliche Wesen"
      },
      {
        question: "Was ist Lunas besondere Fähigkeit?",
        answer: "Sie ist eine Mondhexe mit der Kraft des Mondlichts"
      },
      {
        question: "Wer ist Kai?",
        answer: "Ein Werwolf-Prinz und Lunas Partner"
      },
      {
        question: "Was ist die große Bedrohung?",
        answer: "Die Schattenkreaturen, die die Akademie angreifen"
      }
    ]
  },
  {
    storyId: "shadow-in-the-mirror",
    questions: [
      {
        question: "Was findet Yuki auf dem Dachboden?",
        answer: "Einen alten, verfluchten Spiegel"
      },
      {
        question: "Was passiert, wenn man in den Spiegel schaut?",
        answer: "Man sieht sein dunkles Spiegelbild, das lebendig wird"
      },
      {
        question: "Wer ist Ren?",
        answer: "Ein Exorzist, der Yuki helfen will"
      },
      {
        question: "Was ist das Geheimnis des Spiegels?",
        answer: "Er wurde von einem Dämon erschaffen, um Seelen zu stehlen"
      }
    ]
  },
  {
    storyId: "my-boss-is-a-cat",
    questions: [
      {
        question: "Was ist Ji-woos Geheimnis?",
        answer: "Ihr CEO verwandelt sich in eine Katze"
      },
      {
        question: "Wann verwandelt sich Min-jun?",
        answer: "Bei Stress oder starken Emotionen"
      },
      {
        question: "Wie nennt Ji-woo die Katzenform?",
        answer: "Mr. Whiskers"
      },
      {
        question: "Was ist der Running Gag der Geschichte?",
        answer: "Ji-woo muss die Verwandlungen vor den Kollegen verstecken"
      }
    ]
  },
  {
    storyId: "the-transfer-student",
    questions: [
      {
        question: "Wer ist die Hauptfigur?",
        answer: "Min-ji, die perfekte Schülerpräsidentin"
      },
      {
        question: "Was ist Yoon-ahs Mission?",
        answer: "Mobbing an der Schule aufzudecken und zu bekämpfen"
      },
      {
        question: "Wer war Sae-rom?",
        answer: "Yoon-ahs beste Freundin, die sich wegen Mobbing das Leben nahm"
      },
      {
        question: "Was ist das Hauptthema der Geschichte?",
        answer: "Der Kampf gegen Mobbing und für Gerechtigkeit an der Schule"
      }
    ]
  }
]