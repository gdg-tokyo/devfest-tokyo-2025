import { test, expect } from '@playwright/test'

test.describe('Event Overview Section', () => {
  test('should display the event overview section with correct information', async ({
    page,
  }) => {
    await page.goto('/')

    // Check for the section title
    await expect(page.getByText('Event Overview')).toBeVisible()

    // Check for date and time
    await expect(page.getByText('November 22, 2025')).toBeVisible()
    await expect(page.getByText('10:00 - 18:00')).toBeVisible()

    // Check for location and address
    await expect(page.getByText('ベルサール渋谷ファースト')).toBeVisible()
    await expect(
      page.getByText('東京都渋谷区東1-2-20 住友不動産渋谷ファーストタワー2F')
    ).toBeVisible()

    // Check for registration link
    const registerLink = page.getByRole('link', { name: /register here/i })
    await expect(registerLink).toBeVisible()
    await expect(registerLink).toHaveAttribute(
      'href',
      'https://gdg-tokyo.connpass.com/event/369416/'
    )
  })
})
