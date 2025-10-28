import React from 'react'
import { Session, Talk, Speaker } from '@/types'
import TalkCard from '@/components/common/TalkCard'
import HtmlContent from '@/components/common/HtmlContent'
import { getLevelColor, getPerspectiveColor } from '@/lib/style-utils'
import { getTalks, getSpeakers } from '@/lib/data-parser'

interface SessionDetailProps {
  session: Session
}

const SessionDetail: React.FC<SessionDetailProps> = ({ session }) => {
  const allTalks = getTalks()
  const allSpeakers = getSpeakers()

  const talksMap = new Map<string, Talk>(
    allTalks.map((talk) => [talk.id, talk])
  )
  const speakersMap = new Map<string, Speaker>(
    allSpeakers.map((speaker) => [speaker.id, speaker])
  )

  const sessionTalks = session.talk_ids
    .map((talkId) => {
      const talk = talksMap.get(talkId)
      if (!talk) {
        return null
      }
      const talkSpeakers = talk.speaker_ids
        .map((speakerId) => speakersMap.get(speakerId))
        .filter((speaker): speaker is Speaker => speaker !== undefined)
      return { talk, speakers: talkSpeakers }
    })
    .filter(
      (item): item is { talk: Talk; speakers: Speaker[] } => item !== null
    )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">{session.title}</h1>
      <div className="flex flex-wrap gap-2">
        {session.level &&
          session.level.map((levelItem) => (
            <span
              key={levelItem}
              className={`text-xxs px-2 py-1 rounded-full border border-black
              ${getLevelColor(levelItem as 'Beginner' | 'Intermediate' | 'Advanced')}
            `}
            >
              {levelItem}
            </span>
          ))}
      </div>
      <HtmlContent html={session.description} />

      {sessionTalks.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mt-6">
            Talks in This Session
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {sessionTalks.map(({ talk, speakers }) => (
              <TalkCard
                key={talk.id}
                talk={talk}
                sessionId={session.id}
                session={session}
                speakers={speakers}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SessionDetail
