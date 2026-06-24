import { useState, useRef, useEffect } from 'react'

export default function TerminalPanel() {
  const [output, setOutput] = useState<string[]>([
    '════════════════════════════════════════════════',
    '     Welcome to AI Unica Terminal',
    '  Your Professional Development Environment',
    '════════════════════════════════════════════════',
    '',
    'Type "help" for available commands',
    ''
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [currentPath, setCurrentPath] = useState('~/ai-unica')
  const outputRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  const handleCommand = (cmd: string) => {
    if (!cmd.trim()) return

    const newOutput = [`$ ${currentPath} > ${cmd}`]
    
    // Add to history
    setHistory(prev => [...prev, cmd])
    setHistoryIndex(-1)

    // Process command
    const parts = cmd.trim().split(' ')
    const command = parts[0].toLowerCase()
    const args = parts.slice(1)

    switch (command) {
      case 'help':
        newOutput.push(
          '',
          '════════════════════════════════════════════════════',
          '            AI UNICA TERMINAL HELP',
          '════════════════════════════════════════════════════',
          '',
          'FILE & DIRECTORY COMMANDS:',
          '  ls, dir          - List files and directories',
          '  pwd              - Print working directory',
          '  cd <path>        - Change directory',
          '  mkdir <name>     - Create directory',
          '  touch <file>     - Create file',
          '  cat <file>       - Display file content',
          '  rm <file>        - Remove file',
          '',
          'PYTHON COMMANDS:',
          '  python <file>    - Run Python script',
          '  pip install <pkg>- Install Python package',
          '  pip list         - List installed packages',
          '',
          'NPM/NODE COMMANDS:',
          '  npm start        - Start development server',
          '  npm install      - Install dependencies',
          '  npm run <script> - Run npm script',
          '  node <file>      - Run JavaScript file',
          '',
          'GIT COMMANDS:',
          '  git status       - Check repository status',
          '  git add .        - Stage all changes',
          '  git commit -m    - Commit changes',
          '  git log          - View commit history',
          '  git push         - Push to remote',
          '  git pull         - Pull from remote',
          '',
          'SYSTEM COMMANDS:',
          '  clear, cls       - Clear terminal',
          '  echo <text>      - Print text',
          '  whoami           - Display current user',
          '  date             - Show current date/time',
          '  env              - Show environment variables',
          '  history          - Show command history',
          '',
          'AI UNICA SPECIAL:',
          '  info             - Show terminal info',
          '  version          - Display version',
          '  stats            - Show system stats',
          ''
        )
        break

      case 'info':
        newOutput.push(
          '',
          'AI UNICA TERMINAL CAPABILITIES:',
          '',
          '  Multi-language support (Python, JavaScript, etc.)',
          '  Git integration built-in',
          '  Command history with arrow keys',
          '  Auto-scrolling output',
          '  Real-time command execution',
          '  Professional development environment',
          ''
        )
        break

      case 'version':
        newOutput.push(
          '',
          'AI Unica Terminal v2.0',
          'Professional AI Coding Assistant',
          ''
        )
        break

      case 'stats':
        newOutput.push(
          '',
          'AI UNICA TERMINAL STATS:',
          `  Commands executed: ${history.length}`,
          `  Current directory: ${currentPath}`,
          `  Terminal version: v2.0`,
          ''
        )
        break

      case 'clear':
      case 'cls':
        setOutput([
          '════════════════════════════════════════════════',
          '     AI Unica Terminal - Cleared',
          '════════════════════════════════════════════════',
          ''
        ])
        setInput('')
        return

      case 'ls':
      case 'dir':
        newOutput.push(
          '',
          'Directory listing:',
          '  drwxr-xr-x  src/',
          '  drwxr-xr-x  tests/',
          '  -rw-r--r--  main.py',
          '  -rw-r--r--  utils.py',
          '  -rw-r--r--  config.json',
          '  -rw-r--r--  README.md',
          '  -rw-r--r--  requirements.txt',
          '',
          `  Total: 5 files, 2 directories`,
          ''
        )
        break

      case 'pwd':
        newOutput.push('', currentPath, '')
        break

      case 'cd':
        if (args.length === 0) {
          setCurrentPath('~')
          newOutput.push('', 'Changed to home directory', '')
        } else {
          const newPath = args[0] === '..' 
            ? currentPath.split('/').slice(0, -1).join('/') || '~'
            : `${currentPath}/${args[0]}`
          setCurrentPath(newPath)
          newOutput.push('', `Changed directory to: ${newPath}`, '')
        }
        break

      case 'echo':
        newOutput.push('', args.join(' '), '')
        break

      case 'date':
        newOutput.push('', new Date().toString(), '')
        break

      case 'whoami':
        newOutput.push('', 'ai-unica-developer', '')
        break

      case 'history':
        newOutput.push('', 'Command History:', ...history.map((h, i) => `  ${i + 1}  ${h}`), '')
        break

      case 'env':
        newOutput.push(
          '',
          'Environment Variables:',
          '  SHELL=ai-unica-shell',
          '  USER=ai-unica-developer',
          '  TERMINAL=ai-unica-terminal-v2',
          '  AI=enabled',
          ''
        )
        break

      case 'python':
        if (args.length === 0) {
          newOutput.push('', 'Usage: python <file.py>', 'Example: python main.py', '')
        } else {
          newOutput.push(
            '',
            `Executing: python ${args.join(' ')}`,
            '─'.repeat(50),
            'Hello from Python!',
            'Script executed successfully',
            `Execution time: ${(Math.random() * 0.5).toFixed(3)}s`,
            ''
          )
        }
        break

      case 'pip':
        if (args[0] === 'install') {
          newOutput.push(
            '',
            `Installing: ${args.slice(1).join(' ')}`,
            'Collecting package...',
            'Installing dependencies...',
            `Successfully installed ${args.slice(1).join(' ')}`,
            ''
          )
        } else if (args[0] === 'list') {
          newOutput.push(
            '',
            'Installed packages:',
            '  fastapi==0.109.0',
            '  uvicorn==0.27.0',
            '  openai==1.10.0',
            '  python-jose==3.3.0',
            '  ...and more',
            ''
          )
        } else {
          newOutput.push('', 'Usage: pip install <package> or pip list', '')
        }
        break

      case 'npm':
        if (args[0] === 'start') {
          newOutput.push(
            '',
            'Starting development server...',
            'Compiling...',
            'Compiled successfully!',
            '',
            '  Local:   http://localhost:3000',
            '  Network: http://192.168.1.100:3000',
            '',
            'Development server is running!',
            ''
          )
        } else if (args[0] === 'install') {
          newOutput.push(
            '',
            'Installing dependencies...',
            'npm WARN deprecated ...',
            'added 276 packages in 12.5s',
            'Installation complete!',
            ''
          )
        } else if (args[0] === 'run') {
          newOutput.push(
            '',
            `Running script: ${args[1]}`,
            'Script executing...',
            'Script completed successfully!',
            ''
          )
        } else {
          newOutput.push('', 'Usage: npm <start|install|run>', '')
        }
        break

      case 'node':
        if (args.length === 0) {
          newOutput.push('', 'Usage: node <file.js>', '')
        } else {
          newOutput.push(
            '',
            `Executing: node ${args.join(' ')}`,
            'Output: Hello from Node.js! !',
            'Execution successful',
            ''
          )
        }
        break

      case 'git':
        if (args[0] === 'status') {
          newOutput.push(
            '',
            'On branch main',
            'Your branch is up to date with \'origin/main\'',
            '',
            'Changes not staged for commit:',
            '  modified:   src/main.py',
            '  modified:   src/config.json',
            '',
            'Untracked files:',
            '  new-feature.py',
            '',
            'no changes added to commit',
            ''
          )
        } else if (args[0] === 'log') {
          newOutput.push(
            '',
            'commit abc123 (HEAD -> main, origin/main)',
            'Author: AI Unica Developer <ai-unica@example.com>',
            'Date:   Now',
            '',
            '    Added awesome feature',
            '',
            'commit def456',
            'Author: AI Unica Developer <ai-unica@example.com>',
            'Date:   Earlier',
            '',
            '    ✨ Initial commit with confidence',
            ''
          )
        } else if (args[0] === 'add') {
          newOutput.push('', `Staged: ${args.slice(1).join(' ') || 'all changes'}`, '')
        } else if (args[0] === 'commit') {
          newOutput.push(
            '',
            'Committed successfully!',
            `[main ${Math.random().toString(36).substr(2, 6)}] ${args.slice(2).join(' ')}`,
            ' 2 files changed, 15 insertions(+), 3 deletions(-)',
            ''
          )
        } else if (args[0] === 'push') {
          newOutput.push(
            '',
            'Pushing to origin...',
            'Counting objects: 5, done.',
            'Writing objects: 100% (5/5), done.',
            'Successfully pushed to origin/main',
            ''
          )
        } else if (args[0] === 'pull') {
          newOutput.push(
            '',
            'Pulling from origin...',
            'Already up to date! !',
            ''
          )
        } else {
          newOutput.push('', 'Usage: git <status|log|add|commit|push|pull>', '')
        }
        break

      case 'mkdir':
        if (args.length === 0) {
          newOutput.push('', 'Usage: mkdir <directory-name>', '')
        } else {
          newOutput.push('', `Created directory: ${args[0]}`, '')
        }
        break

      case 'touch':
        if (args.length === 0) {
          newOutput.push('', 'Usage: touch <filename>', '')
        } else {
          newOutput.push('', `Created file: ${args[0]}`, '')
        }
        break

      case 'cat':
        if (args.length === 0) {
          newOutput.push('', 'Usage: cat <filename>', '')
        } else {
          newOutput.push(
            '',
            `Content of ${args[0]}:`,
            '─'.repeat(50),
            '# Sample content',
            'print("Hello from AI Unica!")',
            '─'.repeat(50),
            ''
          )
        }
        break

      case 'rm':
        if (args.length === 0) {
          newOutput.push('', 'Usage: rm <filename>', '')
        } else {
          newOutput.push('', `Removed: ${args[0]}`, '')
        }
        break

      default:
        newOutput.push(
          '',
          `Command not found: ${command}`,
          `But hey, Type "help" for available commands.`,
          `Type "help" to see available commands.`,
          ''
        )
    }

    setOutput(prev => [...prev, ...newOutput])
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
          <span className="text-white font-mono text-sm font-bold flex items-center gap-1">
            
            AI UNICA TERMINAL V2.0
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setOutput([' Terminal cleared', ''])}
            className="px-2 py-1 bg-white/20 hover:bg-white/30 text-white text-xs rounded transition-colors font-bold"
          >
            Clear
          </button>
          <button
            className="px-2 py-1 bg-white/20 hover:bg-white/30 text-white text-xs rounded transition-colors"
            title="New Terminal"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button
            className="px-2 py-1 bg-white/20 hover:bg-white/30 text-white text-xs rounded transition-colors"
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
        className="flex-1 overflow-y-auto p-4 font-mono text-sm text-green-400"
        onClick={() => inputRef.current?.focus()}
      >
        {output.map((line, i) => (
          <div key={i} className={line.startsWith('$') ? 'text-cyan-400 font-bold' : line.startsWith('✅') ? 'text-green-400' : line.startsWith('❌') || line.startsWith('Command not found') ? 'text-red-400' : line.includes('║') || line.includes('═') || line.includes('╔') || line.includes('╚') || line.includes('─') ? 'text-yellow-300' : 'text-gray-300'}>
            {line}
          </div>
        ))}
        
        {/* Input Line */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-cyan-400 font-bold">$ {currentPath} &gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-green-400 outline-none font-mono"
            placeholder="Type a command..."
            autoFocus
          />
        </div>
      </div>
    </div>
  )
}
