import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Message, GameState, Secret, DifficultyRank, RankInfo } from '../types/game';

interface EntropyMetrics {
  entropyScore: number;
  closenessPercent: number;
  closenessLevel: string;
  feedback: string;
}

interface GameContextType {
  gameState: GameState;
  messages: Message[];
  unlockedSecrets: Secret[];
  loading: boolean;
  error: string | null;
  currentRank: DifficultyRank;
  rankInfo: RankInfo | null;

  // Actions
  addMessage: (text: string, sender: 'user' | 'bot') => void;
  addMessageWithMetrics: (text: string, sender: 'user' | 'bot', metrics?: EntropyMetrics) => void;
  setMessages: (messages: Message[]) => void;
  setUnlockedSecrets: (secrets: Secret[]) => void;
  addUnlockedSecret: (secret: Secret) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentRank: (rank: DifficultyRank) => void;
  setRankInfo: (rankInfo: RankInfo | null) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [unlockedSecrets, setUnlockedSecrets] = useState<Secret[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentRank, setCurrentRank] = useState<DifficultyRank>('novice');
  const [rankInfo, setRankInfo] = useState<RankInfo | null>(null);

  const gameState: GameState = {
    unlockedSecrets: unlockedSecrets.map(s => s.id),
    currentSessionId: 'session-' + Date.now(),
    messages,
    currentRank,
  };

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
  };

  const addMessageWithMetrics = (text: string, sender: 'user' | 'bot', metrics?: EntropyMetrics) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      sender,
      timestamp: new Date(),
      entropyScore: metrics?.entropyScore,
      closenessPercent: metrics?.closenessPercent,
      closenessLevel: metrics?.closenessLevel,
      feedback: metrics?.feedback,
    };
    setMessages([...messages, newMessage]);
  };

  const addUnlockedSecret = (secret: Secret) => {
    setUnlockedSecrets([...unlockedSecrets, secret]);
  };

  const resetGame = () => {
    setMessages([]);
    setUnlockedSecrets([]);
    setError(null);
    setCurrentRank('novice');
    setRankInfo(null);
  };

  const value: GameContextType = {
    gameState,
    messages,
    unlockedSecrets,
    loading,
    error,
    currentRank,
    rankInfo,
    addMessage,
    addMessageWithMetrics,
    setMessages,
    setUnlockedSecrets,
    addUnlockedSecret,
    setLoading,
    setError,
    setCurrentRank,
    setRankInfo,
    resetGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
