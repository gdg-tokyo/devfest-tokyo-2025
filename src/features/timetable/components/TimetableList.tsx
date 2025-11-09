'use client'

import { Session } from '@/types'
import React from 'react'
import { getTrackColor, getTrackDisplayName } from '@/lib/style-utils' // Import getTrackColor
import SessionCard from './SessionCard'

interface TimetableListProps {
  sessions: Session[]
  filters: { levels: string[]; keyword: string }
  allTimeSlots: string[]
  filterSession: (
    session: Session,
    filters: { levels: string[]; keyword: string }
  ) => boolean
}

const TimetableList: React.FC<TimetableListProps> = ({
  sessions,
  filters,
  allTimeSlots,
  filterSession,
}) => {
  return (
    <div className="md:hidden" data-testid="timetable-list">
      {' '}
      {/* This div will only be visible on mobile screens */}
      {allTimeSlots.map((time, timeIndex) => {
        const sessionsForTime = sessions
          .filter((session) => session.time_start === time)
          .filter((session) => filterSession(session, filters))

        if (sessionsForTime.length === 0) {
          return null // Skip rendering if no sessions for this time slot
        }

        return (
          <div
            key={time}
            className={`mb-2 border-b border-gray-300 pb-2 ${timeIndex > 0 ? 'mt-4' : ''}`}
          >
            <h3 className="text-lg font-bold mb-2 font-roboto-mono text-black-02">
              {time}
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {sessionsForTime.map((session) => (
                <div
                  key={session.id}
                  className="grid grid-cols-[60px_1fr] gap-2 items-center"
                >
                  <div
                    className={`h-full flex items-center justify-center text-center text-black-02 font-normal rounded-lg border-2 border-gray-800 ${getTrackColor(session.track)}`}
                  >
                    <span className="text-xs rotate-90 whitespace-nowrap">
                      {getTrackDisplayName(session.track)}
                    </span>
                  </div>
                  <div>
                    <SessionCard session={session} isGrayedOut={false} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TimetableList
