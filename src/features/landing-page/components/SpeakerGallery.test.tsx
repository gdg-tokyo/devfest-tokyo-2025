// src/features/landing-page/components/SpeakerGallery.test.tsx

import React from 'react'
import { render, screen } from '@testing-library/react'
import SpeakerGallery from './SpeakerGallery'
import { Speaker, SessionChair } from '@/types'

// Mock Image component for Next.js Image optimization
jest.mock('next/image', () => {
  /* eslint-disable @next/next/no-img-element */
  const MockImage = ({ src, alt, width, height, className }: any) => {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    )
  }
  MockImage.displayName = 'Image' // Add display name
  return MockImage
})

describe('SpeakerGallery', () => {
  const mockSpeakers: Speaker[] = [
    {
      id: 'speaker-1',
      name: 'Alice Smith',
      bio: 'Bio of Alice',
      job: 'Engineer',
      photo_url: '/images/speakers/alice.jpg',
      twitter_handle: 'alice_smith',
    },
    {
      id: 'speaker-2',
      name: 'Bob Johnson',
      bio: 'Bio of Bob',
      job: 'Developer',
      photo_url: '/images/speakers/bob.jpg',
      twitter_handle: null,
    },
    {
      id: 'speaker-3',
      name: 'Charlie Brown',
      bio: 'Bio of Charlie',
      job: 'Designer',
      photo_url: '/images/speakers/charlie.jpg',
      twitter_handle: 'charlie_brown',
    },
  ]

  const mockSessionChairs: SessionChair[] = [
    {
      id: 'chair-1',
      chairs: [
        {
          id: 'speaker-4',
          name: 'David Lee',
          bio: 'Bio of David',
          job: 'Manager',
          photo_url: '/images/speakers/david.jpg',
          twitter_handle: 'david_lee',
        },
        {
          id: 'speaker-1', // Duplicate speaker
          name: 'Alice Smith',
          bio: 'Bio of Alice',
          job: 'Engineer',
          photo_url: '/images/speakers/alice.jpg',
          twitter_handle: 'alice_smith',
        },
      ],
    },
    {
      id: 'chair-2',
      chairs: [
        {
          id: 'speaker-5',
          name: 'Eve Adams',
          bio: 'Bio of Eve',
          job: 'Consultant',
          photo_url: '/images/speakers/eve.jpg',
          twitter_handle: null,
        },
      ],
    },
  ]

  it('renders correctly with combined and sorted speakers', () => {
    render(
      <SpeakerGallery
        speakers={mockSpeakers}
        sessionChairs={mockSessionChairs}
      />
    )

    // Expect all unique speakers to be rendered, sorted alphabetically by their alt text
    const speakerImages = screen.getAllByAltText(
      /^(Alice Smith|Bob Johnson|Charlie Brown|David Lee|Eve Adams)$/
    )
    const renderedNames = speakerImages.map((img) => img.alt)

    expect(renderedNames).toHaveLength(5)
    expect(renderedNames[0]).toBe('Alice Smith')
    expect(renderedNames[1]).toBe('Bob Johnson')
    expect(renderedNames[2]).toBe('Charlie Brown')
    expect(renderedNames[3]).toBe('David Lee')
    expect(renderedNames[4]).toBe('Eve Adams')

    // Check for title
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Speakers & Session Chairs',
      })
    ).toBeInTheDocument()
  })

  it('applies correct responsive grid classes', () => {
    const { container } = render(
      <SpeakerGallery
        speakers={mockSpeakers}
        sessionChairs={mockSessionChairs}
      />
    )
    const gridDiv = container.querySelector('.grid')
    expect(gridDiv).toHaveClass('grid-cols-4')
    expect(gridDiv).toHaveClass('md:grid-cols-8')
  })

  it('renders speaker icons with correct attributes', () => {
    render(
      <SpeakerGallery
        speakers={mockSpeakers}
        sessionChairs={mockSessionChairs}
      />
    )

    const aliceImage = screen.getByAltText('Alice Smith') as HTMLImageElement
    expect(aliceImage).toBeInTheDocument()
    expect(aliceImage.src).toContain('/images/speakers/alice.jpg')
    // Check the parent element for rounded-full class
    expect(aliceImage.parentElement).toHaveClass('rounded-full')

    const bobImage = screen.getByAltText('Bob Johnson') as HTMLImageElement
    expect(bobImage).toBeInTheDocument()
    expect(bobImage.src).toContain('/images/speakers/bob.jpg')
    // Check the parent element for rounded-full class
    expect(bobImage.parentElement).toHaveClass('rounded-full')
  })

  it('creates a link for speakers with twitter_handle', () => {
    render(
      <SpeakerGallery
        speakers={mockSpeakers}
        sessionChairs={mockSessionChairs}
      />
    )

    const aliceLink = screen.getByLabelText(
      "Visit Alice Smith's X profile"
    ) as HTMLAnchorElement
    expect(aliceLink).toBeInTheDocument()
    expect(aliceLink.href).toBe('https://x.com/alice_smith')
    expect(aliceLink.target).toBe('_blank')
    expect(aliceLink.rel).toBe('noopener noreferrer')

    const charlieLink = screen.getByLabelText(
      "Visit Charlie Brown's X profile"
    ) as HTMLAnchorElement
    expect(charlieLink).toBeInTheDocument()
    expect(charlieLink.href).toBe('https://x.com/charlie_brown')
  })

  it('does not create a link for speakers without twitter_handle', () => {
    render(
      <SpeakerGallery
        speakers={mockSpeakers}
        sessionChairs={mockSessionChairs}
      />
    )

    const bobImage = screen.getByAltText('Bob Johnson')
    const bobParent = bobImage.parentElement
    expect(bobParent).not.toHaveAttribute('href')

    const eveImage = screen.getByAltText('Eve Adams')
    const eveParent = eveImage.parentElement
    expect(eveParent).not.toHaveAttribute('href')
  })

  it('handles empty speaker and session chair arrays', () => {
    render(<SpeakerGallery speakers={[]} sessionChairs={[]} />)
    expect(screen.queryAllByRole('img')).toHaveLength(0)
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Speakers & Session Chairs',
      })
    ).toBeInTheDocument()
  })
})
