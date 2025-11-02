import { generateMetadata } from '@/app/sessions/[sessionId]/page'
import { SITE } from '@/lib/site'
import { getSessions } from '@/lib/data-parser'

// Mock the data-parser module
jest.mock('@/lib/data-parser')

describe('Session Detail Page Metadata', () => {
  beforeEach(() => {
    ;(getSessions as jest.Mock).mockReturnValue([
      {
        id: 'session-1',
        title: 'Test Session 1',
        description: 'Session Description 1',
      },
    ])
  })

  it('should generate correct metadata for a valid session', async () => {
    const params = { sessionId: 'session-1' }
    const metadata = await generateMetadata({ params })
    expect(metadata.title).toBe(`Test Session 1 - ${SITE.name}`)
    expect(metadata.description).toBe('Session Description 1')
    expect(metadata.alternates?.canonical).toBe(
      `${SITE.url}/sessions/session-1`
    )
  })

  it('should generate default metadata for an invalid session', async () => {
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
