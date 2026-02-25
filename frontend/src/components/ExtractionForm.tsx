import React, { useState } from 'react';
import { Secret } from '../types/game';
import './ExtractionForm.css';

interface ExtractionFormProps {
  onSubmit: (extractedInfo: string) => void;
  loading?: boolean;
  isVisible?: boolean;
  validationMessage?: string;
  unlockedSecret?: Secret | null;
  isValidationSuccess?: boolean;
}

export function ExtractionForm({
  onSubmit,
  loading = false,
  isVisible = true,
  validationMessage,
  unlockedSecret,
  isValidationSuccess = false,
}: ExtractionFormProps) {
  const [extractedInfo, setExtractedInfo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (extractedInfo.trim()) {
      onSubmit(extractedInfo);
      setExtractedInfo('');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="extraction-form-container">
      <form className="extraction-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="extraction-input">Extract the information you found:</label>
          <textarea
            id="extraction-input"
            value={extractedInfo}
            onChange={e => setExtractedInfo(e.target.value)}
            placeholder="What information did you extract from the narrator's response?"
            disabled={loading}
            rows={3}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !extractedInfo.trim()}
          className="btn-submit"
        >
          {loading ? 'Validating...' : 'Validate Answer'}
        </button>
      </form>

      {validationMessage && (
        <div className={`validation-feedback ${isValidationSuccess ? 'success' : 'error'}`}>
          <p>{validationMessage}</p>
        </div>
      )}

      {unlockedSecret && isValidationSuccess && (
        <div className="unlocked-secret-display">
          <div className="secret-header">
            <span className="secret-icon">🎉</span>
            <h4>Secret Unlocked!</h4>
          </div>
          <div className="secret-content">
            <h5>{unlockedSecret.title}</h5>
            <p className="secret-description">{unlockedSecret.description}</p>
            {unlockedSecret.reward && (
              <div className="secret-reward">
                <span className="reward-label">Reward:</span>
                <span className="reward-text">{unlockedSecret.reward}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
