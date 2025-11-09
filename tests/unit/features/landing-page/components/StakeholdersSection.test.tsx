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
  default: ({ fill, alt, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...props} />
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

  it('renders organizers section with Japanese heading and logo', () => {
    render(<StakeholdersSection />)
    expect(screen.getByAltText('GDG Tokyo')).toBeInTheDocument()
    expect(screen.queryByText('GDG Tokyo')).not.toBeInTheDocument() // Name should not be visible if logo is present
  })

  it('renders co-organizers section with Japanese heading and logo', () => {
    render(<StakeholdersSection />)
    expect(screen.getByAltText('Google Developers')).toBeInTheDocument()
    expect(screen.queryByText('Google Developers')).not.toBeInTheDocument() // Name should not be visible if logo is present
  })

  it('renders sponsors section with Japanese heading and logo', () => {
    render(<StakeholdersSection />)
    expect(screen.getByAltText('IPUT')).toBeInTheDocument()
    expect(screen.queryByText('IPUT')).not.toBeInTheDocument() // Name should not be visible if logo is present
  })

  it('renders partners section with Japanese heading and name if no logo', () => {
    render(<StakeholdersSection />)
    expect(
      screen.getByRole('heading', { name: '協力', exact: true })
    ).toBeInTheDocument()
    expect(screen.getByText('Community Partner')).toBeInTheDocument()
    expect(screen.queryByAltText('Community Partner')).not.toBeInTheDocument() // No logoUrl
    expect(screen.getByAltText('Another Partner')).toBeInTheDocument()
    expect(screen.queryByText('Another Partner')).not.toBeInTheDocument() // Name should not be visible if logo is present
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

  it('sorts stakeholders by priority and then by name', () => {
    const sortedMockStakeholders: Stakeholder[] = [
      {
        name: 'Alpha Sponsor',
        logoUrl: '',
        type: 'sponsor',
        link: 'https://alpha.com',
        priority: 1,
      },
      {
        name: 'Beta Sponsor',
        logoUrl: '',
        type: 'sponsor',
        link: 'https://beta.com',
        priority: 1,
      },
      {
        name: 'Gamma Sponsor',
        logoUrl: '',
        type: 'sponsor',
        link: 'https://gamma.com',
        priority: 2,
      },
      {
        name: 'Delta Sponsor',
        logoUrl: '',
        type: 'sponsor',
        link: 'https://delta.com',
        priority: 3,
      },
      {
        name: 'Epsilon Sponsor',
        logoUrl: '',
        type: 'sponsor',
        link: 'https://epsilon.com',
      },
      {
        name: 'Zeta Sponsor',
        logoUrl: '',
        type: 'sponsor',
        link: 'https://zeta.com',
      },
    ]
    ;(getStakeholders as jest.Mock).mockReturnValue(sortedMockStakeholders)
    render(<StakeholdersSection />)

    const sponsorSection = screen.getByRole('heading', {
      name: '協賛',
    }).nextElementSibling
    const stakeholderNames = Array.from(sponsorSection!.children).map((child) =>
      child.textContent?.trim()
    )

    // Expected order: Alpha, Beta, Gamma, Delta, Epsilon, Zeta
    expect(stakeholderNames).toEqual([
      'Alpha Sponsor',
      'Beta Sponsor',
      'Gamma Sponsor',
      'Delta Sponsor',
      'Epsilon Sponsor',
      'Zeta Sponsor',
    ])
  })
})
