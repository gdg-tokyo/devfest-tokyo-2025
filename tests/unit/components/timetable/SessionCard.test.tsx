import React from 'react'
import { render, screen } from '@testing-library/react'
import SessionCard from '@/features/timetable/components/SessionCard'
import { OldSession } from '@/types'

// Mock data for a session conforming to the new Session interface
const mockSession: OldSession = {
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
  talks: [
    {
      id: 'talk1',
      title: 'Next.js Fundamentals',
      abstract: 'Learn the core concepts of Next.js.',
      speakers: [
        {
          id: 'speaker1',
          name: 'John Doe',
          bio: 'A seasoned web developer.',
          photo_url: '/images/speakers/john-doe.jpg',
          job: 'Software Engineer',
          twitter_handle: 'johndoe',
        },
      ],
      speaker_ids: ['speaker1'],
      tech_tags: ['Next.js', 'React'],
      is_keynote: false,
    },
  ],
}

describe('SessionCard', () => {
  it('renders session title and speaker names', () => {
    render(<SessionCard session={mockSession} />)
    expect(screen.getByText('Introduction to Next.js')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('renders time information', () => {
    render(<SessionCard session={mockSession} />)
    expect(screen.getByText('10:00 - 10:50')).toBeInTheDocument()
  })

  it('renders level tags', () => {
    render(<SessionCard session={mockSession} />)
    expect(screen.getByText('Beginner')).toBeInTheDocument()
  })

  // Removed tech tags test as they are no longer directly on the Session object for the card display
})
