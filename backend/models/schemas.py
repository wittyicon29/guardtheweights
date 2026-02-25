from pydantic import BaseModel, Field
from typing import Optional, Any

# Chat models
class AskQuestionRequest(BaseModel):
    question: str = Field(..., min_length=1, max_length=500, description="Question to ask the narrator")
    gameContext: Optional[str] = Field(None, description="Optional game context/prompt")

    class Config:
        json_schema_extra = {
            "example": {
                "question": "What is the history of this place?",
                "gameContext": "You are in an ancient temple"
            }
        }

class AskQuestionResponse(BaseModel):
    response: str = Field(..., description="Response from the narrator")
    extractedInfo: Optional[Any] = Field(None, description="Optional extracted information")
    entropyScore: float = Field(default=0.5, description="Shannon entropy of response (0-1), lower = more deterministic")
    closenessPercent: int = Field(default=50, description="Weighted closeness metric (0-100)")
    closenessLevel: str = Field(default="neutral", description="Categorical closeness level (very_far, far, neutral, close, very_close)")
    feedback: str = Field(default="Neutral", description="Human-readable feedback about closeness")

    class Config:
        json_schema_extra = {
            "example": {
                "response": "This ancient temple was built thousands of years ago by celestial beings...",
                "extractedInfo": None,
                "entropyScore": 0.62,
                "closenessPercent": 45,
                "closenessLevel": "neutral",
                "feedback": "On the right track 🧭"
            }
        }

# Game models
class ValidateAnswerRequest(BaseModel):
    extractedInfo: str = Field(..., min_length=1, description="Extracted information to validate")
    secretId: Optional[str] = Field(None, description="ID of the secret being unlocked")

    class Config:
        json_schema_extra = {
            "example": {
                "extractedInfo": "The temple was built 3000 years ago",
                "secretId": "secret_1"
            }
        }

class SecretData(BaseModel):
    id: str
    title: str
    description: str
    reward: Optional[str] = None
    unlocked: bool = False

class ValidateAnswerResponse(BaseModel):
    isCorrect: bool
    unlockedSecret: Optional[SecretData] = None
    message: str

    class Config:
        json_schema_extra = {
            "example": {
                "isCorrect": True,
                "unlockedSecret": {
                    "id": "secret_1",
                    "title": "Temple History",
                    "description": "The temple was indeed built 3000 years ago",
                    "unlocked": True
                },
                "message": "Correct! You've unlocked a secret."
            }
        }

class GameStateResponse(BaseModel):
    unlockedSecrets: list[str]
    totalSecrets: int
    messageCount: int
    status: str = "active"

class GameResetResponse(BaseModel):
    message: str = "Game has been reset"
    status: str = "reset"
