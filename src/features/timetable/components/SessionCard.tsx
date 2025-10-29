import { getSpeakers, getTalks } from '@/lib/data-parser'
import { getLevelColor } from '@/lib/style-utils'
import { Session, Speaker, Talk } from '@/types'
import { LocationOn, Person, AccessTime } from '@mui/icons-material' // Import LocationOn icon
import Link from 'next/link'

interface SessionCardProps {
  session: Session
  isGrayedOut?: boolean
}

const SessionCard: React.FC<SessionCardProps> = ({ session, isGrayedOut }) => {
  const allTalks = getTalks()
  const allSpeakers = getSpeakers()

  const talksMap = new Map<string, Talk>(
    allTalks.map((talk) => [talk.id, talk])
  )
  const speakersMap = new Map<string, Speaker>(
    allSpeakers.map((speaker) => [speaker.id, speaker])
  )

  const speakerNames =
    session.talk_ids.length > 0
      ? talksMap
          .get(session.talk_ids[0])
          ?.speaker_ids.map((speakerId) => speakersMap.get(speakerId)?.name)
          .filter((name): name is string => name !== undefined)
          .join(', ')
      : 'N/A'

  // Assuming time_start and time_end are still part of the session object for display on the card
  // If not, this would need to be adjusted based on the actual data structure
  const timeStart = session.time_start || 'TBA'
  const timeEnd = session.time_end || 'TBA'

  return (
    <Link href={`/sessions/${session.id}`}>
      <div
        data-testid={`session-card-${session.id}`}
        className={`h-full bg-white rounded-lg p-4 mb-1 border-2 border-gray-800 font-google-sans cursor-pointer hover:shadow-lg transition-shadow ${isGrayedOut ? 'opacity-30' : ''}`}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {session.title}
        </h3>
        <div className="text-sm text-gray-600 mb-1 flex items-center">
          <Person className="h-4 w-4 inline-block mr-1" />
          <span>{speakerNames}</span>
        </div>
        <div className="text-sm text-gray-600 mb-1 flex items-center justify-start">
          <div className="flex items-center">
            <AccessTime className="h-4 w-4 inline-block mr-1" />
            <span>
              {timeStart} - {timeEnd}
            </span>
          </div>
          {session.track && (
            <div className="flex items-center ml-2">
              {' '}
              {/* Added ml-2 for spacing */}
              <LocationOn className="h-4 w-4 inline-block mr-1" />{' '}
              {/* Location pin icon */}
              <span>{session.track}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {session.level &&
            session.level.map((levelItem) => (
              <span
                key={levelItem}
                className={`text-xs px-1 py-0 rounded-full border border-black ${getLevelColor(levelItem as 'Beginner' | 'Intermediate' | 'Advanced')} text-gray-800`}
              >
                {levelItem}
              </span>
            ))}
        </div>
      </div>
    </Link>
  )
}

export default SessionCard
