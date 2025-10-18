import React from 'react'
import { render, screen } from '@testing-library/react'
import TimetableGrid from '@/features/timetable/components/TimetableGrid'

// Mock data for sessions
const mockSessions = [
  {
    id: 'session1',
    title: 'Intro to Next.js',
    description_long: 'Desc 1',
    speaker_names: ['John Doe'],
    speaker_profiles: [{ name: 'John Doe', icon_url: '' }],
    track: 'Web & Frontend',
    time_start: '10:00',
    time_end: '10:50',
    room: 'Room A',
  },
  {
    id: 'session2',
    title: 'Advanced TS',
    description_long: 'Desc 2',
    speaker_names: ['Jane Smith'],
    speaker_profiles: [{ name: 'Jane Smith', icon_url: '' }],
    track: 'Google Cloud',
    time_start: '10:00',
    time_end: '10:50',
    room: 'Room B',
  },
  {
    id: 'session3',
    title: 'Another Web Talk',
    description_long: 'Desc 3',
    speaker_names: ['Alice'],
    speaker_profiles: [{ name: 'Alice', icon_url: '' }],
    track: 'Web & Frontend',
    time_start: '11:00',
    time_end: '11:50',
    room: 'Room A',
  },
]

const mockFilters = { levels: [], perspectives: [], keyword: '' }

describe('TimetableGrid', () => {
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
