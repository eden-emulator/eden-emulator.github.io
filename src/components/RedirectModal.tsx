import { X, ExternalLink } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface RedirectModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  gameTitle: string
}

function RedirectModal({ isOpen, onClose, onConfirm, gameTitle }: RedirectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div ref={modalRef} className="relative max-w-md w-full" role="document">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-purple-500/20 blur-3xl" aria-hidden="true" />

        {/* Modal Content */}
        <div className="relative bg-black/90 border border-purple-500/50 rounded-2xl overflow-hidden">
          {/* Header Bar */}
          <div
            className="h-1 bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400"
            aria-hidden="true"
          />

          <div className="p-8">
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Close modal"
            >
              <X
                className="w-5 h-5 text-purple-300 group-hover:text-purple-200"
                aria-hidden="true"
              />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/30 blur-xl" aria-hidden="true" />
                <div className="relative p-4 bg-cyan-500/10 rounded-full border border-cyan-500/50">
                  <ExternalLink className="w-12 h-12 text-cyan-400" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center space-y-4">
              <h3 id="modal-title" className="text-2xl font-bold">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
                  View Full Report
                </span>
              </h3>

              <div id="modal-description" className="space-y-4">
                <p className="text-cyan-100/90 font-light">
                  You're about to view the complete compatibility report for
                </p>

                <p className="text-xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400">
                  {gameTitle}
                </p>

                <p className="text-sm text-cyan-100/70 font-light">
                  This will redirect you to EmuReady.com where you can see additional details,
                  comments, and vote on this report.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-8" role="group" aria-label="Modal actions">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-lg bg-black/60 border border-purple-500/30 text-purple-300 font-semibold hover:bg-purple-500/10 hover:border-purple-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Cancel and close modal"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-6 py-3 rounded-lg bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Continue to EmuReady.com (opens in new tab)"
              >
                <span className="flex items-center justify-center gap-2">
                  Continue
                  <ExternalLink
                    className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    aria-hidden="true"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RedirectModal
