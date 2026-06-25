"""Code generation schemas"""
from pydantic import BaseModel
from typing import Optional, Dict, Any, List


class CodeGenerationRequest(BaseModel):
    prompt: str
    language: str = "python"
    context: Optional[Dict[str, Any]] = None


class CodeGenerationResponse(BaseModel):
    code: str
    language: str
    explanation: str
    imports: List[str] = []  # Changed from list[str] for pydantic v1 compatibility
