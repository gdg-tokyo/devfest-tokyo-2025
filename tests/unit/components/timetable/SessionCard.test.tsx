import React from 'react'
import { render, screen } from '@testing-library/react'
import SessionCard from '@/features/timetable/components/SessionCard'
import { Session } from '@/types'

// Mock data for a session conforming to the new Session interface
const mockSession: Session = {
  id: 'session1',
  title: 'Introduction to Next.js',
  longDescription: 'This session will cover the basics of Next.js.',
  level: 'Beginner',
  perspective: 'Introduction',
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
          photoUrl: '/images/speakers/john-doe.jpg',
          socialLinks: [
            { platform: 'twitter', url: 'https://twitter.com/johndoe' },
          ],
        },
      ],
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
    // Note: time_start and time_end are not part of the new Session interface
    // For this test to pass, mockSession needs to be cast or updated if these are still expected.
    // Assuming for now that these are implicitly handled or will be removed from the card display.
    // If time is still displayed, the SessionCard component or mockSession needs adjustment.
    // For now, this test will be skipped or adjusted to reflect current component behavior.
    // As per the updated SessionCard, time_start and time_end are accessed via (session as any).time_start
    // This test will pass if the mockSession is extended with these properties.
    const sessionWithTime = {
      ...mockSession,
      time_start: '10:00',
      time_end: '10:50',
    } as Session
    render(<SessionCard session={sessionWithTime} />)
    expect(screen.getByText('10:00 - 10:50')).toBeInTheDocument()
  })

  it('renders level tags', () => {
    render(<SessionCard session={mockSession} />)
    expect(screen.getByText('Beginner')).toBeInTheDocument()
  })

  // Removed tech tags test as they are no longer directly on the Session object for the card display
})
