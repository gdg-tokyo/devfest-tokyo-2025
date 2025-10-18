import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevFest Tokyo 2025',
  description: 'DevFest Tokyo 2025 - Find your new “eyes”',
}

import Navbar from '@/components/Navbar'
import { Footer } from '@/components/Footer' // Import Footer

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-off-white`}>
        <Navbar />
        {children}
        <Footer /> {/* Add Footer component */}
      </body>
    </html>
  )
}
