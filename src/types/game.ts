export type HeroId = 'soekarno' | 'hatta' | 'yamin' | 'soepomo' | 'fatmawati' | 'sukarni';

export interface Character {
  id: HeroId;
  name: string;
  role: string;
  epithet: string;
  avatarColor: string;
  traitName: string;
  traitDescription: string;
  quote: string;
  exemplarValue: string;
  bio: string;
  abilityIcon: string;
}

export interface MatchPair {
  id: string;
  concept: string;
  tokoh: 'yamin' | 'soepomo' | 'soekarno';
  tokohName: string;
  date: string;
  explanation: string;
}

export interface DialogueChoice {
  id: string;
  text: string;
  isOptimal: boolean;
  unityImpact: number; // positive or small negative
  xpReward: number;
  reflection: string;
  pancasilaPillar: string;
}

export interface DecisionNode {
  id: string;
  speaker: string;
  speakerRole: string;
  dialogue: string;
  contextNote: string;
  choices: DialogueChoice[];
}

export interface TextChangeItem {
  id: string;
  originalText: string;
  revisedText: string;
  actor: string;
  historicalSignificance: string;
  identified: boolean;
}

export interface JournalEntry {
  chapterId: number;
  title: string;
  date: string;
  location: string;
  historicalSummary: string;
  keyPoints: string[];
  inspirationalQuote: string;
  pancasilaReflection: string;
}

export interface QuestionBattle {
  id: string;
  threatName: string;
  threatDescription: string;
  scenario: string;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  pancasilaPillar: string;
}

export interface PlayerStats {
  studentName: string;
  hero: Character;
  totalXp: number;
  unityMeter: number; // 0 - 100
  currentChapter: number; // 1 - 5
  unlockedChapters: number[];
  answersCorrect: number;
  answersAttempted: number;
  traitUsesRemaining: number;
  completedChapters: number[];
  journalUnlocked: number[];
}
