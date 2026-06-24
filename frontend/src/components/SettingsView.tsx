import { useState } from 'react'

export default function SettingsView() {
  const [useOllama, setUseOllama] = useState(true)
  const [theme, setTheme] = useState('dark')
  const [fontSize, setFontSize] = useState(14)
  const [autoSave, setAutoSave] = useState(true)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')

  const handleSave = () => {
    setSaveStatus('saving')
    setTimeout(() => {
      setSaveStatus('success')
      setTimeout(() => setSaveStatus('idle'), 3000)
    }, 1000)
  }

  return (
    <div className="flex-1 bg-gray-900 overflow-y-auto">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
          <p className="text-sm text-gray-400">Customize your AI Unica experience</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6">
        {/* Success Message */}
        {saveStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-center gap-3">
            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-green-400 text-sm font-medium">Settings saved successfully</p>
          </div>
        )}

        {/* AI Configuration */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <span>🤖</span>
            AI Configuration
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <label className="text-sm font-medium text-white block mb-1">Use Local AI (Ollama)</label>
                <p className="text-sm text-gray-400">Run AI models locally without API costs</p>
              </div>
              <button
                onClick={() => setUseOllama(!useOllama)}
                className={`relative w-12 h-6 rounded-full transition-all shadow-inner ${
                  useOllama ? 'bg-blue-600' : 'bg-gray-700'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    useOllama ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="pt-6 border-t border-gray-700">
              <label className="text-sm font-medium text-white block mb-2">AI Model</label>
              <select className="w-full h-10 px-4 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                <option>llama3.2:3b (Local - Fast)</option>
                <option>gpt-4o-mini (OpenAI - Cheap)</option>
                <option>gpt-4 (OpenAI - Best)</option>
                <option>claude-3-sonnet (Anthropic)</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">Choose the AI model that best fits your needs</p>
            </div>

            <div className="pt-6 border-t border-gray-700">
              <label className="text-sm font-medium text-white block mb-2">OpenAI API Key</label>
              <input
                type="password"
                placeholder="sk-..."
                className="w-full h-10 px-4 bg-gray-700 border border-gray-600 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">Only needed if not using local AI</p>
            </div>
          </div>
        </div>

        {/* Editor Settings */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <span>💻</span>
            Editor Settings
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-white block mb-3">Theme</label>
              <div className="grid grid-cols-3 gap-3">
                {['dark', 'light', 'monokai'].map(t => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`h-10 px-4 rounded-lg font-medium transition-all ${
                      theme === t
                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white border border-gray-600'
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-white">Font Size</label>
                <span className="text-sm font-mono text-blue-400">{fontSize}px</span>
              </div>
              <input
                type="range"
                min="12"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>12px</span>
                <span>24px</span>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-700 flex items-center justify-between">
              <div className="flex-1 pr-4">
                <label className="text-sm font-medium text-white block mb-1">Auto Save</label>
                <p className="text-sm text-gray-400">Automatically save changes</p>
              </div>
              <button
                onClick={() => setAutoSave(!autoSave)}
                className={`relative w-12 h-6 rounded-full transition-all shadow-inner ${
                  autoSave ? 'bg-blue-600' : 'bg-gray-700'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    autoSave ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <span>ℹ️</span>
            System Information
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-400">Version</span>
              <span className="text-sm text-white font-mono font-medium">v0.2.0</span>
            </div>
            <div className="flex justify-between items-center py-2 border-t border-gray-700">
              <span className="text-sm text-gray-400">Backend Status</span>
              <span className="text-sm text-green-400 flex items-center gap-2 font-medium">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></span>
                Connected
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-t border-gray-700">
              <span className="text-sm text-gray-400">AI Service</span>
              <span className="text-sm text-white font-medium">Ollama (Local)</span>
            </div>
            <div className="flex justify-between items-center py-2 border-t border-gray-700">
              <span className="text-sm text-gray-400">Database</span>
              <span className="text-sm text-white font-medium">SQLite</span>
            </div>
            <div className="flex justify-between items-center py-2 border-t border-gray-700">
              <span className="text-sm text-gray-400">Platform</span>
              <span className="text-sm text-white font-medium">AI Unica Professional</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button 
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="flex-1 h-11 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            {saveStatus === 'saving' ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </span>
            ) : (
              'Save Settings'
            )}
          </button>
          <button className="h-11 px-6 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg font-medium transition-all border border-gray-600">
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  )
}
