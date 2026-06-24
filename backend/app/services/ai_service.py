"""AI Service for chat interactions"""
from openai import AsyncOpenAI
from app.core.config import settings
import re


class AIService:
    def __init__(self):
        # Check if we should use Ollama (local) or OpenAI
        self.use_ollama = settings.USE_OLLAMA
        
        if self.use_ollama:
            # Use Ollama running locally on port 11434
            self.client = AsyncOpenAI(
                base_url="http://localhost:11434/v1",
                api_key="ollama"  # Ollama doesn't need a real API key
            )
            self.model = "llama3.2:3b"  # Fast, lightweight model
        else:
            # Use OpenAI
            self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
            self.model = "gpt-4o-mini"
    
    async def generate_response(self, message: str, context: dict) -> dict:
        """Generate AI response to user message"""
        
        try:
            # Create chat completion
            response = await self.client.chat.completions.create(
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
                    "content": f"⚠️ OpenAI quota exceeded!\n\n**Option 1:** Add billing at https://platform.openai.com/settings/organization/billing\n\n**Option 2:** Use FREE local AI:\n1. Install Ollama: `brew install ollama`\n2. Start Ollama: `ollama serve`\n3. Download model: `ollama pull llama3.2:3b`\n4. Add to .env: `USE_OLLAMA=true`\n5. Restart backend\n\nYour message was: '{message}'",
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
