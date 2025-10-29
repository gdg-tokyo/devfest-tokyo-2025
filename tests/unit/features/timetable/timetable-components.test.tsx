import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import TimetableList from '@/features/timetable/components/TimetableList'
import TimetableGrid from '@/features/timetable/components/TimetableGrid'
import { Session } from '@/types'
import { getTrackColor } from '@/features/timetable/utils'

// Mock SessionCard to avoid deep rendering issues and focus on TimetableList/Grid structure
jest.mock('@/features/timetable/components/SessionCard', () => {
  // eslint-disable-next-line react/display-name
  return ({ session }: { session: Session }) => (
    <div data-testid={`session-card-${session.id}`}>{session.title}</div>
  )
})

// Mock matchMedia for responsive tests
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: matches,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
}

describe('TimetableList (Mobile View)', () => {
  const mockSessions: Session[] = [
    {
      id: 's1',
      title: 'Mobile Session 1',
      time_start: '09:00',
      time_end: '09:30',
      track: 'Track A',
      level: ['Beginner'],
      talk_ids: [],
      description: 'Description 1',
    },
    {
      id: 's2',
      title: 'Mobile Session 2',
      time_start: '09:00',
      time_end: '09:30',
      track: 'Track B',
      level: ['Intermediate'],
      talk_ids: [],
      description: 'Description 2',
    },
    {
      id: 's3',
      title: 'Mobile Session 3',
      time_start: '10:00',
      time_end: '10:30',
      track: 'Track A',
      level: ['Advanced'],
      talk_ids: [],
      description: 'Description 3',
    },
  ]

  const mockFilters = { levels: [], keyword: '' }
  const mockAllTimeSlots = ['09:00', '10:00']
  const mockFilterSession = jest.fn(() => true)

  beforeEach(() => {
    mockMatchMedia(true) // Simulate mobile screen
  })

  it('renders correctly on mobile screens', () => {
    const { asFragment } = render(
      <TimetableList
        sessions={mockSessions}
        filters={mockFilters}
        allTimeSlots={mockAllTimeSlots}
        filterSession={mockFilterSession}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('displays sessions stacked vertically with track name panel', () => {
    render(
      <TimetableList
        sessions={mockSessions}
        filters={mockFilters}
        allTimeSlots={mockAllTimeSlots}
        filterSession={mockFilterSession}
      />
    )

    const timeSlots = screen.getAllByRole('heading', { level: 3 })
    expect(timeSlots).toHaveLength(mockAllTimeSlots.length)

    mockSessions.forEach((session) => {
      expect(screen.getByText(session.title)).toBeInTheDocument()
      expect(screen.getByText(session.title)).toBeInTheDocument()

      // Find the parent div that contains both the track panel and the session card
      const sessionEntryDiv = screen.getByTestId(`session-card-${session.id}`)
        .parentElement?.parentElement
      expect(sessionEntryDiv).toBeInTheDocument()

      // Now, within this sessionEntryDiv, find the track panel (first child div)
      const trackPanel = sessionEntryDiv?.querySelector('div:first-child')
      expect(trackPanel).toBeInTheDocument()

      // And within the trackPanel, find the span with the track name
      const trackNameSpan = trackPanel?.querySelector(
        'span.text-xs.rotate-90.whitespace-nowrap'
      )
      expect(trackNameSpan).toBeInTheDocument()
      expect(trackNameSpan).toHaveTextContent(session.track)

      expect(trackPanel).toHaveClass(getTrackColor(session.track))
      expect(trackPanel).toHaveClass('border-2')
      expect(trackPanel).toHaveClass('border-gray-800')
      expect(trackPanel).toHaveClass('text-black-02')
      expect(trackPanel).toHaveClass('font-normal')
      expect(trackPanel).toHaveClass(getTrackColor(session.track))
      expect(trackPanel).toHaveClass('border-2')
      expect(trackPanel).toHaveClass('border-gray-800')
      expect(trackPanel).toHaveClass('text-black-02')
      expect(trackPanel).toHaveClass('font-normal')
    })
  })
})

describe('TimetableGrid (Tablet/PC View)', () => {
  const mockSessions: Session[] = [
    {
      id: 's1',
      title: 'Grid Session 1',
      time_start: '09:00',
      time_end: '09:30',
      track: 'Track A',
      level: ['Beginner'],
      talk_ids: [],
      description: 'Description 1',
    },
    {
      id: 's2',
      title: 'Grid Session 2',
      time_start: '09:00',
      time_end: '09:30',
      track: 'Track B',
      level: ['Intermediate'],
      talk_ids: [],
      description: 'Description 2',
    },
  ]

  const mockFilters = { levels: [], keyword: '' }
  const mockAllTimeSlots = ['09:00', '09:30']
  const mockDisplayTracks = ['Track A', 'Track B']
  const mockFilterSession = jest.fn(() => true)

  beforeEach(() => {
    mockMatchMedia(false) // Simulate non-mobile screen
  })

  it('renders correctly on tablet/PC screens', () => {
    const { asFragment } = render(
      <TimetableGrid
        sessions={mockSessions}
        filters={mockFilters}
        allTimeSlots={mockAllTimeSlots}
        displayTracks={mockDisplayTracks}
        filterSession={mockFilterSession}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('displays sessions in a grid layout with track headers', () => {
    render(
      <TimetableGrid
        sessions={mockSessions}
        filters={mockFilters}
        allTimeSlots={mockAllTimeSlots}
        displayTracks={mockDisplayTracks}
        filterSession={mockFilterSession}
      />
    )

    mockDisplayTracks.forEach((track) => {
      expect(screen.getByText(track)).toBeInTheDocument()
    })

    mockSessions.forEach((session) => {
      expect(screen.getByText(session.title)).toBeInTheDocument()
    })
  })
})
