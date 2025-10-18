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
    // Update to a title from dev data
    await expect(
      page.getByText('Session 1 (Track A - Timeslot I)')
    ).toBeVisible()
  })

  test('should filter sessions by skill level', async ({ page }) => {
    await page.getByTestId('filter-system').getByText('Beginner').click()
    // Expect an Advanced session to be grayed out
    await expect(
      page.locator(
        '//h3[text()="Session 3 (Track C - Timeslot I)"]/ancestor::div[2]'
      )
    ).toHaveClass(/opacity-30/)
    // Expect a Beginner session to not be grayed out
    await expect(
      page.locator(
        '//h3[text()="Session 1 (Track A - Timeslot I)"]/ancestor::div[2]'
      )
    ).not.toHaveClass(/opacity-30/)
  })

  test('should filter sessions by "Advanced" skill level', async ({ page }) => {
    await page.getByTestId('filter-system').getByText('Advanced').click()
    // Expect a Beginner session to be grayed out
    await expect(
      page.locator(
        '//h3[text()="Session 1 (Track A - Timeslot I)"]/ancestor::div[2]'
      )
    ).toHaveClass(/opacity-30/)
    // Expect an Advanced session to not be grayed out
    await expect(
      page.locator(
        '//h3[text()="Session 3 (Track C - Timeslot I)"]/ancestor::div[2]'
      )
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
