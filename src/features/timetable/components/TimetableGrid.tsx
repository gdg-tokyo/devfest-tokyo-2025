import React from 'react'
import SessionCard from './SessionCard'
import { OldSession } from '@/lib/data-parser'

interface TimetableGridProps {
  sessions: OldSession[]
  filters: { levels: string[]; keyword: string }
}

const minutesPerSlot = 10 // Granularity of time slots

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

const TimetableGrid: React.FC<TimetableGridProps> = ({ sessions, filters }) => {
  // Dynamically extract unique tracks from sessions and sort them
  const tracks = Array.from(
    new Set(sessions.map((session) => session.track))
  ).sort()

  // If there are no sessions, provide a default set of tracks to ensure grid structure
  const displayTracks =
    tracks.length > 0 ? tracks : ['Track A', 'Track B', 'Track C', 'Track D']

  // Determine the overall time range
  const allStartTimes = sessions.map((s) => s.time_start)
  const allEndTimes = sessions.map((s) => s.time_end)

  const earliestTime =
    allStartTimes.length > 0 ? allStartTimes.sort()[0] : '09:00' // Default if no sessions
  const latestTime =
    allEndTimes.length > 0 ? allEndTimes.sort().reverse()[0] : '18:00' // Default if no sessions

  // Generate all 10-minute time slots between earliest and latest time
  const generateTimeSlots = (start: string, end: string): string[] => {
    const slots: string[] = []
    let [startHour, startMinute] = start.split(':').map(Number)
    let [endHour, endMinute] = end.split(':').map(Number)

    let currentTime = new Date()
    currentTime.setHours(startHour, startMinute, 0, 0)

    const endTime = new Date()
    endTime.setHours(endHour, endMinute, 0, 0)

    while (currentTime <= endTime) {
      slots.push(currentTime.toTimeString().substring(0, 5))
      currentTime.setMinutes(currentTime.getMinutes() + minutesPerSlot)
    }
    return slots
  }

  const allTimeSlots = generateTimeSlots(earliestTime, latestTime)

  const getRowStart = (time: string): number => {
    const index = allTimeSlots.indexOf(time)
    return index !== -1 ? index + 2 : 1 // +2 because first row is for track headers, and grid starts at 1
  }

  const getRowSpan = (startTime: string, endTime: string): number => {
    const [startHour, startMinute] = startTime.split(':').map(Number)
    const [endHour, endMinute] = endTime.split(':').map(Number)

    const startDate = new Date()
    startDate.setHours(startHour, startMinute, 0, 0)

    const endDate = new Date()
    endDate.setHours(endHour, endMinute, 0, 0)

    const durationMs = endDate.getTime() - startDate.getTime()
    const durationMinutes = durationMs / (1000 * 60)

    return Math.max(1, Math.ceil(durationMinutes / minutesPerSlot))
  }

  const filterSession = (session: Session): boolean => {
    const levelMatch =
      filters.levels.length === 0 ||
      (session.level && session.level.some((l) => filters.levels.includes(l)))
    const keywordMatch =
      !filters.keyword ||
      session.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
      session.longDescription
        .toLowerCase()
        .includes(filters.keyword.toLowerCase()) ||
      session.talks
        .flatMap((talk) => talk.speakers.map((speaker) => speaker.name))
        .some((name) =>
          name.toLowerCase().includes(filters.keyword.toLowerCase())
        )
    return levelMatch && keywordMatch
  }

  return (
    <div className="overflow-x-auto">
      <div
        className="grid gap-2 p-2"
        style={{
          gridTemplateColumns: `120px repeat(${displayTracks.length}, 1fr)`,
          gridTemplateRows: `[tracks] auto repeat(${allTimeSlots.length}, minmax(40px, auto))`,
        }}
      >
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

          const rowStart = getRowStart(session.time_start)
          const rowSpan = getRowSpan(session.time_start, session.time_end)
          const isGrayedOut = !filterSession(session)

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
