import React from 'react';
import { Message } from '../types/game';
import { EntropyMeter } from './EntropyMeter';
import './EntropyPanel.css';

interface EntropyPanelProps {
  messages: Message[];
}

export function EntropyPanel({ messages }: EntropyPanelProps) {
  // Find the last bot message with entropy metrics
  const lastBotMessage = [...messages]
    .reverse()
    .find(m => m.sender === 'bot' && m.feedback);

  // Show placeholder if no messages yet
  if (!lastBotMessage || !lastBotMessage.feedback) {
    return (
      <div className="entropy-panel entropy-panel-placeholder">
        <div className="entropy-panel-header">
          <span className="entropy-icon">📊</span>
          <h3>Response Analysis</h3>
        </div>

        <div className="entropy-placeholder-content">
          <div className="placeholder-message">
            Ask a question to analyze how close the narrator's response is to revealing the secret.
          </div>

          <div className="placeholder-meter">
            <div className="placeholder-bar" style={{ width: '0%' }} />
            <div className="placeholder-text">0% to Maximum</div>
          </div>
        </div>

        <div className="entropy-context">
          <p>
            <strong>How it works:</strong> Each response gets a closeness score showing how near you are to discovering the secret.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="entropy-panel">
      <div className="entropy-panel-header">
        <span className="entropy-icon">📊</span>
        <h3>Response Analysis</h3>
      </div>

      <EntropyMeter
        closenessPercent={lastBotMessage.closenessPercent || 0}
        feedback={lastBotMessage.feedback}
        entropyScore={lastBotMessage.entropyScore}
        showDetails={true}
      />

      <div className="entropy-context">
        <p>
          <strong>What this means:</strong> This meter shows how close the narrator's response is to revealing the secret.
          Ask more targeted questions to increase your closeness score.
        </p>
      </div>
    </div>
  );
}
