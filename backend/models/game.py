from pydantic import BaseModel
from typing import Optional, List
from enum import Enum

class DifficultyRank(str, Enum):
    """Game difficulty ranks - progressive from Novice to Master"""
    NOVICE = "novice"          # 0-1 secrets: Crystal clear, direct
    APPRENTICE = "apprentice"  # 2+ secrets: Clear narrative
    ADEPT = "adept"            # 3+ secrets: Balanced mystery
    EXPERT = "expert"          # 4+ secrets: Mysterious
    MASTER = "master"          # 5 secrets: Highly cryptic

class RankInfo(BaseModel):
    """Information about a difficulty rank"""
    rank: DifficultyRank
    name: str
    icon: str
    description: str
    secrets_needed: int
    response_style: str

    class Config:
        json_schema_extra = {
            "example": {
                "rank": "novice",
                "name": "Novice",
                "icon": "🥚",
                "description": "Clear hints and obvious facts",
                "secrets_needed": 1,
                "response_style": "Crystal clear, direct hints"
            }
        }

class Secret(BaseModel):
    """Represents a secret that can be unlocked"""
    id: str
    title: str
    description: str
    hints: List[str] = []
    keywords: List[str] = []
    reward: Optional[str] = None
    difficulty: str = "medium"
    unlocked: bool = False

    class Config:
        json_schema_extra = {
            "example": {
                "id": "secret_1",
                "title": "Ancient History",
                "description": "This world is very old...",
                "hints": ["ancient", "old", "history"],
                "keywords": ["ancient"],
                "reward": "Knowledge points",
                "difficulty": "easy",
                "unlocked": False
            }
        }

class GameSession(BaseModel):
    """Represents a game session"""
    session_id: str
    unlocked_secrets: List[str] = []
    messages_count: int = 0
    current_score: int = 0
    status: str = "active"

class GameWorld(BaseModel):
    """Represents a game world"""
    name: str
    description: str
    secrets: List[Secret] = []
