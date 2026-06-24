"""Coding Agent for code generation and editing"""
from openai import AsyncOpenAI
from app.core.config import settings


class CodingAgent:
    def __init__(self):
        self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
    
    async def generate_code(self, prompt: str, language: str, context: dict) -> dict:
        """Generate code from prompt"""
        
        try:
            system_prompt = f"You are an expert {language} developer. Generate clean, production-ready code with comments."
            
            response = await self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": f"Generate {language} code for: {prompt}"}
                ],
                temperature=0.3
            )
            
            code = response.choices[0].message.content
            
            return {
                "code": code,
                "language": language,
                "explanation": f"Generated {language} code based on your request",
                "imports": []
            }
        except Exception as e:
            return {
                "code": f"# Error generating code: {str(e)}\n# Make sure OPENAI_API_KEY is set",
                "language": language,
                "explanation": "Error occurred",
                "imports": []
            }
    
    async def explain_code(self, code: str, language: str) -> str:
        """Explain what code does"""
        try:
            response = await self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are a code explanation expert. Explain code clearly and concisely."},
                    {"role": "user", "content": f"Explain this {language} code:\n\n{code}"}
                ],
                temperature=0.3
            )
            
            return response.choices[0].message.content
        except Exception as e:
            return f"Error explaining code: {str(e)}"
