# 🎤📎 Voice Input & File Attachments - Quick Guide

## 🎤 Voice Input Feature

### How It Works
The voice input feature uses the **Web Speech API** to convert your speech into text in real-time.

### Step-by-Step Guide

1. **Enable Microphone**
   - Click the "Voice Input" button
   - Browser will ask for microphone permission (first time only)
   - Click "Allow" to grant access

2. **Start Recording**
   - Button turns red and pulses
   - Status shows "Recording..."
   - Speak clearly into your microphone

3. **Automatic Transcription**
   - Your speech appears as text in the input box
   - You can edit the text before sending
   - Click the button again to stop (or it stops automatically)

4. **Send Your Message**
   - Review the transcribed text
   - Click "Send Message" or press Enter

### Browser Support
| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Recommended |
| Edge | ✅ Full | Recommended |
| Safari | ⚠️ Limited | May have issues |
| Firefox | ❌ No | Not supported |

### Tips for Best Results
- Speak at a normal pace
- Use a quiet environment
- Position mic 6-12 inches from mouth
- Speak clearly and enunciate
- Review text before sending

### Troubleshooting

**Problem: "Microphone access denied"**
- Solution: Enable microphone in browser settings
  - Chrome: Settings → Privacy → Site Settings → Microphone
  - Safari: System Preferences → Security → Privacy → Microphone

**Problem: "Not working in Firefox"**
- Solution: Use Chrome or Edge instead

**Problem: "Poor transcription quality"**
- Solution: Check your microphone settings
- Reduce background noise
- Speak more clearly

---

## 📎 File Attachments Feature

### Supported File Types

#### ✅ Fully Supported (Content Analyzed by AI)
- **Code Files**: .py, .js, .ts, .jsx, .tsx, .java, .cpp, .c, .go, .rs, .php, .rb
- **Text Files**: .txt, .md, .log, .csv
- **Config Files**: .json, .xml, .yaml, .yml, .toml, .ini
- **Web Files**: .html, .css, .scss, .sql

#### ⚠️ Partially Supported (Metadata Only)
- **Images**: .png, .jpg, .jpeg, .gif, .svg
- **Documents**: .pdf, .docx
- **Archives**: .zip, .tar, .gz

### Step-by-Step Guide

1. **Click "Attach Files" Button**
   - Located below the text input area
   - Opens your file browser

2. **Select Files**
   - Choose one or multiple files
   - Hold Ctrl/Cmd to select multiple
   - Maximum: 5MB per file

3. **Preview Attachments**
   - Each file shows:
     - Icon (based on file type)
     - File name
     - File size (KB/MB)
   - Remove unwanted files with X button

4. **Send Message**
   - Type your question/request
   - Click "Send Message"
   - AI receives both message and file content

### File Size Limits
- **Maximum per file**: 5 MB
- **Total files**: Unlimited (but keep it reasonable)
- **Large files**: Split into smaller parts if needed

### What Happens to Your Files

#### Text/Code Files
1. File content is read automatically
2. Sent to AI along with your message
3. AI can analyze, debug, or modify the code
4. AI understands context from file content

#### Other Files
1. Only metadata is sent (name, size, type)
2. AI knows what files you're working with
3. Cannot read binary content

### Example Use Cases

#### 1. Code Review
```
Attach: my_script.py
Message: "Review this code and suggest improvements"
Result: AI analyzes code and provides feedback
```

#### 2. Bug Fixing
```
Attach: buggy_code.js, error.log
Message: "Help me fix the bug causing this error"
Result: AI correlates code with error logs
```

#### 3. Multi-File Analysis
```
Attach: main.py, utils.py, config.json
Message: "Analyze these files and identify dependencies"
Result: AI reviews all files together
```

#### 4. Documentation
```
Attach: api.py
Message: "Generate documentation for this API"
Result: AI creates docs based on code
```

#### 5. Refactoring
```
Attach: old_code.py
Message: "Refactor this to follow best practices"
Result: AI suggests modern code patterns
```

### Attachment Features

#### Visual Indicators
- 📄 Text files
- 💻 Code files
- 🖼️ Image files
- 📕 PDF documents
- 📦 Archive files
- 📎 Other files

#### File Preview
- Name truncated if too long
- Size shown in appropriate unit (B, KB, MB)
- Type indicator with icon
- Remove button on hover

#### Status Messages
- "📎 1 file" badge when files attached
- File count in send button
- Success confirmation after upload

### Troubleshooting

**Problem: "File too large"**
- Solution: File must be under 5MB
- Split large files
- Compress if possible

**Problem: "Upload failed"**
- Check file isn't corrupted
- Try a different file
- Refresh the page and try again

**Problem: "Content not read"**
- Only text files have content extracted
- Binary files show metadata only
- Convert to text format if needed

**Problem: "Can't remove file"**
- Click the X button on the right
- Hover over file preview to see button
- Refresh page if button doesn't work

---

## 🎯 Combining Both Features

### Voice + Attachments Workflow

1. **Attach your files first**
   - Upload code files you want to discuss
   - Files appear in preview area

2. **Use voice to describe what you need**
   - Click "Voice Input"
   - Say: "Review these files and find any security issues"
   - Text appears in input box

3. **Edit if needed**
   - Review the transcribed text
   - Make corrections
   - Add more details

4. **Send everything together**
   - Click "Send Message"
   - AI receives both voice message and files
   - Get comprehensive analysis

### Example Scenarios

#### Scenario 1: Quick Code Fix
```
1. Attach: broken_function.py
2. Voice: "This function isn't working, can you fix it?"
3. Send → AI debugs and provides solution
```

#### Scenario 2: Learning
```
1. Attach: complex_algorithm.cpp
2. Voice: "Explain how this algorithm works step by step"
3. Send → AI breaks down the code
```

#### Scenario 3: Code Review
```
1. Attach: main.js, utils.js, styles.css
2. Voice: "Review my code for best practices and performance"
3. Send → AI provides comprehensive review
```

---

## ⚙️ Technical Details

### Voice Input Technology
- **API**: Web Speech API (webkitSpeechRecognition)
- **Language**: English (en-US) by default
- **Mode**: Continuous = false (stops after silence)
- **Results**: Final transcript only

### File Processing
- **Frontend**: FileReader API reads text files
- **Backend**: Receives file content in JSON
- **Storage**: Not stored, only processed in memory
- **Security**: No file execution, read-only

### Privacy & Security
- Voice data: Processed by browser, not stored
- Files: Not saved on server, only in chat context
- No data retention after session ends
- All processing happens locally when possible

---

## 📊 Performance Tips

### For Best Voice Recognition
- Use wired headset with mic
- Close to mouth (6-12 inches)
- Quiet room
- Speak at normal pace
- Pause briefly between sentences

### For Fast File Processing
- Keep files under 1MB when possible
- Text files process faster than binary
- Attach only relevant files
- Group related files together

### For Optimal Experience
- Use voice for quick questions
- Use attachments for detailed work
- Combine both for complex tasks
- Review before sending

---

## 🆘 Getting Help

### Common Issues

1. **Voice not working**: Check browser support and permissions
2. **Files not uploading**: Check size and format
3. **Slow processing**: Reduce file sizes
4. **Poor accuracy**: Improve audio quality

### Support Resources
- See [FEATURES.md](./FEATURES.md) for full documentation
- Check [README.md](./README.md) for setup instructions
- Review browser console for error messages
- Restart frontend and backend if issues persist

---

## 🚀 Future Enhancements

Coming Soon:
- 🎯 Drag and drop file upload
- 🌍 Multiple language support for voice
- 📸 Image content analysis
- 🎤 Voice output (AI speaks responses)
- 🔊 Audio file transcription
- 📦 Archive extraction and analysis
- 🔗 URL content fetching
- 💾 Attachment history

---

**Last Updated**: June 23, 2026
**Version**: 0.1.0

Happy Coding with CodePilot AI! 🚀
