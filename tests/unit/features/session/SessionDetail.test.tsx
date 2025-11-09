import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import SessionDetail from '@/features/session/components/SessionDetail'
import { Session, Talk, Speaker } from '@/types'
import '@testing-library/jest-dom'
import * as dataParser from '@/lib/data-parser'

// Mock the data parser
jest.mock('@/lib/data-parser')

// Mock TalkCard to just display the title
jest.mock('@/components/common/TalkCard', () => ({
  __esModule: true,
  default: ({ talk }: { talk: Talk }) => <div>{talk.title}</div>,
}))

describe('SessionDetail', () => {
  const mockSpeakers: Speaker[] = [
    {
      id: 's1',
      name: 'Speaker 1',
      bio: '',
      photo_url: '',
      job: '',
      twitter_handle: '',
    },
  ]

  const mockTalks: Talk[] = [
    {
      id: 't2',
      title: 'Talk 2',
      abstract: '',
      time_start: '11:00',
      time_end: '11:30',
      track: 'A',
      speaker_ids: ['s1'],
      tech_tags: [],
      level: [],
      perspective: [],
    },
    {
      id: 't1',
      title: 'Talk 1',
      abstract: '',
      time_start: '10:00',
      time_end: '10:30',
      track: 'A',
      speaker_ids: ['s1'],
      tech_tags: [],
      level: [],
      perspective: [],
    },
    {
      id: 't3',
      title: 'Talk 3',
      abstract: '',
      time_start: '',
      time_end: '',
      track: 'A',
      speaker_ids: ['s1'],
      tech_tags: [],
      level: [],
      perspective: [],
    },
  ]

  const mockSession: Session = {
    id: 'sess1',
    title: 'Test Session',
    description: 'Session Description',
    talk_ids: ['t2', 't1', 't3'],
    time_start: '10:00',
    time_end: '12:00',
    track: 'A',
    level: [],
    tech_tags: [],
    perspective: [],
  }

  beforeEach(() => {
    ;(dataParser.getTalks as jest.Mock).mockReturnValue(mockTalks)
    ;(dataParser.getSpeakers as jest.Mock).mockReturnValue(mockSpeakers)
  })

  it('should render talks sorted by start time', async () => {
    render(<SessionDetail session={mockSession} />)

    await waitFor(() => {
      const talkElements = screen.getAllByText(/Talk [123]/)
      const talkTitles = talkElements.map((el) => el.textContent)

      expect(talkTitles).toEqual(['Talk 1', 'Talk 2', 'Talk 3'])
    })
  })
})
