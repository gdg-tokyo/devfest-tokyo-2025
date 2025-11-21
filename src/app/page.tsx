import type { Metadata } from 'next'
import HeroPanel from '@/features/landing-page/components/HeroPanel'
import Welcome from '@/features/landing-page/Welcome'
import EventOverview from '@/features/landing-page/components/EventOverview'
import FeaturedTalks from '@/features/landing-page/components/FeaturedTalks'
import SpeakerGallery from '@/features/landing-page/components/SpeakerGallery' // Import SpeakerGallery
import StakeholdersSection from '@/features/landing-page/components/StakeholdersSection'
import { buildMetadata } from '@/lib/seo'
import { getSpeakerGalleryData } from '@/lib/data-parser' // Import data loader

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    path: '/',
    title: 'GDG DevFest Tokyo 2025',
  })
}

export default async function Home() {
  const { speakers, sessionChairs } = getSpeakerGalleryData() // Fetch data

  return (
    <>
      <HeroPanel />
      <main>
        <Welcome />
        <EventOverview />
        <FeaturedTalks />
        <SpeakerGallery
          speakers={speakers}
          sessionChairs={sessionChairs}
        />{' '}
        {/* Add SpeakerGallery */}
        <StakeholdersSection />
      </main>
    </>
  )
}
