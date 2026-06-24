# AI Unica - Professional AI Development Platform

<div align="center">

![Version](https://img.shields.io/badge/version-0.2.0-blue.svg)
![Status](https://img.shields.io/badge/status-production--ready-success.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**A fully professional AI-powered coding assistant with voice input, file attachments, and integrated terminal.**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Demo](#-demo)

</div>

---

## 🌟 Features

### 💬 AI Assistant
- **Local AI with Ollama** - Run AI models locally without API costs
- **Multi-Model Support** - OpenAI GPT-4, GPT-4o-mini, Claude, and local Llama
- **Context-Aware** - Understands your code and provides relevant suggestions
- **Real-time Responses** - Fast, streaming responses

### 🎤 Voice Input
- **Speech-to-Text** - Talk to AI naturally
- **Chrome/Edge Support** - Web Speech API integration
- **Real-time Transcription** - See your words as you speak

### 📎 File Attachments
- **Multiple Files** - Attach up to 5 files per message
- **30+ File Types** - Support for code, documents, images, and more
- **Smart Processing** - Automatic content extraction for text files
- **5MB Limit** - Per file upload limit

### 💻 Code Editor
- **Monaco Editor** - VS Code's editor engine
- **Syntax Highlighting** - 100+ languages supported
- **IntelliSense** - Code completion and suggestions
- **Multi-Tab Support** - Work on multiple files simultaneously
- **Auto-Save** - Never lose your work

### 📁 File Explorer
- **Hierarchical Tree** - Navigate your project structure
- **File Icons** - Visual file type indicators
- **Quick Open** - Click to open files instantly
- **Context Menu** - Right-click actions (coming soon)

### 🖥️ Terminal
- **Integrated Shell** - Run commands without leaving the IDE
- **25+ Built-in Commands** - Common shell commands supported
- **Command History** - Navigate through previous commands
- **Color Syntax** - Professional terminal output

### 🎨 Professional UI
- **Modern Design** - Gradient backgrounds, shadows, smooth animations
- **Standardized Components** - Consistent button sizes, input fields, spacing
- **Dark Theme** - Easy on the eyes for long coding sessions
- **Responsive Layout** - Works on all screen sizes

### 📊 Dashboard
- **Projects View** - Manage your coding projects
- **Chat History** - Access past conversations
- **Settings Panel** - Configure AI, editor, and preferences
- **System Info** - Monitor backend status and configuration

---

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 16+
- Ollama (for local AI)

### Installation

#### 1. Clone & Setup Backend
```bash
cd codepilot-ai/backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

#### 2. Setup Frontend
```bash
cd codepilot-ai/frontend
npm install
```

#### 3. Install Ollama
```bash
brew install ollama
ollama pull llama3.2:3b
```

### Running

#### Terminal 1 - Start Ollama
```bash
ollama serve
```

#### Terminal 2 - Start Backend
```bash
cd codepilot-ai/backend
source venv/bin/activate
python main.py
```

#### Terminal 3 - Start Frontend
```bash
cd codepilot-ai/frontend
npm run dev
```

#### Open Browser
```
http://localhost:3000
```

---

## 📚 Documentation

### Quick References
- **[COMMANDS.md](COMMANDS.md)** - All terminal commands and shortcuts
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Component code snippets
- **[FEATURES.md](FEATURES.md)** - Detailed feature documentation

### Upgrade Guides
- **[COMPLETE_UPGRADE_SUMMARY.md](COMPLETE_UPGRADE_SUMMARY.md)** - All professional upgrades applied
- **[VISUAL_GUIDE.md](VISUAL_GUIDE.md)** - Before/after visual improvements
- **[STANDARD_UPGRADE.md](STANDARD_UPGRADE.md)** - Professional standardization guide

### Demo & Setup
- **[DEMO.md](DEMO.md)** - Feature demonstrations and use cases
- **[VOICE_AND_ATTACH_GUIDE.md](VOICE_AND_ATTACH_GUIDE.md)** - Voice and file attachment guide
- **[PROFESSIONAL_SETUP.md](PROFESSIONAL_SETUP.md)** - Professional setup guidelines

---

## 🎯 Usage

### Chat with AI
1. Open AI Unica in browser
2. Type your question or click voice input
3. Get instant AI-powered responses
4. Attach files for context

### Edit Code
1. Navigate to Code Editor view
2. Select file from File Explorer
3. Edit with full IntelliSense support
4. Use terminal for commands
5. Save and run your code

### Manage Projects
1. Go to Projects view
2. Create new projects
3. Track project statistics
4. Switch between projects easily

### Configure Settings
1. Open Settings view
2. Choose AI model (local or cloud)
3. Customize editor preferences
4. Save your configuration

---

## 🎨 Screenshots

### Main Editor View
```
┌─────────────┬────────────────────────────────┬───────────────┐
│  Sidebar    │      Code Editor               │  Chat Panel   │
│             │                                │               │
│  💻 Editor  │  ┌─────────────────────────┐   │  🤖 AI Assist │
│  📁 Project │  │  main.py  utils.py      │   │               │
│  🕒 History │  ├─────────────────────────┤   │  💬 Messages  │
│  ⚙️ Settings│  │                         │   │               │
│             │  │  # Your code here       │   │  📎 Attach    │
│  Projects:  │  │  def hello():           │   │  🎤 Voice     │
│  • My App   │  │      print("Hello")     │   │               │
│  • Website  │  │                         │   │  [Send Msg]   │
│  • ML Tool  │  └─────────────────────────┘   │               │
│             │                                │               │
│             │  Terminal:                     │               │
│             │  $ python main.py              │               │
│             │  Hello World!                  │               │
└─────────────┴────────────────────────────────┴───────────────┘
```

---

## 🏗️ Architecture

### Tech Stack

#### Frontend
- **React 18** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS
- **Monaco Editor** - Code editor
- **Axios** - HTTP client

#### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database
- **SQLite** - Development database
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

#### AI Services
- **Ollama** - Local AI inference
- **OpenAI API** - Cloud AI (optional)
- **LangChain** - AI orchestration (planned)

### Project Structure
```
codepilot-ai/
├── backend/
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── core/         # Configuration
│   │   ├── db/           # Database
│   │   ├── models/       # Data models
│   │   ├── schemas/      # Pydantic schemas
│   │   └── services/     # Business logic
│   ├── main.py           # Entry point
│   └── requirements.txt  # Dependencies
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── App.tsx       # Main app
│   │   └── main.tsx      # Entry point
│   ├── package.json      # Dependencies
│   └── vite.config.ts    # Build config
└── docs/                 # Documentation
```

---

## 🔧 Configuration

### Backend (.env)
```bash
# AI Configuration
USE_OLLAMA=true
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2:3b

# OpenAI (optional)
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-4o-mini

# Database
DATABASE_URL=sqlite:///./codepilot_ai.db

# Server
HOST=0.0.0.0
PORT=8000
```

### Frontend
```typescript
const API_URL = 'http://localhost:8000'
```

---

## 🎓 Learning Resources

### For Beginners
1. Start with [DEMO.md](DEMO.md) for feature overview
2. Follow [Quick Start](#-quick-start) to get running
3. Read [VOICE_AND_ATTACH_GUIDE.md](VOICE_AND_ATTACH_GUIDE.md) for advanced features

### For Developers
1. Check [COMMANDS.md](COMMANDS.md) for all commands
2. Review [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for code patterns
3. Study [COMPLETE_UPGRADE_SUMMARY.md](COMPLETE_UPGRADE_SUMMARY.md) for architecture

---

## 🤝 Contributing

### Development Setup
```bash
# Backend with hot-reload
cd backend
source venv/bin/activate
python main.py

# Frontend with hot-reload
cd frontend
npm run dev
```

### Code Style
- **Backend**: Black, Flake8
- **Frontend**: ESLint, Prettier
- **Commits**: Conventional Commits

---

## 📈 Roadmap

### v0.3.0 (Planned)
- [ ] Multi-user support with authentication
- [ ] PostgreSQL database migration
- [ ] Code collaboration features
- [ ] Git integration
- [ ] Extensions/plugins system

### v0.4.0 (Planned)
- [ ] Cloud deployment
- [ ] Mobile app
- [ ] Advanced debugging
- [ ] Code review AI
- [ ] Team features

---

## 🐛 Troubleshooting

### Common Issues

#### Backend won't start
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

#### Frontend won't start
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

#### Ollama not responding
```bash
pkill ollama
ollama serve
ollama pull llama3.2:3b
```

#### Port already in use
```bash
# Kill process on port
lsof -ti:8000 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

---

## 📝 License

MIT License - see LICENSE file for details

---

## 🙏 Acknowledgments

- **Monaco Editor** - VS Code's editor
- **Ollama** - Local AI inference
- **FastAPI** - Modern Python web framework
- **React** - UI framework
- **TailwindCSS** - Utility CSS

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/codepilot-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/codepilot-ai/discussions)
- **Email**: support@aicodepilot.com

---

## 🌟 Star History

If you find AI Unica helpful, please consider giving it a star! ⭐

---

<div align="center">

**AI Unica** - Professional AI Development Platform

Built with ❤️ by developers, for developers

Version 0.2.0 | 2026

</div>
