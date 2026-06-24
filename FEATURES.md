# 🚀 CodePilot AI - Feature Guide

## 🎯 Voice Input & File Attachments

### Voice Input 🎤
Use your voice to interact with CodePilot AI!

**How to use:**
1. Click the **"Voice Input"** button in the chat panel
2. Grant microphone permission when prompted (first time only)
3. Start speaking - the button will turn red and pulse while recording
4. Your speech will be automatically converted to text
5. Click again to stop recording (or it stops automatically after silence)

**Supported:**
- ✅ Chrome, Edge (full support)
- ✅ Safari (limited support)
- ❌ Firefox (not supported)

**Features:**
- Real-time speech-to-text conversion
- Automatic punctuation
- English language support (en-US)
- Visual recording indicator

**Tips:**
- Speak clearly and at normal pace
- Minimize background noise
- Review the transcribed text before sending

---

### File Attachments 📎
Share code files, documents, and more with the AI!

**How to use:**
1. Click the **"Attach Files"** button
2. Select one or more files from your computer
3. See the preview of attached files with name and size
4. Remove unwanted files by clicking the X button
5. Send your message with attachments

**Supported File Types:**
- **Text Files**: .txt, .md, .json, .xml, .csv
- **Code Files**: .py, .js, .ts, .jsx, .tsx, .java, .cpp, .c, .go, .rs
- **Documents**: .pdf, .docx (future support)
- **Images**: .png, .jpg, .jpeg, .gif (visual preview only)
- **Archives**: .zip (name only, no content extraction)

**File Limits:**
- Maximum file size: **5 MB per file**
- Maximum files: **Unlimited** (but be mindful of message size)
- Text files are automatically read and included in context

**Features:**
- File preview with icons
- Size display in KB/MB
- Remove files before sending
- Automatic content extraction for text files
- File type detection

**What happens:**
- Text/code files: Content is sent to AI for analysis
- Other files: File metadata (name, size, type) is shared
- AI can read, analyze, and help with code in attached files

---

## 💻 Professional Dashboard

### Sidebar Navigation
- **Code Editor**: Main coding workspace with Monaco editor
- **Projects**: Manage all your coding projects
- **Chat History**: Browse past conversations
- **Settings**: Configure AI models and preferences
- **Recent Projects**: Quick access to recent work

### Code Editor Features
- Syntax highlighting for 50+ languages
- Auto-completion and IntelliSense
- Save and Run buttons
- Line numbers and minimap
- Toggle chat panel visibility
- Dark theme optimized for coding

### Projects View
- Visual project cards with stats
- Language indicators
- Active/Archived status
- File counts and last modified dates
- Quick open functionality
- Create new projects

### Chat History
- Searchable conversation archive
- Message counts and timestamps
- Language tags for each conversation
- Load and continue previous chats

### Settings Panel
- **AI Configuration**:
  - Toggle between Ollama (local) and OpenAI
  - Select AI model (llama3.2, GPT-4, Claude, etc.)
  - API key management
  
- **Editor Settings**:
  - Theme selection (Dark, Light, Monokai)
  - Font size adjustment (12-24px)
  - Auto-save toggle
  
- **System Information**:
  - Version display
  - Backend connection status
  - Active AI service
  - Database type

---

## 🤖 AI Chat Features

### Smart Suggestions
When starting a new conversation, you'll see quick suggestion buttons:
- Write a Python function
- Debug my code
- Explain this algorithm
- Create a React component

### Message Features
- Multi-line text input (use Shift+Enter for new lines)
- Enter to send
- Animated typing indicators
- Auto-scroll to latest message
- Code block syntax highlighting in responses

### Status Indicators
- 🟢 **Online**: AI is ready and connected
- 🔴 **Recording**: Voice input is active
- ⏳ **Thinking**: AI is processing your request

---

## 🔧 Technical Stack

### Frontend
- **React 18** with TypeScript
- **Monaco Editor** - VS Code's editor
- **TailwindCSS** - Professional styling
- **Axios** - API communication
- **Web Speech API** - Voice input

### Backend
- **FastAPI** - High-performance Python API
- **Ollama** - Local AI (FREE, no API costs)
- **SQLite** - Lightweight database
- **SQLAlchemy** - Database ORM

### AI Models
- **llama3.2:3b** - Fast, local, free (default)
- **GPT-4o-mini** - OpenAI (requires API key)
- **GPT-4** - Best quality (requires API key)
- **Claude Sonnet** - Anthropic (requires API key)

---

## 📝 Usage Examples

### Example 1: Attach Code File for Review
```
1. Click "Attach Files"
2. Select "my_script.py"
3. Type: "Review this code and suggest improvements"
4. Click Send
5. AI analyzes the code and provides feedback
```

### Example 2: Voice Input for Quick Questions
```
1. Click "Voice Input"
2. Say: "Write a function to calculate fibonacci numbers"
3. Review the transcribed text
4. Click Send
5. Receive code solution
```

### Example 3: Multiple Files Analysis
```
1. Attach multiple related files (e.g., main.py, utils.py, config.json)
2. Type: "Analyze these files and find potential bugs"
3. AI reviews all files together for comprehensive analysis
```

---

## 🎨 UI Highlights

### Color Scheme
- **Primary**: Blue (#3B82F6)
- **Secondary**: Purple (#9333EA)
- **Background**: Dark Gray (#111827)
- **Cards**: Gray (#1F2937)
- **Success**: Green (#10B981)
- **Error**: Red (#EF4444)

### Animations
- Smooth page transitions
- Pulse effects for active states
- Typing indicators
- Auto-scroll animations
- Hover effects on all interactive elements

### Responsive Design
- Optimized for desktop use
- Flexible layouts
- Resizable panels
- Smooth scrolling

---

## 🚦 Getting Started

### Quick Start
1. **Backend**: `cd backend && python main.py`
2. **Frontend**: `cd frontend && npm run dev`
3. **Open**: http://localhost:3000
4. **Start Coding**: Click any suggestion or type your question!

### First Time Setup
1. Install Ollama for free local AI:
   ```bash
   brew install ollama
   ollama serve
   ollama pull llama3.2:3b
   ```

2. Set USE_OLLAMA=true in backend/.env

3. Restart backend and enjoy FREE AI coding assistance!

---

## 💡 Tips & Tricks

1. **Use Voice for Quick Questions**: Perfect for hands-free coding
2. **Attach Multiple Files**: AI can analyze relationships between files
3. **Save Chat History**: Review past solutions later
4. **Toggle Chat Panel**: Focus on code when needed
5. **Use Keyboard Shortcuts**: Enter to send, Shift+Enter for new line
6. **Try Different Models**: Each has unique strengths
7. **Include Context**: Better questions = better answers

---

## 🐛 Troubleshooting

### Voice Input Not Working
- Enable microphone permission in browser settings
- Use Chrome or Edge (best support)
- Check if mic is working in system settings

### File Upload Issues
- Check file size (must be < 5MB)
- Ensure file is not corrupted
- Try uploading one file at a time

### AI Not Responding
- Check backend is running
- Verify Ollama is running (ollama serve)
- Check USE_OLLAMA=true in .env
- Look at browser console for errors

---

## 📞 Support

For issues or questions:
1. Check this guide first
2. Review the README.md
3. Check backend logs for errors
4. Restart both frontend and backend

---

**Version**: 0.1.0
**Last Updated**: June 23, 2026

Made with ❤️ by CodePilot AI Team
