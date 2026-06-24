import { useState } from 'react'

interface Project {
  id: string
  name: string
  language: string
  files: number
  lastModified: string
  status: 'active' | 'archived'
  icon: string
}

export default function ProjectsView() {
  const [projects] = useState<Project[]>([
    { 
      id: '1', 
      name: 'E-Commerce Platform', 
      language: 'Python', 
      files: 24, 
      lastModified: '2 hours ago',
      status: 'active',
      icon: '📦'
    },
    { 
      id: '2', 
      name: 'React Dashboard', 
      language: 'TypeScript', 
      files: 18, 
      lastModified: '1 day ago',
      status: 'active',
      icon: '📊'
    },
    { 
      id: '3', 
      name: 'API Backend', 
      language: 'Node.js', 
      files: 32, 
      lastModified: '3 days ago',
      status: 'archived',
      icon: '⚙️'
    },
    { 
      id: '4', 
      name: 'ML Model Training', 
      language: 'Python', 
      files: 15, 
      lastModified: '1 week ago',
      status: 'active',
      icon: '🤖'
    },
  ])

  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    files: projects.reduce((sum, p) => sum + p.files, 0),
    thisWeek: 12
  }

  const getLanguageColor = (lang: string): string => {
    const colors: Record<string, string> = {
      'Python': 'text-blue-400',
      'TypeScript': 'text-blue-500',
      'JavaScript': 'text-yellow-400',
      'Node.js': 'text-green-400',
    }
    return colors[lang] || 'text-gray-400'
  }

  const getLanguageDot = (lang: string): string => {
    const colors: Record<string, string> = {
      'Python': 'bg-blue-400',
      'TypeScript': 'bg-blue-500',
      'JavaScript': 'bg-yellow-400',
      'Node.js': 'bg-green-400',
    }
    return colors[lang] || 'bg-gray-400'
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 overflow-y-auto">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Projects
          </h1>
          <p className="text-gray-400 text-base">Manage and organize your coding projects</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Projects */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-850 rounded-xl p-5 border border-gray-700/50 hover:border-gray-600 transition-all hover:shadow-lg hover:shadow-gray-900/50 group">
            <div className="flex items-center justify-between mb-2">
              <div className="text-5xl font-bold text-white group-hover:scale-110 transition-transform">
                {stats.total}
              </div>
              <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center group-hover:bg-gray-600/50 transition-colors">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
            </div>
            <div className="text-sm text-gray-400 font-medium">Total Projects</div>
          </div>

          {/* Active Projects */}
          <div className="bg-gradient-to-br from-green-900/20 to-gray-850 rounded-xl p-5 border border-green-700/30 hover:border-green-600/50 transition-all hover:shadow-lg hover:shadow-green-900/20 group">
            <div className="flex items-center justify-between mb-2">
              <div className="text-5xl font-bold text-green-400 group-hover:scale-110 transition-transform">
                {stats.active}
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="text-sm text-gray-400 font-medium">Active</div>
          </div>

          {/* Total Files */}
          <div className="bg-gradient-to-br from-blue-900/20 to-gray-850 rounded-xl p-5 border border-blue-700/30 hover:border-blue-600/50 transition-all hover:shadow-lg hover:shadow-blue-900/20 group">
            <div className="flex items-center justify-between mb-2">
              <div className="text-5xl font-bold text-blue-400 group-hover:scale-110 transition-transform">
                {stats.files}
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="text-sm text-gray-400 font-medium">Total Files</div>
          </div>

          {/* This Week */}
          <div className="bg-gradient-to-br from-purple-900/20 to-gray-850 rounded-xl p-5 border border-purple-700/30 hover:border-purple-600/50 transition-all hover:shadow-lg hover:shadow-purple-900/20 group">
            <div className="flex items-center justify-between mb-2">
              <div className="text-5xl font-bold text-purple-400 group-hover:scale-110 transition-transform">
                {stats.thisWeek}
              </div>
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="text-sm text-gray-400 font-medium">This Week</div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
          {projects.map(project => (
            <div
              key={project.id}
              className="bg-gradient-to-br from-gray-800 to-gray-850 rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group hover:shadow-xl hover:shadow-blue-900/20 hover:-translate-y-1"
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">
                    {project.icon}
                  </div>
                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-1.5">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${getLanguageDot(project.language)}`}></span>
                      <span className={`text-sm font-medium ${getLanguageColor(project.language)}`}>
                        {project.language}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Status Badge */}
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  project.status === 'active' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-gray-700/50 text-gray-400 border border-gray-600/30'
                }`}>
                  {project.status}
                </span>
              </div>
              
              {/* File Count and Time */}
              <div className="flex items-center justify-between text-sm mb-4 px-1">
                <div className="flex items-center gap-2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium">{project.files} files</span>
                </div>
                <span className="text-gray-500 text-xs">
                  {project.lastModified}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-700/50">
                <button className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-blue-600/50 active:scale-95">
                  Open
                </button>
                <button className="px-4 py-2.5 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white text-sm font-medium rounded-lg transition-all active:scale-95 group/btn">
                  <svg className="w-5 h-5 group-hover/btn:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Create New Project Button */}
        <button className="w-full p-8 bg-gradient-to-br from-gray-800 to-gray-850 border-2 border-dashed border-gray-700/50 rounded-xl hover:border-blue-500/50 hover:bg-gradient-to-br hover:from-gray-800 hover:to-blue-900/10 transition-all duration-300 group hover:shadow-xl hover:shadow-blue-900/10">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center group-hover:scale-110 transition-transform border border-blue-500/30">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <div className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-1">
                Create New Project
              </div>
              <div className="text-sm text-gray-400">
                Start a new coding project with AI assistance
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
