'use client'

import { Session } from '@/types'
import React from 'react'
import { getRowSpan, getRowStart } from '../utils' // Import from utils
import SessionCard from './SessionCard'

interface TimetableGridProps {
  sessions: Session[]
  filters: { levels: string[]; keyword: string }
  allTimeSlots: string[]
  displayTracks: string[]
  filterSession: (
    session: Session,
    filters: { levels: string[]; keyword: string }
  ) => boolean
}

const getTrackColor = (track: string) => {
  switch (track) {
    case 'Track A':
      return 'bg-gdg-pastel-red'
    case 'Track B':
      return 'bg-gdg-pastel-blue'
    case 'Track C':
      return 'bg-gdg-pastel-green'
    case 'Track D':
      return 'bg-gdg-pastel-yellow'
    default:
      return 'bg-gray-200'
  }
}

const TimetableGrid: React.FC<TimetableGridProps> = ({
  sessions,
  filters,
  allTimeSlots,
  displayTracks,
  filterSession,
}) => {
  return (
    <div className="overflow-x-auto hidden md:block">
      {' '}
      {/* This div will be hidden on mobile */}
      <div
        className="grid gap-2 p-2"
        style={{
          gridTemplateRows: `[tracks] auto repeat(${allTimeSlots.length}, minmax(40px, auto))`,
        }}
      >
        {/* Conditional grid-template-columns based on screen size */}
        {/* For Tablet (md): 120px for time, then 2 columns for tracks */}
        {/* For PC (lg): 120px for time, then 4 columns for tracks */}
        <style jsx>{`
          @media (min-width: 768px) and (max-width: 1023px) {
            .grid {
              grid-template-columns: 120px repeat(2, 1fr);
            }
          }
          @media (min-width: 1024px) {
            .grid {
              grid-template-columns: 120px repeat(${displayTracks.length}, 1fr);
            }
          }
        `}</style>

        {/* Corner for time/track headers */}
        <div className="sticky left-0 top-0 p-3 z-10 subhead text-sm text-gray-600">
          Time
        </div>

        {/* Track Headers */}
        {displayTracks.map((track, index) => (
          <div
            key={track}
            className={`p-3 rounded-lg border-2 border-gray-800 text-center sticky top-0 z-10 ${getTrackColor(track)}`}
            style={{ gridColumn: index + 2, gridRow: 1 }}
          >
            <h5>{track}</h5>
          </div>
        ))}

        {/* Time labels */}
        {allTimeSlots.map((time, index) => (
          <div
            key={time}
            className="sticky left-0 p-2 border-r border-gray-300 font-roboto-mono text-sm text-black-02 flex items-center justify-center z-10"
            style={{ gridRow: index + 2, gridColumn: 1 }}
          >
            {time}
          </div>
        ))}

        {/* Sessions */}
        {sessions.map((session) => {
          const trackIndex = displayTracks.indexOf(session.track)
          // Only render sessions that belong to one of the displayed tracks
          if (trackIndex === -1) return null

          const rowStart = getRowStart(session.time_start, allTimeSlots) // Pass allTimeSlots
          const rowSpan = getRowSpan(
            session.time_start,
            session.time_end,
            allTimeSlots
          ) // Pass allTimeSlots
          const isGrayedOut = !filterSession(session, filters) // Pass filters

          return (
            <div
              key={session.id}
              className={`font-google-sans text-black-02 ${isGrayedOut ? 'opacity-30' : ''}`}
              style={{
                gridRow: `${rowStart} / span ${rowSpan}`,
                gridColumn: trackIndex + 2,
                zIndex: 5, // Ensure session cards are above grid lines
              }}
            >
              <SessionCard session={session} isGrayedOut={isGrayedOut} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TimetableGrid
