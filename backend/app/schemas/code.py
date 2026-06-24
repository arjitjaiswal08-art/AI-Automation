"""Code generation schemas"""
from pydantic import BaseModel
from typing import Optional, Dict, Any


class CodeGenerationRequest(BaseModel):
    prompt: str
    language: str = "python"
    context: Optional[Dict[str, Any]] = None


class CodeGenerationResponse(BaseModel):
    code: str
    language: str
    explanation: str
    imports: list[str] = []
