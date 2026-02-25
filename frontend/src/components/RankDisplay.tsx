import React from 'react';
import { RankInfo } from '../types/game';
import './RankDisplay.css';

interface RankDisplayProps {
  rankInfo: RankInfo | null;
  loading?: boolean;
}

export function RankDisplay({ rankInfo, loading = false }: RankDisplayProps) {
  if (loading || !rankInfo) {
    return (
      <div className="rank-display loading">
        <p>Loading rank...</p>
      </div>
    );
  }

  const progressPercentage = rankInfo.nextRank
    ? ((rankInfo.totalSecretsUnlocked / (rankInfo.totalSecretsUnlocked + rankInfo.secretsForNextRank)) * 100)
    : 100;

  return (
    <div className="rank-display">
      <div className="rank-header">
        <div className="rank-badge">
          <span className="rank-icon">{rankInfo.rankIcon}</span>
          <span className="rank-name">{rankInfo.rankName}</span>
        </div>
        <p className="rank-description">{rankInfo.rankDescription}</p>
      </div>

      <div className="rank-progress">
        <div className="progress-label">
          <span>{rankInfo.totalSecretsUnlocked}</span>
          <span>/</span>
          <span>{rankInfo.totalSecrets}</span>
          <span className="progress-text">secrets</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>

        {rankInfo.nextRank && rankInfo.secretsForNextRank > 0 ? (
          <div className="next-rank-info">
            <span className="next-rank-label">Next:</span>
            <span className="next-rank-name">{rankInfo.nextRankName}</span>
            <span className="secrets-needed">(+{rankInfo.secretsForNextRank} secret{rankInfo.secretsForNextRank !== 1 ? 's' : ''})</span>
          </div>
        ) : (
          <div className="master-achieved">
            <span>🎉 Master Rank Achieved! 🎉</span>
          </div>
        )}
      </div>

      <div className="rank-stats">
        <div className="stat">
          <span className="stat-label">Secrets Found:</span>
          <span className="stat-value">{rankInfo.totalSecretsUnlocked}/{rankInfo.totalSecrets}</span>
        </div>
      </div>
    </div>
  );
}
