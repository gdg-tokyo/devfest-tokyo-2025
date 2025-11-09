import { Session, Talk, Speaker } from '@/types'
import { getTalks, getSpeakers } from '@/lib/data-parser'

const minutesPerSlot = 10 // Granularity of time slots

export const generateTimeSlots = (sessions: Session[]): string[] => {
  if (sessions.length === 0) {
    // Default times, still 30 min intervals for default
    return [
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
    ]
  }

  const allTimes = sessions.flatMap((s) => [s.time_start, s.time_end])

  const dateTimes = allTimes.map((timeStr) => {
    const [h, m] = timeStr.split(':').map(Number)
    const d = new Date()
    d.setHours(h, m, 0, 0)
    return d
  })

  const earliestTime = new Date(
    Math.min(...dateTimes.map((dt) => dt.getTime()))
  )
  const latestTime = new Date(Math.max(...dateTimes.map((dt) => dt.getTime())))

  // Round down earliest time to the nearest 10-minute interval
  earliestTime.setMinutes(Math.floor(earliestTime.getMinutes() / 10) * 10)
  earliestTime.setSeconds(0)
  earliestTime.setMilliseconds(0)

  // Round up latest time to the nearest 10-minute interval
  latestTime.setMinutes(Math.ceil(latestTime.getMinutes() / 10) * 10)
  latestTime.setSeconds(0)
  latestTime.setMilliseconds(0)

  const finalTimeSlots: string[] = []
  let currentTime = new Date(earliestTime.getTime())

  while (currentTime.getTime() <= latestTime.getTime()) {
    finalTimeSlots.push(currentTime.toTimeString().substring(0, 5))
    currentTime.setMinutes(currentTime.getMinutes() + 10) // 10-minute step
  }

  return finalTimeSlots
}

export const getRowStart = (time: string, allTimeSlots: string[]): number => {
  const index = allTimeSlots.indexOf(time)
  return index !== -1 ? index + 2 : 1 // +2 because first row is for track headers, and grid starts at 1
}

export const getRowEndLine = (
  startTime: string,
  endTime: string,
  allTimeSlots: string[]
): number => {
  const startIndex = allTimeSlots.indexOf(startTime)
  if (startIndex === -1) {
    // Fallback to minute-based calculation for span if start time is not found
    const [startHour, startMinute] = startTime.split(':').map(Number)
    const [endHour, endMinute] = endTime.split(':').map(Number)

    const startDate = new Date()
    startDate.setHours(startHour, startMinute, 0, 0)

    const endDate = new Date()
    endDate.setHours(endHour, endMinute, 0, 0)

    const durationMs = endDate.getTime() - startDate.getTime()
    const durationMinutes = durationMs / (1000 * 60)

    // Returns span, not end line, in this fallback case
    return Math.max(1, Math.ceil(durationMinutes / 10))
  }

  const [endHour, endMinute] = endTime.split(':').map(Number)
  const sessionEndTime = new Date()
  sessionEndTime.setHours(endHour, endMinute, 0, 0)

  let endLineIndex = startIndex // Initialize with start index
  for (let i = startIndex; i < allTimeSlots.length; i++) {
    const [slotHour, slotMinute] = allTimeSlots[i].split(':').map(Number)
    const slotTime = new Date()
    slotTime.setHours(slotHour, slotMinute, 0, 0)

    if (slotTime.getTime() < sessionEndTime.getTime()) {
      endLineIndex = i + 1 // The line *after* this slot
    } else if (slotTime.getTime() === sessionEndTime.getTime()) {
      endLineIndex = i // The line *at* this slot
      break
    } else {
      break // sessionEndTime is before current slotTime
    }
  }
  // +2 because first row is for track headers, and grid starts at 1
  return endLineIndex + 2
}

export const filterSession = (
  session: Session,
  filters: { levels: string[]; keyword: string }
): boolean => {
  const allRawTalks = getTalks()
  const allSpeakers = getSpeakers()

  const talksMap = new Map<string, Talk>(
    allRawTalks.map((talk) => [talk.id, talk])
  )
  const speakersMap = new Map<string, Speaker>(
    allSpeakers.map((speaker) => [speaker.id, speaker])
  )

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
    session.description.toLowerCase().includes(filters.keyword.toLowerCase()) ||
    speakerNames.some((name) =>
      name.toLowerCase().includes(filters.keyword.toLowerCase())
    ) ||
    sessionTalks.some((talk) =>
      talk.abstract.toLowerCase().includes(filters.keyword.toLowerCase())
    )
  return levelMatch && keywordMatch
}
