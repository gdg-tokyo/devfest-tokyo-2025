import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <div className="w-2 h-8 bg-google-yellow-500 rounded-l-md"></div>
            <h1 className="mx-2 font-google-sans text-black-02 text-xl font-bold">
              DevFest Tokyo
            </h1>
            <div className="w-2 h-8 bg-google-yellow-500 rounded-r-md"></div>
          </div>
        </div>
        <div className="flex gap-4 font-google-sans">
          <Link href="/" className="text-gray-800 hover:text-google-blue-500">
            Home
          </Link>
          <Link
            href="/timetable"
            className="text-gray-800 hover:text-google-blue-500"
          >
            Timetable
          </Link>
          <Link
            href="/talks"
            className="text-gray-800 hover:text-google-blue-500"
          >
            Talks
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
