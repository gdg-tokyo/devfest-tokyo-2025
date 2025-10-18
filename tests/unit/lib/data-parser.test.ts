import { getSessions, OldSession } from '@/lib/data-parser'
import speakersData from '@/data/speakers.json'
import talksData from '@/data/talks.json'
import sessionsData from '@/data/sessions.json'

jest.mock('@/data/speakers.json', () => [
  {
    id: 'speaker-1',
    name: 'John Doe',
    icon_url: '',
    job: '',
    bio: '',
    twitter_handle: 'johndoe',
  },
])

jest.mock('@/data/talks.json', () => [
  {
    id: 'talk-1',
    title: 'Test Talk',
    abstract: 'Long desc',
    speaker_ids: ['speaker-1'],
    tech_tags: [],
    level: 'Beginner',
    perspective: 'Introduction',
    is_keynote: false,
  },
])

jest.mock('@/data/sessions.json', () => [
  {
    id: 'session-1',
    talk_ids: ['talk-1'],
    track: 'Track A',
    time_start: '10:00',
    time_end: '10:50',
    room: 'Room 1',
    title: 'Session 1 Title',
    level: ['Beginner'],
    tech_tags: ['Web'],
    description: 'Session 1 Description',
  },
])

describe('getSessions', () => {
  it('should return the correctly joined session data', () => {
    const sessions = getSessions()
    expect(sessions).toHaveLength(1)

    const session = sessions[0]
    expect(session.id).toBe('session-1')
    expect(session.title).toBe('Session 1 Title')
    expect(session.level).toEqual(['Beginner'])
    expect(session.tech_tags).toEqual(['Web'])
    expect(session.description).toBe('Session 1 Description')
    expect(session.talks).toHaveLength(1)

    const talk = session.talks[0]
    expect(talk.id).toBe('talk-1')
    expect(talk.speakers).toHaveLength(1)

    const speaker = talk.speakers[0]
    expect(speaker.id).toBe('speaker-1')
    expect(speaker.name).toBe('John Doe')
  })
})
