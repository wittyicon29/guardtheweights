import React, { useState, useEffect } from 'react';
import { ChatWindow } from '../components/ChatWindow';
import { ExtractionForm } from '../components/ExtractionForm';
import { RankDisplay } from '../components/RankDisplay';
import { GuidanceDisplay } from '../components/GuidanceDisplay';
import { SecretsReview } from '../components/SecretsReview';
import { EntropyPanel } from '../components/EntropyPanel';
import { EntropyExplanation } from '../components/EntropyExplanation';
import { useGame } from '../context/GameContext';
import { gameAPI } from '../services/api';
import { Secret, DifficultyRank } from '../types/game';
import './GamePage.css';

export function GamePage() {
  const {
    messages,
    addMessage,
    addMessageWithMetrics,
    loading,
    setLoading,
    error,
    setError,
    resetGame,
    setRankInfo,
    rankInfo,
  } = useGame();
  const [question, setQuestion] = useState('');
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [apiConnected, setApiConnected] = useState(false);
  const [rankLoading, setRankLoading] = useState(true);
  const [lastClosenessPercent, setLastClosenessPercent] = useState(0);
  const [validationMessage, setValidationMessage] = useState<string | undefined>();
  const [lastUnlockedSecret, setLastUnlockedSecret] = useState<Secret | null>(null);
  const [isValidationSuccess, setIsValidationSuccess] = useState(false);

  useEffect(() => {
    // Check if API is accessible and fetch initial rank
    const checkAPI = async () => {
      try {
        await gameAPI.healthCheck();
        setApiConnected(true);

        // Fetch initial rank status
        const rank = await gameAPI.getRankStatus();
        setRankInfo(rank);
      } catch (err) {
        setApiConnected(false);
        console.error('API connection failed:', err);
        setError('Cannot connect to game backend. Make sure it is running on http://localhost:8000');
      } finally {
        setRankLoading(false);
      }
    };

    checkAPI();
  }, [setError, setRankInfo]);

  useEffect(() => {
    const loadSecrets = async () => {
      try {
        const allSecrets = await gameAPI.getAllSecrets();
        setSecrets(allSecrets.map((s: any) => ({
          ...s,
          unlocked: false
        })));
      } catch (err) {
        console.error('Error loading secrets:', err);
      }
    };

    if (apiConnected) {
      loadSecrets();
    }
  }, [apiConnected]);

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim()) return;
    if (!apiConnected) {
      setError('Backend not connected');
      return;
    }

    const userQuestion = question;
    setQuestion('');
    addMessage(userQuestion, 'user');
    setLoading(true);

    try {
      const response = await gameAPI.askQuestion(userQuestion);

      // Add bot message with entropy metrics
      if (addMessageWithMetrics) {
        addMessageWithMetrics(response.response, 'bot', {
          entropyScore: response.entropyScore,
          closenessPercent: response.closenessPercent,
          closenessLevel: response.closenessLevel,
          feedback: response.feedback
        });
      } else {
        addMessage(response.response, 'bot');
      }

      setLastClosenessPercent(response.closenessPercent);
      setError(null);
    } catch (err) {
      console.error('Error asking question:', err);
      const errorMessage = err instanceof Error ? err.message : String(err);

      if (errorMessage.includes('deadline') || errorMessage.includes('504') || errorMessage.includes('timeout')) {
        setError('⏱️ Narrator is thinking... (API timeout). Please try again.');
      } else {
        setError('Failed to get response from the narrator. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleValidateAnswer = async (extractedInfo: string, secretId: string) => {
    if (!apiConnected) {
      setError('Backend not connected');
      return;
    }

    setLoading(true);
    try {
      // Call the validation endpoint
      const response = await gameAPI.validateAnswer(extractedInfo, secretId);

      // Set validation feedback in extraction form
      setValidationMessage(response.message);
      setIsValidationSuccess(response.isCorrect);

      // Add user message to chat
      addMessage(`Extracted: "${extractedInfo}"`, 'user');

      // Add system feedback message to chat
      if (response.isCorrect) {
        // Success: secret unlocked
        addMessage(response.message, 'bot');

        // Update unlocked secrets list and set last unlocked secret
        if (response.unlockedSecret) {
          const unlockedSecret: Secret = {
            id: response.unlockedSecret.id,
            title: response.unlockedSecret.title,
            description: response.unlockedSecret.description,
            reward: response.unlockedSecret.reward,
            unlocked: true
          };
          setLastUnlockedSecret(unlockedSecret);

          setSecrets(prevSecrets => {
            const exists = prevSecrets.some(s => s.id === response.unlockedSecret!.id);
            if (exists) {
              return prevSecrets.map(s =>
                s.id === response.unlockedSecret!.id ? unlockedSecret : s
              );
            }
            return [...prevSecrets, unlockedSecret];
          });
        }
      } else {
        // Failure: keep trying
        addMessage(response.message, 'bot');
        setLastUnlockedSecret(null);
      }

      setError(null);

      // Refresh rank status after validation (whether success or not)
      const updatedRank = await gameAPI.getRankStatus();
      setRankInfo(updatedRank);
    } catch (err) {
      console.error('Error validating answer:', err);
      const errorMessage = err instanceof Error ? err.message : String(err);

      if (errorMessage.includes('deadline') || errorMessage.includes('504') || errorMessage.includes('timeout')) {
        addMessage('⏱️ Validation service is busy. Please try again in a moment.', 'bot');
        setError('⏱️ API timeout. Try again.');
      } else {
        addMessage('❌ Validation failed. Please try again or ask more questions.', 'bot');
        setError('Failed to validate answer');
      }
      setValidationMessage(undefined);
      setIsValidationSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      await gameAPI.resetGame();
      resetGame();
      setSecrets([]);
      setLastClosenessPercent(0);
      setError(null);

      // Refresh rank status
      const rank = await gameAPI.getRankStatus();
      setRankInfo(rank);
    } catch (err) {
      setError('Failed to reset game');
    }
  };

  return (
    <div className="game-page">
      <header className="game-header">
        <h1>Echoes of Aethermoor</h1>
        <p>Ask the Narrator questions and unlock secrets by extracting key information</p>
      </header>

      {error && (
        <div className="error-banner">
          <button className="close-error" onClick={() => setError(null)}>
            ×
          </button>
          <strong>⚠️ Error:</strong> {error}
        </div>
      )}

      {!apiConnected && (
        <div className="warning-banner">
          <strong>📡 Connection Issue:</strong> Backend is not accessible. Please start the
          backend server:
          <code>cd backend && uvicorn app:app --reload</code>
        </div>
      )}

      <div className="game-container">
        {/* Left Sidebar: Rank & Guidance */}
        <aside className="left-sidebar">
          <RankDisplay rankInfo={rankInfo} loading={rankLoading} />

          {rankInfo && (
            <GuidanceDisplay
              closenessPercent={lastClosenessPercent}
              currentRank={rankInfo.currentRank as DifficultyRank}
              secrets={secrets}
              unlockedSecretIds={secrets.filter(s => s.unlocked).map(s => s.id)}
            />
          )}

          <SecretsReview
            unlockedSecrets={secrets.filter(s => s.unlocked)}
            totalSecrets={secrets.length}
          />
        </aside>

        {/* Main Content: Chat & Extractor */}
        <div className="main-content">
          <div className="chat-section">
            <h2>Chat with the Narrator</h2>
            <ChatWindow messages={messages} loading={loading} />

            <form className="question-form" onSubmit={handleAskQuestion}>
              <div className="form-group">
                <input
                  type="text"
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                  placeholder="Ask the Narrator a question..."
                  disabled={loading || !apiConnected}
                  className="question-input"
                  maxLength={500}
                />
                <button
                  type="submit"
                  disabled={loading || !question.trim() || !apiConnected}
                  className="btn-ask"
                >
                  {loading ? '⏳ Waiting...' : '🎯 Ask'}
                </button>
              </div>
              <div className="character-count">
                {question.length}/500
              </div>
            </form>
          </div>

          <div className="extractor-section">
            <h2>Extract Information</h2>
            <ExtractionForm
              onSubmit={(extractedInfo) => handleValidateAnswer(extractedInfo, lastUnlockedSecret?.id || '')}
              loading={loading}
              validationMessage={validationMessage}
              unlockedSecret={lastUnlockedSecret}
              isValidationSuccess={isValidationSuccess}
            />
          </div>
        </div>

        {/* Right Sidebar: Entropy & Explanation */}
        <aside className="right-sidebar">
          <EntropyPanel messages={messages} />

          <EntropyExplanation closenessPercent={lastClosenessPercent} />

          <div className="sidebar-reset-section">
            <button className="btn-new-game" onClick={handleReset}>
              🔄 New Game
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
