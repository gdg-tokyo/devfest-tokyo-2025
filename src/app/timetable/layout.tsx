import { buildMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    path: `/timetable`,
    title: `Timetable`,
    ogImage: `/images/thumbnail/devfest2025-timetable-wide-small.png`,
  })
}

export default function TimetableLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
