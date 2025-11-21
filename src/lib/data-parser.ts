import devSessions from '@/data/dev/sessions.json'
import devSessionChairs from '@/data/dev/session-chairs.json'
import devSpeakers from '@/data/dev/speakers.json'
import devStakeholders from '@/data/dev/stakeholders.json'
import devTalks from '@/data/dev/talks.json'
import prodSessions from '@/data/prod/sessions.json'
import prodSessionChairs from '@/data/prod/session-chairs.json'
import prodSpeakers from '@/data/prod/speakers.json'
import prodStakeholders from '@/data/prod/stakeholders.json'
import prodTalks from '@/data/prod/talks.json'
import { Session, SessionChair, Speaker, Stakeholder, Talk } from '@/types'

interface DataCacheEntry {
  speakers: Speaker[]
  talks: Talk[]
  sessions: Session[]
  stakeholders: Stakeholder[]
  sessionChairs: SessionChair[]
}

const dataCache: { [key: string]: DataCacheEntry } = {}

// Helper function to load data based on directory
export function _loadData(dataDir: string): DataCacheEntry {
  if (dataCache[dataDir]) {
    return dataCache[dataDir]
  }

  let speakers, rawTalks, rawSessions, rawStakeholders, rawSessionChairs
  if (dataDir === 'dev') {
    speakers = devSpeakers
    rawTalks = devTalks
    rawSessions = devSessions
    rawStakeholders = devStakeholders
    rawSessionChairs = devSessionChairs
  } else {
    speakers = prodSpeakers
    rawTalks = prodTalks
    rawSessions = prodSessions
    rawStakeholders = prodStakeholders
    rawSessionChairs = prodSessionChairs
  }

  const sessions: Session[] = (rawSessions as any[]).map((s) => ({
    ...s,
    perspective: s.perspective || [],
    thumbnail_url: s.thumbnail_url,
    session_chair_id: s.session_chair_id,
  }))

  const talkSessionMap = new Map<string, Session>()
  sessions.forEach((session: Session) => {
    session.talk_ids.forEach((talkId) => {
      talkSessionMap.set(talkId, session)
    })
  })

  const talks: Talk[] = (rawTalks as any[]).map((talk: any) => {
    const session = talkSessionMap.get(talk.id)
    return {
      ...talk,
      time_start: talk.time_start || session?.time_start || '',
      time_end: talk.time_end || session?.time_end || '',
      track: session?.track || '',
      level: Array.isArray(talk.level)
        ? talk.level
        : talk.level
        ? [talk.level]
        : [],
      perspective: Array.isArray(talk.perspective)
        ? talk.perspective
        : talk.perspective
        ? [talk.perspective]
        : [],
      tech_tags: talk.tech_tags || [],
      thumbnail_url: talk.thumbnail_url,
    }
  })

  const loadedData: DataCacheEntry = {
    speakers,
    talks,
    sessions,
    stakeholders: rawStakeholders as Stakeholder[],
    sessionChairs: rawSessionChairs as SessionChair[],
  }
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
      if (!session.talk_ids || session.talk_ids.length === 0) {
        return null;
      }
      const talks: Talk[] = session.talk_ids
        .map((talkId) => {
          const talk = talksMap.get(talkId)
          if (!talk) {
            return null // Or handle as an error/dummy talk
          }
          return talk;
        })
        .filter((t): t is Talk => t !== null)


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
        thumbnail_url: session.thumbnail_url,
        session_chair_id: session.session_chair_id,
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
  id: string,
): { talk: Talk; speakers: Speaker[] } | undefined {
  const env = process.env.NEXT_PUBLIC_DEVFEST_TOKYO_2025_TARGET_ENV || 'PROD'
  const dataDir = env === 'DEV' ? 'dev' : 'prod'

  const { speakers: speakersData, talks: talksData } = _loadData(dataDir)

  const talksMap = new Map<string, Talk>(talksData.map((t: Talk) => [t.id, t]))
  const speakersMap = new Map<string, Speaker>(
    speakersData.map((s: Speaker) => [s.id, s]),
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

export function getSessionChairById(id: string): SessionChair | undefined {
  const env = process.env.NEXT_PUBLIC_DEVFEST_TOKYO_2025_TARGET_ENV || 'PROD'
  const dataDir = env === 'DEV' ? 'dev' : 'prod'

  const { sessionChairs: sessionChairsData, speakers: speakersData } = _loadData(dataDir)

  const sessionChairsMap = new Map<string, SessionChair>(
    sessionChairsData.map((sc: SessionChair) => [sc.id, sc])
  )
  const speakersMap = new Map<string, Speaker>(
    speakersData.map((s: Speaker) => [s.id, s])
  )

  const sessionChair = sessionChairsMap.get(id)

  if (!sessionChair) {
    return undefined
  }

  const chairsWithDetails = sessionChair.chairs.map((chair) => {
    const speakerDetails = speakersMap.get(chair.id)
    return speakerDetails || chair // Return full speaker details if found, otherwise original chair object
  })

  return {
    ...sessionChair,
    chairs: chairsWithDetails,
  }
}

export function getSpeakerGalleryData(): { speakers: Speaker[]; sessionChairs: SessionChair[] } {
  const env = process.env.NEXT_PUBLIC_DEVFEST_TOKYO_2025_TARGET_ENV || 'PROD'
  const dataDir = env === 'DEV' ? 'dev' : 'prod'
  const { speakers, sessionChairs } = _loadData(dataDir)
  return { speakers, sessionChairs }
}
