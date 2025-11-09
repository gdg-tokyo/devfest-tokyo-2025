import React from 'react'
import {
  Session,
  Talk,
  Speaker,
  SessionChair,
  SessionChairCommunity,
} from '@/types'
import TalkCard from '@/components/common/TalkCard'
import HtmlContent from '@/components/common/HtmlContent'
import { getLevelColor, getPerspectiveColor } from '@/lib/style-utils'
import { getTalks, getSpeakers, getSessionChairById } from '@/lib/data-parser'
import Image from 'next/image'
import { withRepoBasePath } from '@/lib/url-utils'

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
    .sort((a, b) => {
      if (!a.talk.time_start) return 1
      if (!b.talk.time_start) return -1
      if (a.talk.time_start < b.talk.time_start) return -1
      if (a.talk.time_start > b.talk.time_start) return 1
      return 0
    })

  const sessionChair = session.session_chair_id
    ? getSessionChairById(session.session_chair_id)
    : undefined

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

      {sessionChair && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mt-6">
            Session Chair
          </h2>
          {sessionChair.community && (
            <div className="border-2 border-gray-800 rounded-lg p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {sessionChair.community.name}
              </h3>
              {sessionChair.community.logo_url && (
                <div className="mb-2">
                  <Image
                    src={withRepoBasePath(sessionChair.community.logo_url)}
                    alt={sessionChair.community.name}
                    width={100}
                    height={100}
                    objectFit="contain"
                  />
                </div>
              )}
              <HtmlContent html={sessionChair.community.description} />
              {sessionChair.community.url && (
                <a
                  href={sessionChair.community.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-google-blue-500 hover:underline"
                >
                  Visit Community
                </a>
              )}
            </div>
          )}

          {sessionChair.chairs.length > 0 && (
            <div className="grid grid-cols-1 gap-4">
              {sessionChair.chairs.map((chair) => (
                <div
                  key={chair.id}
                  className="border-2 border-gray-800 rounded-lg p-4 flex items-center space-x-4"
                >
                  <Image
                    src={withRepoBasePath(chair.photo_url)}
                    alt={chair.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {chair.name}
                    </h3>
                    <p className="text-gray-600">{chair.job}</p>
                    {chair.twitter_handle && (
                      <a
                        href={`https://twitter.com/${chair.twitter_handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-google-blue-500 hover:underline"
                      >
                        @{chair.twitter_handle}
                      </a>
                    )}
                    <HtmlContent html={chair.bio} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SessionDetail
