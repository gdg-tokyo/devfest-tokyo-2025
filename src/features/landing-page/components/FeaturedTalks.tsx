import React from 'react'
import { getTalks, getSessions, getSpeakers } from '@/lib/data-parser'
import { Talk, Session, Speaker } from '@/types'
import TalkCard from '@/components/common/TalkCard'

const FeaturedTalks = () => {
  const allTalks = getTalks()
  const allSessions = getSessions()
  const allSpeakers = getSpeakers()

  // TODO: Replace with the actual talk IDs provided by the user
  const featuredTalkIds = ['genai-202', 'cloud-203', 'mobile-201']

  const featuredTalks = allTalks.filter((talk) =>
    featuredTalkIds.includes(talk.id)
  )

  const talkSessionMap = new Map<string, Session>()
  allSessions.forEach((session) => {
    session.talk_ids.forEach((talkId) => {
      talkSessionMap.set(talkId, session)
    })
  })

  const speakersMap = new Map<string, Speaker>(
    allSpeakers.map((s) => [s.id, s])
  )

  return (
    <section className="py-12 bg-off-white">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Talks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTalks.map((talk: Talk) => {
            const session = talkSessionMap.get(talk.id)
            if (!session) return null

            const speakers = talk.speaker_ids
              .map((speakerId) => speakersMap.get(speakerId))
              .filter((s): s is Speaker => s !== null)

            return (
              <TalkCard
                key={talk.id}
                talk={talk}
                sessionId={session.id}
                session={session}
                speakers={speakers}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturedTalks
