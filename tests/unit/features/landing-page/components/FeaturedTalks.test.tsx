import FeaturedTalks from '@/features/landing-page/components/FeaturedTalks'
import * as dataParser from '@/lib/data-parser'
import { Session, Speaker, Talk } from '@/types'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

// Mock data-parser functions
jest.mock('@/lib/data-parser', () => ({
  getTalks: jest.fn(),
  getSessions: jest.fn(),
  getSpeakers: jest.fn(),
}))

describe('FeaturedTalks', () => {
  const mockTalks: Talk[] = [
    {
      id: '4e750be0',
      title: 'Test Talk 1',
      speaker_ids: ['speaker1'],
      abstract: 'Abstract for test talk 1',
      level: ['Beginner'],
    },
    {
      id: '436aadeb',
      title: 'Test Talk 2',
      speaker_ids: ['speaker2'],
      abstract: 'Abstract for test talk 2',
      level: ['Intermediate'],
    },
    {
      id: 'other-talk',
      title: 'Other Talk',
      speaker_ids: ['speaker3'],
      abstract: 'Abstract for other talk',
      level: ['Advanced'],
    },
  ]

  const mockSessions: Session[] = [
    {
      id: 'session1',
      title: 'Test Session 1',
      time_start: '10:00',
      time_end: '10:45',
      track: 'Track A',
      talk_ids: ['4e750be0'],
      description: 'Description for test session 1',
    },
    {
      id: 'session2',
      title: 'Test Session 2',
      time_start: '11:00',
      time_end: '11:45',
      track: 'Track B',
      talk_ids: ['436aadeb', 'other-talk'],
      description: 'Description for test session 2',
    },
  ]

  const mockSpeakers: Speaker[] = [
    {
      id: 'speaker1',
      name: 'Test Speaker 1',
      bio: 'Bio for test speaker 1',
    },
    {
      id: 'speaker2',
      name: 'Test Speaker 2',
      bio: 'Bio for test speaker 2',
    },
    {
      id: 'speaker3',
      name: 'Test Speaker 3',
      bio: 'Bio for test speaker 3',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    ;(dataParser.getTalks as jest.Mock).mockReturnValue(mockTalks)
    ;(dataParser.getSessions as jest.Mock).mockReturnValue(mockSessions)
    ;(dataParser.getSpeakers as jest.Mock).mockReturnValue(mockSpeakers)
  })

  it('renders the section title', () => {
    render(<FeaturedTalks />)
    expect(screen.getByText('基調講演')).toBeInTheDocument()
  })

  it('renders the correct number of featured talks', () => {
    const { container } = render(<FeaturedTalks />)
    const talkCards = container.querySelectorAll('[talk-card-id]')
    expect(talkCards).toHaveLength(2)
  })

  it('renders the correct talk titles', () => {
    render(<FeaturedTalks />)
    expect(screen.getByText('Test Talk 1')).toBeInTheDocument()
    expect(screen.getByText('Test Talk 2')).toBeInTheDocument()
    expect(screen.queryByText('Other Talk')).not.toBeInTheDocument()
  })
})
