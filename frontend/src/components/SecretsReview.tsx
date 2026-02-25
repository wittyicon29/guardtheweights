import React, { useState } from 'react';
import { Secret } from '../types/game';
import './SecretsReview.css';

interface SecretsReviewProps {
  unlockedSecrets: Secret[];
  totalSecrets?: number;
}

export function SecretsReview({ unlockedSecrets, totalSecrets = 5 }: SecretsReviewProps) {
  const [expandedSecretId, setExpandedSecretId] = useState<string | null>(null);

  const toggleSecret = (secretId: string) => {
    setExpandedSecretId(expandedSecretId === secretId ? null : secretId);
  };

  if (unlockedSecrets.length === 0) {
    return (
      <div className="secrets-review">
        <div className="review-header">
          <span className="review-icon">📜</span>
          <h3>Discovered Secrets</h3>
        </div>
        <div className="review-placeholder">
          <p>No secrets discovered yet. Ask the narrator questions to unveil them!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="secrets-review">
      <div className="review-header">
        <span className="review-icon">📜</span>
        <h3>Discovered Secrets</h3>
        <span className="secret-count">
          {unlockedSecrets.length}/{totalSecrets}
        </span>
      </div>

      <div className="secrets-list">
        {unlockedSecrets.map((secret) => (
          <div
            key={secret.id}
            className={`secret-item ${expandedSecretId === secret.id ? 'expanded' : ''}`}
          >
            <div
              className="secret-item-header"
              onClick={() => toggleSecret(secret.id)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') toggleSecret(secret.id);
              }}
            >
              <span className="secret-title">{secret.title}</span>
              <span className="expand-icon">
                {expandedSecretId === secret.id ? '▼' : '▶'}
              </span>
            </div>

            {expandedSecretId === secret.id && (
              <div className="secret-item-details">
                <p className="secret-description">{secret.description}</p>
                {secret.reward && (
                  <div className="secret-reward-info">
                    <span className="reward-badge">🎁 Reward:</span>
                    <span>{secret.reward}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
