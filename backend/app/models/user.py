"""User model"""
from sqlalchemy import Column, String, Integer, DateTime, Boolean, Enum, JSON
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid
import enum

from app.db.base import Base


class SubscriptionTier(str, enum.Enum):
    FREE = "free"
    PRO = "pro"
    TEAM = "team"
    ENTERPRISE = "enterprise"


class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, nullable=False, index=True)
    username = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)
    subscription_tier = Column(Enum(SubscriptionTier), default=SubscriptionTier.FREE)
    api_quota_used = Column(Integer, default=0)
    api_quota_limit = Column(Integer, default=50)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = Column(DateTime, nullable=True)
    preferences = Column(JSON, default={})
    team_id = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    
    def __repr__(self):
        return f"<User {self.email}>"
