import { useEffect } from 'react'

interface NotificationProps {
  message: string
  type?: 'info' | 'success' | 'warning' | 'error'
  onClose: () => void
  duration?: number
}

export default function Notification({ 
  message, 
  type = 'info', 
  onClose, 
  duration = 5000 
}: NotificationProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )
      case 'warning':
        return (
          <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      default: // info
        return (
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
    }
  }

  const getColorClasses = () => {
    switch (type) {
      case 'success':
        return 'border-green-500/30 bg-green-500/10'
      case 'warning':
        return 'border-yellow-500/30 bg-yellow-500/10'
      case 'error':
        return 'border-red-500/30 bg-red-500/10'
      default:
        return 'border-blue-500/30 bg-blue-500/10'
    }
  }

  return (
    <div className="fixed top-4 right-4 z-[9999] animate-slide-in">
      <div className={`
        min-w-[320px] max-w-md rounded-lg border backdrop-blur-sm
        ${getColorClasses()}
        shadow-2xl p-4 flex items-start gap-3
      `}>
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>

        {/* Message */}
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm leading-relaxed">
            {message}
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors"
        >
          <svg className="w-4 h-4 text-gray-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
