import React from 'react';
import { Secret } from '../types/game';
import './SecretDisplay.css';

interface SecretDisplayProps {
  secrets: Secret[];
  onReset?: () => void;
}

export function SecretDisplay({ secrets, onReset }: SecretDisplayProps) {
  const unlockedCount = secrets.filter(s => s.unlocked).length;
  const totalCount = secrets.length;

  return (
    <div className="secret-display">
      <div className="secrets-header">
        <h2>🔐 Unlocked Secrets</h2>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${totalCount > 0 ? (unlockedCount / totalCount) * 100 : 0}%`,
            }}
          />
        </div>
        <div className="progress-text">
          {unlockedCount}/{totalCount} secrets unlocked
        </div>
      </div>

      <div className="secrets-list">
        {secrets.length === 0 ? (
          <div className="empty-secrets">
            <p>No secrets yet. Ask the narrator questions to unlock them!</p>
          </div>
        ) : (
          secrets.map(secret => (
            <div
              key={secret.id}
              className={`secret-item ${secret.unlocked ? 'unlocked' : 'locked'}`}
            >
              <div className="secret-icon">
                {secret.unlocked ? '🔓' : '🔒'}
              </div>
              <div className="secret-content">
                <h3 className="secret-title">{secret.title}</h3>
                {secret.unlocked && (
                  <p className="secret-description">{secret.description}</p>
                )}
                {!secret.unlocked && (
                  <p className="secret-locked">Ask more questions to unlock</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {secrets.length > 0 && onReset && (
        <button className="btn-reset" onClick={onReset}>
          New Game
        </button>
      )}
    </div>
  );
}
