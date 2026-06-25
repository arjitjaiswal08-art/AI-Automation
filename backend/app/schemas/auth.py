"""Authentication schemas"""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import uuid


class UserCreate(BaseModel):
    email: str  # Changed from EmailStr to str
    username: str = Field(min_length=3, max_length=50)
    password: str = Field(min_length=12)


class UserResponse(BaseModel):
    id: uuid.UUID
    email: str
    username: str
    subscription_tier: str
    api_quota_used: int
    api_quota_limit: int
    created_at: datetime
    
    class Config:
        orm_mode = True  # Changed from from_attributes for pydantic v1


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
