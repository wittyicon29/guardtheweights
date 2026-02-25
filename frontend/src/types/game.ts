// Game types
export type DifficultyRank = 'novice' | 'initiate' | 'apprentice' | 'journeyman' | 'adept' | 'expert' | 'sage' | 'master';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  // Entropy metrics for bot messages
  entropyScore?: number;
  closenessPercent?: number;
  closenessLevel?: string;
  feedback?: string;
}

export interface GameState {
  unlockedSecrets: string[];
  currentSessionId: string;
  messages: Message[];
  currentRank?: DifficultyRank;
}

export interface Secret {
  id: string;
  title: string;
  description: string;
  reward?: string;
  unlocked: boolean;
}

export interface GameResponse {
  response: string;
  extractedInfo?: any;
  entropyScore: number;
  closenessPercent: number;
  closenessLevel: string;
  feedback: string;
}

export interface ValidationResponse {
  isCorrect: boolean;
  unlockedSecret?: Secret;
  message: string;
}

export interface RankInfo {
  currentRank: DifficultyRank;
  rankName: string;
  rankIcon: string;
  rankDescription: string;
  totalSecretsUnlocked: number;
  totalSecrets: number;
  nextRank: DifficultyRank | null;
  secretsForNextRank: number;
  nextRankName: string;
}
