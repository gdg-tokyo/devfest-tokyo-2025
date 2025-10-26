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
      type: 'partner',
      link: 'https://developers.google.com/',
    },
    {
      name: 'Another Partner',
      logoUrl: '/images/another-partner.png',
      type: 'partner',
      link: 'https://another-partner.com/',
    },
    {
      name: 'Partner without Logo',
      logoUrl: '',
      type: 'partner',
      link: 'https://no-logo-partner.com/',
    },
  ]

  beforeEach(() => {
    ;(getStakeholders as jest.Mock).mockReturnValue(mockStakeholders)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the section title', () => {
    render(<StakeholdersSection />)
    expect(
      screen.getByRole('heading', { name: 'Organizers and Partners' })
    ).toBeInTheDocument()
  })

  it('renders organizers correctly', () => {
    render(<StakeholdersSection />)
    expect(
      screen.getByRole('heading', { name: 'Organizers' })
    ).toBeInTheDocument()
    expect(screen.getByText('GDG Tokyo')).toBeInTheDocument()
    expect(screen.getByAltText('GDG Tokyo')).toHaveAttribute(
      'src',
      '/images/gdg-tokyo.png'
    )
    expect(screen.getByRole('link', { name: /GDG Tokyo/i })).toHaveAttribute(
      'href',
      'https://gdg.community.dev/gdg-tokyo/'
    )
  })

  it('renders partners correctly', () => {
    render(<StakeholdersSection />)
    expect(
      screen.getByRole('heading', { name: 'Partners' })
    ).toBeInTheDocument()
    expect(screen.getByText('Google Developers')).toBeInTheDocument()
    expect(screen.getByAltText('Google Developers')).toHaveAttribute(
      'src',
      '/images/google-developers.png'
    )
    expect(
      screen.getByRole('link', { name: /Google Developers/i })
    ).toHaveAttribute('href', 'https://developers.google.com/')
    expect(screen.getByText('Another Partner')).toBeInTheDocument()
    expect(screen.getByAltText('Another Partner')).toHaveAttribute(
      'src',
      '/images/another-partner.png'
    )
    expect(
      screen.getByRole('link', { name: /Another Partner/i })
    ).toHaveAttribute('href', 'https://another-partner.com/')
  })

  it('does not render image if logoUrl is empty', () => {
    render(<StakeholdersSection />)
    expect(
      screen.queryByAltText('Partner without Logo')
    ).not.toBeInTheDocument()
    expect(screen.getByText('Partner without Logo')).toBeInTheDocument()
  })

  it('does not render organizer section if no organizers are present', () => {
    ;(getStakeholders as jest.Mock).mockReturnValue(
      mockStakeholders.filter((s) => s.type === 'partner')
    )
    render(<StakeholdersSection />)
    expect(
      screen.queryByRole('heading', { name: 'Organizers' })
    ).not.toBeInTheDocument()
  })

  it('does not render partner section if no partners are present', () => {
    ;(getStakeholders as jest.Mock).mockReturnValue(
      mockStakeholders.filter((s) => s.type === 'organizer')
    )
    render(<StakeholdersSection />)
    expect(
      screen.queryByRole('heading', { name: 'Partners' })
    ).not.toBeInTheDocument()
  })

  it('renders nothing if no stakeholders are present', () => {
    ;(getStakeholders as jest.Mock).mockReturnValue([])
    render(<StakeholdersSection />)
    expect(
      screen.queryByRole('heading', { name: 'Organizers and Partners' })
    ).not.toBeInTheDocument()
  })
})
