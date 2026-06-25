"""Application configuration"""
from pydantic import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""
    
    # Database
    DATABASE_URL: str = "sqlite:///./codepilot_ai.db"
    
    # API Keys
    OPENAI_API_KEY: str
    ANTHROPIC_API_KEY: str = ""
    DEEPSEEK_API_KEY: str = ""
    
    # Use local AI instead of OpenAI
    USE_OLLAMA: bool = False
    
    # JWT
    SECRET_KEY: str = "your-secret-key-here-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30
    
    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173", "*"]
    
    # Rate Limiting
    RATE_LIMIT_FREE_TIER: int = 50
    RATE_LIMIT_PRO_TIER: str = "unlimited"
    
    # Models
    DEFAULT_MODEL: str = "gpt-4o-mini"
    DEFAULT_EMBEDDING_MODEL: str = "text-embedding-3-large"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
