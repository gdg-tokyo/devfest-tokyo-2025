'use client'

import React, { useState, useMemo, Suspense } from 'react'

import { getSessions, getTalks, getSpeakers } from '@/lib/data-parser'
import { Session, Talk, Speaker } from '@/types'

import TalkCard from '@/components/common/TalkCard'

import FilterSystem from '@/components/common/FilterSystem'

import SessionModal from '@/components/common/SessionModal'

import { useRouter, useSearchParams } from 'next/navigation'

interface TalkWithSessionInfo extends Talk {
  sessionLevel: string[]

  sessionPerspective: ('Introduction' | 'Experience' | 'Challenge')[]

  sessionId: string

  session: Session

  speakers: Speaker[] // Add speakers here, as Talk only has speaker_ids
}

const TalksPageContent = () => {
  const router = useRouter()

  const searchParams = useSearchParams()

  const modalSessionId = searchParams.get('sessionId')

  const allSessions: Session[] = getSessions()
  const allRawTalks: Talk[] = getTalks()
  const allSpeakers: Speaker[] = getSpeakers()

  // Declare state variables for filters
  const [keyword, setKeyword] = useState<string>('')
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [selectedTechTags, setSelectedTechTags] = useState<string[]>([])

  const allTalks: TalkWithSessionInfo[] = useMemo(() => {
    const speakersMap = new Map<string, Speaker>(
      allSpeakers.map((speaker) => [speaker.id, speaker])
    )
    const talksMap = new Map<string, Talk>(
      allRawTalks.map((talk) => [talk.id, talk])
    )

    return allSessions.flatMap((session) =>
      session.talk_ids
        .map((talkId) => {
          const talk = talksMap.get(talkId)
          if (!talk) {
            return null // Should not happen if data is consistent
          }
          const talkSpeakers = talk.speaker_ids
            .map((speakerId) => speakersMap.get(speakerId))
            .filter((speaker): speaker is Speaker => speaker !== undefined)

          return {
            ...talk,
            sessionLevel: session.level,
            sessionPerspective: talk.perspective,
            sessionId: session.id,
            session: session,
            speakers: talkSpeakers,
          }
        })
        .filter((talk): talk is TalkWithSessionInfo => talk !== null)
    )
  }, [allSessions, allRawTalks, allSpeakers])

  const filteredTalks = useMemo(() => {
    return allTalks.filter((talk) => {
      const matchesKeyword =
        keyword === '' ||
        talk.title.toLowerCase().includes(keyword.toLowerCase()) ||
        talk.abstract.toLowerCase().includes(keyword.toLowerCase()) ||
        talk.speakers.some((speaker) =>
          speaker.name.toLowerCase().includes(keyword.toLowerCase())
        )

      const matchesLevel =
        selectedLevels.length === 0 ||
        (talk.sessionLevel &&
          talk.sessionLevel.some((l) => selectedLevels.includes(l)))

      const matchesTechTags =
        selectedTechTags.length === 0 ||
        talk.tech_tags.some((tag) => selectedTechTags.includes(tag))

      return matchesKeyword && matchesLevel && matchesTechTags
    })
  }, [allTalks, keyword, selectedLevels, selectedTechTags]) // Dependency array is now correct

  const selectedSession = useMemo(() => {
    return allSessions.find((session) => session.id === modalSessionId) || null
  }, [allSessions, modalSessionId])

  const handleCloseModal = () => {
    router.push('/talks', { scroll: false })
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 max-w-screen-md lg:max-w-screen-xl p-4">
      <h1 className="text-3xl font-bold mb-6">Talks Page</h1>

      <FilterSystem
        onFilterChange={({ levels, keyword, techTags }) => {
          setSelectedLevels(levels)
          setKeyword(keyword)
          setSelectedTechTags(techTags)
        }}
        availableLevels={Array.from(
          new Set(allSessions.flatMap((session) => session.level || []))
        ).filter((level): level is string =>
          ['Beginner', 'Intermediate', 'Advanced'].includes(level)
        )}
        availableTechTags={
          Array.from(
            new Set(allRawTalks.flatMap((talk) => talk.tech_tags || []))
          ).filter(Boolean) as string[]
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
        {filteredTalks.length > 0 ? (
          filteredTalks.map((talk) => (
            <TalkCard
              key={talk.id}
              talk={talk}
              sessionId={talk.sessionId}
              session={talk.session}
              speakers={talk.speakers}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No talks found matching your criteria.
          </p>
        )}
      </div>

      <SessionModal session={selectedSession} onClose={handleCloseModal} />
    </div>
  )
}

const TalksPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TalksPageContent />
    </Suspense>
  )
}

export default TalksPage
