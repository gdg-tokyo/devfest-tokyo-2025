import TalkCard from '@/components/common/TalkCard'
import { getSessions, getSpeakers, getTalks } from '@/lib/data-parser'
import { Session, Speaker, Talk } from '@/types'

const FeaturedTalks = () => {
  const allTalks = getTalks()
  const allSessions = getSessions()
  const allSpeakers = getSpeakers()

  // TODO: Replace with the actual talk IDs provided by the user
  const featuredTalkIds = [
    '4e750be0', // Xinmei san
    '436aadeb', // Oikawa san
  ]

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
    <section
      className="container mx-auto lg:px-8 max-w-screen-md lg:max-w-screen-xl bg-off-white"
      data-testid="featured-talks-section"
    >
      <div className="py-12">
        <h2 className="text-3xl font-bold text-center mb-4">基調講演</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
