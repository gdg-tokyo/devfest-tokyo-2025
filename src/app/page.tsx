import HeroPanel from '@/features/landing-page/components/HeroPanel'
import Welcome from '@/features/landing-page/Welcome'
import Overview from '@/features/landing-page/Overview'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <HeroPanel />
      <Welcome />
      <Overview /> {/* Add Overview component */}
    </main>
  )
}
