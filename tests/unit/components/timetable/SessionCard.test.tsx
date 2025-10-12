import React from 'react';
import { render, screen } from '@testing-library/react';
import SessionCard from '@/features/timetable/components/SessionCard';

// Mock data for a session
const mockSession = {
  id: 'session1',
  title: 'Introduction to Next.js',
  description_long: 'This session will cover the basics of Next.js.',
  speaker_names: ['John Doe'],
  speaker_profiles: [
    {
      name: 'John Doe',
      icon_url: 'https://example.com/john-doe.jpg',
    },
  ],
  track: 'Web & Frontend',
  time_start: '10:00',
  time_end: '10:50',
  tech_tags: ['Next.js', 'React', 'TypeScript'],
  level: ['Beginner'],
  perspective: ['Introduction'],
  room: 'Room A',
};

describe('SessionCard', () => {
  it('renders session title and speaker names', () => {
    render(<SessionCard session={mockSession} />);
    expect(screen.getByText('Introduction to Next.js')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders time information', () => {
    render(<SessionCard session={mockSession} />);
    expect(screen.getByText('10:00 - 10:50')).toBeInTheDocument();
  });

  it('renders level tags', () => {
    render(<SessionCard session={mockSession} />);
    expect(screen.getByText('Beginner')).toBeInTheDocument();
  });

  it('renders up to 2 tech tags', () => {
    render(<SessionCard session={mockSession} />);
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();
  });
});
