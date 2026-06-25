"""AI Service for chat interactions"""
import openai
from app.core.config import settings
import re


class AIService:
    def __init__(self):
        # Set API key
        openai.api_key = settings.OPENAI_API_KEY
        self.model = "gpt-4o-mini"
    
    async def generate_response(self, message: str, context: dict) -> dict:
        """Generate AI response to user message"""
        
        try:
            # Create chat completion using old API
            response = await openai.ChatCompletion.acreate(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are AI Unica, an expert coding assistant. Help users write, debug, and understand code. Be concise and practical."},
                    {"role": "user", "content": message}
                ],
                temperature=0.7,
                max_tokens=2000
            )
            
            content = response.choices[0].message.content
            
            # Extract code blocks
            code_blocks = self._extract_code_blocks(content)
            
            return {
                "content": content,
                "model": self.model,
                "tokens": response.usage.total_tokens if hasattr(response, 'usage') else 0,
                "code_blocks": code_blocks
            }
        except Exception as e:
            error_msg = str(e)
            if "insufficient_quota" in error_msg or "429" in error_msg:
                return {
                    "content": f"⚠️ OpenAI quota exceeded!\n\nPlease add billing at https://platform.openai.com/settings/organization/billing\n\nYour message was: '{message}'",
                    "model": "error",
                    "tokens": 0,
                    "code_blocks": []
                }
            # Other errors
            return {
                "content": f"I'm AI Unica! I encountered an error: {error_msg}\n\nFor now, I can help you understand that you asked: '{message}'",
                "model": "fallback",
                "tokens": 0,
                "code_blocks": []
            }
    
    def _extract_code_blocks(self, content: str) -> list:
        """Extract code blocks from markdown"""
        pattern = r"```(\w+)?\n(.*?)```"
        matches = re.findall(pattern, content, re.DOTALL)
        
        return [
            {"language": lang or "plaintext", "code": code.strip()}
            for lang, code in matches
        ]
