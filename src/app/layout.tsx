import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { SITE } from '@/lib/site'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: SITE.defaultTitle,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.defaultDescription,
  metadataBase: new URL(SITE.url),
  icons: {
    icon: withRepoBasePath('/images/favicon.ico'),
  },
  verification: {
    google: 'sDHdP5CwqAE4MJel2lrCFms6mlVEv_mXXbscL1nxIGQ',
  },
}

import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import { withRepoBasePath } from '@/lib/url-utils'
import { GoogleTagManager } from '@next/third-parties/google'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || ''

  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-off-white`}
        suppressHydrationWarning
      >
        <Header />
        {children}
        <Footer /> {/* Add Footer component */}
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
      </body>
    </html>
  )
}
