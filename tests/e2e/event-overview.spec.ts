import { expect, test } from '@playwright/test'

test.describe('Event Overview Section', () => {
  test('should display the event overview section with correct information', async ({
    page,
  }) => {
    await page.goto('/')

    const eventOverviewSection = page.getByTestId('event-overview-section')

    // Check for date and time
    await expect(
      eventOverviewSection.locator('p:has-text("2025年11月22日 (土)")')
    ).toBeVisible()
    await expect(
      eventOverviewSection.locator('p:has-text("12:00 - 18:00")')
    ).toBeVisible()

    // Check for location and address
    await expect(
      eventOverviewSection.locator('p:has-text("ベルサール渋谷ファースト")')
    ).toBeVisible()
    await expect(
      eventOverviewSection.locator(
        'p:has-text("東京都渋谷区東1-2-20 住友不動産渋谷ファーストタワー2F")'
      )
    ).toBeVisible()

    // Check for registration link
    const registerLink = eventOverviewSection.getByRole('link', {
      name: /参加登録/i,
    })
    await expect(registerLink).toBeVisible()
    await expect(registerLink).toHaveAttribute(
      'href',
      'https://gdg-tokyo.connpass.com/event/369416/'
    )
  })
})
