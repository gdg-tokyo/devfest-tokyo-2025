import { Talk, Speaker } from '@/types'
import React from 'react'
import Image from 'next/image'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PlaceIcon from '@mui/icons-material/Place'
import PersonIcon from '@mui/icons-material/Person'
import XIcon from '@mui/icons-material/X'
import Link from 'next/link'
import LaunchIcon from '@mui/icons-material/Launch'
import { getLevelColor, getPerspectiveColor } from '@/lib/style-utils'
import RegistrationButton from '@/components/common/RegistrationButton'
import HtmlContent from '@/components/common/HtmlContent'

interface TalkDetailProps {
  talk: Talk
  speakers: Speaker[]
}

const TalkDetail: React.FC<TalkDetailProps> = ({ talk, speakers }) => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-2">Talk</h2>
      <div className="border-2 border-gray-800 rounded-lg p-4 bg-white shadow-md mb-4">
        <div className="flex flex-wrap gap-2 mb-2">
          {talk.level.map((level) => (
            <span
              key={level}
              className={`text-sm px-2 py-1 rounded-full border border-black ${getLevelColor(level)}`}
            >
              {level}
            </span>
          ))}
          {talk.perspective.map((p) => (
            <span
              key={p}
              className={`text-sm px-2 py-1 rounded-full ${getPerspectiveColor(p)}`}
            >
              {p}
            </span>
          ))}{' '}
        </div>
        <h1 className="text-3xl font-bold mb-4">{talk.title}</h1>
        <div className="flex items-center mb-2">
          <AccessTimeIcon className="mr-2" />
          <span>
            {talk.time_start} - {talk.time_end}
          </span>
        </div>
        <div className="flex items-center mb-4">
          <PlaceIcon className="mr-2" />
          <span>{talk.track}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {talk.tech_tags.map((tag) => (
            <span
              key={tag}
              className="text-base bg-gray-200 rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-2xl font-bold mt-8 mb-2">概要</h2>
        <HtmlContent html={talk.abstract} />
      </div>

      <div>
        <h2 className="text-4xl font-bold mb-2">Speakers</h2>
        {speakers.map((speaker) => (
          <div
            key={speaker.id}
            className="border-2 border-gray-800 rounded-lg p-4 bg-white shadow-md flex items-center mb-4"
          >
            {speaker.photo_url ? (
              <Image
                src={speaker.photo_url}
                alt={speaker.name}
                width={96}
                height={96}
                className="w-24 h-24 rounded-lg mr-8"
              />
            ) : (
              <div className="w-24 h-24 rounded-lg mr-8 bg-gray-200 flex items-center justify-center">
                <PersonIcon style={{ fontSize: 64 }} data-testid="PersonIcon" />
              </div>
            )}
            <div>
              <h3 className="text-4xl font-bold">{speaker.name}</h3>
              <p className="text-xl text-gray-600">{speaker.job}</p>
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
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 my-16">
        <RegistrationButton href="https://gdg-tokyo.connpass.com/event/369416/">
          今すぐ参加登録
        </RegistrationButton>
        <Link
          href="/timetable"
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-4 rounded-lg shadow-lg text-center text-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          タイムテーブルに戻る
        </Link>
        <Link
          href="/talks"
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-4 rounded-lg shadow-lg text-center text-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          トーク一覧に戻る
        </Link>
      </div>
    </div>
  )
}

export default TalkDetail
