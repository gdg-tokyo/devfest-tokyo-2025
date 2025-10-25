'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RegistrationButton from '@/components/common/RegistrationButton'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <Image
              src="/images/gdg-logo-24-color.png"
              alt="GDG Tokyo Logo"
              width={32}
              height={32}
            />
            <h1 className="ml-2 font-google-sans text-black-02 text-xl font-bold">
              Google Developer Group Tokyo
            </h1>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-4 font-google-sans">
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
          <RegistrationButton href="https://gdg-tokyo.connpass.com/event/369416/">
            参加登録
          </RegistrationButton>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div
          data-testid="mobile-menu"
          className="sm:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm py-4"
        >
          <div className="container mx-auto px-4 flex flex-col gap-4 font-google-sans">
            <Link
              href="/"
              className="text-gray-800 hover:text-google-blue-500 block"
            >
              Home
            </Link>
            <Link
              href="/timetable"
              className="text-gray-800 hover:text-google-blue-500 block"
            >
              Timetable
            </Link>
            <Link
              href="/talks"
              className="text-gray-800 hover:text-google-blue-500 block"
            >
              Talks
            </Link>
            <RegistrationButton href="https://gdg-tokyo.connpass.com/event/369416/">
              参加登録
            </RegistrationButton>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header
