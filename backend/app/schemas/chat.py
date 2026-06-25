"""Chat schemas"""
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import uuid


class ChatRequest(BaseModel):
    message: str
    session_id: Optional[uuid.UUID] = None
    context: Optional[Dict[str, Any]] = None


class CodeBlock(BaseModel):
    language: str
    code: str
    file_path: Optional[str] = None


class ChatResponse(BaseModel):
    session_id: str
    message: str
    code_blocks: List[CodeBlock] = []
    model: str
    
    class Config:
        orm_mode = True  # Changed from from_attributes for pydantic v1
