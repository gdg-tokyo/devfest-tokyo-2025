import { render, screen, act, within } from '@testing-library/react'
import Header from '@/components/Header'

describe('Header', () => {
  it('navigates to the home page when the logo or text is clicked', () => {
    render(<Header />)
    const homeLink = screen.getByRole('link', {
      name: 'Google Developer Groups DevFest Tokyo 2025 Logo Google Developer Group Tokyo',
    })
    expect(homeLink).toHaveAttribute('href', '/')
  })

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
    act(() => {
      menuButton.click()
    })

    const mobileMenu = screen.getByTestId('mobile-menu')
    const registrationButton = within(mobileMenu).getByRole('link', {
      name: '参加登録',
    })
    expect(registrationButton).toHaveClass('bg-google-red-500')
  })
})
