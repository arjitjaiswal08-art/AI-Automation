import { useState } from 'react'

interface EditorToolbarProps {
  currentFile: string
  language: string
  onSave: () => void
  onRun: () => void
  onFormat: () => void
  onToggleChat: () => void
  showChat: boolean
}

export default function EditorToolbar({
  currentFile,
  language,
  onSave,
  onRun,
  onFormat,
  onToggleChat,
  showChat
}: EditorToolbarProps) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
      {/* Left Side - File Info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-white font-medium text-sm">{currentFile || 'Untitled'}</span>
          {language && (
            <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded">
              {language.toUpperCase()}
            </span>
          )}
        </div>
        <div className="h-4 w-px bg-gray-700"></div>
        <div className="text-xs text-gray-500">
          Line 1, Col 1
        </div>
      </div>

      {/* Right Side - Actions */}
      <div className="flex items-center gap-2">
        {/* Format Button */}
        <button
          onClick={onFormat}
          className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors flex items-center gap-1"
          title="Format Code (Shift+Alt+F)"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
          Format
        </button>

        {/* Save Button */}
        <button
          onClick={onSave}
          className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors flex items-center gap-1"
          title="Save (Ctrl+S)"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save
        </button>

        {/* Run Button */}
        <button
          onClick={onRun}
          className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors flex items-center gap-1"
          title="Run Code (F5)"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Run
        </button>

        <div className="h-6 w-px bg-gray-700 mx-1"></div>

        {/* More Options */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="px-2 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
            title="More Options"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-t-lg">
                Find (Ctrl+F)
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                Replace (Ctrl+H)
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                Go to Line (Ctrl+G)
              </button>
              <div className="border-t border-gray-700 my-1"></div>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                Settings
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-b-lg">
                Keyboard Shortcuts
              </button>
            </div>
          )}
        </div>

        {/* Toggle Chat */}
        <button
          onClick={onToggleChat}
          className={`px-3 py-1.5 text-white text-sm rounded transition-colors flex items-center gap-1 ${
            showChat
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {showChat ? 'Hide' : 'Show'} Chat
        </button>
      </div>
    </div>
  )
}
