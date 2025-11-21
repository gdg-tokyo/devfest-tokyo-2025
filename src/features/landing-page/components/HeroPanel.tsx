'use client'

import RegistrationButton from '@/components/common/RegistrationButton'
import { withRepoBasePath } from '@/lib/url-utils'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// Dynamically import ClientCountdown with ssr: false
const ClientCountdown = dynamic(() => import('./ClientCountdown'), {
  ssr: false,
})

const HeroPanel: React.FC = () => {
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen p-4 bg-off-white text-center overflow-hidden"
      aria-labelledby="event-title"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-google-blue-500 to-google-yellow-500 opacity-30"></div>
      <div className="absolute inset-0 z-0">
        {/* Random circles for autumn theme */}
        <div className="absolute w-12 h-12 bg-google-red-500 rounded-full opacity-20 top-1/4 left-1/4 animate-pulse"></div>
        <div className="absolute w-8 h-8 bg-google-green-500 rounded-full opacity-20 top-1/2 right-1/4 animate-pulse delay-100"></div>
        <div className="absolute w-16 h-16 bg-google-yellow-500 rounded-full opacity-20 bottom-1/4 left-1/3 animate-pulse delay-200"></div>
        <div className="absolute w-10 h-10 bg-google-blue-500 rounded-full opacity-20 top-1/3 right-1/3 animate-pulse delay-300"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-screen-md lg:max-w-screen-xl">
        <div className="relative w-full max-w-2xl mx-auto mb-4 h-40 md:h-56">
          <Image
            src={withRepoBasePath(
              '/images/devfest25-tokyo-logo-with-gdg-bracket.png'
            )}
            alt="DevFest Tokyo 2025 Logo"
            fill={true}
            priority
            className="mx-auto object-contain" // object-contain ensures the image fits within the bounds without cropping
          />
        </div>
        <div className="mb-8">
          <h1
            id="event-title"
            className="text-2xl md:text-3xl font-bold text-black-02 google-sans"
          >
            Find your new &quot;eyes&quot;
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-4">
            ~3つの新たな視点に出会える一日~
          </p>
        </div>
        <div className="mb-8 py-3 px-6 max-w-2xl mx-auto">
          {/* Render ClientCountdown only if it's loaded */}
          {ClientCountdown && <ClientCountdown />}
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <RegistrationButton href="https://gdg-tokyo.connpass.com/event/369416/">
            参加登録
          </RegistrationButton>
          <Link
            href="/timetable"
            className="bg-google-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-google-blue-600 transition duration-300 ease-in-out"
          >
            タイムテーブル
          </Link>
          <Link
            href="/talks"
            className="bg-google-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-google-green-600 transition duration-300 ease-in-out"
          >
            トーク一覧
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroPanel
