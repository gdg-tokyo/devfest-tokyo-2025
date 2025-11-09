import { Session, Talk, Speaker } from '@/types'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PersonIcon from '@mui/icons-material/Person'
import Link from 'next/link'
import React from 'react'
import { getLevelColor } from '@/lib/style-utils'
import HtmlContent from '@/components/common/HtmlContent'

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
  const timeStart = talk?.time_start || 'N/A'
  const timeEnd = talk?.time_end || 'N/A'

  return (
    <Link
      href={`/talks/${talk.id}`}
      className="border-2 border-gray-800 rounded-lg p-4 mb-4 bg-white shadow-md flex flex-col justify-between min-h-[150px] cursor-pointer hover:shadow-lg transition-shadow duration-200"
    >
      <article talk-card-id={talk.id}>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {talk.title}
          </h3>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <div className="flex items-center">
              <PersonIcon className="mr-1" />
              <span>{speakerNames}</span>
            </div>
            <div className="flex items-center">
              <AccessTimeIcon className="mr-1" />
              <span>
                {timeStart} - {timeEnd}
              </span>
            </div>
          </div>
          <div className="text-gray-600 text-sm line-clamp-3">
            <HtmlContent html={talk.abstract} />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex flex-wrap gap-1 mt-2">
            {talk?.level &&
              talk.level.map((levelItem) => (
                <span
                  key={levelItem}
                  className={`text-xs px-1 py-0 rounded-full border border-black ${getLevelColor(
                    levelItem as 'Beginner' | 'Intermediate' | 'Advanced'
                  )} text-gray-800`}
                >
                  {levelItem}
                </span>
              ))}
          </div>
        </div>
      </article>
    </Link>
  )
}

export default TalkCard
