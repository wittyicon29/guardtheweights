import React, { useMemo } from 'react';
import { DifficultyRank, Secret } from '../types/game';
import './GuidanceDisplay.css';

interface GuidanceDisplayProps {
  closenessPercent: number;
  currentRank: DifficultyRank;
  secrets: Secret[];
  unlockedSecretIds: string[];
}

interface RankContextData {
  targetInfo: string;
  hints: string[];
}

export function GuidanceDisplay({
  closenessPercent,
  currentRank,
  secrets,
  unlockedSecretIds
}: GuidanceDisplayProps) {
  // Find first unlocked secret or use first secret as target
  const targetSecret = useMemo(() => {
    for (const secret of secrets) {
      if (!unlockedSecretIds.includes(secret.id)) {
        return secret;
      }
    }
    return secrets.length > 0 ? secrets[0] : null;
  }, [secrets, unlockedSecretIds]);

  // Determine how many hints to show based on closeness
  const getVisibleHintsCount = (percent: number): number => {
    if (percent >= 50) return 3;
    if (percent >= 25) return 2;
    return 1;
  };

  const visibleHintsCount = getVisibleHintsCount(closenessPercent);

  // Get rank context data from secret (fallback to defaults)
  const getRankContext = (secret: Secret | null): RankContextData => {
    if (!secret) {
      return {
        targetInfo: 'Ask questions to discover secrets.',
        hints: ['Listen carefully to the narrator', 'Look for clues in the responses', 'Connect the information you gather']
      };
    }

    // Type casting - lore.json includes rankContext but our interface doesn't specify it
    const secretWithContext = secret as any;

    if (secretWithContext.rankContext && secretWithContext.rankContext[currentRank]) {
      return secretWithContext.rankContext[currentRank];
    }

    // Fallback if no rank context
    return {
      targetInfo: `Learn about: ${secret.title}`,
      hints: [`Look for: ${secret.keywords?.slice(0, 2).join(', ') || 'key information'}`, 'Listen carefully to every word', 'Events and places matter']
    };
  };

  const rankContext = getRankContext(targetSecret);

  return (
    <div className="guidance-display">
      <div className="guidance-header">
        <span className="guidance-icon">🎯</span>
        <h3>What to Look For</h3>
      </div>

      <div className="target-info">
        <p className="target-question">{rankContext.targetInfo}</p>
      </div>

      <div className="hints-section">
        <div className="hints-title">
          <span className="hints-icon">💡</span>
          <span>Hints</span>
        </div>

        <div className="hints-list">
          {rankContext.hints.map((hint, index) => (
            <div
              key={index}
              className={`hint ${index < visibleHintsCount ? 'visible' : 'hidden'}`}
            >
              <span className="hint-number">{index + 1}</span>
              <span className="hint-text">{hint}</span>
            </div>
          ))}
        </div>

        {closenessPercent < 50 && (
          <div className="hint-progress">
            Hints unlock as you get closer... ({Math.ceil(closenessPercent)}%)
          </div>
        )}
      </div>

    </div>
  );
}
