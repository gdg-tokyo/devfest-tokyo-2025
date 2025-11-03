import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import TalkCard from '@/components/common/TalkCard'
import { Talk, Session, Speaker } from '@/types'
import '@testing-library/jest-dom'

// Mock the next/link component
jest.mock('next/link', () => {
  const MockedLink = ({ children, href }) => {
    return <a href={href}>{children}</a>
  }
  MockedLink.displayName = 'MockedLink'
  return MockedLink
})

// Mock HtmlContent since it's not relevant to this test
jest.mock('@/components/common/HtmlContent', () => ({
  __esModule: true,
  default: ({ html }: { html: string }) => (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  ),
}))

const mockTalk: Talk = {
  id: 'talk-1',
  title: 'Test Talk Title',
  abstract:
    'This is a long abstract that should be truncated. It has more than three lines of text to ensure that the line-clamp functionality is working as expected. We need to make sure this text is long enough to be truncated.',
  speaker_ids: ['speaker-1'],
  time_start: '10:00',
  time_end: '10:30',
  track: 'A',
  tech_tags: [],
  perspective: [],
  level: [],
}

const mockSession: Session = {
  id: 'session-1',
  talk_ids: ['talk-1'],
  title: 'Test Session',
  time_start: '09:00',
  time_end: '11:00',
  track: 'A',
  level: ['Beginner'],
  tech_tags: [],
  description: '',
  perspective: [],
}

const mockSpeakers: Speaker[] = [
  {
    id: 'speaker-1',
    name: 'Test Speaker',
    bio: '',
    photo_url: '',
    job: '',
    twitter_handle: '',
  },
]

describe('TalkCard', () => {
  it('should display the talk title', async () => {
    await act(async () => {
      render(
        <TalkCard
          talk={mockTalk}
          sessionId={mockSession.id}
          session={mockSession}
          speakers={mockSpeakers}
        />
      )
    })
    expect(screen.getByText(mockTalk.title)).toBeInTheDocument()
  })

  it('should display the speaker names', async () => {
    await act(async () => {
      render(
        <TalkCard
          talk={mockTalk}
          sessionId={mockSession.id}
          session={mockSession}
          speakers={mockSpeakers}
        />
      )
    })
    expect(screen.getByText(mockSpeakers[0].name)).toBeInTheDocument()
  })

  it('should display the talk time, not the session time', async () => {
    await act(async () => {
      render(
        <TalkCard
          talk={mockTalk}
          sessionId={mockSession.id}
          session={mockSession}
          speakers={mockSpeakers}
        />
      )
    })
    // Check for the talk's time
    expect(
      screen.getByText(`${mockTalk.time_start} - ${mockTalk.time_end}`)
    ).toBeInTheDocument()

    // Ensure the session's time is not present
    expect(
      screen.queryByText(`${mockSession.time_start} - ${mockSession.time_end}`)
    ).not.toBeInTheDocument()
  })

  it('should display N/A if talk time is missing', async () => {
    const talkWithoutTime = { ...mockTalk, time_start: '', time_end: '' }
    await act(async () => {
      render(
        <TalkCard
          talk={talkWithoutTime}
          sessionId={mockSession.id}
          session={mockSession}
          speakers={mockSpeakers}
        />
      )
    })
    expect(screen.getByText('N/A - N/A')).toBeInTheDocument()
  })

  it('should display the truncated abstract', async () => {
    await act(async () => {
      render(
        <TalkCard
          talk={mockTalk}
          sessionId={mockSession.id}
          session={mockSession}
          speakers={mockSpeakers}
        />
      )
    })
    const abstractElement = await screen.findByText(mockTalk.abstract)
    expect(abstractElement).toBeInTheDocument()
    expect(abstractElement.parentElement).toHaveClass('line-clamp-3')
  })

  it('should display the level tags', async () => {
    await act(async () => {
      render(
        <TalkCard
          talk={mockTalk}
          sessionId={mockSession.id}
          session={mockSession}
          speakers={mockSpeakers}
        />
      )
    })
    expect(screen.getByText(mockSession.level[0])).toBeInTheDocument()
  })

  it('should navigate to the correct talk page on click', async () => {
    await act(async () => {
      render(
        <TalkCard
          talk={mockTalk}
          sessionId={mockSession.id}
          session={mockSession}
          speakers={mockSpeakers}
        />
      )
    })
    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveAttribute('href', `/talks/${mockTalk.id}`)
  })
})
