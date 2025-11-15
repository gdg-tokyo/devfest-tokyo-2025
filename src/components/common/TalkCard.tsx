import HtmlContent from '@/components/common/HtmlContent'
import { getLevelColor } from '@/lib/style-utils'
import { withRepoBasePath } from '@/lib/url-utils'
import { Session, Speaker, Talk } from '@/types'
import PersonIcon from '@mui/icons-material/Person'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface TalkCardProps {
  talk: Talk
  sessionId: string
  session: Session
  speakers: Speaker[]
  isSessionDetailPage?: boolean // New prop
}

const TalkCard: React.FC<TalkCardProps> = ({
  talk,

  session,

  speakers,

  isSessionDetailPage = false, // Default to false
}) => {
  const firstSpeaker = speakers && speakers.length > 0 ? speakers[0] : undefined

  const timeStart = talk?.time_start || 'N/A'

  const timeEnd = talk?.time_end || 'N/A'

  const leftColumnWidth = isSessionDetailPage ? 'w-9/12' : 'w-8/12'

  const rightColumnWidth = isSessionDetailPage ? 'w-3/12' : 'w-4/12'

  const imageSizeClass = isSessionDetailPage ? 'w-48 h-48' : 'w-32 h-32'

  const iconFontSize = isSessionDetailPage ? 96 : 64

  return (
    <Link
      href={`/talks/${talk.id}`}
      className="border-2 border-gray-800 rounded-lg p-4 mb-4 bg-white shadow-md flex flex-col justify-between min-h-[150px] cursor-pointer hover:shadow-lg transition-shadow duration-200"
    >
      <article talk-card-id={talk.id} className="flex-grow">
        <div className="flex flex-col h-full">
          {!isSessionDetailPage && (
            <h3 className="text-2xl font-semibold text-gray-800 mb-2 line-clamp-2">
              {talk.title}
            </h3>
          )}

          <div className="flex flex-grow">
            <div className={clsx(leftColumnWidth, 'pr-2')}>
              {isSessionDetailPage && (
                <h3 className="text-3xl font-semibold text-gray-800 mb-2 line-clamp-2">
                  {talk.title}
                </h3>
              )}

              <div className="flex items-center mb-2">
                <div>
                  {firstSpeaker && (
                    <>
                      <p className="text-lg font-bold text-gray-800">
                        {firstSpeaker.name}
                      </p>

                      {firstSpeaker.job && (
                        <p className="text-sm leading-none italic text-gray-600">
                          {firstSpeaker.job}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="text-gray-600">
                <HtmlContent
                  html={talk.abstract}
                  className="text-sm leading-tight line-clamp-3"
                  stripHtmlTags={true}
                />
              </div>
            </div>

            <div
              className={clsx(
                rightColumnWidth,

                'flex flex-col items-center justify-center'
              )}
            >
              {speakers.map((speaker) => (
                <div key={speaker.id} className="mb-2 last:mb-0">
                  {speaker.photo_url ? (
                    <Image
                      src={withRepoBasePath(speaker.photo_url)}
                      alt={speaker.name}
                      width={isSessionDetailPage ? 192 : 128}
                      height={isSessionDetailPage ? 192 : 128}
                      className={clsx(
                        imageSizeClass,

                        'rounded-lg object-cover'
                      )}
                    />
                  ) : (
                    <div
                      className={clsx(
                        imageSizeClass,

                        'rounded-lg bg-gray-200 flex items-center justify-center'
                      )}
                    >
                      <PersonIcon style={{ fontSize: iconFontSize }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* New container for level chips */}
      <div className="flex flex-wrap gap-1 mt-2">
        {talk?.level &&
          talk.level.map((levelItem) => (
            <span
              key={levelItem}
              className={`text-xs px-1 py-0 rounded-full border border-black ${getLevelColor(
                levelItem as 'Beginner' | 'Intermediate' | 'Advanced'
              )} text-gray-800`}
            >
              {levelItem}
            </span>
          ))}
      </div>
    </Link>
  )
}

export default TalkCard
