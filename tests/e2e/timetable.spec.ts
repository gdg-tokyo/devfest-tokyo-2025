import { test, expect } from '@playwright/test'

test.describe('Time Table Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/timetable')
    await page.waitForURL('/timetable')
  })

  test('should display the event timetable', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Event Timetable' })
    ).toBeVisible()
    await expect(page.getByText('基調講演')).toBeVisible()
  })

  test('should filter sessions by skill level', async ({ page }) => {
    await page.getByTestId('filter-system').getByText('Beginner').click()
    await expect(
      page.locator('//div[h3[text()="異分野クロストーク"]]/parent::div')
    ).toHaveClass(/opacity-30/)
    await expect(
      page.locator('//div[h3[text()="初心者向け Gen AI 特集"]]/parent::div')
    ).not.toHaveClass(/opacity-30/)
  })

  test('should filter sessions by "Advanced" skill level', async ({ page }) => {
    await page.getByTestId('filter-system').getByText('Advanced').click()
    await expect(
      page.locator('//div[h3[text()="Google Maps 特集"]]/parent::div')
    ).toHaveClass(/opacity-30/)
    await expect(
      page.locator('//div[h3[text()="基調講演"]]/parent::div')
    ).not.toHaveClass(/opacity-30/)
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
