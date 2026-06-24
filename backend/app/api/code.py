"""Code generation and editing API endpoints"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.services.coding_agent import CodingAgent
from app.schemas.code import CodeGenerationRequest, CodeGenerationResponse

router = APIRouter()


@router.post("/generate", response_model=CodeGenerationResponse)
async def generate_code(
    request: CodeGenerationRequest,
    db: Session = Depends(get_db)
):
    """Generate code from natural language description (no auth for MVP)"""
    coding_agent = CodingAgent()
    
    result = await coding_agent.generate_code(
        prompt=request.prompt,
        language=request.language,
        context=request.context or {}
    )
    
    return result


@router.post("/explain")
async def explain_code(request: dict):
    """Explain code snippet"""
    coding_agent = CodingAgent()
    
    explanation = await coding_agent.explain_code(
        code=request["code"],
        language=request.get("language", "python")
    )
    
    return {"explanation": explanation}


@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "code"}
