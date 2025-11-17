import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import SessionCard from '@/features/timetable/components/SessionCard'
import { Session, Talk, Speaker } from '@/types'
import * as dataParser from '@/lib/data-parser'
import * as styleUtils from '@/lib/style-utils'

// Mock data-parser functions
jest.mock('@/lib/data-parser', () => ({
  getTalks: jest.fn(),
  getSpeakers: jest.fn(),
}))

// Mock style-utils functions
jest.mock('@/lib/style-utils', () => ({
  getLevelColor: jest.fn((level) => `bg-mock-${level.toLowerCase()}`),
  getTrackDisplayName: jest.fn((track) => track),
}))

jest.mock('@mui/icons-material', () => ({
  LocationOn: () => <svg data-testid="LocationOnIcon" />,
  Person: () => <svg data-testid="PersonIcon" />,
  AccessTime: () => <svg data-testid="AccessTimeIcon" />,
}))

describe('SessionCard', () => {
  const mockTalks: Talk[] = [
    {
      id: 'talk1',
      title: 'Test Talk',
      speaker_ids: ['speaker1'],
      abstract: 'Abstract for test talk',
      time_start: '09:00',
      time_end: '09:45',
      track: 'Track A',
      level: ['Beginner'],
      perspective: ['Introduction'],
      tech_tags: [],
    },
  ]

  const mockSpeakers: Speaker[] = [
    {
      id: 'speaker1',
      name: 'Test Speaker',
      bio: 'Bio for test speaker',
      photo_url: 'speaker.jpg',
      job: 'Developer',
      twitter_handle: 'testspeaker',
    },
  ]

  const mockSession: Session = {
    id: 'session1',
    title: 'Test Session Title',
    time_start: '09:00',
    time_end: '09:45',
    track: 'Track A',
    level: ['Beginner'],
    talk_ids: ['talk1'],
    description: 'Description for test session',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(dataParser.getTalks as jest.Mock).mockReturnValue(mockTalks)
    ;(dataParser.getSpeakers as jest.Mock).mockReturnValue(mockSpeakers)
  })

  it('renders session details correctly', () => {
    render(<SessionCard session={mockSession} />)

    expect(screen.getByText('Test Session Title')).toBeInTheDocument()
    expect(screen.getByText('Test Speaker')).toBeInTheDocument()
    expect(screen.getByText('09:00 - 09:45')).toBeInTheDocument()
    expect(screen.getByText('Track A')).toBeInTheDocument()
    expect(screen.getByText('Beginner')).toBeInTheDocument()
  })

  it('displays time and track information with LocationOn icon', () => {
    render(<SessionCard session={mockSession} />)

    const timeAndTrackContainer = screen
      .getByText('09:00 - 09:45')
      .closest('div')?.parentElement
    expect(timeAndTrackContainer).toHaveTextContent('Track A')
    expect(screen.getByTestId('LocationOnIcon')).toBeInTheDocument()
  })

  it('applies correct styling for isGrayedOut prop', () => {
    const { rerender } = render(
      <SessionCard session={mockSession} isGrayedOut={true} />
    )
    expect(screen.getByTestId('session-card-session1')).toHaveClass(
      'opacity-30'
    )

    rerender(<SessionCard session={mockSession} isGrayedOut={false} />)
    expect(screen.getByTestId('session-card-session1')).not.toHaveClass(
      'opacity-30'
    )
  })

  it('displays skill level tags with correct colors', () => {
    render(<SessionCard session={mockSession} />)

    const levelTag = screen.getByText('Beginner')
    expect(levelTag).toBeInTheDocument()
    expect(levelTag).toHaveClass('bg-mock-beginner')
  })
})
