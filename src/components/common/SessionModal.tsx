import React, { useEffect, useRef } from 'react'
import { Session } from '@/types'

interface SessionModalProps {
  session: Session | null
  onClose: () => void
}

const SessionModal: React.FC<SessionModalProps> = ({ session, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (session) {
      document.addEventListener('keydown', handleKeyDown)
      // Focus the modal when it opens
      modalRef.current?.focus()
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [session, onClose])

  if (!session) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-modal-title"
      tabIndex={-1} // Make the modal focusable
      ref={modalRef}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
          aria-label="Close session details"
        >
          &times;
        </button>
        <h2 id="session-modal-title" className="text-2xl font-bold mb-4">
          {session.title}
        </h2>
        <p className="text-gray-700 mb-4">{session.longDescription}</p>
        {/* Add more session details here */}
        <div className="mt-4">
          <p>
            <strong>Level:</strong> {session.level}
          </p>
          <p>
            <strong>Perspective:</strong> {session.perspective}
          </p>
          <p>
            <strong>Time:</strong> {session.time_start} - {session.time_end}
          </p>
          <p>
            <strong>Track:</strong> {session.track}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SessionModal
