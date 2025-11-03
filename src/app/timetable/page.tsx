'use client'

import OverlayMessageCard from '@/components/common/OverlayMessageCard'
import FilterSystem from '@/features/timetable/components/FilterSystem'
import TimetableGrid from '@/features/timetable/components/TimetableGrid'
import TimetableList from '@/features/timetable/components/TimetableList' // Import TimetableList
import { getSessions, getSpeakers, getTalks } from '@/lib/data-parser'
import { Session, Speaker, Talk } from '@/types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { generateTimeSlots, filterSession } from '@/features/timetable/utils' // Import from utils

import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site' // Import SITE

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    path: `/timetable`,
    title: `Timetable`,
  })
}

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

  // --- Moved logic from TimetableGrid --- //
  const tracks = Array.from(
    new Set(allSessions.map((session) => session.track))
  ).sort()

  const displayTracks =
    tracks.length > 0 ? tracks : ['Track A', 'Track B', 'Track C', 'Track D']

  const allStartTimes = allSessions.map((s) => s.time_start)
  const allEndTimes = allSessions.map((s) => s.time_end)

  const earliestTime =
    allStartTimes.length > 0 ? allStartTimes.sort()[0] : '09:00'
  const latestTime =
    allEndTimes.length > 0 ? allEndTimes.sort().reverse()[0] : '18:00'

  const allTimeSlots = generateTimeSlots(allSessions)
  // --- End of moved logic --- //

  const hasMatchingSessions = useMemo(() => {
    // This logic needs to use the filterSession from utils.ts
    return allSessions.some((session) => filterSession(session, filters))
  }, [allSessions, filters])

  const availableLevels = useMemo(() => {
    const validLevels = ['Beginner', 'Intermediate', 'Advanced']
    const levels = allSessions
      .flatMap((s) => s.level || [])
      .filter((level) => validLevels.includes(level))
    return Array.from(new Set(levels))
  }, [allSessions])

  return (
    <div className="container mx-auto px-4 lg:px-8 max-w-screen-md lg:max-w-screen-xl p-4">
      <h1 className="text-3xl font-bold mb-6">Event Timetable</h1>
      <FilterSystem
        onFilterChange={handleFilterChange}
        availableLevels={availableLevels}
      />
      {allSessions.length > 0 ? (
        hasMatchingSessions ? (
          <>
            <TimetableList
              sessions={allSessions}
              filters={filters}
              allTimeSlots={allTimeSlots}
              filterSession={filterSession}
            />
            <TimetableGrid
              sessions={allSessions}
              filters={filters}
              allTimeSlots={allTimeSlots}
              displayTracks={displayTracks}
              filterSession={filterSession}
            />
          </>
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
