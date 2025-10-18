import React from 'react'
import { OldSession } from '@/lib/data-parser'
import TalkCard from '@/components/common/TalkCard'

interface SessionDetailProps {
  session: OldSession
}

const getLevelColor = (level: string) => {
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

const SessionDetail: React.FC<SessionDetailProps> = ({ session }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">{session.title}</h1>
      <div className="flex flex-wrap gap-2">
        {session.level &&
          session.level.map((levelItem) => (
            <span
              key={levelItem}
              className={`text-xxs px-2 py-1 rounded-full border border-black
              ${getLevelColor(levelItem)}
            `}
            >
              {levelItem}
            </span>
          ))}
        {session.perspective && (
          <span
            className={`text-xxs px-2 py-1 rounded-full border border-black
              ${session.perspective === 'Introduction' && 'bg-google-blue-500'}
              ${session.perspective === 'Experience' && 'bg-google-green-500'}
              ${session.perspective === 'Challenge' && 'bg-google-red-500'}
            `}
          >
            {session.perspective}
          </span>
        )}
      </div>
      <p className="text-gray-700 whitespace-pre-line">
        {session.longDescription}
      </p>

      {session.talks && session.talks.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mt-6">
            Talks in This Session
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {session.talks.map((talk) => (
              <TalkCard key={talk.id} talk={talk} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SessionDetail
