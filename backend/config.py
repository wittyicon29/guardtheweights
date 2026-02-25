from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    """Application settings from environment variables"""

    # API Configuration
    api_title: str = "Game LLM Information Extraction API"
    api_version: str = "0.1.0"
    debug: bool = True

    # CORS
    frontend_url: str = "http://localhost:3000"

    # Groq API (switched from Gemini for better quota limits)
    groq_api_key: str = ""

    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()
