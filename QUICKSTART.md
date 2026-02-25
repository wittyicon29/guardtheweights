# Quick Start Guide - LLM Information Extraction Game

## ⚡ Prerequisites
- Python 3.9+
- Node.js 16+
- Google Gemini API Key (free from https://makersuite.google.com/app/apikey)

## 🚀 Setup & Run

### Step 1: Get your Gemini API Key
1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the generated key

### Step 2: Setup Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate
# OR (macOS/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy ..\\.env.example .env
# Edit .env and add your GEMINI_API_KEY
```

### Step 3: Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create .env file (should already exist, verify it has)
# REACT_APP_API_URL=http://localhost:8000/api
```

### Step 4: Run the App

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
uvicorn app:app --reload
```
Backend will run on http://localhost:8000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend will run on http://localhost:3000

## 🎮 How to Play

1. **Ask Questions**: Type questions to the Narrator in the chat box
2. **Extract Information**: When you get a response, try to extract key information
3. **Validate Answers**: Submit your extracted information to unlock secrets
4. **Unlock Lore**: Successfully validating answers reveals game lore and progresses the story

### Example Questions to Ask:
- *"Tell me about the history of this world"*
- *"What ancient civilizations built this land?"*
- *"Where are treasures hidden?"*
- *"What magical powers exist here?"*

### Example Extracted Information:
If Narrator mentions "The Celestial Architects built great cities", extract keywords like:
- `celestial`
- `architects`
- `ancient`

## 📁 Project Structure

```
game/
├── backend/
│   ├── app.py                 # FastAPI application
│   ├── config.py              # Config from .env
│   ├── requirements.txt        # Python dependencies
│   ├── routes/
│   │   ├── chat.py           # /api/chat/ask endpoint
│   │   └── game.py           # /api/game/* endpoints
│   ├── services/
│   │   ├── gemini_service.py  # Gemini API wrapper
│   │   └── game_logic.py      # Secret unlocking logic
│   ├── models/
│   │   ├── schemas.py         # Pydantic models
│   │   └── game.py           # Game data models
│   └── data/
│       └── lore.json         # Game secrets (5 secrets)
│
├── frontend/
│   ├── src/
│   │   ├── components/       # ChatWindow, ExtractionForm, SecretDisplay
│   │   ├── pages/           # GamePage (main page)
│   │   ├── services/        # API client
│   │   ├── context/         # GameContext (state management)
│   │   ├── types/           # TypeScript interfaces
│   │   └── App.tsx          # Main app component
│   └── package.json
│
└── README.md
```

## 🔧 Troubleshooting

### Backend Issues
**Error: "GEMINI_API_KEY is not set"**
- Make sure your `.env` file has `GEMINI_API_KEY=your_actual_key`

**Error: "Cannot connect to http://localhost:8000"**
- Make sure backend is running: `uvicorn app:app --reload`

### Frontend Issues
**"Cannot reach API"**
- Check frontend .env has: `REACT_APP_API_URL=http://localhost:8000/api`
- Make sure backend is running

**Port 3000 already in use**
- Use: `PORT=3001 npm start` for a different port

## 📚 API Endpoints

### Chat
- `POST /api/chat/ask` - Ask narrator a question
  ```json
  {
    "question": "What is this world?",
    "gameContext": "Optional context"
  }
  ```

### Game
- `GET /api/game/state` - Get game state
- `POST /api/game/validate-answer` - Check extracted info
  ```json
  {
    "extractedInfo": "celestial",
    "secretId": "secret_1"
  }
  ```
- `POST /api/game/reset` - Reset game

## 🎯 What's Implemented

✅ **Phases 1-4 Complete:**
- Full project structure
- FastAPI backend with Gemini integration
- Chat endpoints working
- Game logic (5 sample secrets)
- React UI with components
- State management
- API client integration
- Full styling (responsive)

## 🚀 Next Steps (Future Enhancements)

1. **Database Integration**: Add PostgreSQL + SQLAlchemy for persistent user progress
2. **User Accounts**: JWT authentication, leaderboards
3. **Real-time Chat**: WebSockets for instant responses
4. **Deployment**: Docker, AWS hosting
5. **More Game Content**: Add more secrets, worlds, narratives
6. **Advanced Features**: Animations, multiplayer, analytics

## 💡 Tips for Development

- Modify `backend/data/lore.json` to change secrets
- Add more secrets with different keywords/difficulty
- Customize game narrative in `GamePage.tsx`
- Adjust game logic in `game_logic.py` for better matching

## 📖 Full Documentation

See `README.md` for complete documentation.

---

**Enjoy exploring the mysterious world of Aethermoor! 🎮✨**
