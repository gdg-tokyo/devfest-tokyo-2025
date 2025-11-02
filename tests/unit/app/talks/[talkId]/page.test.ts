import { generateMetadata } from '@/app/talks/[talkId]/page'
import { SITE } from '@/lib/site'

// Mock the data-parser module
jest.mock('@/lib/data-parser', () => ({
  getTalkById: jest.fn((id) => {
    if (id === 'talk-1') {
      return {
        talk: { id: 'talk-1', title: 'Test Talk 1', abstract: 'Abstract 1' },
        speakers: [{ id: 'speaker-1', name: 'John Doe' }],
      }
    }
    return undefined
  }),
}))

describe('Talk Detail Page Metadata', () => {
  it('should generate correct metadata for a valid talk', async () => {
    const params = { talkId: 'talk-1' }
    const metadata = await generateMetadata({ params })
    expect(metadata.title).toBe(`Test Talk 1 (by John Doe) - ${SITE.name}`)
    expect(metadata.description).toBe('Abstract 1')
    expect(metadata.alternates?.canonical).toBe(`${SITE.url}/talks/talk-1`)
  })

  it('should generate default metadata for an invalid talk', async () => {
    const params = { talkId: 'non-existent-talk' }
    const metadata = await generateMetadata({ params })
    expect(metadata.title).toBeUndefined() // Handled by layout template
    expect(metadata.description).toBe(SITE.defaultDescription)
    expect(metadata.alternates?.canonical).toBe(
      `${SITE.url}/talks/non-existent-talk`
    )
  })
})
