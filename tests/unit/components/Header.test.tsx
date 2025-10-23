import { render, screen } from '@testing-library/react'
import Header from '@/components/Header'

describe('Header', () => {
  it('renders the registration button with google red color on desktop', () => {
    render(<Header />)
    const registrationButton = screen.getByRole('link', { name: '参加登録' })
    expect(registrationButton).toHaveClass('bg-google-red-500')
  })

  it('renders the registration button with google red color on mobile when menu is open', () => {
    // Simulate mobile view
    window.innerWidth = 500
    render(<Header />)

    const menuButton = screen.getByRole('button', { name: /toggle menu/i })
    menuButton.click()

    const registrationButton = screen.getByRole('link', { name: '参加登録' })
    expect(registrationButton).toHaveClass('bg-google-red-500')
  })
})
