import React from 'react';
import './EntropyMeter.css';

interface EntropyMeterProps {
  closenessPercent: number;
  feedback: string;
  showDetails?: boolean;
  keywordScore?: number;
  entropyScore?: number;
}

export function EntropyMeter({
  closenessPercent,
  feedback,
  showDetails = false,
  keywordScore,
  entropyScore
}: EntropyMeterProps) {
  // Determine color based on closeness
  const getColor = (percent: number) => {
    if (percent >= 75) return '#4CAF50'; // Green
    if (percent >= 50) return '#FFC107'; // Yellow
    if (percent >= 25) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  const color = getColor(closenessPercent);
  const clampedPercent = Math.min(Math.max(closenessPercent, 0), 100);

  return (
    <div className="entropy-meter-container">
      <div className="entropy-meter">
        <div className="entropy-feedback">
          <span className="feedback-text">{feedback}</span>
          <span className="closeness-percent">{clampedPercent}%</span>
        </div>

        <div className="meter-bar-wrapper">
          <div className="meter-bar-background">
            <div
              className="meter-bar-fill"
              style={{
                width: `${clampedPercent}%`,
                backgroundColor: color
              }}
            />
          </div>
        </div>

        {showDetails && (
          <div className="entropy-details">
            {entropyScore !== undefined && (
              <div className="detail-item">
                <span>Entropy:</span>
                <span>{(entropyScore * 100).toFixed(0)}%</span>
              </div>
            )}
            {keywordScore !== undefined && (
              <div className="detail-item">
                <span>Keyword Match:</span>
                <span>{(keywordScore * 100).toFixed(0)}%</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
