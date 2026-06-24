import { useState, useRef, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import Sidebar from './components/Sidebar'
import ChatPanel from './components/ChatPanel'
import ProjectsView from './components/ProjectsView'
import HistoryView from './components/HistoryView'
import SettingsView from './components/SettingsView'
import FileExplorer from './components/FileExplorer'
import EditorTabs from './components/EditorTabs'
import EditorToolbar from './components/EditorToolbar'
import TerminalPanel from './components/TerminalPanel'
import Notification from './components/Notification'

interface Tab {
  id: string
  name: string
  language: string
  modified: boolean
  content: string
}

const sampleCode: Record<string, string> = {
  'main.py': `# Welcome to AI Unica - Professional Dashboard
# Start coding with AI assistance...

def is_prime(num):
    """Check if a number is prime."""
    if num <= 1:
        return False
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            return False
    return True

def add_primes(a, b):
    """Add two prime numbers."""
    if not is_prime(a):
        raise ValueError(f"{a} is not a prime number")
    if not is_prime(b):
        raise ValueError(f"{b} is not a prime number")
    
    result = a + b
    return f"The sum of the prime numbers is: {result}"

# Example usage
result = add_primes(23, 37)
print(result)
`,
  'utils.py': `# Utility functions for the project

def format_output(data):
    """Format data for display."""
    return f"Result: {data}"

def validate_input(value):
    """Validate user input."""
    if not value:
        raise ValueError("Input cannot be empty")
    return True
`,
  'config.json': `{
  "app_name": "AI Unica",
  "version": "0.2.0",
  "features": {
    "voice_input": true,
    "file_upload": true,
    "terminal": true
  }
}`,
}

function App() {
  const [currentView, setCurrentView] = useState('editor')
  const [showChat, setShowChat] = useState(true)
  const [showTerminal, setShowTerminal] = useState(false)
  const [notification, setNotification] = useState<{
    message: string
    type: 'info' | 'success' | 'warning' | 'error'
  } | null>(null)
  const [tabs, setTabs] = useState<Tab[]>([
    { id: '1', name: 'main.py', language: 'python', modified: false, content: sampleCode['main.py'] }
  ])
  const [activeTab, setActiveTab] = useState('1')

  // Resizable panels state
  const [sidebarWidth, setSidebarWidth] = useState(256) // 16rem = 256px
  const [chatWidth, setChatWidth] = useState(384) // 24rem = 384px
  const [fileExplorerWidth, setFileExplorerWidth] = useState(256)
  const [terminalHeight, setTerminalHeight] = useState(300)

  // Resize refs
  const sidebarResizeRef = useRef<HTMLDivElement>(null)
  const chatResizeRef = useRef<HTMLDivElement>(null)
  const fileExplorerResizeRef = useRef<HTMLDivElement>(null)
  const terminalResizeRef = useRef<HTMLDivElement>(null)

  // Resizing state
  const [isResizingSidebar, setIsResizingSidebar] = useState(false)
  const [isResizingChat, setIsResizingChat] = useState(false)
  const [isResizingFileExplorer, setIsResizingFileExplorer] = useState(false)
  const [isResizingTerminal, setIsResizingTerminal] = useState(false)

  // Mouse move handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingSidebar) {
        const newWidth = e.clientX
        if (newWidth >= 200 && newWidth <= 400) {
          setSidebarWidth(newWidth)
        }
      }
      if (isResizingChat) {
        const newWidth = window.innerWidth - e.clientX
        if (newWidth >= 300 && newWidth <= 600) {
          setChatWidth(newWidth)
        }
      }
      if (isResizingFileExplorer) {
        const sidebarEl = sidebarResizeRef.current?.parentElement
        const sidebarWidth = sidebarEl?.offsetWidth || 256
        const newWidth = e.clientX - sidebarWidth
        if (newWidth >= 150 && newWidth <= 400) {
          setFileExplorerWidth(newWidth)
        }
      }
      if (isResizingTerminal) {
        const newHeight = window.innerHeight - e.clientY
        if (newHeight >= 150 && newHeight <= 600) {
          setTerminalHeight(newHeight)
        }
      }
    }

    const handleMouseUp = () => {
      setIsResizingSidebar(false)
      setIsResizingChat(false)
      setIsResizingFileExplorer(false)
      setIsResizingTerminal(false)
    }

    if (isResizingSidebar || isResizingChat || isResizingFileExplorer || isResizingTerminal) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = isResizingTerminal ? 'ns-resize' : 'ew-resize'
      document.body.style.userSelect = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isResizingSidebar, isResizingChat, isResizingFileExplorer, isResizingTerminal])

  const handleNewProject = () => {
    setNotification({
      message: 'Create new project - Coming soon! This feature is under development.',
      type: 'info'
    })
  }

  const handleSelectProject = (id: string) => {
    console.log('Selected project:', id)
    setCurrentView('editor')
    setNotification({
      message: `Project opened successfully!`,
      type: 'success'
    })
  }

  const handleFileSelect = (fileName: string, language: string) => {
    // Check if file is already open
    const existingTab = tabs.find(t => t.name === fileName)
    if (existingTab) {
      setActiveTab(existingTab.id)
      return
    }

    // Create new tab
    const newTab: Tab = {
      id: Date.now().toString(),
      name: fileName,
      language,
      modified: false,
      content: sampleCode[fileName] || `// ${fileName}\n\n// Start coding...`
    }
    setTabs([...tabs, newTab])
    setActiveTab(newTab.id)
  }

  const handleTabClose = (tabId: string) => {
    const newTabs = tabs.filter(t => t.id !== tabId)
    setTabs(newTabs)
    if (activeTab === tabId && newTabs.length > 0) {
      setActiveTab(newTabs[0].id)
    }
  }

  const handleSave = () => {
    console.log('Save file')
    // Update modified state
    setTabs(tabs.map(t => t.id === activeTab ? { ...t, modified: false } : t))
  }

  const handleRun = () => {
    setShowTerminal(true)
    console.log('Run code')
  }

  const handleFormat = () => {
    console.log('Format code')
  }

  const getCurrentTab = () => tabs.find(t => t.id === activeTab)

  const renderMainContent = () => {
    switch (currentView) {
      case 'editor':
        const currentTab = getCurrentTab()
        return (
          <div className="flex-1 flex min-w-0">
            {/* File Explorer with resize handle */}
            <div 
              ref={fileExplorerResizeRef}
              style={{ width: `${fileExplorerWidth}px` }}
              className="relative flex-shrink-0 transition-none"
            >
              <FileExplorer onFileSelect={handleFileSelect} />
              
              {/* File Explorer Resize Handle */}
              <div
                onMouseDown={() => setIsResizingFileExplorer(true)}
                className="absolute top-0 right-0 w-1 h-full cursor-ew-resize hover:bg-blue-500 transition-colors group"
              >
                <div className="absolute inset-y-0 right-0 w-4 -translate-x-1.5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-1 h-12 bg-blue-500 rounded-full shadow-lg"></div>
                </div>
              </div>
            </div>
            
            {/* Editor Area */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Tabs */}
              <EditorTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onTabClose={handleTabClose}
              />
              
              {/* Toolbar */}
              <EditorToolbar
                currentFile={currentTab?.name || ''}
                language={currentTab?.language || ''}
                onSave={handleSave}
                onRun={handleRun}
                onFormat={handleFormat}
                onToggleChat={() => setShowChat(!showChat)}
                showChat={showChat}
              />
              
              {/* Editor & Terminal Split */}
              <div className="flex-1 flex flex-col relative min-h-0">
                {/* Monaco Editor */}
                <div 
                  style={{ 
                    height: showTerminal ? `calc(100% - ${terminalHeight}px)` : '100%' 
                  }}
                  className="min-h-0"
                >
                  <Editor
                    height="100%"
                    language={currentTab?.language || 'python'}
                    value={currentTab?.content || ''}
                    theme="vs-dark"
                    onChange={(value) => {
                      if (currentTab) {
                        setTabs(tabs.map(t => 
                          t.id === activeTab 
                            ? { ...t, content: value || '', modified: true }
                            : t
                        ))
                      }
                    }}
                    options={{
                      fontSize: 14,
                      minimap: { enabled: true },
                      lineNumbers: 'on',
                      roundedSelection: true,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 4,
                      wordWrap: 'on',
                      formatOnPaste: true,
                      formatOnType: true,
                    }}
                  />
                </div>
                
                {/* Terminal with resize handle */}
                {showTerminal && (
                  <div 
                    ref={terminalResizeRef}
                    style={{ height: `${terminalHeight}px` }}
                    className="border-t border-gray-700 relative flex-shrink-0 transition-none"
                  >
                    {/* Terminal Resize Handle */}
                    <div
                      onMouseDown={() => setIsResizingTerminal(true)}
                      className="absolute top-0 left-0 right-0 h-1 cursor-ns-resize hover:bg-blue-500 transition-colors group z-10"
                    >
                      <div className="absolute inset-x-0 top-0 h-4 -translate-y-1.5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-1 bg-blue-500 rounded-full shadow-lg"></div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setShowTerminal(false)}
                      className="absolute top-2 right-2 z-10 p-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-400 hover:text-white transition-colors"
                      title="Close Terminal"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <TerminalPanel />
                  </div>
                )}
                
                {/* Toggle Terminal Button */}
                {!showTerminal && (
                  <button
                    onClick={() => setShowTerminal(true)}
                    className="absolute bottom-4 right-4 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg shadow-lg transition-colors flex items-center gap-2 z-10"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Open Terminal
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      case 'projects':
        return <ProjectsView />
      case 'history':
        return <HistoryView />
      case 'settings':
        return <SettingsView />
      default:
        return <div className="flex-1 bg-gray-900"></div>
    }
  }

  return (
    <div className="flex h-screen bg-gray-900 overflow-hidden">
      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Sidebar with resize handle */}
      <div 
        ref={sidebarResizeRef}
        style={{ width: `${sidebarWidth}px` }}
        className="relative flex-shrink-0 transition-none"
      >
        <Sidebar 
          onNewProject={handleNewProject}
          onSelectProject={handleSelectProject}
          currentView={currentView}
          onChangeView={setCurrentView}
        />
        
        {/* Sidebar Resize Handle */}
        <div
          onMouseDown={() => setIsResizingSidebar(true)}
          className="absolute top-0 right-0 w-1 h-full cursor-ew-resize hover:bg-blue-500 transition-colors group"
        >
          <div className="absolute inset-y-0 right-0 w-4 -translate-x-1.5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-1 h-12 bg-blue-500 rounded-full shadow-lg"></div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex min-w-0">
        {renderMainContent()}
      </div>
      
      {/* Chat Panel with resize handle - Only show on editor view */}
      {currentView === 'editor' && showChat && (
        <div 
          ref={chatResizeRef}
          style={{ width: `${chatWidth}px` }}
          className="relative flex-shrink-0 transition-none"
        >
          {/* Chat Resize Handle */}
          <div
            onMouseDown={() => setIsResizingChat(true)}
            className="absolute top-0 left-0 w-1 h-full cursor-ew-resize hover:bg-blue-500 transition-colors group z-10"
          >
            <div className="absolute inset-y-0 left-0 w-4 translate-x-0.5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-1 h-12 bg-blue-500 rounded-full shadow-lg"></div>
            </div>
          </div>
          
          <ChatPanel />
        </div>
      )}
    </div>
  )
}

export default App
