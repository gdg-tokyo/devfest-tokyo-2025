'use client'

import React from 'react'
import Link from 'next/link'
import LaunchIcon from '@mui/icons-material/Launch'

interface RegistrationButtonProps {
  href: string
  children: React.ReactNode
}

const RegistrationButton: React.FC<RegistrationButtonProps> = ({
  href,
  children,
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-google-red-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-google-red-600 transition duration-300 ease-in-out inline-flex items-center justify-center"
    >
      {children}
      <LaunchIcon className="ml-2 text-sm" />
    </Link>
  )
}

export default RegistrationButton
