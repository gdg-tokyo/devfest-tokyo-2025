import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'

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
      <div className="relative z-10 max-w-4xl w-full">
        <Image
          src="/images/devfest25-tokyo-logo-with-gdg-bracket.png"
          alt="DevFest Tokyo 2025 Logo"
          width={800} // Increased width for better visibility, adjust as needed
          height={400} // Increased height, adjust as needed
          priority
          className="mx-auto mb-4"
        />
        <h1
          id="event-title"
          className="text-4xl md:text-5xl font-bold text-black-02 google-sans"
        >
          Fine your new eyes
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-4">
          ~3つの新たな視点に出会える一日~
        </p>
        <div className="mb-8">
          {/* Render ClientCountdown only if it's loaded */}
          {ClientCountdown && <ClientCountdown />}
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a
            href="https://gdg-tokyo.connpass.com/event/369416/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-google-red-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-google-red-600 transition duration-300 ease-in-out"
          >
            参加登録
          </a>
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
            Talk Directory
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroPanel
