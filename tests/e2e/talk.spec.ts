import { test, expect } from '@playwright/test'

test.describe('Talk Page', () => {
  test('should navigate to the talk page and display the correct information', async ({
    page,
  }) => {
    await page.goto('/talks')
    await page.waitForURL('/talks')
    await page.waitForSelector('a[href^="/talks/"]')

    // Click on the first talk card
    await page.locator('a[href^="/talks/"]').first().click()

    // Verify that the URL is correct
    await expect(page).toHaveURL(/\/talks\/.+/)

    // Verify that the talk title is displayed
    await expect(page.locator('h1')).toBeVisible()

    // Verify that the speaker name is displayed
    await expect(page.locator('h3')).toBeVisible()
  })

  test('should navigate to the correct pages when clicking the action buttons', async ({
    page,
  }) => {
    await page.goto('/talks/t1_keynote_talk')

    // Click on the connpass button
    const connpassPromise = page.waitForEvent('popup')
    await page.getByText('今すぐ参加登録').click()
    const connpassPage = await connpassPromise
    await expect(connpassPage).toHaveURL(/connpass.com/)

    // Click on the timetable button
    await page.getByText('タイムテーブルに戻る').click()
    await expect(page).toHaveURL(/\/timetable/)

    // Go back to the talk page
    await page.goBack()

    // Click on the talk directory button
    await page.getByText('トーク一覧に戻る').click()
    await expect(page).toHaveURL(/\/talks/)
  })
})
