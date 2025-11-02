import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    path: `/talks`,
    title: `Talks - ${SITE.name}`,
  })
}

export default function TalksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
