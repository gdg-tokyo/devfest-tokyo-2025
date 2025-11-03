import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    path: `/talks`,
    title: `Talks`,
  })
}

export default function TalksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
