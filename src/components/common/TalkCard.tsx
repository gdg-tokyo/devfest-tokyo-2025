import { Session, Talk, Speaker } from '@/types'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PersonIcon from '@mui/icons-material/Person'
import Link from 'next/link'
import React from 'react'
import { getLevelColor } from '@/lib/style-utils'

interface TalkCardProps {
  talk: Talk

  sessionId: string

  session: Session

  speakers: Speaker[] // Add speakers here
}

const TalkCard: React.FC<TalkCardProps> = ({
  talk,
  sessionId,
  session,
  speakers,
}) => {
  const speakerNames = (speakers || [])
    .map((speaker) => speaker.name)
    .join(', ')
  const timeStart = session?.time_start || 'N/A'
  const timeEnd = session?.time_end || 'N/A'

  return (
    <Link
      href={`/talks/${talk.id}`}
      className="border-2 border-gray-800 rounded-lg p-4 mb-4 bg-white shadow-md flex flex-col justify-between min-h-[200px] cursor-pointer hover:shadow-lg transition-shadow duration-200"
    >
      {' '}
      {/* Added flex-col and justify-between */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {talk.title}
        </h3>
        <p className="text-gray-600 text-sm">{talk.abstract}</p>
      </div>
      <div className="mt-4">
        <div className="text-sm text-gray-600 mb-1 flex items-center">
          <PersonIcon className="mr-1" />
          <span>{speakerNames}</span>
        </div>
        <div className="text-sm text-gray-600 mb-1 flex items-center">
          <AccessTimeIcon className="mr-1" />
          <span>
            {timeStart} - {timeEnd}
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {session?.level &&
            session.level.map((levelItem) => (
              <span
                key={levelItem}
                className={`text-xs px-1 py-0 rounded-full border border-black ${getLevelColor(levelItem as 'Beginner' | 'Intermediate' | 'Advanced')} text-gray-800`}
              >
                {levelItem}
              </span>
            ))}
        </div>
      </div>{' '}
    </Link>
  )
}

export default TalkCard
