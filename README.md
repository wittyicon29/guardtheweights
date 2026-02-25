# LLM-Based Information Extraction Game

A Q&A-based game built with Python (FastAPI) and React (TypeScript) that uses Google Gemini API for interactive storytelling. Players ask questions to extract information about game lore and unlock secrets.

## Features

- **Chat-Based Gameplay**: Ask questions to an LLM and receive narrative responses
- **Information Extraction**: Extract key information from responses to unlock game secrets
- **Game Lore System**: Progressive revelation of story content and hidden information
- **Modern Tech Stack**: FastAPI backend + React/TypeScript frontend
- **Scalable Architecture**: Built to scale from MVP to production with databases, authentication, and cloud deployment

## Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **LLM**: Google Gemini API
- **Async Runtime**: Uvicorn
- **Validation**: Pydantic

### Frontend
- **Framework**: React 18+
- **Language**: TypeScript
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Styling**: CSS/Tailwind (configurable)

## Prerequisites

Before you begin, ensure you have:
- Python 3.9+
- Node.js 16+
- npm or yarn
- A Google Gemini API key (free at https://makersuite.google.com/app/apikey)

## Project Structure

```
game/
├── backend/                    # FastAPI application
│   ├── app.py                 # Main FastAPI app
│   ├── config.py              # Configuration management
│   ├── requirements.txt        # Python dependencies
│   ├── routes/                # API endpoints
│   │   ├── chat.py           # Chat endpoints
│   │   └── game.py           # Game endpoints
│   ├── services/             # Business logic
│   │   ├── gemini_service.py # Gemini API wrapper
│   │   └── game_logic.py     # Game mechanics
│   ├── models/               # Data models
│   │   ├── schemas.py        # Pydantic schemas
│   │   └── game.py          # Game data models
│   └── data/                 # Game data
│       └── lore.json         # Game lore/secrets
│
├── frontend/                  # React application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API client
│   │   ├── types/           # TypeScript types
│   │   ├── context/         # Context/state
│   │   └── App.tsx
│   └── package.json
│
├── .gitignore
├── .env.example              # Environment template
└── README.md                 # This file
```

## Getting Started

### 1. Clone and Setup

```bash
git clone <repository>
cd game
```

### 2. Set Up Gemini API Key

1. Get your free API key from: https://makersuite.google.com/app/apikey
2. Create a `.env` file in the game root directory:
   ```bash
   cp .env.example .env
   ```
3. Add your API key to `.env`:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

### 3. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app:app --reload
```

The backend will start at `http://localhost:8000`

### 4. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will start at `http://localhost:3000`

## API Endpoints

### Chat Endpoints
- `POST /api/chat/ask` - Send a question to the LLM
  - Request: `{ question: string, gameContext?: string }`
  - Response: `{ response: string }`

### Game Endpoints
- `GET /api/game/` - Get game status
- `POST /api/game/validate-answer` - Validate extracted information
- `GET /api/game/state` - Get current game state
- `POST /api/game/reset` - Reset game state

## Game Flow

1. **Start Game**: Player sees the initial game interface
2. **Ask Question**: Player types a question about the game world
3. **Get Response**: LLM provides narrative response as the game world
4. **Extract Info**: Player identifies and extracts key information from the response
5. **Validate Answer**: System checks if extracted info matches expected answers
6. **Unlock Secrets**: Correct answers unlock new lore and game content
7. **Progress**: Continue asking questions to unlock more secrets

## Development Workflow

### Running Both Servers
Terminal 1 - Backend:
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
uvicorn app:app --reload
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

### Testing the API
```bash
# Test health endpoint
curl http://localhost:8000/health

# Test chat endpoint (will need to implement)
curl -X POST http://localhost:8000/api/chat/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What is this world?"}'
```

## Future Enhancements (Roadmap)

### Phase 2 (Database & Persistence)
- PostgreSQL for user progress tracking
- SQLAlchemy ORM

### Phase 3 (User System)
- User authentication (JWT)
- Leaderboards
- Game progress persistence

### Phase 4 (Real-time Features)
- WebSockets for live chat
- Real-time notifications

### Phase 5 (Deployment & Scaling)
- Docker containerization
- AWS deployment (EC2, RDS, S3)
- Redis caching

### Phase 6 (Advanced Features)
- Multiple game worlds
- Multiplayer co-ops
- Advanced UI animations
- Sound effects

## Troubleshooting

### CORS Errors
Make sure `FRONTEND_URL` in `.env` matches where your frontend is running (default: `http://localhost:3000`)

### Gemini API Errors
- Check that your API key is valid and not rate-limited
- Ensure the key is properly set in `.env`

### Port Already in Use
- Backend (8000): `lsof -i :8000` to find process
- Frontend (3000): `npm start` will prompt for a different port

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions:
- Open an issue on GitHub
- Check the troubleshooting section above
- Review the plan at `.claude/plans/` for architectural details

## Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Google Gemini API](https://makersuite.google.com/app/apikey)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Happy building! 🚀**
