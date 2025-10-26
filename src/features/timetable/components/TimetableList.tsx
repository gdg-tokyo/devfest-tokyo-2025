'use client'

import React from 'react'
import { Session } from '@/types'
import SessionCard from './SessionCard'
import { getTrackColor } from '../utils' // Import getTrackColor

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
    <div className="md:hidden">
      {' '}
      {/* This div will only be visible on mobile screens */}
      {allTimeSlots.map((time, timeIndex) => (
        <div key={time} className="mb-4 border-b border-gray-300 pb-4">
          <h3 className="text-lg font-bold mb-2 font-roboto-mono text-black-02">
            {time}
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {sessions
              .filter((session) => session.time_start === time)
              .filter((session) => filterSession(session, filters))
              .map((session) => (
                <div key={session.id} className="grid grid-cols-[60px_1fr] gap-2 items-center"> {/* New grid for track panel and session card */}
                  <div className={`h-full flex items-center justify-center text-center text-white font-bold rounded-lg ${getTrackColor(session.track)}`}>
                    <span className="text-xs rotate-90 whitespace-nowrap">{session.track}</span>
                  </div>
                  <SessionCard
                    session={session}
                    isGrayedOut={false}
                  />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TimetableList
