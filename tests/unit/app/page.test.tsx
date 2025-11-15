import Home, { generateMetadata } from '@/app/page'
import { SITE } from '@/lib/site'
import { act, render, screen } from '@testing-library/react'

// Mock HeroPanel to prevent dynamic imports and state updates during tests
jest.mock('@/features/landing-page/components/HeroPanel', () => {
  return jest.fn(() => <div data-testid="mock-hero-panel" />)
})

describe('Landing Page Metadata', () => {
  it('should generate correct metadata for the landing page', async () => {
    const metadata = await generateMetadata()
    expect(metadata.title).toBe('GDG DevFest Tokyo 2025')
    expect(metadata.description).toBe(SITE.defaultDescription)
    expect(metadata.alternates?.canonical).toBe(new URL(SITE.url).toString())
  })
})

describe('Home Component', () => {
  it('should render the FeaturedTalks section', async () => {
    await act(async () => {
      render(<Home />)
    })
    expect(screen.getByTestId('featured-talks-section')).toBeInTheDocument()
    // Assert that the mock HeroPanel is rendered
    expect(screen.getByTestId('mock-hero-panel')).toBeInTheDocument()
  })
})
