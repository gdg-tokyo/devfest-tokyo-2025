import { render, screen } from '@testing-library/react'
import EventOverview from '@/features/landing-page/components/EventOverview'
import eventData from '@/data/dev/event.json'

describe('EventOverview Component', () => {
  it('renders the event overview information correctly', () => {
    render(<EventOverview />)

    const { eventOverview } = eventData

    expect(
      screen.getByText((content, element) =>
        content.startsWith('November 22, 2025')
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText((content, element) => content.includes('10:00 - 18:00'))
    ).toBeInTheDocument()
    expect(
      screen.getByText((content, element) =>
        content.startsWith('ベルサール渋谷ファースト')
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText((content, element) =>
        content.includes(
          '東京都渋谷区東1-2-20 住友不動産渋谷ファーストタワー2F'
        )
      )
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /register here/i })
    ).toHaveAttribute('href', eventOverview.registrationUrl)
  })
})
