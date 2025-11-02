import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    path: `/timetable`,
    title: `Timetable - ${SITE.name}`,
  })
}

export default function TimetableLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
