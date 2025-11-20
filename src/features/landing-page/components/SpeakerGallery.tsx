// src/features/landing-page/components/SpeakerGallery.tsx

import React from 'react'
import Image from 'next/image'
import { Speaker, SessionChair } from '@/types'

interface SpeakerGalleryProps {
  speakers: Speaker[]
  sessionChairs: SessionChair[]
}

const pastelColors = [
  'bg-gdg-pastel-blue',
  'bg-gdg-pastel-green',
  'bg-gdg-pastel-red',
  'bg-gdg-pastel-yellow',
]

// Simple hash function to get a consistent color index
const getColorIndex = (name: string) => {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash) % pastelColors.length
}

const SpeakerGallery: React.FC<SpeakerGalleryProps> = ({
  speakers,
  sessionChairs,
}) => {
  // Combine speakers and session chairs, removing duplicates and sorting
  const combinedSpeakers = React.useMemo(() => {
    const allSpeakersMap = new Map<string, Speaker>()

    // Add all individual speakers
    speakers.forEach((speaker) => allSpeakersMap.set(speaker.id, speaker))

    // Add speakers from session chairs, ensuring no duplicates
    sessionChairs.forEach((chairData) => {
      chairData.chairs.forEach((speaker) => {
        allSpeakersMap.set(speaker.id, speaker)
      })
    })

    // Convert map values to an array and sort by name
    return Array.from(allSpeakersMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    )
  }, [speakers, sessionChairs])

  return (
    <section className="container mx-auto px-4 py-8 lg:px-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Speakers & Session Chairs
      </h2>
      <div
        className="grid grid-cols-4 md:grid-cols-8 gap-4 justify-items-center"
        data-testid="speaker-gallery-grid"
      >
        {combinedSpeakers.map((speaker) => {
          const firstLetter = speaker.name
            ? speaker.name.charAt(0).toUpperCase()
            : ''
          const bgColorClass = pastelColors[getColorIndex(speaker.name || '')]

          const avatarContent = speaker.photo_url ? (
            <Image
              src={speaker.photo_url}
              alt={speaker.name}
              fill={true}
              className="object-cover"
            />
          ) : (
            <div
              className={`flex items-center justify-center w-20 h-20 rounded-full text-white text-xl font-bold ${bgColorClass}`}
            >
              {firstLetter}
            </div>
          )

          return (
            <div key={speaker.id} className="flex flex-col items-center group">
              {speaker.twitter_handle ? (
                <a
                  href={`https://x.com/${speaker.twitter_handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${speaker.name}'s X profile`}
                  className="relative block w-20 h-20 rounded-full overflow-hidden border-2 border-transparent group-hover:border-google-blue-500 transition-all duration-300 transform group-hover:scale-110"
                >
                  {avatarContent}
                </a>
              ) : (
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-transparent">
                  {avatarContent}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

SpeakerGallery.displayName = 'SpeakerGallery'

export default SpeakerGallery
