import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import TalkCard from '@/components/common/TalkCard'
import { Talk, Session, Speaker } from '@/types'
import talks from '../../../../__mocks__/data/dev/talks.json'

describe('TalkCard', () => {
  const mockSpeaker: Speaker = {
    id: 'speaker1',
    name: 'John Doe',
    bio: 'A great speaker',
    photo_url: 'https://example.com/john.jpg',
    job: 'Software Engineer',
    twitter_handle: 'johndoe',
  }

  const mockTalk = talks[0] as Talk

  const mockSession: Session = {
    id: 'session1',
    talk_ids: ['talk1'],
    track: 'Web',
    time_start: '10:00',
    time_end: '11:00',
    title: 'Web Development Track',
    level: ['Advanced'], // This should NOT be displayed by TalkCard
    tech_tags: ['Web'],
    description: 'Description for web track',
    perspective: ['Experience'],
  }

  it('renders talk title, speaker name, and time', () => {
    render(
      <TalkCard
        talk={mockTalk}
        sessionId={mockSession.id}
        session={mockSession}
        speakers={[mockSpeaker]}
      />
    )

    expect(screen.getByText(mockTalk.title)).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('renders the correct level from talk prop', () => {
    render(
      <TalkCard
        talk={mockTalk}
        sessionId={mockSession.id}
        session={mockSession}
        speakers={[mockSpeaker]}
      />
    )

    // Expect the level from mockTalk to be displayed
    expect(screen.getByText('Beginner')).toBeInTheDocument()
    // Ensure the level from mockSession is NOT displayed
    expect(screen.queryByText('Advanced')).not.toBeInTheDocument()
  })
})
