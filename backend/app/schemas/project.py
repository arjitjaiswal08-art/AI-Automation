"""Project schemas"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import uuid


class ProjectCreate(BaseModel):
    name: str
    path: str
    language: Optional[str] = None
    framework: Optional[str] = None


class ProjectResponse(BaseModel):
    id: uuid.UUID
    name: str
    path: str
    language: Optional[str]
    framework: Optional[str]
    index_status: str
    file_count: int
    created_at: datetime
    
    class Config:
        orm_mode = True  # Changed from from_attributes for pydantic v1
