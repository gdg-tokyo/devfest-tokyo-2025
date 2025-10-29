import { Session, Talk, Speaker } from '@/types'
import { getTalks, getSpeakers } from '@/lib/data-parser'

const minutesPerSlot = 10 // Granularity of time slots

export const generateTimeSlots = (sessions: Session[]): string[] => {
  if (sessions.length === 0) {
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

  const uniqueTimes = new Set<string>()
  sessions.forEach((session) => {
    uniqueTimes.add(session.time_start)
    uniqueTimes.add(session.time_end)
  })

  const sortedTimes = Array.from(uniqueTimes).sort((a, b) => {
    const [ha, ma] = a.split(':').map(Number)
    const [hb, mb] = b.split(':').map(Number)
    if (ha !== hb) return ha - hb
    return ma - mb
  })

  const finalTimeSlots: string[] = []
  const earliestTime = sortedTimes[0]
  const latestTime = sortedTimes[sortedTimes.length - 1]

  let [currentHour, currentMinute] = earliestTime.split(':').map(Number)
  let currentTime = new Date()
  currentTime.setHours(currentHour, currentMinute, 0, 0)

  let [endHour, endMinute] = latestTime.split(':').map(Number)
  let endTime = new Date()
  endTime.setHours(endHour, endMinute, 0, 0)

  // Add the earliest time slot
  finalTimeSlots.push(earliestTime)

  // Generate slots every 30 minutes until the latest time
  while (currentTime.getTime() < endTime.getTime()) {
    currentTime.setMinutes(currentTime.getMinutes() + 30)
    const newSlot = currentTime.toTimeString().substring(0, 5)
    finalTimeSlots.push(newSlot)
  }

  // Add all the unique session times to ensure they are in the list
  sortedTimes.forEach((time) => {
    finalTimeSlots.push(time)
  })

  // Ensure uniqueness and sort again
  return Array.from(new Set(finalTimeSlots)).sort((a, b) => {
    const [ha, ma] = a.split(':').map(Number)
    const [hb, mb] = b.split(':').map(Number)
    if (ha !== hb) return ha - hb
    return ma - mb
  })
}

export const getRowStart = (time: string, allTimeSlots: string[]): number => {
  const index = allTimeSlots.indexOf(time)
  return index !== -1 ? index + 2 : 1 // +2 because first row is for track headers, and grid starts at 1
}

export const getRowSpan = (
  startTime: string,
  endTime: string,
  allTimeSlots: string[]
): number => {
  const startIndex = allTimeSlots.indexOf(startTime)
  let endIndex = allTimeSlots.indexOf(endTime)

  // If the exact endTime is not in allTimeSlots, find the next closest slot
  if (endIndex === -1) {
    const [endHour, endMinute] = endTime.split(':').map(Number)
    const sessionEndTime = new Date()
    sessionEndTime.setHours(endHour, endMinute, 0, 0)

    for (let i = allTimeSlots.length - 1; i >= 0; i--) {
      const [slotHour, slotMinute] = allTimeSlots[i].split(':').map(Number)
      const slotTime = new Date()
      slotTime.setHours(slotHour, slotMinute, 0, 0)

      if (slotTime.getTime() <= sessionEndTime.getTime()) {
        endIndex = i
        break
      }
    }
  }

  if (startIndex === -1 || endIndex === -1) {
    // Fallback to minute-based calculation if times are not found in allTimeSlots
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

  return Math.max(1, endIndex - startIndex)
}

export const getTrackColor = (track: string) => {
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
