# Developer Guide - LLM Information Extraction Game

## Project Overview

This is a full-stack web application where players interact with an LLM (Google Gemini) to extract information about a game world and unlock secrets. The architecture is modular, scalable, and ready for production enhancements.

## Directory Structure Deep Dive

### `/backend` - Python FastAPI Server

```
backend/
├── app.py                 # FastAPI app initialization + CORS setup
├── config.py              # Environment variable management (pydantic-settings)
├── requirements.txt       # Python dependencies
├── routes/
│   ├── __init__.py
│   ├── chat.py           # Chat endpoints: POST /api/chat/ask
│   └── game.py           # Game endpoints: GET/POST /api/game/*
├── services/
│   ├── __init__.py
│   ├── gemini_service.py  # Gemini API client
│   └── game_logic.py      # Secret validation + game state
├── models/
│   ├── __init__.py
│   ├── schemas.py         # Pydantic request/response models
│   └── game.py           # Game data models
└── data/
    └── lore.json          # Game secrets database
```

#### Key Files Explained

**`app.py`**
- Creates FastAPI app instance
- Configures CORS to allow frontend (http://localhost:3000)
- Includes chat and game routers
- Provides health check endpoints

**`config.py`**
- Uses `pydantic-settings` to load from `.env`
- Manages API keys securely
- Provides defaults for development

**`routes/chat.py`**
- `POST /api/chat/ask` - Main game endpoint
  - Accepts user question
  - Calls Gemini via `gemini_service`
  - Returns narrative response
- Error handling for API failures

**`routes/game.py`**
- `GET /api/game/state` - Get current game state
- `POST /api/game/validate-answer` - Check extracted info
- `POST /api/game/reset` - Reset for new game

**`services/gemini_service.py`**
- Singleton pattern for API client
- `ask_question()` - Main method for Q&A
- Session management for conversation context
- Error handling with clear messages

**`services/game_logic.py`**
- Tracks unlocked secrets in memory
- Validates user input against keywords
- Returns success/failure responses
- Can be extended with scoring, hints, etc.

**`data/lore.json`**
- JSON database with secrets
- Each secret has:
  - `id`: Unique identifier
  - `title`: Display name
  - `description`: Full text when unlocked
  - `keywords`: What players must extract to unlock
  - `hints`: Guidance for narrator
  - `difficulty`: Easy/medium/hard
  - `reward`: What player gets

### `/frontend` - React TypeScript UI

```
frontend/
├── public/
│   └── index.html         # HTML entry point
├── src/
│   ├── App.tsx            # Root component
│   ├── App.css            # Global styles
│   ├── index.tsx          # React DOM render
│   ├── index.css          # Global CSS
│   ├── types/
│   │   └── game.ts        # TypeScript interfaces
│   ├── services/
│   │   └── api.ts         # Axios API client
│   ├── context/
│   │   └── GameContext.tsx # React Context for state
│   ├── components/
│   │   ├── ChatWindow.tsx/.css     # Message display
│   │   ├── ExtractionForm.tsx/.css # Info input form
│   │   └── SecretDisplay.tsx/.css  # Lore display
│   └── pages/
│       └── GamePage.tsx/.css       # Main game layout
├── package.json           # Dependencies + scripts
├── tsconfig.json          # TypeScript config
└── .env                   # API URL configuration
```

#### Key Files Explained

**`context/GameContext.tsx`**
- React Context for global state
- Manages: messages, unlocked secrets, loading state
- Provides hooks: `useGame()`
- Used by GamePage for state access

**`services/api.ts`**
- Axios instance configured to `http://localhost:8000/api`
- Methods:
  - `askQuestion(question, context)` - Call chat endpoint
  - `validateAnswer(info, secretId)` - Check answer
  - `getGameState()` - Get progress
  - `resetGame()` - Start over

**`components/ChatWindow.tsx`**
- Displays messages in chronological order
- Shows user (blue) and bot (light blue) messages
- Auto-scrolls to latest message
- Loading animation while waiting for response

**`components/ExtractionForm.tsx`**
- Textarea for entering extracted information
- Submit button triggers validation
- Disabled while loading
- Character count (max 500 chars)

**`components/SecretDisplay.tsx`**
- Progress bar showing unlocked secrets
- List of all secrets with lock/unlock icons
- Shows only descriptions for unlocked ones
- "New Game" button to reset

**`pages/GamePage.tsx`**
- Main game component
- Orchestrates entire game flow:
  1. Takes question input
  2. Calls API to get response
  3. Displays in ChatWindow
  4. User extracts and validates info
  5. Updates secrets display
- Error handling and loading states
- Connection status indicator

## Adding Features

### Add a New Secret

1. Edit `backend/data/lore.json`:
```json
{
  "id": "secret_new",
  "title": "Secret Name",
  "description": "Full story text...",
  "keywords": ["word1", "word2"],
  "hints": ["hint1"],
  "reward": "What player gets",
  "difficulty": "easy"
}
```

2. Test by:
   - Starting backend
   - Asking related question
   - Extracting a keyword
   - Validating should unlock

### Modify Game Narrative Style

1. Edit system prompt in `backend/routes/chat.py`:
```python
default_system = "You are a [style] narrator for [setting]..."
```

2. Examples:
   - Mystery: "You are a mysterious guide in a haunted mansion..."
   - Fantasy: "You are a wise sage in a magical kingdom..."
   - Sci-Fi: "You are an AI guide in a space colony..."

### Add a New Endpoint

1. Create new router in `backend/routes/new_feature.py`:
```python
from fastapi import APIRouter

router = APIRouter()

@router.get("/new-endpoint")
async def new_endpoint():
    return {"message": "Hello"}
```

2. Include in `backend/app.py`:
```python
from routes import new_feature
app.include_router(new_feature.router, prefix="/api/new", tags=["new"])
```

3. Access at: `http://localhost:8000/api/new/new-endpoint`

### Add Frontend Component

1. Create component in `frontend/src/components/NewComponent.tsx`:
```typescript
export function NewComponent() {
  return <div>New component</div>;
}
```

2. Add styles in `frontend/src/components/NewComponent.css`

3. Use in `GamePage.tsx`:
```typescript
import { NewComponent } from '../components/NewComponent';
// In JSX:
<NewComponent />
```

## Running in Development

### Backend with Debug Logging

```bash
cd backend
export PYTHONUNBUFFERED=1
uvicorn app:app --reload --log-level debug
```

### Frontend with Browser DevTools

```bash
cd frontend
npm start
```
Opens with React DevTools browser extension available

## Building for Production

### Backend

```bash
cd backend
pip install -r requirements.txt
gunicorn app:app --workers 4 --worker-class uvicorn.workers.UvicornWorker
```

### Frontend

```bash
cd frontend
npm run build
# Creates optimized build in ./build/
```

## Testing

### Manual Testing Checklist

- [ ] Can ask a question and get response
- [ ] Response displays in chat window
- [ ] Can extract information from response
- [ ] Validation works for correct keywords
- [ ] Validation fails for incorrect keywords
- [ ] Secrets unlock properly
- [ ] Secret display updates
- [ ] Progress bar moves
- [ ] Reset button works
- [ ] Error messages display properly
- [ ] Works on mobile (responsive)

### API Testing with curl

```bash
# Test health
curl http://localhost:8000/health

# Ask a question
curl -X POST http://localhost:8000/api/chat/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"What is this world?"}'

# Get game state
curl http://localhost:8000/api/game/state

# Validate answer
curl -X POST http://localhost:8000/api/game/validate-answer \
  -H "Content-Type: application/json" \
  -d '{"extractedInfo":"celestial","secretId":"secret_1"}'
```

## Common Issues & Solutions

### Backend won't start
- Check Python version (need 3.9+)
- Check GEMINI_API_KEY in .env
- Check port 8000 is available

### Frontend won't connect to backend
- Verify REACT_APP_API_URL in .env
- Check CORS settings in app.py
- Verify backend is running

### Gemini API errors
- Verify API key is valid
- Check rate limits (free tier has limits)
- Try with a simpler question

### TypeScript errors
- Run `npm install` to ensure types are installed
- Restart TypeScript server in editor
- Check tsconfig.json is valid

## Environment Variables

### Backend (.env)
```
DEBUG=True
API_TITLE="Game LLM Information Extraction API"
FRONTEND_URL=http://localhost:3000
GEMINI_API_KEY=your_key_here
```

### Frontend (frontend/.env)
```
REACT_APP_API_URL=http://localhost:8000/api
```

## Performance Optimization Tips

1. **Cache Gemini responses** - Add Redis caching for common questions
2. **Lazy load components** - Use React.lazy() for large components
3. **Optimize images** - Use WebP format, compress assets
4. **Database queries** - Add database indexes when persisting data
5. **API rate limiting** - Add rate limits in FastAPI middleware

## Security Considerations

1. **API Keys**: Never commit .env files
2. **CORS**: Restrict to specific domains in production
3. **Input validation**: Already done with Pydantic, keep it up
4. **Rate limiting**: Add per-IP limits before deploying
5. **HTTPS**: Use SSL certificates in production
6. **Authentication**: Add JWT tokens before public release

## Deployment Checklist

- [ ] All environment variables configured
- [ ] API keys secured in secrets management
- [ ] Frontend built (`npm run build`)
- [ ] Backend tested under load
- [ ] CORS properly configured
- [ ] Error logging enabled
- [ ] Database backups configured (if using DB)
- [ ] Monitoring/alerts set up
- [ ] SSL/HTTPS enabled
- [ ] Rate limiting active

## Resources

- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **React Docs**: https://react.dev/
- **Gemini API**: https://makersuite.google.com/
- **Pydantic Docs**: https://docs.pydantic.dev/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/

---

Happy developing! 🚀
