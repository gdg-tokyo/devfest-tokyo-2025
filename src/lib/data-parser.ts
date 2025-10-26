import { Session, Speaker, Talk, Stakeholder } from '@/types'

interface DataCacheEntry {
  speakers: Speaker[]
  talks: Talk[]
  sessions: Session[]
  stakeholders: Stakeholder[]
}

const dataCache: { [key: string]: DataCacheEntry } = {}

// Helper function to load data based on directory
export function _loadData(dataDir: string): DataCacheEntry {
  if (dataCache[dataDir]) {
    return dataCache[dataDir]
  }

  const speakers = require(`../data/${dataDir}/speakers.json`)
  const talks = require(`../data/${dataDir}/talks.json`)
  const sessions = require(`../data/${dataDir}/sessions.json`)
  const stakeholders = require(`../data/${dataDir}/stakeholders.json`)
  console.log(`Loading speakers from: src/data/${dataDir}/speakers.json`)
  console.log(`Loading talks from: src/data/${dataDir}/talks.json`)
  console.log(`Loading sessions from: src/data/${dataDir}/sessions.json`)
  console.log(
    `Loading stakeholders from: src/data/${dataDir}/stakeholders.json`
  )

  const loadedData: DataCacheEntry = { speakers, talks, sessions, stakeholders }
  dataCache[dataDir] = loadedData // Cache the loaded data
  return loadedData
}

export function getSessions(): Session[] {
  const env = process.env.NEXT_PUBLIC_DEVFEST_TOKYO_2025_TARGET_ENV || 'PROD'
  const dataDir = env === 'DEV' ? 'dev' : 'prod'

  const {
    speakers: speakersData,
    talks: talksData,
    sessions: sessionsData,
  } = _loadData(dataDir)

  const speakersMap = new Map<string, Speaker>(
    speakersData.map((s: Speaker) => [s.id, s])
  )
  const talksMap = new Map<string, Talk>(talksData.map((t: Talk) => [t.id, t]))

  const sessions: Session[] = (
    sessionsData.map((session: Session) => {
      const talks: Talk[] = session.talk_ids
        .map((talkId) => {
          const talk = talksMap.get(talkId)
          if (!talk) {
            return null // Or handle as an error/dummy talk
          }

          const speakers: Speaker[] = talk.speaker_ids
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
                job: speaker.job,
                twitter_handle: speaker.twitter_handle,
              }
            })
            .filter((s): s is Speaker => s !== null)

          return {
            id: talk.id,
            title: talk.title,
            abstract: talk.abstract,
            speaker_ids: talk.speaker_ids,
          }
        })
        .filter((t): t is Talk => t !== null)

      if (talks.length === 0) {
        return null
      }

      return {
        id: session.id,
        talk_ids: session.talk_ids,
        track: session.track,
        time_start: session.time_start,
        time_end: session.time_end,
        title: session.title,
        level: session.level,
        tech_tags: session.tech_tags,
        description: session.description,
        perspective: talks.flatMap((t) => t.perspective || []),
      }
    }) as (Session | null)[]
  ).filter((s): s is Session => s !== null)

  return sessions
}

export function getTalks(): Talk[] {
  const env = process.env.NEXT_PUBLIC_DEVFEST_TOKYO_2025_TARGET_ENV || 'PROD'
  const dataDir = env === 'DEV' ? 'dev' : 'prod'
  const { talks: talksData } = _loadData(dataDir)
  return talksData
}

export function getSpeakers(): Speaker[] {
  const env = process.env.NEXT_PUBLIC_DEVFEST_TOKYO_2025_TARGET_ENV || 'PROD'
  const dataDir = env === 'DEV' ? 'dev' : 'prod'
  const { speakers: speakersData } = _loadData(dataDir)
  return speakersData
}

export function getStakeholders(): Stakeholder[] {
  const env = process.env.NEXT_PUBLIC_DEVFEST_TOKYO_2025_TARGET_ENV || 'PROD'
  const dataDir = env === 'DEV' ? 'dev' : 'prod'
  const { stakeholders: stakeholdersData } = _loadData(dataDir)
  return stakeholdersData
}

export function getTalkById(
  id: string
): { talk: Talk; speakers: Speaker[] } | undefined {
  const env = process.env.NEXT_PUBLIC_DEVFEST_TOKYO_2025_TARGET_ENV || 'PROD'
  const dataDir = env === 'DEV' ? 'dev' : 'prod'

  const { speakers: speakersData, talks: talksData } = _loadData(dataDir)

  const talksMap = new Map<string, any>(talksData.map((t: Talk) => [t.id, t]))
  const speakersMap = new Map<string, Speaker>(
    speakersData.map((s: Speaker) => [s.id, s])
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
    talk: {
      ...talk,
      tech_tags: talk.tech_tags || [],
      level: talk.level ? [talk.level] : [],
      perspective: talk.perspective ? [talk.perspective] : [],
    },
    speakers,
  }
}
