import HtmlContent from '@/components/common/HtmlContent'
import RegistrationButton from '@/components/common/RegistrationButton'
import SessionChairCommunityCard from '@/components/common/SessionChairCommunityCard'
import SpeakerDetailCard from '@/components/common/SpeakerDetailCard'
import TalkCard from '@/components/common/TalkCard'
import { getSessionChairById, getSpeakers, getTalks } from '@/lib/data-parser'
import { getLevelColor } from '@/lib/style-utils'
import { Session, Speaker, Talk } from '@/types'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image' // Added
import { withRepoBasePath } from '@/lib/url-utils' // Added

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
      {session.thumbnail_url && ( // Added thumbnail rendering
        <div className="border-2 border-gray-800 rounded-lg p-4 bg-white shadow-md mb-4 relative w-full aspect-video">
          <Image
            src={withRepoBasePath(session.thumbnail_url)}
            alt="Session Thumbnail"
            fill
            style={{ objectFit: 'contain' }}
            className="rounded-lg"
            sizes="(max-width: 1280px) 100vw, 1280px"
            placeholder="blur"
            blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          />
        </div>
      )}
      <div className="border-2 border-gray-800 rounded-lg p-4 bg-white shadow-md mb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {session.title}
        </h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {session.level &&
            session.level.map((levelItem) => (
              <span
                key={levelItem}
                className={`text-xxs px-2 py-1 rounded-full border border-black
                ${getLevelColor(
                  levelItem as 'Beginner' | 'Intermediate' | 'Advanced'
                )}
              `}
              >
                {levelItem}
              </span>
            ))}
        </div>
        <HtmlContent html={session.description} />
      </div>

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
                isSessionDetailPage={true}
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
            <SessionChairCommunityCard community={sessionChair.community} />
          )}
          {sessionChair.chairs.length > 0 && (
            <div className="grid grid-cols-1 gap-4">
              {sessionChair.chairs.map((chair) => (
                <SpeakerDetailCard key={chair.id} speaker={chair} />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-16">
        <RegistrationButton href="https://gdg-tokyo.connpass.com/event/369416/">
          今すぐ参加登録
        </RegistrationButton>
        <Link
          href="/timetable"
          className="bg-google-blue-500 hover:bg-google-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg text-center transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          タイムテーブルに戻る
        </Link>
        <Link
          href="/talks"
          className="bg-google-green-500 hover:bg-google-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg text-center transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          トーク一覧に戻る
        </Link>
      </div>
    </div>
  )
}

export default SessionDetail
