"""Security utilities for authentication and authorization"""
from datetime import datetime, timedelta
from typing import Optional
from fastapi import HTTPException, status

from app.core.config import settings

# Simplified security for MVP - no authentication required
# These functions are placeholders in case auth is re-enabled later

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    # Placeholder - authentication removed for MVP
    return True


def get_password_hash(password: str) -> str:
    """Hash a password using bcrypt"""
    # Placeholder - authentication removed for MVP
    return password


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token"""
    # Placeholder - authentication removed for MVP
    return "mock_token"


def create_refresh_token(data: dict) -> str:
    """Create a JWT refresh token"""
    # Placeholder - authentication removed for MVP
    return "mock_refresh_token"


def decode_token(token: str) -> dict:
    """Decode and verify a JWT token"""
    # Placeholder - authentication removed for MVP
    return {"sub": "mock_user"}
