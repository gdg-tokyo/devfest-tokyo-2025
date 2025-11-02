import { generateMetadata } from '@/app/page'
import { SITE } from '@/lib/site'

describe('Landing Page Metadata', () => {
  it('should generate correct metadata for the landing page', async () => {
    const metadata = await generateMetadata()
    expect(metadata.title).toBe('GDG DevFest Tokyo 2025 - Find your new eyes')
    expect(metadata.description).toBe(SITE.defaultDescription)
    expect(metadata.alternates?.canonical).toBe(new URL(SITE.url).toString())
  })
})
