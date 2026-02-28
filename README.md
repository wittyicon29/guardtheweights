# Echoes of Aethermoor

An interactive mystery game built with Python (FastAPI) and React (TypeScript) that uses LLM-powered storytelling to guide players in extracting hidden knowledge about a mystical world. Ask questions to a cryptic narrator, extract information from his poetic responses, and unlock the seven secrets of Aethermoor.

## 🎮 Game Overview

**Echoes of Aethermoor** is an information extraction game where:
- You ask questions to a mysterious narrator about the world of Aethermoor
- The narrator answers through elaborate storytelling and metaphor (not direct facts)
- You extract key information from his responses
- Correct extractions unlock secrets and advance your rank
- As you unlock more secrets, the narrator becomes progressively more cryptic
- Eight difficulty ranks guide your journey from Novice to Master

### Core Mechanics

1. **Ask Questions**: Query the narrator about the world's lore, history, and mysteries
2. **Read Responses**: Receive narrative-based answers that hide information in storytelling
3. **Extract Information**: Identify and write down the key information you discovered
4. **Validate Answers**: The LLM itself judges whether your extraction shows true understanding
5. **Unlock Secrets**: Successful validations unlock game lore and advance your rank
6. **Rank Progression**: Each secret unlocked progresses you through 8 ranks (Novice → Master)

## ✨ Features

- **Progressive Difficulty System**: 8 ranks (🥚 Novice, 🌱 Initiate, 📖 Apprentice, 🎯 Journeyman, ⚔️ Adept, 👑 Expert, 🧠 Sage, ✨ Master)
- **Rank-Adaptive Narratives**: LLM responses become increasingly cryptic as you progress
- **LLM-Based Validation**: AI judges if you understood secrets correctly (not just keyword matching)
- **Entropy Metrics**: Real-time feedback on how close your extraction is to unlocking secrets
- **Comprehensive World Lore**: 7 interconnected secrets revealing Aethermoor's history
- **Poetic, Evasive Narrator**: Answers hide information in narrative, not exposition
- **Symmetric Difficulty Progression**: Novice gets clear answers, Master gets philosophical paradoxes

## 📊 Tech Stack

### Backend
- **Framework**: FastAPI (Python 3.9+)
- **LLM Provider**: Groq Cloud API (llama-3.3-70b-versatile model)
- **Validation Engine**: Groq LLM with custom prompting for semantic understanding
- **Async Runtime**: Uvicorn
- **Validation**: Pydantic
- **Logging**: Python logging module

### Frontend
- **Framework**: React 18+
- **Language**: TypeScript
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Styling**: CSS (modular component-based)

## 📋 Prerequisites

Before starting, ensure you have:
- **Python 3.9+**
- **Node.js 16+** (npm or yarn)
- **Groq API Key** (free at https://console.groq.com)

## 🗂️ Project Structure

```
game/
├── backend/
│   ├── app.py                          # FastAPI main app
│   ├── config.py                       # Configuration & env variables
│   ├── requirements.txt                # Python dependencies
│   ├── routes/
│   │   ├── chat.py                    # Chat endpoints (ask questions)
│   │   └── game.py                    # Game endpoints (state, rank, validation)
│   ├── services/
│   │   ├── gemini_service.py          # LLM service wrapper (Groq)
│   │   ├── validation_service.py      # LLM-based validation for extractions
│   │   ├── game_logic.py              # Game state & secret management
│   │   └── entropy_service.py         # Closeness scoring metrics
│   ├── models/
│   │   ├── schemas.py                 # Pydantic request/response models
│   │   └── game.py                    # Game data structures
│   └── data/
│       ├── lore.json                  # 7 secrets with rank-specific context
│       └── world_lore.md              # Complete Aethermoor lore document
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.tsx         # Chat message display
│   │   │   ├── ExtractionForm.tsx     # Info extraction input
│   │   │   ├── RankDisplay.tsx        # Current rank & progress
│   │   │   ├── SecretsReview.tsx      # Unlocked secrets list
│   │   │   ├── EntropyMeter.tsx       # Closeness visualization
│   │   │   └── GuidanceDisplay.tsx    # Progressive hints
│   │   ├── pages/
│   │   │   ├── GamePage.tsx           # Main game interface
│   │   │   └── GamePage.css           # Layout & styling
│   │   ├── context/
│   │   │   └── GameContext.tsx        # Global game state
│   │   ├── services/
│   │   │   └── api.ts                 # API client & endpoints
│   │   ├── types/
│   │   │   └── game.ts                # TypeScript interfaces
│   │   └── App.tsx
│   └── package.json
│
├── .env.example                        # Environment variables template
├── .gitignore
└── README.md                           # This file
```

## 🚀 Getting Started

### 1. Clone and Navigate
```bash
git clone <repository-url>
cd game
```

### 2. Set Up Environment Variables

1. Get your free Groq API key: https://console.groq.com
2. Copy the environment template:
   ```bash
   cp .env.example .env
   ```
3. Edit `.env` and add your Groq API key:
   ```
   GROQ_API_KEY=your_actual_groq_api_key_here
   FRONTEND_URL=http://localhost:3000
   ```

### 3. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app:app --reload
```

Server runs at: `http://localhost:8000`

### 4. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend runs at: `http://localhost:3000`

## 📖 Game Mechanics Explained

### The 7 Secrets of Aethermoor

1. **The First Age** - The Celestial Architects who created Aethermoor 10,000+ years ago
2. **The Elemental Covenant** - Four ancient guardians (fire, ice, earth, air) who protect the land
3. **The Obsidian Vault** - Hidden treasures beneath Blackpeak Mountains
4. **The Silence** - The mysterious collapse of the Golden Empire 2,000 years ago
5. **The Awakening** - Prophecies of the Architects' return
6. **The Forgotten Rift** - A cosmic wound that divides the world
7. **The Eternal Mirror** - An artifact that reveals truth and possibilities

### The 8 Ranks

| Rank | Icon | Secrets | Response Style | Difficulty |
|------|------|---------|---|---|
| **Novice** | 🥚 | 0 | Clear narrative with obvious answers | Beginner |
| **Initiate** | 🌱 | 1+ | Simple storytelling with hidden details | Easy |
| **Apprentice** | 📖 | 2+ | Metaphor with narrative misdirection | Medium |
| **Journeyman** | 🎯 | 3+ | Poetic layers require careful reading | Medium-Hard |
| **Adept** | ⚔️ | 4+ | Paradoxes and philosophical questions | Hard |
| **Expert** | 👑 | 5+ | Symbolic inversion and cryptic reference | Very Hard |
| **Sage** | 🧠 | 6+ | Deconstructed language and pure paradox | Extremely Hard |
| **Master** | ✨ | 7 | All secrets revealed and understood | Legend |

**Narrator Response Examples:**

For "Who built Aethermoor?":
- **Novice**: "Long ago, beings descended from the stars with power over crystalline forces—they shaped this land..."
- **Expert**: "Not the keepers, but the kept; not the builders, but the built. Protected? No, not protected..."
- **Master**: "Created and abandoned... or perhaps to create is to abandon what was created. Those who made did not unmake—they became unmaking itself..."

### Rank Progression Flow

```
Ask Questions → Read Narrative Response → Extract Information
                            ↓
                  Valid Extraction? (LLM judges)
                    ↙           ↘
                  Yes            No
                   ↓              ↓
            Unlock Secret    Try Again with
             (Get Details)    More Clues
                   ↓
             Progress Rank?
           (If secrets_unlocked >= threshold)
                   ↓
             Narrator becomes more cryptic
             for next question
```

### Entropy & Closeness Metrics

After each response, you see:
- **Entropy Score**: 0-100 (how close your extraction is to the secret)
- **Closeness Level**: Visual feedback (Cold ❄️ → Warm 🔥 → Very Close 🎯)
- **Progressive Hints**: Hints unlock as your closeness increases
  - 0-25%: First hint shown
  - 25-50%: Second hint revealed
  - 50%+: Third hint unlocked

This helps guide players toward correct answers without spoiling the mystery.

## 🔗 API Endpoints

### Chat Endpoints

**POST /api/chat/ask** - Ask the narrator a question
```json
Request: {
  "question": "Who built Aethermoor?",
  "gameContext": "Optional context about the world"
}

Response: {
  "response": "Long ago, beings descended from the stars...",
  "entropyScore": 0.65,
  "closenessPercent": 42,
  "closenessLevel": "neutral",
  "feedback": "Getting Warmer!"
}
```

**GET /api/chat/status** - Check chat service status

### Game Endpoints

**GET /api/game/state** - Get current game state
```json
Response: {
  "unlockedSecrets": ["secret_1", "secret_3"],
  "totalSecrets": 7,
  "messageCount": 15,
  "status": "active"
}
```

**GET /api/game/rank-status** - Get rank and progress
```json
Response: {
  "currentRank": "apprentice",
  "rankName": "Apprentice",
  "rankIcon": "📖",
  "secretsUnlocked": 2,
  "totalSecrets": 7,
  "secretsForNextRank": 1
}
```

**POST /api/game/validate-answer** - Validate extracted information
```json
Request: {
  "extractedInfo": "Four guardians made a pact to protect the land"
}

Response: {
  "isCorrect": true,
  "confidence": 89,
  "feedback": "🎉 Correct! You unlocked 'The Elemental Covenant'!",
  "unlockedSecret": {
    "id": "secret_2",
    "title": "The Elemental Covenant",
    "description": "Four elemental guardians made a pact..."
  }
}
```

**POST /api/game/reset** - Reset game state (start over)

## 🛠️ Development Workflow

### Running Both Servers Simultaneously

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
uvicorn app:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Testing the API with cURL

```bash
# Ask a question
curl -X POST http://localhost:8000/api/chat/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "Tell me about the guardians of Aethermoor"}'

# Get game state
curl http://localhost:8000/api/game/state

# Get rank status
curl http://localhost:8000/api/game/rank-status

# Validate an answer
curl -X POST http://localhost:8000/api/game/validate-answer \
  -H "Content-Type: application/json" \
  -d '{"extractedInfo": "Four guardians protect the land"}'
```

## 🎯 How the LLM Systems Work

### Narrator System (gemini_service.py)

- **Groq API Integration**: Uses llama-3.3-70b-versatile model
- **World Lore Context**: Entire world_lore.md injected into every prompt to prevent hallucination
- **Rank-Specific Prompts**: 8 different system prompts (one per rank) that control response complexity
- **Answer Hiding**: Deliberately hides answers in narrative—never uses keywords directly
- **Retry Logic**: Automatic retry with exponential backoff for API timeouts

**Prompt Structure by Rank:**
- **Novice-Initiate**: Clear narrative structure with obvious answer placement
- **Apprentice-Journeyman**: Metaphor + narrative misdirection require synthesis to extract
- **Adept-Expert**: Paradox-based answers contain truth but contradict themselves
- **Sage-Master**: Pure deconstruction where language itself breaks down

### Validation System (validation_service.py)

- **LLM-Based Judging**: Uses Groq to intelligently evaluate extracted information
- **Understanding Over Keywords**: Judges semantic understanding, not keyword matching
- **Flexible Phrasing**: Accepts different words/structure as long as understanding is shown
- **Confidence Scoring**: Returns 0-100 confidence in correctness
- **Custom Feedback**: Provides personalized feedback on why extraction was correct/incorrect

Example validation prompt:
```
SECRET: Four guardians made a pact to protect the land
PLAYER'S EXTRACTION: "Fire, ice, earth, and air bound themselves forever"

JUDGMENT: ✅ Correct - Shows understanding of elements and binding concept
CONFIDENCE: 87
FEEDBACK: "Excellent! You identified all four elements and the eternal nature of their pact."
```

## 📚 Game Lore System

### World Database (lore.json)

Each secret contains:
- **Core Truth**: The actual secret to discover
- **Description**: Full details players should extract
- **Keywords**: Words that hint at the answer
- **Rank Context**: Per-rank hints and target info
- **Reward**: Flavor text for unlocking

### World Lore Document (world_lore.md)

- **Timeline**: From Ancient Era to The Awakening
- **7 Secrets Breakdown**: What to hide, why it's hidden, what hints to provide
- **Cosmology**: Explains Architects, Guardians, cosmic threats
- **LLM Instructions**: Explicit directions for what narrator should/shouldn't reveal

This document is injected into every LLM prompt to ensure consistency and prevent hallucination.

## 🐛 Troubleshooting

### CORS Errors
Ensure `FRONTEND_URL` in `.env` matches your frontend location:
```
FRONTEND_URL=http://localhost:3000
```

### Groq API Errors
- Verify API key is valid: https://console.groq.com
- Check rate limits haven't been exceeded
- Ensure `.env` file is in the correct location with correct key

### Port Already in Use
- **Backend (8000)**: Kill process with `lsof -i :8000` or use `uvicorn app:app --port 8001`
- **Frontend (3000)**: npm will prompt to use different port automatically

### LLM Responses Too Direct
The narrator might reveal answers too clearly. This indicates:
- Rank system may need adjustment (try unlocking more secrets)
- The world_lore.md context might need clarification
- System prompts may need refinement for your use case

### Validation Not Working
- Check that secret keywords are configured in lore.json
- Verify Groq API key is valid
- Test with verbose extraction (more words usually work better)

## 🔮 Future Enhancements

### Phase 2: Deployment
- Docker containerization
- AWS/GCP cloud deployment
- CDN for frontend assets
- Redis caching for frequent queries

### Phase 3: Persistence
- PostgreSQL for game state persistence
- User accounts and progress tracking
- Leaderboards by rank progression speed

### Phase 4: Advanced Features
- Multiple game worlds with different lores
- Multiplayer co-op secret hunting
- Save/load game progress
- Difficulty settings (easier/harder narratives)

### Phase 5: UI/UX Improvements
- Animated rank progression
- Sound effects for secret unlocking
- Dark mode theme
- Mobile responsive design

## 📝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Make your changes
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source under the MIT License.

## ❓ Support & Resources

**Documentation:**
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Groq API Documentation](https://console.groq.com/docs)

**Game Design:**
- See `backend/data/world_lore.md` for complete lore
- See `backend/data/lore.json` for secret definitions

**Issues & Questions:**
- Open an issue on GitHub
- Review troubleshooting section above
