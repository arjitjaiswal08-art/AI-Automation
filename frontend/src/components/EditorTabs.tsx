import { useState } from 'react'

interface Tab {
  id: string
  name: string
  language: string
  modified: boolean
}

interface EditorTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (id: string) => void
  onTabClose: (id: string) => void
}

export default function EditorTabs({ tabs, activeTab, onTabChange, onTabClose }: EditorTabsProps) {
  const getLanguageIcon = (language: string) => {
    const icons: Record<string, string> = {
      'python': '🐍',
      'javascript': '📜',
      'typescript': '📘',
      'json': '⚙️',
      'markdown': '📝',
      'html': '🌐',
      'css': '🎨',
    }
    return icons[language] || '📄'
  }

  return (
    <div className="bg-gray-800 border-b border-gray-700 flex items-center overflow-x-auto">
      {tabs.map(tab => (
        <div
          key={tab.id}
          className={`group flex items-center gap-2 px-4 py-2 border-r border-gray-700 cursor-pointer transition-colors min-w-fit ${
            activeTab === tab.id
              ? 'bg-gray-900 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-750 hover:text-gray-200'
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="text-sm">{getLanguageIcon(tab.language)}</span>
          <span className="text-sm font-medium">{tab.name}</span>
          {tab.modified && (
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onTabClose(tab.id)
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 hover:bg-gray-700 rounded p-0.5"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
      
      {tabs.length === 0 && (
        <div className="px-4 py-2 text-sm text-gray-500">
          No files open
        </div>
      )}
    </div>
  )
}
