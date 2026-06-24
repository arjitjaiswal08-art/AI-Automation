import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:8000'

interface Message {
  role: 'user' | 'assistant'
  content: string
  attachments?: Attachment[]
}

interface Attachment {
  name: string
  type: string
  size: number
  content?: string
}

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<any>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput(prev => prev + (prev ? ' ' : '') + transcript)
        setIsRecording(false)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsRecording(false)
        if (event.error === 'not-allowed') {
          alert('Microphone access denied. Please enable it in your browser settings.')
        }
      }

      recognitionRef.current.onend = () => {
        setIsRecording(false)
      }
    }
  }, [])

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Try Chrome or Edge.')
      return
    }

    if (isRecording) {
      recognitionRef.current.stop()
      setIsRecording(false)
    } else {
      recognitionRef.current.start()
      setIsRecording(true)
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newAttachments: Attachment[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 5MB.`)
        continue
      }

      // Read file content for text files
      if (file.type.startsWith('text/') || file.name.endsWith('.md') || file.name.endsWith('.json')) {
        const content = await readFileContent(file)
        newAttachments.push({
          name: file.name,
          type: file.type || 'text/plain',
          size: file.size,
          content
        })
      } else {
        newAttachments.push({
          name: file.name,
          type: file.type,
          size: file.size
        })
      }
    }

    setAttachments(prev => [...prev, ...newAttachments])
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result as string)
      reader.onerror = reject
      reader.readAsText(file)
    })
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const sendMessage = async () => {
    if ((!input.trim() && attachments.length === 0) || loading) return

    let messageContent = input

    // Add attachment information to message
    if (attachments.length > 0) {
      messageContent += '\n\n📎 Attachments:\n'
      attachments.forEach(att => {
        messageContent += `- ${att.name} (${formatFileSize(att.size)})\n`
        if (att.content) {
          messageContent += `\nFile content:\n\`\`\`\n${att.content}\n\`\`\`\n`
        }
      })
    }

    const userMsg: Message = { 
      role: 'user', 
      content: messageContent,
      attachments: [...attachments]
    }
    setMessages(prev => [...prev, userMsg])
    const currentInput = input
    setInput('')
    setAttachments([])
    setLoading(true)

    try {
      const response = await axios.post(`${API_URL}/api/chat/send`, {
        message: currentInput,
        context: {
          attachments: attachments.map(a => ({
            name: a.name,
            type: a.type,
            content: a.content
          }))
        }
      })

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.data.message 
      }])
    } catch (error: any) {
      console.error('Error sending message:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `❌ Error: ${error.response?.data?.detail || error.message || 'Could not connect to backend'}\n\nMake sure:\n1. Backend is running (python main.py)\n2. Running on http://localhost:8000\n3. Ollama is running (ollama serve)` 
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !loading) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="h-full bg-gray-800 border-l border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-gray-700 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/90 backdrop-blur flex items-center justify-center text-2xl shadow-xl">
            🤖
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">AI Assistant</h2>
            <p className="text-blue-50 text-xs flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></span>
              Online - Ollama Local AI
            </p>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center mt-12">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-white font-semibold mb-2">Start a conversation</h3>
            <p className="text-gray-400 text-sm mb-4">Ask me anything about coding!</p>
            <div className="space-y-2">
              {[
                'Write a Python function',
                'Debug my code',
                'Explain this algorithm',
                'Create a React component'
              ].map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => setInput(suggestion)}
                  className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-lg transition-all text-left border border-gray-600 hover:border-gray-500"
                >
                  💡 {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {messages.map((msg, i) => (
          <div key={i} className="flex gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === 'user' 
                ? 'bg-blue-600' 
                : 'bg-gradient-to-br from-purple-500 to-pink-600'
            }`}>
              {msg.role === 'user' ? '👤' : '🤖'}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`rounded-lg p-3 ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-100'
              }`}>
                <div className="text-xs font-semibold mb-1 opacity-70">
                  {msg.role === 'user' ? 'You' : 'AI Unica'}
                </div>
                <div className="text-sm whitespace-pre-wrap break-words">{msg.content}</div>
              </div>
              {/* Show attachments for user messages */}
              {msg.role === 'user' && msg.attachments && msg.attachments.length > 0 && (
                <div className="mt-2 space-y-1">
                  {msg.attachments.map((att, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-400 bg-gray-750 rounded px-2 py-1">
                      <span>📎</span>
                      <span className="truncate">{att.name}</span>
                      <span className="text-gray-500">({formatFileSize(att.size)})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
              🤖
            </div>
            <div className="flex-1 bg-gray-700 rounded-lg p-3">
              <div className="flex gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="p-4 border-t border-gray-700 bg-gray-850">
        {/* Attachments Preview */}
        {attachments.length > 0 && (
          <div className="mb-3 space-y-2">
            {attachments.map((attachment, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-700 rounded-lg p-2 group"
              >
                <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                  {attachment.type.startsWith('image/') ? '🖼️' :
                   attachment.type.startsWith('text/') ? '📄' :
                   attachment.name.endsWith('.pdf') ? '📕' :
                   attachment.name.endsWith('.zip') ? '📦' : '📎'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{attachment.name}</p>
                  <p className="text-gray-400 text-xs">{formatFileSize(attachment.size)}</p>
                </div>
                <button
                  onClick={() => removeAttachment(index)}
                  className="text-gray-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mb-3 flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            accept="*/*"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className="h-9 px-4 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white text-xs rounded-lg transition-all disabled:opacity-50 flex items-center gap-2 font-medium border border-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            Attach
          </button>
          <button
            onClick={toggleVoiceInput}
            disabled={loading}
            className={`h-9 px-4 text-xs rounded-lg transition-all disabled:opacity-50 flex items-center gap-2 font-medium ${
              isRecording
                ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse shadow-lg shadow-red-500/30'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white border border-gray-600'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            {isRecording ? 'Recording...' : 'Voice'}
          </button>
          {attachments.length > 0 && (
            <div className="flex-1 flex items-center justify-end">
              <span className="h-9 px-3 bg-blue-600/20 border border-blue-500/50 text-blue-400 text-xs rounded-lg flex items-center gap-2 font-medium">
                📎 {attachments.length} file{attachments.length > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={isRecording ? 'Listening...' : 'Ask AI Unica anything...'}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-500 transition-all"
          rows={3}
          disabled={loading || isRecording}
        />
        <button
          onClick={sendMessage}
          disabled={loading || (!input.trim() && attachments.length === 0)}
          className="w-full h-11 mt-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Thinking...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              🚀 Send Message
              {attachments.length > 0 && <span className="text-xs opacity-90">+ {attachments.length} file(s)</span>}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
