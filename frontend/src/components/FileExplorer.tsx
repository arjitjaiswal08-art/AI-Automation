import { useState } from 'react'

interface FileNode {
  name: string
  type: 'file' | 'folder'
  children?: FileNode[]
  language?: string
  path?: string
}

interface FileExplorerProps {
  onFileSelect: (file: string, language: string) => void
}

export default function FileExplorer({ onFileSelect }: FileExplorerProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['src']))
  const [selectedFile, setSelectedFile] = useState<string>('')
  const [showNewFileDialog, setShowNewFileDialog] = useState(false)
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false)
  const [newItemName, setNewItemName] = useState('')
  const [fileTree, setFileTree] = useState<FileNode[]>([
    {
      name: 'src',
      type: 'folder',
      path: 'src',
      children: [
        { name: 'main.py', type: 'file', language: 'python', path: 'src/main.py' },
        { name: 'utils.py', type: 'file', language: 'python', path: 'src/utils.py' },
        { name: 'config.json', type: 'file', language: 'json', path: 'src/config.json' },
      ]
    },
    {
      name: 'tests',
      type: 'folder',
      path: 'tests',
      children: [
        { name: 'test_main.py', type: 'file', language: 'python', path: 'tests/test_main.py' },
      ]
    },
    { name: 'README.md', type: 'file', language: 'markdown', path: 'README.md' },
    { name: 'requirements.txt', type: 'file', language: 'plaintext', path: 'requirements.txt' },
  ])

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expanded)
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName)
    } else {
      newExpanded.add(folderName)
    }
    setExpanded(newExpanded)
  }

  const handleNewFile = () => {
    setNewItemName('')
    setShowNewFileDialog(true)
  }

  const handleNewFolder = () => {
    setNewItemName('')
    setShowNewFolderDialog(true)
  }

  const handleRefresh = () => {
    // Simulate refresh with a visual feedback
    const explorer = document.querySelector('.file-tree')
    if (explorer) {
      explorer.classList.add('refreshing')
      setTimeout(() => {
        explorer.classList.remove('refreshing')
      }, 500)
    }
    console.log('File explorer refreshed!')
  }

  const createNewFile = () => {
    if (!newItemName.trim()) return

    const getLanguage = (filename: string): string => {
      if (filename.endsWith('.py')) return 'python'
      if (filename.endsWith('.js')) return 'javascript'
      if (filename.endsWith('.ts') || filename.endsWith('.tsx')) return 'typescript'
      if (filename.endsWith('.json')) return 'json'
      if (filename.endsWith('.md')) return 'markdown'
      if (filename.endsWith('.html')) return 'html'
      if (filename.endsWith('.css')) return 'css'
      return 'plaintext'
    }

    const newFile: FileNode = {
      name: newItemName,
      type: 'file',
      language: getLanguage(newItemName),
      path: newItemName
    }

    setFileTree([...fileTree, newFile])
    setShowNewFileDialog(false)
    setNewItemName('')
  }

  const createNewFolder = () => {
    if (!newItemName.trim()) return

    const newFolder: FileNode = {
      name: newItemName,
      type: 'folder',
      path: newItemName,
      children: []
    }

    setFileTree([...fileTree, newFolder])
    setExpanded(new Set([...expanded, newItemName]))
    setShowNewFolderDialog(false)
    setNewItemName('')
  }

  const handleDialogKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      action()
    } else if (e.key === 'Escape') {
      setShowNewFileDialog(false)
      setShowNewFolderDialog(false)
      setNewItemName('')
    }
  }

  const getFileIcon = (name: string, type: string, isExpanded: boolean = false) => {
    if (type === 'folder') {
      return (
        <svg className={`w-4 h-4 flex-shrink-0 ${isExpanded ? 'text-[#dcb67a]' : 'text-[#8a8a8a]'}`} fill="currentColor" viewBox="0 0 16 16">
          {isExpanded ? (
            <path d="M1.5 3A1.5 1.5 0 000 4.5v7A1.5 1.5 0 001.5 13h13a1.5 1.5 0 001.5-1.5v-7A1.5 1.5 0 0014.5 3h-5.879a1.5 1.5 0 01-1.06-.44L6.44 1.439A1.5 1.5 0 005.378 1H1.5z" />
          ) : (
            <path d="M1.5 3A1.5 1.5 0 000 4.5v7A1.5 1.5 0 001.5 13h13a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5h-6.879a1.5 1.5 0 01-1.06-.44L4.439 2.94A1.5 1.5 0 003.378 2.5H1.5z" />
          )}
        </svg>
      )
    }

    // File icons with VS Code colors
    if (name.endsWith('.py')) {
      return (
        <svg className="w-4 h-4 flex-shrink-0 text-[#519aba]" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2.5 1A1.5 1.5 0 001 2.5v11A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-8.793a.5.5 0 00-.146-.353L10.146 0.646A.5.5 0 009.793 0.5H2.5zM2 2.5a.5.5 0 01.5-.5h7v3a.5.5 0 00.5.5h3v8a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11z" />
        </svg>
      )
    }
    if (name.endsWith('.js') || name.endsWith('.jsx')) {
      return (
        <svg className="w-4 h-4 flex-shrink-0 text-[#cbcb41]" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2.5 1A1.5 1.5 0 001 2.5v11A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-8.793a.5.5 0 00-.146-.353L10.146 0.646A.5.5 0 009.793 0.5H2.5zM2 2.5a.5.5 0 01.5-.5h7v3a.5.5 0 00.5.5h3v8a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11z" />
        </svg>
      )
    }
    if (name.endsWith('.ts') || name.endsWith('.tsx')) {
      return (
        <svg className="w-4 h-4 flex-shrink-0 text-[#519aba]" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2.5 1A1.5 1.5 0 001 2.5v11A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-8.793a.5.5 0 00-.146-.353L10.146 0.646A.5.5 0 009.793 0.5H2.5zM2 2.5a.5.5 0 01.5-.5h7v3a.5.5 0 00.5.5h3v8a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11z" />
        </svg>
      )
    }
    if (name.endsWith('.json')) {
      return (
        <svg className="w-4 h-4 flex-shrink-0 text-[#cbcb41]" viewBox="0 0 16 16" fill="currentColor">
          <path d="M5.5 2.5A1.5 1.5 0 004 4v1.5a1.5 1.5 0 01-1.5 1.5H2v2h.5A1.5 1.5 0 014 10.5V12a1.5 1.5 0 001.5 1.5h1v-2h-1a.5.5 0 01-.5-.5v-1.5A2.5 2.5 0 003.5 7 2.5 2.5 0 005 4.5V3a.5.5 0 01.5-.5h1v-2h-1zm5 0h-1v2h1a.5.5 0 01.5.5v1.5A2.5 2.5 0 0012.5 7 2.5 2.5 0 0011 9.5V11a.5.5 0 01-.5.5h-1v2h1A1.5 1.5 0 0012 12v-1.5A1.5 1.5 0 0113.5 9H14V7h-.5A1.5 1.5 0 0112 5.5V4a1.5 1.5 0 00-1.5-1.5z" />
        </svg>
      )
    }
    if (name.endsWith('.md')) {
      return (
        <svg className="w-4 h-4 flex-shrink-0 text-[#519aba]" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2.5 1A1.5 1.5 0 001 2.5v11A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-8.793a.5.5 0 00-.146-.353L10.146 0.646A.5.5 0 009.793 0.5H2.5zM2 2.5a.5.5 0 01.5-.5h7v3a.5.5 0 00.5.5h3v8a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11z" />
        </svg>
      )
    }
    if (name.endsWith('.txt')) {
      return (
        <svg className="w-4 h-4 flex-shrink-0 text-[#6d8086]" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2.5 1A1.5 1.5 0 001 2.5v11A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-8.793a.5.5 0 00-.146-.353L10.146 0.646A.5.5 0 009.793 0.5H2.5zM2 2.5a.5.5 0 01.5-.5h7v3a.5.5 0 00.5.5h3v8a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11z" />
        </svg>
      )
    }
    if (name.endsWith('.html') || name.endsWith('.htm')) {
      return (
        <svg className="w-4 h-4 flex-shrink-0 text-[#e37933]" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2.5 1A1.5 1.5 0 001 2.5v11A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-8.793a.5.5 0 00-.146-.353L10.146 0.646A.5.5 0 009.793 0.5H2.5zM2 2.5a.5.5 0 01.5-.5h7v3a.5.5 0 00.5.5h3v8a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11z" />
        </svg>
      )
    }
    if (name.endsWith('.css') || name.endsWith('.scss')) {
      return (
        <svg className="w-4 h-4 flex-shrink-0 text-[#519aba]" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2.5 1A1.5 1.5 0 001 2.5v11A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-8.793a.5.5 0 00-.146-.353L10.146 0.646A.5.5 0 009.793 0.5H2.5zM2 2.5a.5.5 0 01.5-.5h7v3a.5.5 0 00.5.5h3v8a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11z" />
        </svg>
      )
    }
    
    // Default file icon
    return (
      <svg className="w-4 h-4 flex-shrink-0 text-[#6d8086]" viewBox="0 0 16 16" fill="currentColor">
        <path d="M2.5 1A1.5 1.5 0 001 2.5v11A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-8.793a.5.5 0 00-.146-.353L10.146 0.646A.5.5 0 009.793 0.5H2.5zM2 2.5a.5.5 0 01.5-.5h7v3a.5.5 0 00.5.5h3v8a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11z" />
      </svg>
    )
  }

  const renderNode = (node: FileNode, depth: number = 0) => {
    const isExpanded = expanded.has(node.name)
    const isSelected = selectedFile === node.path

    return (
      <div key={node.path || node.name}>
        <button
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.name)
            } else {
              setSelectedFile(node.path || node.name)
              onFileSelect(node.name, node.language || 'plaintext')
            }
          }}
          className={`
            w-full text-left px-2 py-0.5 transition-colors flex items-center gap-1.5 text-[13px] group
            ${isSelected 
              ? 'bg-[#37373d] text-white' 
              : 'hover:bg-[#2a2d2e] text-[#cccccc]'
            }
          `}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          {/* Folder chevron */}
          {node.type === 'folder' && (
            <svg 
              className={`w-3 h-3 text-[#cccccc] transition-transform duration-150 flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`}
              fill="currentColor" 
              viewBox="0 0 16 16"
            >
              <path fillRule="evenodd" d="M5.646 3.646a.5.5 0 01.708 0L10 7.293l-3.646 3.647a.5.5 0 01-.708-.708L8.793 7.293 5.646 4.146a.5.5 0 010-.708z" />
            </svg>
          )}
          
          {/* File/Folder icon */}
          <span className="flex-shrink-0">
            {getFileIcon(node.name, node.type, isExpanded)}
          </span>
          
          {/* Name */}
          <span className="flex-1 truncate font-normal leading-relaxed">
            {node.name}
          </span>
        </button>
        
        {/* Children */}
        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  const totalFiles = () => {
    let count = 0
    const countFiles = (nodes: FileNode[]) => {
      nodes.forEach(node => {
        if (node.type === 'file') count++
        if (node.children) countFiles(node.children)
      })
    }
    countFiles(fileTree)
    return count
  }

  const totalFolders = () => {
    let count = 0
    const countFolders = (nodes: FileNode[]) => {
      nodes.forEach(node => {
        if (node.type === 'folder') {
          count++
          if (node.children) countFolders(node.children)
        }
      })
    }
    countFolders(fileTree)
    return count
  }

  return (
    <div className="h-full bg-[#252526] border-r border-[#3e3e42] flex flex-col relative">
      {/* Header */}
      <div className="px-3 py-2 border-b border-[#3e3e42] flex items-center justify-between bg-[#252526]">
        <h3 className="text-[#cccccc] font-normal text-[11px] uppercase tracking-wider">Explorer</h3>
        <div className="flex gap-0">
          <button
            onClick={handleNewFile}
            className="p-1 hover:bg-[#2a2d2e] rounded transition-colors group relative"
            title="New File"
          >
            <svg className="w-4 h-4 text-[#c5c5c5] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
          <button
            onClick={handleNewFolder}
            className="p-1 hover:bg-[#2a2d2e] rounded transition-colors group relative"
            title="New Folder"
          >
            <svg className="w-4 h-4 text-[#c5c5c5] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </button>
          <button
            onClick={handleRefresh}
            className="p-1 hover:bg-[#2a2d2e] rounded transition-colors group relative"
            title="Refresh Explorer"
          >
            <svg className="w-4 h-4 text-[#c5c5c5] group-hover:text-white group-hover:rotate-180 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-0.5 vscode-scrollbar file-tree">
        {fileTree.map(node => renderNode(node))}
      </div>

      {/* Footer Stats */}
      <div className="px-3 py-1.5 border-t border-[#3e3e42] bg-[#252526]">
        <div className="flex justify-between items-center text-[10px] text-[#858585] uppercase tracking-wide">
          <span>{totalFiles()} files</span>
          <span>{totalFolders()} folders</span>
        </div>
      </div>

      {/* New File Dialog */}
      {showNewFileDialog && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-[#252526] border border-gray-700 rounded-lg shadow-2xl w-80 p-5 animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-base">New File</h3>
                <p className="text-gray-400 text-xs">Create a new file</p>
              </div>
            </div>
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => handleDialogKeyDown(e, createNewFile)}
              placeholder="filename.ext"
              className="w-full px-3 py-2 bg-[#1e1e1e] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              autoFocus
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={createNewFile}
                disabled={!newItemName.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all active:scale-95"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowNewFileDialog(false)
                  setNewItemName('')
                }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-medium transition-all active:scale-95"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Folder Dialog */}
      {showNewFolderDialog && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-[#252526] border border-gray-700 rounded-lg shadow-2xl w-80 p-5 animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-base">New Folder</h3>
                <p className="text-gray-400 text-xs">Create a new folder</p>
              </div>
            </div>
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => handleDialogKeyDown(e, createNewFolder)}
              placeholder="folder-name"
              className="w-full px-3 py-2 bg-[#1e1e1e] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition-all"
              autoFocus
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={createNewFolder}
                disabled={!newItemName.trim()}
                className="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all active:scale-95"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowNewFolderDialog(false)
                  setNewItemName('')
                }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-medium transition-all active:scale-95"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom scrollbar styles + animations */}
      <style>{`
        .vscode-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .vscode-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .vscode-scrollbar::-webkit-scrollbar-thumb {
          background: #424242;
          border-radius: 0;
        }
        .vscode-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4e4e4e;
        }
        
        .file-tree.refreshing {
          opacity: 0.5;
          animation: refresh-pulse 0.5s ease-in-out;
        }
        
        @keyframes refresh-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
