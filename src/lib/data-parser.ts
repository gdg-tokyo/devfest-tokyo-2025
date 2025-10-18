import { OldSession, OldTalk, OldSpeaker, Speaker, Talk } from '@/types'
import speakersData from '../data/speakers.json'
import talksData from '../data/talks.json'
import sessionsData from '../data/sessions.json'

export function getSessions(): OldSession[] {
  const speakersMap = new Map<string, Speaker>(
    speakersData.map((s) => [s.id, s])
  )
  const talksMap = new Map<string, Talk>(talksData.map((t) => [t.id, t]))

  const oldSessions: OldSession[] = sessionsData
    .map((session) => {
      const oldTalks: OldTalk[] = session.talk_ids
        .map((talkId) => {
          const talk = talksMap.get(talkId)
          if (!talk) {
            return null // Or handle as an error/dummy talk
          }

          const speakers: OldSpeaker[] = talk.speaker_ids
            .map((speakerId) => {
              const speaker = speakersMap.get(speakerId)
              if (!speaker) {
                return null
              }
              return {
                id: speaker.id,
                name: speaker.name,
                bio: speaker.bio,
                photo_url: speaker.photo_url,
                job: '',
                twitter_handle: '',
              }
            })
            .filter((s): s is OldSpeaker => s !== null)

          return {
            id: talk.id,
            title: talk.title,
            abstract: talk.abstract,
            speakers: speakers,
            speaker_ids: talk.speaker_ids,
            tech_tags: [],
            is_keynote: false,
          }
        })
        .filter((t): t is OldTalk => t !== null)

      if (oldTalks.length === 0) {
        return null
      }

      return {
        id: session.id,
        talk_ids: session.talk_ids,
        track: session.track,
        time_start: session.time_start,
        time_end: session.time_end,
        room: session.room,
        title: session.title,
        level: session.level,
        tech_tags: session.tech_tags,
        description: session.description,
        talks: oldTalks,
      }
    })
    .filter((s): s is OldSession => s !== null)

  return oldSessions
}

export function getTalkById(
  id: string
): { talk: Talk; speakers: Speaker[] } | undefined {
  const talksMap = new Map<string, Talk>(talksData.map((t) => [t.id, t]))
  const speakersMap = new Map<string, Speaker>(
    speakersData.map((s) => [s.id, s])
  )

  const talk = talksMap.get(id)

  if (!talk) {
    return undefined
  }

  const speakers = talk.speaker_ids
    .map((speakerId: string) => {
      const speaker = speakersMap.get(speakerId)
      if (!speaker) {
        return null
      }
      return speaker
    })
    .filter((s: Speaker | null): s is Speaker => s !== null)

  return {
    talk,
    speakers,
  }
}
