import React from 'react';
import { GameProvider } from './context/GameContext';
import { GamePage } from './pages/GamePage';
import './App.css';

function App() {
  return (
    <GameProvider>
      <GamePage />
    </GameProvider>
  );
}

export default App;
