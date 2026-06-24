import { useState } from 'react'

interface SidebarProps {
  onNewProject: () => void
  onSelectProject: (id: string) => void
  currentView: string
  onChangeView: (view: string) => void
}

export default function Sidebar({ onNewProject, onSelectProject, currentView, onChangeView }: SidebarProps) {
  const [projects] = useState([
    { id: '1', name: 'My First Project', language: 'Python' },
    { id: '2', name: 'Web App', language: 'JavaScript' },
    { id: '3', name: 'Data Analysis', language: 'Python' },
  ])

  const navItems = [
    { id: 'editor', icon: '💻', label: 'Code Editor' },
    { id: 'projects', icon: '📁', label: 'Projects' },
    { id: 'history', icon: '🕒', label: 'Chat History' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ]

  return (
    <div className="h-full bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 border-r border-gray-700 flex flex-col shadow-xl">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="text-white text-xl font-bold">AI</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AI Unica</h1>
          </div>
        </div>
        <p className="text-xs text-gray-400 ml-13">Professional AI Development Platform</p>
      </div>

      {/* Navigation */}
      <div className="p-4 border-b border-gray-700">
        <div className="space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                currentView === item.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Recent Projects</h3>
          <button
            onClick={onNewProject}
            className="p-1.5 text-blue-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
            title="New Project"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <div className="space-y-2">
          {projects.map(project => (
            <button
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-800 transition-all group border border-transparent hover:border-gray-700"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-base">📄</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate group-hover:text-blue-400 transition-colors">{project.name}</p>
                  <p className="text-xs text-gray-500">{project.language}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 bg-gray-900/50">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 hover:border-gray-600 transition-all cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white font-medium truncate">User Account</p>
            <p className="text-xs text-gray-400">Free Tier</p>
          </div>
        </div>
      </div>
    </div>
  )
}
