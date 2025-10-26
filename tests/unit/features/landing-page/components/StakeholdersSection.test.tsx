import React from 'react'
import { render, screen } from '@testing-library/react'
import StakeholdersSection from '@/features/landing-page/components/StakeholdersSection'
import { Stakeholder } from '@/types/index'

// Mock the entire data-parser module
jest.mock('@/lib/data-parser', () => ({
  getStakeholders: jest.fn(),
}))

// Import the mocked function
import { getStakeholders } from '@/lib/data-parser'

// Mock the Image component from next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

describe('StakeholdersSection', () => {
  const mockStakeholders: Stakeholder[] = [
    {
      name: 'GDG Tokyo',
      logoUrl: '/images/gdg-tokyo.png',
      type: 'organizer',
      link: 'https://gdg.community.dev/gdg-tokyo/',
    },
    {
      name: 'Google Developers',
      logoUrl: '/images/google-developers.png',
      type: 'co-organizer',
      link: 'https://developers.google.com/',
    },
    {
      name: 'IPUT',
      logoUrl: '/images/iput.png',
      type: 'sponsor',
      link: 'https://www.iput.ac.jp/',
    },
    {
      name: 'Community Partner',
      logoUrl: '',
      type: 'partner',
      link: 'https://community.example.com/',
    },
    {
      name: 'Another Partner',
      logoUrl: '/images/another-partner.png',
      type: 'partner',
      link: 'https://another-partner.com/',
    },
  ]

  beforeEach(() => {
    ;(getStakeholders as jest.Mock).mockReturnValue(mockStakeholders)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders organizers section with Japanese heading', () => {
    render(<StakeholdersSection />)
    expect(
      screen.getByRole('heading', { name: '主催', exact: true })
    ).toBeInTheDocument()
  })

  it('renders co-organizers section with Japanese heading', () => {
    render(<StakeholdersSection />)
    expect(
      screen.getByRole('heading', { name: '共催', exact: true })
    ).toBeInTheDocument()
  })

  it('renders sponsors section with Japanese heading', () => {
    render(<StakeholdersSection />)
    expect(
      screen.getByRole('heading', { name: '協賛', exact: true })
    ).toBeInTheDocument()
  })

  it('renders partners section with Japanese heading', () => {
    render(<StakeholdersSection />)
    expect(
      screen.getByRole('heading', { name: '協力', exact: true })
    ).toBeInTheDocument()
    expect(screen.getByText('Community Partner')).toBeInTheDocument()
    expect(screen.queryByAltText('Community Partner')).not.toBeInTheDocument() // No logoUrl
    expect(screen.getByText('Another Partner')).toBeInTheDocument()
    expect(screen.getByAltText('Another Partner')).toBeInTheDocument()
  })

  it('does not render image if logoUrl is empty', () => {
    render(<StakeholdersSection />)
    expect(screen.queryByAltText('Community Partner')).not.toBeInTheDocument()
    expect(screen.getByText('Community Partner')).toBeInTheDocument()
  })

  it('renders nothing if no stakeholders are present', () => {
    ;(getStakeholders as jest.Mock).mockReturnValue([])
    render(<StakeholdersSection />)
    expect(
      screen.queryByRole('heading', { name: '主催' })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: '共催' })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: '協賛' })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: '協力' })
    ).not.toBeInTheDocument()
  })
})
