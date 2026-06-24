export default function HistoryView() {
  const chatHistory = [
    {
      id: '1',
      title: 'Prime Number Function',
      date: '2 hours ago',
      messages: 8,
      language: 'Python'
    },
    {
      id: '2',
      title: 'React Component Debugging',
      date: '5 hours ago',
      messages: 12,
      language: 'TypeScript'
    },
    {
      id: '3',
      title: 'API Integration',
      date: '1 day ago',
      messages: 15,
      language: 'JavaScript'
    },
    {
      id: '4',
      title: 'Database Query Optimization',
      date: '2 days ago',
      messages: 20,
      language: 'SQL'
    },
    {
      id: '5',
      title: 'CSS Grid Layout Help',
      date: '3 days ago',
      messages: 6,
      language: 'CSS'
    },
  ]

  return (
    <div className="flex-1 bg-gray-900 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Chat History</h2>
          <p className="text-gray-400">Browse your previous conversations with CodePilot AI</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full px-4 py-3 pl-11 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <svg 
              className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-3">
          {chatHistory.map(chat => (
            <div
              key={chat.id}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-xl flex-shrink-0">
                    💬
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold mb-1 group-hover:text-blue-400 transition-colors">
                      {chat.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        {chat.messages} messages
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        {chat.language}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {chat.date}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <button className="w-full mt-4 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-blue-500 transition-all">
          Load More Conversations
        </button>
      </div>
    </div>
  )
}
