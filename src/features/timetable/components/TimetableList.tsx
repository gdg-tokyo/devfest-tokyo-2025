'use client'

import React from 'react'
import { Session } from '@/types'
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
    <div className="md:hidden">
      {' '}
      {/* This div will only be visible on mobile screens */}
      {allTimeSlots.map((time, timeIndex) => (
        <div key={time} className="mb-4 border-b border-gray-300 pb-4">
          <h3 className="text-lg font-bold mb-2 font-roboto-mono text-black-02">
            {time}
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {sessions
              .filter((session) => session.time_start === time)
              .filter((session) => filterSession(session, filters))
              .map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  isGrayedOut={false}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TimetableList
