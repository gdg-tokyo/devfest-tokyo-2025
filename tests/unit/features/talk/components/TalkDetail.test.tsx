import React from 'react'
import { render, screen } from '@testing-library/react'
import TalkDetail from '@/features/talk/components/TalkDetail'
import { Talk, Speaker } from '@/types'

const mockTalk: Talk = {
  id: 'talk1',
  title: 'Introduction to Next.js',
  abstract: 'This session will cover the basics of Next.js.',
  time_start: '10:00',
  time_end: '10:50',
  track: 'Web',
  speaker_ids: ['speaker1'],
  tech_tags: ['Next.js', 'React'],
  level: ['Beginner'],
  perspective: ['Introduction'],
}

const mockSpeakers: Speaker[] = [
  {
    id: 'speaker1',
    name: 'John Doe',
    bio: 'A seasoned web developer.',
    photo_url: '/images/speakers/john-doe.jpg',
    job: 'Software Engineer',
    twitter_handle: 'johndoe',
  },
]

describe('TalkDetail', () => {
  it('renders talk details correctly', () => {
    render(<TalkDetail talk={mockTalk} speakers={mockSpeakers} />)
    expect(screen.getByText('Introduction to Next.js')).toBeInTheDocument()
    expect(screen.getByText('10:00 - 10:50')).toBeInTheDocument()
    expect(screen.getByText('Web')).toBeInTheDocument()
    expect(
      screen.getByText('This session will cover the basics of Next.js.')
    ).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Beginner')).toBeInTheDocument()
    expect(screen.getByText('Introduction')).toBeInTheDocument()
  })

  it('renders speaker details correctly', () => {
    render(<TalkDetail talk={mockTalk} speakers={mockSpeakers} />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
    expect(screen.getByText('A seasoned web developer.')).toBeInTheDocument()
    expect(screen.getByTestId('XIcon')).toBeInTheDocument()
  })

  it('renders fallback icon for speaker photo', () => {
    const speakersWithoutPhoto: Speaker[] = [
      {
        ...mockSpeakers[0],
        photo_url: '',
      },
    ]
    render(<TalkDetail talk={mockTalk} speakers={speakersWithoutPhoto} />)
    expect(screen.getByTestId('PersonIcon')).toBeInTheDocument()
  })

  it('does not render X icon if twitter_handle is not available', () => {
    const speakersWithoutTwitter: Speaker[] = [
      {
        ...mockSpeakers[0],
        twitter_handle: '',
      },
    ]
    render(<TalkDetail talk={mockTalk} speakers={speakersWithoutTwitter} />)
    expect(screen.queryByTestId('XIcon')).not.toBeInTheDocument()
  })

  it('renders action buttons correctly', () => {
    render(<TalkDetail talk={mockTalk} speakers={mockSpeakers} />)
    expect(
      screen.getByRole('link', { name: /今すぐ参加登録/i })
    ).toBeInTheDocument()
    expect(screen.getByText('タイムテーブルに戻る')).toBeInTheDocument()
    expect(screen.getByText('トーク一覧に戻る')).toBeInTheDocument()
  })
})
