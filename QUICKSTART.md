# AI Unica - Quick Start Guide

Get up and running with AI Unica in 5 minutes!

---

## ⚡ Super Quick Start

### 1. Start Everything (3 Terminals)

#### Terminal 1️⃣ - Ollama
```bash
ollama serve
```

#### Terminal 2️⃣ - Backend
```bash
cd codepilot-ai/backend
source venv/bin/activate
python main.py
```

#### Terminal 3️⃣ - Frontend
```bash
cd codepilot-ai/frontend
npm run dev
```

### 2. Open Browser
```
http://localhost:3000
```

### 3. Start Coding! 🎉

---

## 📋 First Time Setup

If this is your first time, run these commands once:

### Step 1: Backend Setup (One Time)
```bash
cd codepilot-ai/backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

### Step 2: Frontend Setup (One Time)
```bash
cd codepilot-ai/frontend
npm install
```

### Step 3: Ollama Setup (One Time)
```bash
# Install Ollama
brew install ollama

# Download AI model
ollama pull llama3.2:3b
```

---

## 🎯 What You Get

When you open http://localhost:3000, you'll see:

### Left Panel (Sidebar)
- **Code Editor** - Write and edit code
- **Projects** - Manage your projects
- **History** - View past conversations
- **Settings** - Configure AI and preferences

### Center Panel (Editor)
- **File Explorer** - Browse your files
- **Code Editor** - Monaco editor with syntax highlighting
- **Terminal** - Run commands

### Right Panel (AI Chat)
- **AI Assistant** - Chat with AI
- **Voice Input** - Speak your questions
- **File Attachments** - Upload files for context

---

## 🚀 Quick Tasks

### Task 1: Chat with AI
1. Look at the right panel (AI Assistant)
2. Type "Hello, write a Python function"
3. Press Send or Enter
4. Get instant response!

### Task 2: Use Voice Input
1. Click the "Voice" button
2. Allow microphone access
3. Speak your question
4. Watch it transcribe automatically
5. Click Send

### Task 3: Attach Files
1. Click "Attach" button
2. Select file(s) from your computer
3. See file preview
4. Send with your message

### Task 4: Edit Code
1. Click "Code Editor" in sidebar
2. Click on a file in File Explorer
3. Edit the code
4. See syntax highlighting and IntelliSense

### Task 5: Run Terminal Commands
1. Click "Open Terminal" button
2. Type commands like:
   - `help` - See available commands
   - `ls` - List files
   - `pwd` - Current directory
   - `clear` - Clear terminal

---

## 🎨 Interface Overview

```
┌────────────────────────────────────────────────────────────┐
│                        AI Unica                            │
├─────────────┬──────────────────────────────┬───────────────┤
│             │                              │               │
│  SIDEBAR    │        CODE EDITOR           │  AI CHAT      │
│             │                              │               │
│  💻 Editor  │  ┌────────────────────┐      │  🤖 Online    │
│  📁 Project │  │ main.py  utils.py  │      │               │
│  🕒 History │  ├────────────────────┤      │  User: Hello  │
│  ⚙️ Setting │  │                    │      │               │
│             │  │  def hello():      │      │  AI: Hi! How  │
│  Projects:  │  │      print("Hi")   │      │  can I help?  │
│  • My App   │  │                    │      │               │
│  • Website  │  └────────────────────┘      │  [📎] [🎤]    │
│             │                              │  [Send Msg]   │
│             │  🖥️ Terminal (toggleable)    │               │
│             │  $ python main.py            │               │
└─────────────┴──────────────────────────────┴───────────────┘
```

---

## 💡 Tips & Tricks

### Keyboard Shortcuts
- **Enter** - Send message (in chat)
- **Shift + Enter** - New line (in chat)
- **Ctrl/Cmd + S** - Save file (in editor)
- **Ctrl/Cmd + /** - Toggle comment (in editor)

### Voice Input Tips
- Use Chrome or Edge (best support)
- Allow microphone access when prompted
- Speak clearly and at normal pace
- Works great for dictating code!

### File Attachment Tips
- Max 5MB per file
- Supports 30+ file types
- Text files show content preview
- Great for providing context to AI

### Terminal Tips
- Type `help` to see all commands
- Use arrow keys for command history
- Type `clear` to clear screen
- Run Python scripts with `python filename.py`

---

## 🔧 Configuration

### Change AI Model

1. Click **Settings** in sidebar
2. Find "AI Configuration" section
3. Select model from dropdown:
   - `llama3.2:3b` - Local, fast, free
   - `gpt-4o-mini` - Cloud, cheap
   - `gpt-4` - Cloud, best quality

### Toggle Local AI

1. Go to **Settings**
2. Find "Use Local AI (Ollama)" toggle
3. Turn ON for local (no API costs)
4. Turn OFF for OpenAI (requires API key)

### Change Editor Theme

1. Go to **Settings**
2. Find "Theme" section
3. Choose: Dark, Light, or Monokai

---

## 🎬 Common Workflows

### Workflow 1: Ask AI to Write Code
```
1. Open AI Chat (right panel)
2. Type: "Write a Python function to calculate fibonacci"
3. Get response
4. Copy code to editor
5. Save and run
```

### Workflow 2: Debug Code with AI
```
1. Attach your code file
2. Type: "This code has a bug, can you fix it?"
3. AI analyzes and suggests fix
4. Apply fix in editor
```

### Workflow 3: Learn New Concept
```
1. Click voice input
2. Say: "Explain how async/await works in Python"
3. Get detailed explanation
4. Ask follow-up questions
```

---

## 🐛 Quick Fixes

### Problem: Backend won't start
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

### Problem: Frontend shows error
```bash
cd frontend
rm -rf node_modules
npm install
npm run dev
```

### Problem: AI not responding
```bash
# Check Ollama is running
curl http://localhost:11434/api/tags

# If not, start it
ollama serve
```

### Problem: Port already in use
```bash
# Kill existing process
lsof -ti:8000 | xargs kill -9  # Backend
lsof -ti:3000 | xargs kill -9  # Frontend
```

---

## 📚 Next Steps

### After Quick Start:

1. **Read [FEATURES.md](FEATURES.md)** - Learn all features in detail
2. **Check [DEMO.md](DEMO.md)** - See example use cases
3. **Review [COMMANDS.md](COMMANDS.md)** - All terminal commands
4. **Explore [VISUAL_GUIDE.md](VISUAL_GUIDE.md)** - UI improvements

### Customize Your Setup:

1. **Settings Panel** - Configure AI, editor, preferences
2. **Create Projects** - Organize your work
3. **Try Voice Input** - Hands-free coding
4. **Upload Files** - Give AI context

---

## ✅ Checklist

Before you start:
- [ ] Python 3.9+ installed
- [ ] Node.js 16+ installed
- [ ] Ollama installed
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Model downloaded (llama3.2:3b)

To verify everything works:
- [ ] Ollama running (http://localhost:11434)
- [ ] Backend running (http://localhost:8000)
- [ ] Frontend running (http://localhost:3000)
- [ ] Can send message to AI
- [ ] Can edit code
- [ ] Can use terminal

---

## 🎉 You're Ready!

You now have a fully functional AI-powered development environment!

### What to try first:
1. ✅ Chat with AI
2. ✅ Write some code
3. ✅ Try voice input
4. ✅ Attach a file
5. ✅ Run terminal commands

### Need help?
- Read [README.md](README.md) for full documentation
- Check [COMMANDS.md](COMMANDS.md) for command reference
- See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues

---

**Happy Coding! 🚀**

AI Unica - Professional AI Development Platform
