import axios, { AxiosInstance } from 'axios';
import { GameResponse, ValidationResponse, RankInfo } from '../types/game';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

class GameAPI {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Chat endpoints
  async askQuestion(question: string, gameContext?: string): Promise<GameResponse> {
    try {
      const response = await this.api.post('/chat/ask', {
        question,
        gameContext,
      });
      return response.data;
    } catch (error) {
      console.error('Error asking question:', error);
      throw error;
    }
  }

  // Game endpoints
  async getGameState() {
    try {
      const response = await this.api.get('/game/state');
      return response.data;
    } catch (error) {
      console.error('Error getting game state:', error);
      throw error;
    }
  }

  async getRankStatus(): Promise<RankInfo> {
    try {
      const response = await this.api.get('/game/rank-status');
      return response.data;
    } catch (error) {
      console.error('Error getting rank status:', error);
      throw error;
    }
  }

  async getAllSecrets() {
    try {
      const response = await this.api.get('/game/secrets');
      return response.data.secrets;
    } catch (error) {
      console.error('Error getting secrets:', error);
      throw error;
    }
  }

  async validateAnswer(extractedInfo: string, secretId: string): Promise<ValidationResponse> {
    try {
      const response = await this.api.post('/game/validate-answer', {
        extractedInfo,
        secretId,
      });
      return response.data;
    } catch (error) {
      console.error('Error validating answer:', error);
      throw error;
    }
  }

  async resetGame() {
    try {
      const response = await this.api.post('/game/reset');
      return response.data;
    } catch (error) {
      console.error('Error resetting game:', error);
      throw error;
    }
  }

  async healthCheck() {
    try {
      const response = await this.api.get('/game/status');
      return response.data;
    } catch (error) {
      console.error('Error checking health:', error);
      throw error;
    }
  }
}

const gameAPI = new GameAPI();

// eslint-disable-next-line import/no-anonymous-default-export
export default gameAPI;
