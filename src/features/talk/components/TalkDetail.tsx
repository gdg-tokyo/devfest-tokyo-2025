import HtmlContent from '@/components/common/HtmlContent'
import RegistrationButton from '@/components/common/RegistrationButton'
import SpeakerDetailCard from '@/components/common/SpeakerDetailCard'
import {
  getLevelColor,
  getPerspectiveColor,
  getTrackDisplayName,
} from '@/lib/style-utils'
import { withRepoBasePath } from '@/lib/url-utils'
import { Speaker, Talk } from '@/types'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PlaceIcon from '@mui/icons-material/Place'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface TalkDetailProps {
  talk: Talk
  speakers: Speaker[]
}

const TalkDetail: React.FC<TalkDetailProps> = ({ talk, speakers }) => {
  return (
    <div className="p-4 mx-auto">
      <h2 className="text-4xl font-bold mb-2">Talk</h2>
      {talk.thumbnail_url && (
        <div className="border-2 border-gray-800 rounded-lg p-4 bg-white shadow-md mb-4 relative w-full aspect-video">
          <Image
            src={withRepoBasePath(talk.thumbnail_url)}
            alt="Talk Thumbnail"
            fill
            style={{ objectFit: 'contain' }}
            className="rounded-lg"
            sizes="(max-width: 1280px) 100vw, 1280px"
            placeholder="blur"
            blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          />
        </div>
      )}
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
        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
          <div className="flex items-center">
            <AccessTimeIcon className="mr-2" />
            <span>
              {talk.time_start} - {talk.time_end}
            </span>
          </div>
          <div className="flex items-center">
            <PlaceIcon className="mr-2" />
            <span>{getTrackDisplayName(talk.track)}</span>
          </div>
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
        <h2 className="text-2xl font-bold mt-4 mb-2">概要</h2>
        <HtmlContent html={talk.abstract} />
      </div>

      <div>
        <h2 className="text-4xl font-bold mb-2">Speakers</h2>
        <div className="grid grid-cols-1 gap-4">
          {speakers.map((speaker) => (
            <SpeakerDetailCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-16">
        <RegistrationButton href="https://gdg-tokyo.connpass.com/event/369416/">
          今すぐ参加登録
        </RegistrationButton>
        <Link
          href="/timetable"
          className="bg-google-blue-500 hover:bg-google-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg text-center transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          タイムテーブルに戻る
        </Link>
        <Link
          href="/talks"
          className="bg-google-green-500 hover:bg-google-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg text-center transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          トーク一覧に戻る
        </Link>
      </div>
    </div>
  )
}

export default TalkDetail
