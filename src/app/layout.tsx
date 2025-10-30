import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevFest Tokyo 2025',
  description: 'DevFest Tokyo 2025 - Find your new “eyes”',
  icons: {
    icon: withRepoBasePath('/images/favicon.ico'),
  },
}

import { Footer } from '@/components/Footer' // Import Footer
import Header from '@/components/Header'
import { withRepoBasePath } from '@/lib/url-utils'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-off-white`}
        suppressHydrationWarning
      >
        <Header />
        {children}
        <Footer /> {/* Add Footer component */}
      </body>
    </html>
  )
}
