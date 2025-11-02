import { generateMetadata } from '@/app/sessions/[sessionId]/page'
import { SITE } from '@/lib/site'
import { getSessions } from '@/lib/data-parser'

// Mock the data-parser module
jest.mock('@/lib/data-parser', () => ({
  getSessions: jest.fn(() => [
    {
      id: 'session-1',
      title: 'Test Session 1',
      abstract: 'Session Abstract 1',
    },
  ]),
}))

describe('Session Detail Page Metadata', () => {
  it('should generate correct metadata for a valid session', async () => {
    const params = { sessionId: 'session-1' }
    const metadata = await generateMetadata({ params })
    expect(metadata.title).toBe(`Test Session 1 - ${SITE.name}`)
    expect(metadata.description).toBe('Session Abstract 1')
    expect(metadata.alternates?.canonical).toBe(
      `${SITE.url}/sessions/session-1`
    )
  })

  it('should generate default metadata for an invalid session', async () => {
    // Temporarily modify the mock to return an empty array for this test case
    ;(getSessions as jest.Mock).mockReturnValueOnce([])

    const params = { sessionId: 'non-existent-session' }
    const metadata = await generateMetadata({ params })
    expect(metadata.title).toBeUndefined() // Handled by layout template
    expect(metadata.description).toBe(SITE.defaultDescription)
    expect(metadata.alternates?.canonical).toBe(
      `${SITE.url}/sessions/non-existent-session`
    )
  })
})
