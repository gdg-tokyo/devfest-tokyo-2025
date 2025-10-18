import { Talk, Speaker } from '@/types'
import React from 'react'

interface TalkDetailProps {
  talk: Talk
  speakers: Speaker[]
}

const TalkDetail: React.FC<TalkDetailProps> = ({ talk, speakers }) => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{talk.title}</h1>
      <p className="text-lg mb-4">{talk.abstract}</p>
      <div className="mb-4">
        <span className="font-bold">Time:</span> {talk.time_start} -{' '}
        {talk.time_end}
      </div>
      <div className="mb-4">
        <span className="font-bold">Track:</span> {talk.track}
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">Speakers</h2>
        {speakers.map((speaker) => (
          <div key={speaker.id} className="flex items-center mb-4">
            <img
              src={speaker.photo_url}
              alt={speaker.name}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="text-xl font-bold">{speaker.name}</h3>
              <p>{speaker.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TalkDetail
