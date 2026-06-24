# 🎬 CodePilot AI - Demo Guide

## Quick Demo (5 minutes)

### Setup (1 minute)
```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate
python main.py

# Terminal 2 - Frontend  
cd frontend
npm run dev

# Terminal 3 - Ollama (if using local AI)
ollama serve
```

Open http://localhost:3000

---

## Demo Script

### 1️⃣ Welcome Screen (30 seconds)
✨ **Show the professional dashboard**
- Beautiful sidebar with navigation
- Code editor in the center
- Chat panel on the right
- Smooth animations and gradients

**Say**: "Welcome to CodePilot AI - a professional AI coding assistant with voice input and file attachments!"

---

### 2️⃣ Basic Chat (1 minute)
💬 **Test the AI chat**

**Type**: "Write a Python function to calculate factorial"

**Show**:
- Message appears instantly
- AI thinking indicator (3 bouncing dots)
- Response with formatted code
- Clean message bubbles

**Say**: "AI responds with clean, formatted code. Notice the professional UI with status indicators."

---

### 3️⃣ Voice Input Demo (1 minute)
🎤 **Demonstrate voice-to-text**

**Steps**:
1. Click "Voice Input" button
2. Watch it turn red and pulse
3. Say: "Write a function to check if a number is prime"
4. See text appear automatically
5. Click Send

**Show**:
- Visual recording indicator
- Real-time transcription
- Smooth animation
- AI responds to voice command

**Say**: "Hands-free coding! Just speak your question and AI understands."

---

### 4️⃣ File Attachment Demo (1 minute)
📎 **Upload and analyze code**

**Steps**:
1. Click "Attach Files"
2. Select a Python file (or create a simple one)
3. Show file preview with icon and size
4. Type: "Review this code for improvements"
5. Send message

**Show**:
- File preview card
- File size display
- Attachment badge on send button
- AI analyzes the actual code
- Detailed review with suggestions

**Say**: "Upload your code files and AI will analyze them. Supports text, code, and config files up to 5MB."

---

### 5️⃣ Dashboard Tour (1 minute)
🎨 **Navigate through views**

**Click**: Projects
**Show**: 
- Project cards with stats
- Active/Archived status
- Create new project button

**Click**: Chat History
**Show**:
- Conversation list
- Search functionality
- Message counts

**Click**: Settings
**Show**:
- AI model selection
- Ollama/OpenAI toggle
- Theme options
- System information

**Click**: Code Editor
**Show**:
- Full Monaco editor
- Save/Run buttons
- Toggle chat panel

**Say**: "Complete professional interface with project management, history, and customizable settings."

---

### 6️⃣ Advanced Demo (30 seconds)
🚀 **Combine features**

**Steps**:
1. Attach two related code files
2. Use voice to say: "Compare these files and find common patterns"
3. Show AI analyzing both files together

**Say**: "Combine voice and attachments for powerful workflows. AI understands context from multiple files."

---

## Demo Files to Prepare

### demo_code.py
```python
def calculate_sum(numbers):
    total = 0
    for num in numbers:
        total = total + num
    return total

# TODO: Add error handling
result = calculate_sum([1, 2, 3, 4, 5])
print(result)
```

### demo_config.json
```json
{
  "app_name": "CodePilot AI",
  "version": "0.2.0",
  "features": {
    "voice_input": true,
    "file_upload": true,
    "max_file_size": "5MB"
  }
}
```

---

## Key Points to Highlight

### 🎯 Main Features
✅ Voice input for hands-free coding
✅ File attachments for code analysis  
✅ Professional dashboard with 4 views
✅ Real-time AI responses
✅ Local AI with Ollama (FREE!)
✅ Multi-file support
✅ Beautiful, modern UI

### 💡 Unique Selling Points
1. **Voice + Attachments** - No other tool combines both
2. **Local AI** - No API costs, runs offline
3. **Professional UI** - Not just a chat box
4. **Multi-file analysis** - Understand relationships
5. **Easy setup** - No complex configuration

### 🚀 Performance
- Voice latency: <1 second
- File processing: Instant for text files
- AI response: 2-5 seconds
- Smooth 60fps animations

---

## Troubleshooting During Demo

### Voice Not Working
- Use Chrome or Edge
- Check microphone permission
- Show error message handling

### File Upload Issue
- Show 5MB limit warning
- Demonstrate remove file feature
- Multiple file selection

### AI Response Slow
- Mention Ollama is local (no internet needed)
- Show thinking indicator
- Explain model can be changed

---

## Q&A Preparation

### Expected Questions

**Q: Does it work offline?**
A: Yes! With Ollama, everything runs locally. No internet needed.

**Q: What file types are supported?**
A: All text and code files. Binary files show metadata only.

**Q: How accurate is voice recognition?**
A: Very accurate with clear speech. Uses same tech as Google Assistant.

**Q: Can I use my own API key?**
A: Yes! Settings panel lets you configure OpenAI, Claude, or other models.

**Q: Is my code secure?**
A: With Ollama, everything stays on your machine. No data sent to cloud.

**Q: How large can files be?**
A: 5MB per file. Perfect for code files which are usually small.

**Q: Does it save chat history?**
A: Currently in session only. Persistent storage coming in v0.3.0.

**Q: Can multiple people use it?**
A: Currently single-user. Team features planned for v0.5.0.

---

## Closing (30 seconds)

**Summary**:
"CodePilot AI brings together:
- 🎤 Voice input for natural interaction
- 📎 File uploads for real code analysis
- 🎨 Professional dashboard for serious developers
- 🤖 Local AI to keep your code private
- ⚡ Fast, smooth, and beautiful

All in one powerful package!"

**Call to Action**:
"Try it yourself:
1. Clone the repo
2. Install Ollama
3. Run two commands
4. Start coding with AI!"

---

## Demo Checklist

Before Demo:
- ✅ Backend running
- ✅ Frontend running  
- ✅ Ollama serving
- ✅ Demo files prepared
- ✅ Microphone tested
- ✅ Browser is Chrome/Edge
- ✅ Volume up for audience

During Demo:
- ✅ Speak clearly
- ✅ Wait for AI responses
- ✅ Show all 4 dashboard views
- ✅ Demonstrate voice + file combo
- ✅ Handle errors gracefully

After Demo:
- ✅ Answer questions
- ✅ Share documentation links
- ✅ Offer to show code
- ✅ Collect feedback

---

## Alternative Demo Flows

### Quick Demo (2 minutes)
1. Show chat interface
2. One voice command
3. One file upload
4. Done!

### Technical Demo (10 minutes)
1. Show architecture
2. Explain Ollama integration
3. Live code walkthrough
4. API demonstration
5. Configuration options

### Business Demo (3 minutes)
1. Problem: Slow coding workflow
2. Solution: Voice + AI assistant
3. Features: Highlight top 3
4. ROI: Time saved per day
5. Next steps: Try it free

---

**Good luck with your demo!** 🚀

_Prepared by: CodePilot AI Team_
_Last Updated: June 23, 2026_
