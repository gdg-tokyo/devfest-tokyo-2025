import type { Metadata } from 'next'
import HeroPanel from '@/features/landing-page/components/HeroPanel'
import Welcome from '@/features/landing-page/Welcome'
import EventOverview from '@/features/landing-page/components/EventOverview'
import StakeholdersSection from '@/features/landing-page/components/StakeholdersSection'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    path: '/',
    title: 'GDG DevFest Tokyo 2025',
  })
}

export default function Home() {
  return (
    <>
      <HeroPanel />
      <main>
        <Welcome />
        <EventOverview />
        <StakeholdersSection />
      </main>
    </>
  )
}
