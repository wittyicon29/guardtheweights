import React, { useMemo } from 'react';
import './EntropyExplanation.css';

interface EntropyExplanationProps {
  closenessPercent: number;
}

interface ExplanationData {
  level: string;
  description: string;
  impact: string;
  status: string;
  color: string;
  indicator: string;
}

export function EntropyExplanation({ closenessPercent }: EntropyExplanationProps) {
  const getExplanation = (percent: number): ExplanationData => {
    if (percent >= 90) {
      return {
        level: '🎯 Bullseye!',
        description: 'The narrator has revealed almost everything. You\'re extremely close to the answer.',
        impact: 'Your extraction should be nearly perfect. Only the most obscure keywords might be missing.',
        status: 'Critical Success Zone',
        color: '#00ff88',
        indicator: '█████████░'
      };
    } else if (percent >= 75) {
      return {
        level: '🔥 Very Close!',
        description: 'You\'re very close! The narrator has given away substantial clues.',
        impact: 'You should be able to extract the main keywords and unlock the secret soon.',
        status: 'Success Imminent',
        color: '#ffaa00',
        indicator: '████████░░'
      };
    } else if (percent >= 60) {
      return {
        level: '🧭 On the Right Track',
        description: 'You\'re heading in the right direction. The clues are becoming clearer.',
        impact: 'Additional questions will help reveal more hidden information. Keep asking!',
        status: 'Good Progress',
        color: '#ffdd00',
        indicator: '███████░░░'
      };
    } else if (percent >= 40) {
      return {
        level: '🔍 Getting Warmer',
        description: 'You\'re moving closer to the answer. Some clues are starting to emerge.',
        impact: 'Ask more targeted questions to gather additional context and details.',
        status: 'Moderate Progress',
        color: '#ffbb44',
        indicator: '█████░░░░░'
      };
    } else if (percent >= 20) {
      return {
        level: '❄️ Keep Searching',
        description: 'You\'re in the early stages of discovery. The answers are still hidden.',
        impact: 'Keep asking questions from different angles. Hints will progressively unlock.',
        status: 'Early Stage',
        color: '#5588ff',
        indicator: '███░░░░░░░'
      };
    } else {
      return {
        level: '❓ Just Beginning',
        description: 'You\'re just getting started. The narrator has revealed minimal information.',
        impact: 'Ask broad questions about the world. More clues will emerge as you continue.',
        status: 'Beginning',
        color: '#6666ff',
        indicator: '█░░░░░░░░░'
      };
    }
  };

  const explanation = useMemo(() => getExplanation(closenessPercent), [closenessPercent]);

  return (
    <div className="entropy-explanation">
      <div className="explanation-header">
        <h4>What Does {closenessPercent}% Mean?</h4>
      </div>

      <div className="explanation-level">
        <span className="level-emoji">{explanation.level}</span>
      </div>

      <div className="explanation-content">
        <div className="explanation-section">
          <h5>Current Status</h5>
          <p className="status-text">{explanation.description}</p>
        </div>

        <div className="explanation-section">
          <h5>What This Means for You</h5>
          <p className="impact-text">{explanation.impact}</p>
        </div>

        <div className="progress-indicator">
          <div className="progress-label">Closeness Progress</div>
          <div className="progress-bar" style={{ color: explanation.color }}>
            {explanation.indicator}
          </div>
          <div className="progress-percentage">{closenessPercent}% to Maximum</div>
        </div>
      </div>

      <div className="explanation-hint" style={{ borderLeftColor: explanation.color }}>
        <span className="hint-icon">💡</span>
        <span className="hint-text">
          {closenessPercent < 50
            ? 'Hints will unlock as you reach 25%, 50%, and 75% closeness.'
            : 'You\'re close enough that most hints are now visible! Focus on extraction.'}
        </span>
      </div>
    </div>
  );
}
