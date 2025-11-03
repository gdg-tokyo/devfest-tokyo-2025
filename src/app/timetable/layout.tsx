import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    path: `/timetable`,
    title: `Timetable`,
  })
}

export default function TimetableLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
