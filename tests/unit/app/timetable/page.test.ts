import { generateMetadata } from '@/app/timetable/layout' // Import from layout
import { SITE } from '@/lib/site'

describe('Timetable Page Metadata', () => {
  it('should generate correct metadata for the timetable page', async () => {
    const metadata = await generateMetadata()
    expect(metadata.title).toBe(`Timetable`) // Changed expectation
    expect(metadata.description).toBe(SITE.defaultDescription)
    expect(metadata.alternates?.canonical).toBe(`${SITE.url}/timetable`)
  })
})
