import { generateMetadata } from '@/app/talks/layout' // Import from layout
import { SITE } from '@/lib/site'

describe('Talks List Page Metadata', () => {
  it('should generate correct metadata for the talks list page', async () => {
    const metadata = await generateMetadata()
    expect(metadata.title).toBe(`Talks`) // Changed expectation
    expect(metadata.description).toBe(SITE.defaultDescription)
    expect(metadata.alternates?.canonical).toBe(`${SITE.url}/talks`)
  })
})
