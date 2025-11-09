import React from 'react'
import Image from 'next/image'
import { Speaker } from '@/types'
import HtmlContent from '@/components/common/HtmlContent'
import { withRepoBasePath } from '@/lib/url-utils'
import PersonIcon from '@mui/icons-material/Person'
import XIcon from '@mui/icons-material/X'

interface SpeakerDetailCardProps {
  speaker: Speaker
}

const SpeakerDetailCard: React.FC<SpeakerDetailCardProps> = ({ speaker }) => {
  return (
    <div className="border-2 border-gray-800 rounded-lg p-4 bg-white shadow-md">
      {/* Mobile View */}
      <div className="flex flex-col md:hidden">
        <div className="flex items-center mb-4">
          {speaker.photo_url ? (
            <Image
              src={withRepoBasePath(speaker.photo_url)}
              alt={speaker.name}
              width={96}
              height={96}
              className="w-24 h-24 rounded-lg mr-4"
            />
          ) : (
            <div className="w-24 h-24 rounded-lg mr-4 bg-gray-200 flex items-center justify-center">
              <PersonIcon style={{ fontSize: 64 }} data-testid="PersonIcon" />
            </div>
          )}
          <div>
            <h3 className="text-4xl font-bold">{speaker.name}</h3>
            <p className="text-xl text-gray-600 mb-2">{speaker.job}</p>
          </div>
        </div>
        <HtmlContent html={speaker.bio} />
        {speaker.twitter_handle && (
          <a
            href={`https://twitter.com/${speaker.twitter_handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block"
          >
            <button className="border border-black rounded-lg p-2 flex items-center hover:bg-gray-200">
              <XIcon data-testid="XIcon" />
              <span className="ml-2">@{speaker.twitter_handle}</span>
            </button>
          </a>
        )}
      </div>

      {/* PC/Tablet View */}
      <div className="hidden md:flex">
        <div className="w-2/12 flex justify-center items-start p-4">
          {speaker.photo_url ? (
            <Image
              src={withRepoBasePath(speaker.photo_url)}
              alt={speaker.name}
              width={200}
              height={200}
              className="w-full h-auto rounded-lg"
            />
          ) : (
            <div className="w-full h-48 rounded-lg bg-gray-200 flex items-center justify-center">
              <PersonIcon style={{ fontSize: 128 }} data-testid="PersonIcon" />
            </div>
          )}
        </div>
        <div className="w-10/12 p-4">
          <h3 className="text-4xl font-bold">{speaker.name}</h3>
          <p className="text-xl text-gray-600 mb-2">{speaker.job}</p>
          <HtmlContent html={speaker.bio} />
          {speaker.twitter_handle && (
            <a
              href={`https://twitter.com/${speaker.twitter_handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block"
            >
              <button className="border border-black rounded-lg p-2 flex items-center hover:bg-gray-200">
                <XIcon data-testid="XIcon" />
                <span className="ml-2">@{speaker.twitter_handle}</span>
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default SpeakerDetailCard
