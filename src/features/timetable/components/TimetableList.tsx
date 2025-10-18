import React from 'react'
import SessionCard from './SessionCard'
import { Session } from '@/types'

interface TimetableListProps {
  sessions: Session[]
  filters: { level?: string; perspective?: string; tags: string[] }
}

const TimetableList: React.FC<TimetableListProps> = ({ sessions, filters }) => {
  const filterSession = (session: Session): boolean => {
    const levelMatch = !filters.level || session.level.includes(filters.level)
    // Temporarily comment out perspectiveMatch as Session does not have perspective yet
    // const perspectiveMatch =
    //   !filters.perspective || session.perspective === filters.perspective
    const tagsMatch =
      filters.tags.length === 0 ||
      (session.tech_tags &&
        filters.tags.every((tag) => session.tech_tags?.includes(tag)))
    return levelMatch /* && perspectiveMatch */ && tagsMatch
  }

  // Group sessions by time for a cleaner list view
  const sessionsByTime: { [key: string]: Session[] } = sessions.reduce(
    (acc, session) => {
      if (!acc[session.time_start]) {
        acc[session.time_start] = []
      }
      acc[session.time_start].push(session)
      return acc
    },
    {} as { [key: string]: Session[] }
  )

  const sortedTimes = Object.keys(sessionsByTime).sort((a, b) =>
    a.localeCompare(b)
  )

  return (
    <div className="font-google-sans text-black-02">
      {sortedTimes.map((time) => (
        <div key={time} className="mb-6">
          <h2 className="text-xl font-semibold mb-3 sticky top-0 bg-white py-2 border-b border-gray-200">
            {time}
          </h2>
          <div className="space-y-4">
            {sessionsByTime[time].map((session) => {
              const isFiltered = !filterSession(session)
              return (
                <div
                  key={session.id}
                  className={`${isFiltered ? 'opacity-30' : ''}`}
                >
                  <SessionCard session={session} />
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TimetableList
