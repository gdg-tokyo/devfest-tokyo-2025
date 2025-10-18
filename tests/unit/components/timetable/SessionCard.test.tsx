import { render, screen } from '@testing-library/react'
import SessionCard from '@/features/timetable/components/SessionCard'
import { Session, Talk, Speaker } from '@/types'
import { getTalks, getSpeakers } from '@/lib/data-parser'

jest.mock('@/lib/data-parser', () => ({
  getTalks: jest.fn(),
  getSpeakers: jest.fn(),
}))

const mockSpeakers: Speaker[] = [
  {
    id: 'speaker1',
    name: 'John Doe',
    bio: 'A seasoned web developer.',
    photo_url: '/images/speakers/john-doe.jpg',
    job: 'Software Engineer',
    twitter_handle: 'johndoe',
  },
]

const mockTalks: Talk[] = [
  {
    id: 'talk1',
    title: 'Next.js Fundamentals',
    abstract: 'Learn the core concepts of Next.js.',
    time_start: '10:00',
    time_end: '10:50',
    track: 'Web',
    speaker_ids: ['speaker1'],
    tech_tags: ['Next.js', 'React'],
    level: ['Beginner'],
    perspective: ['Introduction'],
  },
]

// Mock data for a session conforming to the new Session interface
const mockSession: Session = {
  id: 'session1',
  title: 'Introduction to Next.js',
  description: 'This session will cover the basics of Next.js.',
  level: ['Beginner'],
  talk_ids: ['talk1'],
  track: 'Web',
  time_start: '10:00',
  time_end: '10:50',
  room: 'Room 1',
  tech_tags: ['Next.js', 'React'],
}

describe('SessionCard', () => {
  beforeEach(() => {
    ;(getTalks as jest.Mock).mockReturnValue(mockTalks)
    ;(getSpeakers as jest.Mock).mockReturnValue(mockSpeakers)
  })

  it('renders session title and speaker names', () => {
    render(<SessionCard session={mockSession} speakers={mockSpeakers} />)
    expect(screen.getByText('Introduction to Next.js')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('renders time information', () => {
    render(<SessionCard session={mockSession} speakers={mockSpeakers} />)
    expect(screen.getByText('10:00 - 10:50')).toBeInTheDocument()
  })

  it('renders level tags', () => {
    render(<SessionCard session={mockSession} speakers={mockSpeakers} />)
    expect(screen.getByText('Beginner')).toBeInTheDocument()
  })

  // Removed tech tags test as they are no longer directly on the Session object for the card display
})
