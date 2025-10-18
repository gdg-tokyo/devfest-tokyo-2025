'use client'

import OverlayMessageCard from '@/components/common/OverlayMessageCard'
import FilterSystem from '@/features/timetable/components/FilterSystem'
import TimetableGrid from '@/features/timetable/components/TimetableGrid'
import { getSessions, getSpeakers, getTalks } from '@/lib/data-parser'
import { Session, Speaker, Talk } from '@/types'
import { useCallback, useEffect, useMemo, useState } from 'react'

const TimetablePage = () => {
  const allSessions: Session[] = getSessions()

  const [filters, setFilters] = useState<{ levels: string[]; keyword: string }>(
    { levels: [], keyword: '' }
  )
  const [showNoDataMessage, setShowNoDataMessage] = useState(false)

  useEffect(() => {
    if (allSessions.length === 0) {
      setShowNoDataMessage(true)
    } else {
      setShowNoDataMessage(false)
    }
  }, [allSessions])

  const handleFilterChange = useCallback(
    (newFilters: { levels: string[]; keyword: string }) => {
      setFilters(newFilters)
    },
    []
  )

  const allRawTalks = getTalks()
  const allSpeakers = getSpeakers()

  const hasMatchingSessions = useMemo(() => {
    const talksMap = new Map<string, Talk>(
      allRawTalks.map((talk) => [talk.id, talk])
    )
    const speakersMap = new Map<string, Speaker>(
      allSpeakers.map((speaker) => [speaker.id, speaker])
    )

    return allSessions.some((session) => {
      const levelMatch =
        filters.levels.length === 0 ||
        (session.level && session.level.some((l) => filters.levels.includes(l)))

      const sessionTalks = session.talk_ids
        .map((talkId) => talksMap.get(talkId))
        .filter((talk): talk is Talk => talk !== undefined)

      const speakerNames = sessionTalks.flatMap((talk) =>
        talk.speaker_ids
          .map((speakerId) => speakersMap.get(speakerId)?.name)
          .filter((name): name is string => name !== undefined)
      )

      const keywordMatch =
        !filters.keyword ||
        session.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        session.description
          .toLowerCase()
          .includes(filters.keyword.toLowerCase()) ||
        speakerNames.some((name) =>
          name.toLowerCase().includes(filters.keyword.toLowerCase())
        ) ||
        sessionTalks.some((talk) =>
          talk.abstract.toLowerCase().includes(filters.keyword.toLowerCase())
        )

      return levelMatch && keywordMatch
    })
  }, [allSessions, filters, allRawTalks, allSpeakers])

  const availableLevels = useMemo(() => {
    const validLevels = ['Beginner', 'Intermediate', 'Advanced']
    const levels = allSessions
      .flatMap((s) => s.level || []) // Flatten the array of arrays, handle undefined s.level
      .filter((level) => validLevels.includes(level)) // Filter for valid levels
    return Array.from(new Set(levels)) // Get unique levels
  }, [allSessions])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Event Timetable</h1>
      <FilterSystem
        onFilterChange={handleFilterChange}
        availableLevels={availableLevels}
      />
      {allSessions.length > 0 ? (
        hasMatchingSessions ? (
          <TimetableGrid sessions={allSessions} filters={filters} />
        ) : (
          <p>No sessions available matching your criteria.</p>
        )
      ) : (
        <p>No sessions available.</p>
      )}
      <OverlayMessageCard
        message="Session data is not available. Please try again later."
        isVisible={showNoDataMessage}
      />
    </div>
  )
}

export default TimetablePage
