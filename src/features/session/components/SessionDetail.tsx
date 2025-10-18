import React from 'react'
import { OldSession } from '@/lib/data-parser'
import TalkCard from '@/components/common/TalkCard'
import { getLevelColor, getPerspectiveColor } from '@/lib/style-utils'

interface SessionDetailProps {
  session: OldSession
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
              ${getPerspectiveColor(session.perspective)}
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
