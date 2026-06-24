"""Project model"""
from sqlalchemy import Column, String, Integer, DateTime, Enum, ForeignKey, JSON
from datetime import datetime
import uuid
import enum

from app.db.base import Base


class IndexStatus(str, enum.Enum):
    PENDING = "pending"
    INDEXING = "indexing"
    COMPLETED = "completed"
    FAILED = "failed"


class Project(Base):
    __tablename__ = "projects"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    path = Column(String, nullable=False)
    language = Column(String, nullable=True)
    framework = Column(String, nullable=True)
    indexed_at = Column(DateTime, nullable=True)
    file_count = Column(Integer, default=0)
    index_status = Column(Enum(IndexStatus), default=IndexStatus.PENDING)
    git_remote = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    settings = Column(JSON, default={
        "ignore_patterns": ["node_modules", ".git", "dist", "build", "__pycache__"],
        "auto_index": True,
        "test_framework": "pytest",
        "lint_enabled": True,
        "format_on_save": False
    })
    
    def __repr__(self):
        return f"<Project {self.name}>"
