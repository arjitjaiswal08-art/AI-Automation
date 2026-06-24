import { useState, useRef, useEffect } from 'react'

export default function TerminalPanel() {
  const [output, setOutput] = useState<string[]>([
    '$ Welcome to CodePilot AI Terminal',
    '$ Type "help" for available commands',
    ''
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const outputRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  const handleCommand = (cmd: string) => {
    if (!cmd.trim()) return

    const newOutput = [...output, `$ ${cmd}`]
    
    // Add to history
    setHistory(prev => [...prev, cmd])
    setHistoryIndex(-1)

    // Process command
    const parts = cmd.trim().toLowerCase().split(' ')
    const command = parts[0]

    switch (command) {
      case 'help':
        newOutput.push(
          'Available commands:',
          '  help        - Show this help message',
          '  clear       - Clear the terminal',
          '  ls          - List files',
          '  pwd         - Print working directory',
          '  python      - Run Python code',
          '  npm         - Run npm commands',
          '  git         - Git commands',
          ''
        )
        break
      case 'clear':
        setOutput([''])
        setInput('')
        return
      case 'ls':
        newOutput.push(
          'main.py',
          'utils.py',
          'config.json',
          'README.md',
          'requirements.txt',
          ''
        )
        break
      case 'pwd':
        newOutput.push('/Users/project/codepilot-ai', '')
        break
      case 'python':
        if (parts[1]) {
          newOutput.push(`Running: python ${parts.slice(1).join(' ')}...`, 'Output: Hello from Python!', '')
        } else {
          newOutput.push('Usage: python <file.py>', '')
        }
        break
      case 'npm':
        if (parts[1] === 'start') {
          newOutput.push('Starting development server...', 'Server running on http://localhost:3000', '')
        } else if (parts[1] === 'install') {
          newOutput.push('Installing dependencies...', 'Done in 5.2s', '')
        } else {
          newOutput.push('Usage: npm <start|install|run>', '')
        }
        break
      case 'git':
        if (parts[1] === 'status') {
          newOutput.push('On branch main', 'Your branch is up to date', 'nothing to commit, working tree clean', '')
        } else if (parts[1] === 'log') {
          newOutput.push('commit abc123 (HEAD -> main)', 'Date: Now', '    Added voice input feature', '')
        } else {
          newOutput.push('Usage: git <status|log|add|commit>', '')
        }
        break
      default:
        newOutput.push(`Command not found: ${command}`, 'Type "help" for available commands', '')
    }

    setOutput(newOutput)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex])
      } else {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  return (
    <div className="h-full bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-green-400 font-mono text-sm">▶</span>
          <span className="text-white font-semibold text-sm">TERMINAL</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setOutput(['$ Terminal cleared', ''])}
            className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs rounded transition-colors"
          >
            Clear
          </button>
          <button
            className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs rounded transition-colors"
            title="New Terminal"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button
            className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs rounded transition-colors"
            title="Split Terminal"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 4H5a2 2 0 00-2 2v12a2 2 0 002 2h4m8-10V5a2 2 0 00-2-2h-4m8 10v7a2 2 0 01-2 2h-4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Output */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm text-gray-300"
        onClick={() => inputRef.current?.focus()}
      >
        {output.map((line, i) => (
          <div key={i} className={line.startsWith('$') ? 'text-green-400' : 'text-gray-300'}>
            {line}
          </div>
        ))}
        
        {/* Input Line */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-green-400">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-gray-300 outline-none font-mono"
            placeholder="Type a command..."
            autoFocus
          />
        </div>
      </div>
    </div>
  )
}
