"""Chat API endpoints"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
import uuid

from app.db.session import get_db
from app.services.ai_service import AIService
from app.schemas.chat import ChatRequest, ChatResponse

router = APIRouter()


@router.post("/send", response_model=ChatResponse)
async def send_message(
    request: ChatRequest,
    db: Session = Depends(get_db)
):
    """Send a chat message and get AI response (no auth required for MVP)"""
    
    # Get AI response
    ai_service = AIService()
    response = await ai_service.generate_response(
        message=request.message,
        context=request.context or {}
    )
    
    return {
        "session_id": str(request.session_id or uuid.uuid4()),
        "message": response["content"],
        "code_blocks": response.get("code_blocks", []),
        "model": response["model"]
    }


@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "chat"}
