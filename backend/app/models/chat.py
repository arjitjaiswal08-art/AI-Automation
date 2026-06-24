"""Chat message model"""
from sqlalchemy import Column, String, Integer, DateTime, Enum, ForeignKey, Text, JSON
from datetime import datetime
import uuid
import enum

from app.db.base import Base


class MessageRole(str, enum.Enum):
    USER = "user"
    ASSISTANT = "assistant"
    SYSTEM = "system"


class ChatMessage(Base):
    __tablename__ = "chat_messages"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = Column(String, nullable=False, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    role = Column(Enum(MessageRole), nullable=False)
    content = Column(Text, nullable=False)
    model_used = Column(String, nullable=True)
    tokens_used = Column(Integer, nullable=True)
    code_blocks = Column(JSON, default=[])
    file_references = Column(JSON, default=[])
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    message_metadata = Column(JSON, default={})
    
    def __repr__(self):
        return f"<ChatMessage {self.role} at {self.timestamp}>"
