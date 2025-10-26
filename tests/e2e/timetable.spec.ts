import { test, expect } from '@playwright/test'

test.describe('Time Table Page', () => {
  test.describe('Mobile view', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/timetable')
      await page.waitForURL('/timetable')
    })

    test('should display the event timetable', async ({ page }) => {
      await expect(
        page.getByRole('heading', { name: 'Event Timetable' })
      ).toBeVisible()
      await expect(
        page.locator('.md\\:hidden').getByTestId('session-card-session-1')
      ).toBeVisible()
    })

    test('should show no data message if no sessions are available', async ({
      page,
    }) => {
      await page
        .getByPlaceholder('Search sessions, speakers, or tags...')
        .fill('NonExistentKeyword')
      await expect(
        page.getByText('No sessions available matching your criteria.')
      ).toBeVisible()
    })
  })

  test.describe('Desktop view', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      await page.goto('/timetable')
      await page.waitForURL('/timetable')
    })

    test('should display the event timetable', async ({ page }) => {
      await expect(
        page.getByRole('heading', { name: 'Event Timetable' })
      ).toBeVisible()
      await expect(
        page.locator('.hidden.md\\:block').getByTestId('session-card-session-1')
      ).toBeVisible()
    })

    test('should show no data message if no sessions are available', async ({
      page,
    }) => {
      await page
        .getByPlaceholder('Search sessions, speakers, or tags...')
        .fill('NonExistentKeyword')
      await expect(
        page.getByText('No sessions available matching your criteria.')
      ).toBeVisible()
    })
  })
})
