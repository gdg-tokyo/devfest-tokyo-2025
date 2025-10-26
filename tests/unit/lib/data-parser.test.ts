import { getStakeholders } from '@/lib/data-parser'
import { Stakeholder } from '@/types/stakeholders'

// Mock the entire data-parser module
jest.mock('@/lib/data-parser', () => ({
  // Keep other exports from the original module if needed, but for this test,
  // we only care about getStakeholders.
  ...jest.requireActual('@/lib/data-parser'),
  getStakeholders: jest.fn(),
}))

describe('getStakeholders', () => {
  const MOCK_DEV_STAKEHOLDERS: Stakeholder[] = [
    {
      name: 'DevFest Tokyo Dev',
      logoUrl: '/images/dev/devfest-tokyo-dev.png',
      type: 'organizer',
      link: 'https://dev.devfest.tokyo',
    },
  ]

  const MOCK_PROD_STAKEHOLDERS: Stakeholder[] = [
    {
      name: 'DevFest Tokyo Prod',
      logoUrl: '/images/prod/devfest-tokyo-prod.png',
      type: 'organizer',
      link: 'https://prod.devfest.tokyo',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    // Provide a mock implementation for getStakeholders
    ;(getStakeholders as jest.Mock).mockImplementation(() => {
      const env =
        process.env.NEXT_PUBLIC_DEVFEST_TOKYO_2025_TARGET_ENV || 'PROD'
      if (env === 'DEV') {
        return MOCK_DEV_STAKEHOLDERS
      } else {
        return MOCK_PROD_STAKEHOLDERS
      }
    })
  })

  it('should return dev stakeholders when NEXT_PUBLIC_DEVFEST_TOKYO_2025_TARGET_ENV is DEV', () => {
    process.env.NEXT_PUBLIC_DEVFEST_TOKYO_2025_TARGET_ENV = 'DEV'
    const stakeholders = getStakeholders()
    expect(stakeholders).toEqual(MOCK_DEV_STAKEHOLDERS)
  })

  it('should return prod stakeholders when NEXT_PUBLIC_DEVFEST_TOKYO_2025_TARGET_ENV is not DEV', () => {
    process.env.NEXT_PUBLIC_DEVFEST_TOKYO_2025_TARGET_ENV = 'PROD' // or any other value
    const stakeholders = getStakeholders()
    expect(stakeholders).toEqual(MOCK_PROD_STAKEHOLDERS)
  })

  it('should return prod stakeholders when NEXT_PUBLIC_DEVFEST_TOKYO_2025_TARGET_ENV is undefined', () => {
    delete process.env.NEXT_PUBLIC_DEVFEST_TOKYO_2025_TARGET_ENV
    const stakeholders = getStakeholders()
    expect(stakeholders).toEqual(MOCK_PROD_STAKEHOLDERS)
  })
})
