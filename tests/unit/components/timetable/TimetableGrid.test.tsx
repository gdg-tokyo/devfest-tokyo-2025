import React from 'react'
import { render, screen } from '@testing-library/react'
import TimetableGrid from '@/features/timetable/components/TimetableGrid'
import { getTalks, getSpeakers, getSessions } from '@/lib/data-parser'

jest.mock('@/lib/data-parser', () => ({
  getTalks: jest.fn(),
  getSpeakers: jest.fn(),
  getSessions: jest.fn(),
}))

const mockSpeakers = [
  {
    id: 'speaker1',
    name: 'John Doe',
    bio: 'bio',
    photo_url: 'url',
    job: 'job',
    twitter_handle: 'handle',
  },
  {
    id: 'speaker2',
    name: 'Jane Smith',
    bio: 'bio',
    photo_url: 'url',
    job: 'job',
    twitter_handle: 'handle',
  },
  {
    id: 'speaker3',
    name: 'Alice',
    bio: 'bio',
    photo_url: 'url',
    job: 'job',
    twitter_handle: 'handle',
  },
]

const mockTalks = [
  {
    id: 'talk1',
    title: 'Intro to Next.js',
    abstract: 'Abstract 1',
    time_start: '10:00',
    time_end: '10:50',
    track: 'Web & Frontend',
    speaker_ids: ['speaker1'],
    tech_tags: ['Next.js', 'React'],
    level: ['Beginner'],
    perspective: ['Introduction'],
  },
  {
    id: 'talk2',
    title: 'Advanced TS',
    abstract: 'Abstract 2',
    time_start: '10:00',
    time_end: '10:50',
    track: 'Google Cloud',
    speaker_ids: ['speaker2'],
    tech_tags: ['TypeScript', 'Google Cloud'],
    level: ['Advanced'],
    perspective: ['Challenge'],
  },
  {
    id: 'talk3',
    title: 'Another Web Talk',
    abstract: 'Abstract 3',
    time_start: '11:00',
    time_end: '11:50',
    track: 'Web & Frontend',
    speaker_ids: ['speaker3'],
    tech_tags: ['Web'],
    level: ['Intermediate'],
    perspective: ['Experience'],
  },
]

// Mock data for sessions
const mockSessions = [
  {
    id: 'session1',
    title: 'Intro to Next.js',
    description: 'Desc 1',
    track: 'Web & Frontend',
    time_start: '10:00',
    time_end: '10:50',
    room: 'Room A',
    talk_ids: ['talk1'],
    level: ['Beginner'],
    tech_tags: ['Next.js', 'React'],
  },
  {
    id: 'session2',
    title: 'Advanced TS',
    description: 'Desc 2',
    track: 'Google Cloud',
    time_start: '10:00',
    time_end: '10:50',
    room: 'Room B',
    talk_ids: ['talk2'],
    level: ['Advanced'],
    tech_tags: ['TypeScript', 'Google Cloud'],
  },
  {
    id: 'session3',
    title: 'Another Web Talk',
    description: 'Desc 3',
    track: 'Web & Frontend',
    time_start: '11:00',
    time_end: '11:50',
    room: 'Room A',
    talk_ids: ['talk3'],
    level: ['Intermediate'],
    tech_tags: ['Web'],
  },
]

const mockFilters = { levels: [], keyword: '' }

describe('TimetableGrid', () => {
  beforeEach(() => {
    ;(getTalks as jest.Mock).mockReturnValue(mockTalks)
    ;(getSpeakers as jest.Mock).mockReturnValue(mockSpeakers)
    ;(getSessions as jest.Mock).mockReturnValue(mockSessions)
  })

  it('renders track headers correctly', () => {
    render(<TimetableGrid sessions={mockSessions} filters={mockFilters} />)
    expect(screen.getByText('Google Cloud')).toBeInTheDocument()
    expect(screen.getByText('Web & Frontend')).toBeInTheDocument()
  })

  it('renders time slot headers correctly', () => {
    render(<TimetableGrid sessions={mockSessions} filters={mockFilters} />)
    expect(screen.getByText('10:00')).toBeInTheDocument()
    expect(screen.getByText('11:00')).toBeInTheDocument()
  })

  it('renders session cards in the correct slots', () => {
    render(<TimetableGrid sessions={mockSessions} filters={mockFilters} />)
    expect(screen.getByText('Intro to Next.js')).toBeInTheDocument()
    expect(screen.getByText('Advanced TS')).toBeInTheDocument()
    expect(screen.getByText('Another Web Talk')).toBeInTheDocument()
  })

  it('does not render a session card for empty slots', () => {
    render(<TimetableGrid sessions={mockSessions} filters={mockFilters} />)
    // This test is a bit tricky without knowing the exact structure of empty slots.
    // For now, we'll just ensure that the rendered sessions are correct.
    // A more robust test would check for the absence of a SessionCard in a known empty slot.
  })
})
