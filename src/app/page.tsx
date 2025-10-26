import HeroPanel from '@/features/landing-page/components/HeroPanel'
import Welcome from '@/features/landing-page/Welcome'
import EventOverview from '@/features/landing-page/components/EventOverview'
import StakeholdersSection from '@/features/landing-page/components/StakeholdersSection'

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
