'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import TimetableGrid from '@/features/timetable/components/TimetableGrid'
import FilterSystem from '@/features/timetable/components/FilterSystem'
import OverlayMessageCard from '@/components/common/OverlayMessageCard'
import { getSessions, OldSession } from '@/lib/data-parser'

const TimetablePage = () => {
  const allSessions: OldSession[] = getSessions()

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

  const hasMatchingSessions = useMemo(() => {
    return allSessions.some((session) => {
      const levelMatch =
        filters.levels.length === 0 ||
        (session.level && session.level.some((l) => filters.levels.includes(l)))

      const speakerNames = session.talks.flatMap((talk) =>
        talk.speakers.map((speaker) => speaker.name)
      )

      const keywordMatch =
        !filters.keyword ||
        session.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        session.longDescription
          .toLowerCase()
          .includes(filters.keyword.toLowerCase()) ||
        speakerNames.some((name) =>
          name.toLowerCase().includes(filters.keyword.toLowerCase())
        ) ||
        session.talks.some((talk) =>
          talk.abstract.toLowerCase().includes(filters.keyword.toLowerCase())
        )

      return levelMatch && keywordMatch
    })
  }, [allSessions, filters])

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
