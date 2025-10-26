import { Session, Talk, Speaker } from '@/types'
import { getTalks, getSpeakers } from '@/lib/data-parser'

const minutesPerSlot = 10 // Granularity of time slots

export const generateTimeSlots = (sessions: Session[]): string[] => {
  const uniqueTimes = new Set<string>()
  sessions.forEach((session) => {
    uniqueTimes.add(session.time_start)
    // Optionally, add end times if you want to mark the end of a session explicitly
    // uniqueTimes.add(session.time_end);
  })

  const sortedTimes = Array.from(uniqueTimes).sort((a, b) => {
    const [ha, ma] = a.split(':').map(Number)
    const [hb, mb] = b.split(':').map(Number)
    if (ha !== hb) return ha - hb
    return ma - mb
  })

  // If there are no sessions, provide a default range
  if (sortedTimes.length === 0) {
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

  // Now, let's fill in gaps with 30-minute intervals if they are too large
  const finalTimeSlots: string[] = []
  let lastTime = sortedTimes[0]
  finalTimeSlots.push(lastTime)

  for (let i = 1; i < sortedTimes.length; i++) {
    const currentTime = sortedTimes[i]
    let [lastHour, lastMinute] = lastTime.split(':').map(Number)
    let [currentHour, currentMinute] = currentTime.split(':').map(Number)

    let tempTime = new Date()
    tempTime.setHours(lastHour, lastMinute, 0, 0)

    const nextUniqueTime = new Date()
    nextUniqueTime.setHours(currentHour, currentMinute, 0, 0)

    // Add 30-minute intervals if the gap is larger than 30 minutes
    while (tempTime.getTime() + 30 * 60 * 1000 < nextUniqueTime.getTime()) {
      tempTime.setMinutes(tempTime.getMinutes() + 30)
      const newSlot = tempTime.toTimeString().substring(0, 5)
      if (!uniqueTimes.has(newSlot)) {
        // Only add if not already a unique session start/end time
        finalTimeSlots.push(newSlot)
      }
    }
    finalTimeSlots.push(currentTime)
    lastTime = currentTime
  }

  // Ensure uniqueness and sort again after adding intervals
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
