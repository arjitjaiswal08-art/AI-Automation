# AI Unica - Command Reference

Quick reference for running and managing AI Unica.

---

## 🚀 Starting the Application

### 1. Start Backend (FastAPI)
```bash
cd codepilot-ai/backend
source venv/bin/activate
python main.py
```

**Expected Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Started server process
INFO:     Waiting for application startup.
2026-06-23 14:01:16,272 - main - INFO - Starting AI Unica...
2026-06-23 14:01:16,277 - main - INFO - Database tables created
INFO:     Application startup complete.
```

**Backend URL:** http://localhost:8000

---

### 2. Start Frontend (React + Vite)
```bash
cd codepilot-ai/frontend
npm run dev
```

**Expected Output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

**Frontend URL:** http://localhost:3000

---

### 3. Start Ollama (Local AI)
```bash
ollama serve
```

**Or if already running:**
```bash
# Check if running
ps aux | grep ollama

# If not running, start it
ollama serve
```

**Expected Output:**
```
Ollama running at http://127.0.0.1:11434
```

---

## 🔧 Setup Commands

### First Time Setup

#### 1. Backend Setup
```bash
cd codepilot-ai/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Edit .env file (optional)
nano .env
```

#### 2. Frontend Setup
```bash
cd codepilot-ai/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

#### 3. Ollama Setup
```bash
# Install Ollama (if not installed)
brew install ollama

# Pull the model
ollama pull llama3.2:3b

# Start Ollama server
ollama serve
```

---

## 📝 Environment Configuration

### Backend `.env` File
```bash
# AI Configuration
USE_OLLAMA=true
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2:3b

# OpenAI (if not using Ollama)
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-4o-mini

# Database
DATABASE_URL=sqlite:///./codepilot_ai.db

# Server
HOST=0.0.0.0
PORT=8000
```

---

## 🛠️ Development Commands

### Backend

#### Run with Auto-reload
```bash
cd codepilot-ai/backend
source venv/bin/activate
python main.py
```

#### Run Tests (when implemented)
```bash
pytest
```

#### Check Code Style
```bash
flake8 app/
black app/
```

---

### Frontend

#### Development Server
```bash
npm run dev
```

#### Build for Production
```bash
npm run build
```

#### Preview Production Build
```bash
npm run preview
```

#### Lint Code
```bash
npm run lint
```

---

## 🔍 Troubleshooting Commands

### Check Backend Status
```bash
curl http://localhost:8000/health
```

### Check Ollama Status
```bash
curl http://localhost:11434/api/tags
```

### View Backend Logs
```bash
# Backend logs are in terminal where you ran python main.py
# Or check the log file if configured
tail -f logs/app.log
```

### Kill Processes
```bash
# Find and kill backend
lsof -ti:8000 | xargs kill -9

# Find and kill frontend
lsof -ti:3000 | xargs kill -9

# Find and kill Ollama
pkill ollama
```

---

## 📦 Package Management

### Backend Dependencies

#### Add New Package
```bash
pip install package-name
pip freeze > requirements.txt
```

#### Update Package
```bash
pip install --upgrade package-name
pip freeze > requirements.txt
```

---

### Frontend Dependencies

#### Add New Package
```bash
npm install package-name
```

#### Add Dev Dependency
```bash
npm install --save-dev package-name
```

#### Update Packages
```bash
npm update
```

#### Check Outdated Packages
```bash
npm outdated
```

---

## 🗄️ Database Commands

### SQLite

#### View Database
```bash
cd codepilot-ai/backend
sqlite3 codepilot_ai.db
```

#### Common SQL Commands
```sql
-- List tables
.tables

-- Show schema
.schema users

-- Query data
SELECT * FROM users;

-- Exit
.exit
```

#### Reset Database
```bash
cd codepilot-ai/backend
rm codepilot_ai.db
python main.py  # Will recreate tables
```

---

## 🧪 Testing Commands

### Test AI Service
```bash
cd codepilot-ai/backend
source venv/bin/activate
python -c "from app.services.ai_service import AIService; print(AIService().generate_response('Hello'))"
```

### Test API Endpoint
```bash
# Test chat endpoint
curl -X POST http://localhost:8000/api/chat/send \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello AI"}'
```

---

## 🔄 Git Commands

### Common Workflow
```bash
# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Your message"

# Push to branch
git push origin your-branch-name

# Create new branch
git checkout -b feature/new-feature

# Switch branch
git checkout main
```

---

## 🚀 Production Commands

### Build Frontend
```bash
cd codepilot-ai/frontend
npm run build
```

### Run Backend in Production
```bash
cd codepilot-ai/backend
source venv/bin/activate
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

---

## 📊 Monitoring Commands

### Check System Resources
```bash
# CPU and Memory
top

# Disk usage
df -h

# Process list
ps aux | grep python
ps aux | grep node
```

### View Logs
```bash
# Backend logs (if running in background)
tail -f backend.log

# Frontend logs
# Check browser console
```

---

## 🔐 Security Commands

### Update Dependencies
```bash
# Backend
pip list --outdated
pip install --upgrade package-name

# Frontend
npm audit
npm audit fix
```

### Check for Vulnerabilities
```bash
# Frontend
npm audit

# Backend
pip check
```

---

## 💡 Quick Start (All in One)

### Terminal 1 - Ollama
```bash
ollama serve
```

### Terminal 2 - Backend
```bash
cd codepilot-ai/backend && source venv/bin/activate && python main.py
```

### Terminal 3 - Frontend
```bash
cd codepilot-ai/frontend && npm run dev
```

### Then Open Browser
```
http://localhost:3000
```

---

## 📱 Access URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs
- **Ollama:** http://localhost:11434

---

## 🛑 Stopping Everything

### Graceful Shutdown
```bash
# Press Ctrl+C in each terminal window
# Backend terminal
# Frontend terminal
# Ollama terminal
```

### Force Stop All
```bash
# Kill all processes
pkill -f "python main.py"
pkill -f "npm run dev"
pkill ollama
```

---

## 🔧 Common Issues & Solutions

### Issue: Port Already in Use
```bash
# Find process using port
lsof -ti:8000
lsof -ti:3000

# Kill the process
kill -9 $(lsof -ti:8000)
```

### Issue: Module Not Found
```bash
# Backend
cd codepilot-ai/backend
source venv/bin/activate
pip install -r requirements.txt

# Frontend
cd codepilot-ai/frontend
rm -rf node_modules package-lock.json
npm install
```

### Issue: Ollama Not Responding
```bash
# Restart Ollama
pkill ollama
ollama serve

# Check if model is downloaded
ollama list

# Pull model if needed
ollama pull llama3.2:3b
```

---

## 📚 Useful Aliases (Add to ~/.zshrc)

```bash
# AI Unica shortcuts
alias ai-backend='cd ~/Desktop/ai_automation/codepilot-ai/backend && source venv/bin/activate && python main.py'
alias ai-frontend='cd ~/Desktop/ai_automation/codepilot-ai/frontend && npm run dev'
alias ai-start='ollama serve &'
alias ai-stop='pkill -f "python main.py" && pkill -f "npm run dev" && pkill ollama'
```

**After adding aliases:**
```bash
source ~/.zshrc
```

**Then use:**
```bash
ai-start      # Start Ollama
ai-backend    # Start backend
ai-frontend   # Start frontend
ai-stop       # Stop everything
```

---

**AI Unica** - Professional AI Development Platform
Command Reference v1.0

Last Updated: 2026-06-23
