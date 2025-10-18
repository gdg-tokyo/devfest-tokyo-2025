import { Speaker, Talk, Session } from '@/types'
import speakersData from '../data/speakers.json'
import talksData from '../data/talks.json'
import sessionsData from '../data/sessions.json'

// These interfaces represent the old data structure that the UI components expect.
interface OldSpeaker {
  id: string
  name: string
  bio: string
  icon_url: string
  twitter_handle: string
}

interface OldTalk {
  id: string
  title: string
  description_short: string
  speakers: OldSpeaker[]
}

export interface OldSession {
  id: string
  title: string
  longDescription: string
  level?: string[]
  tech_tags?: string[]
  description?: string
  perspective?: 'Introduction' | 'Experience' | 'Challenge'
  talks: OldTalk[]
  time_start: string
  time_end: string
  track: string
}

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
                return {
                  id: speakerId,
                  name: 'Unknown Speaker',
                  bio: '',
                  photoUrl: '',
                  socialLinks: [],
                }
              }
              return {
                id: speaker.id,
                name: speaker.name,
                bio: speaker.bio,
                photoUrl: speaker.icon_url,
                twitter_handle: speaker.twitter_handle,
              }
            })
            .filter((s): s is OldSpeaker => s !== null)

          return {
            id: talk.id,
            title: talk.title,
            description_short: talk.abstract,
            speakers: speakers,
          }
        })
        .filter((t): t is OldTalk => t !== null)

      // If there are no talks for this session, or the first talk is null, return null for the session
      if (oldTalks.length === 0) {
        return null
      }

      // For simplicity, we'll use the details of the first talk for the session's title, longDescription, level, and perspective.
      // This might need refinement based on how multi-talk sessions are presented in the UI.
      const firstTalk = oldTalks[0]

      return {
        id: session.id,
        title: session.title,
        longDescription: session.description,
        level: session.level,
        perspective: talksMap.get(session.talk_ids[0])?.perspective,
        tech_tags: session.tech_tags,
        description: session.description,
        talks: oldTalks,
        time_start: session.time_start,
        time_end: session.time_end,
        track: session.track,
      }
    })
    .filter((s): s is OldSession => s !== null)

  return oldSessions
}
