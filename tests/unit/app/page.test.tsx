import { generateMetadata } from '@/app/page'
import Home from '@/app/page'
import { SITE } from '@/lib/site'
import { render, screen } from '@testing-library/react'

describe('Landing Page Metadata', () => {
  it('should generate correct metadata for the landing page', async () => {
    const metadata = await generateMetadata()
    expect(metadata.title).toBe('GDG DevFest Tokyo 2025')
    expect(metadata.description).toBe(SITE.defaultDescription)
    expect(metadata.alternates?.canonical).toBe(new URL(SITE.url).toString())
  })
})

describe('Home Component', () => {
  it('should render the FeaturedTalks section', () => {
    render(<Home />)
    expect(screen.getByTestId('featured-talks-section')).toBeInTheDocument()
  })
})
