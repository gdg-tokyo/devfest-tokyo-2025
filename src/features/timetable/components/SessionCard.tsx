import React from 'react'
import Link from 'next/link'
import { Session } from '@/types' // Import interfaces from src/types

interface SessionCardProps {
  session: Session
  isGrayedOut?: boolean
}

const getLevelColor = (level: 'Beginner' | 'Intermediate' | 'Advanced') => {
  switch (level) {
    case 'Beginner':
      return 'bg-gdg-pastel-blue'
    case 'Intermediate':
      return 'bg-gdg-pastel-green'
    case 'Advanced':
      return 'bg-gdg-pastel-red'
    default:
      return 'bg-gray-200'
  }
}

const PersonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 inline-block mr-1"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
  </svg>
)

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 inline-block mr-1"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 10.586V7z"
      clipRule="evenodd"
    />
  </svg>
)

const SessionCard: React.FC<SessionCardProps> = ({ session, isGrayedOut }) => {
  // Extract speaker names from the first talk in the session
  const speakerNames =
    session.talks && session.talks.length > 0
      ? session.talks[0].speakers.map((speaker) => speaker.name).join(', ')
      : 'N/A'

  // Assuming time_start and time_end are still part of the session object for display on the card
  // If not, this would need to be adjusted based on the actual data structure
  const timeStart = (session as any).time_start || 'TBA'
  const timeEnd = (session as any).time_end || 'TBA'

  return (
    <Link href={`/sessions/${session.id}`}>
      <div
        className={`bg-white rounded-lg p-4 mb-4 border-2 border-gray-800 font-google-sans cursor-pointer hover:shadow-lg transition-shadow ${isGrayedOut ? 'opacity-30' : ''}`}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {session.title}
        </h3>
        <div className="text-sm text-gray-600 mb-1 flex items-center">
          <PersonIcon />
          <span>{speakerNames}</span>
        </div>
        <div className="text-sm text-gray-600 mb-1 flex items-center">
          <ClockIcon />
          <span>
            {timeStart} - {timeEnd}
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {session.level && (
            <span
              key={session.level}
              className={`text-xs px-1 py-0 rounded-full border border-black ${getLevelColor(session.level)} text-gray-800`}
            >
              {session.level}
            </span>
          )}
          {/* Tech tags are not directly available on the new Session type, assuming they might be on Talk or removed */}
          {/* For now, removing tech_tags display from card to avoid errors */}
        </div>
      </div>
    </Link>
  )
}

export default SessionCard
