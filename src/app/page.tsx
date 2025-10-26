import HeroPanel from '@/features/landing-page/components/HeroPanel'
import Welcome from '@/features/landing-page/Welcome'
import EventOverview from '@/features/landing-page/components/EventOverview'

export default function Home() {
  return (
    <main>
      <HeroPanel />
      <Welcome />
      <EventOverview />
    </main>
  )
}
