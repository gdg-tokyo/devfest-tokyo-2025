import { expect, test } from '@playwright/test'

test.describe('Talk Page', () => {
  test('should display the correct information on the talk card', async ({
    page,
  }) => {
    await page.goto('/talks/')
    await page.waitForURL('/talks/')

    const firstTalkCard = page.locator('article[talk-card-id="talk-1"]')

    // Verify that the talk title is displayed
    await expect(
      firstTalkCard.getByRole('heading', { name: 'Talk 1', exact: true })
    ).toBeVisible({ timeout: 30000 })

    // Verify that the speaker name is displayed
    await expect(firstTalkCard.getByText('Speaker 1')).toBeVisible({
      timeout: 30000,
    })

    // Verify that the abstract is displayed and truncated
    const abstractElement = firstTalkCard.getByTestId('talk-abstract')
    await expect(abstractElement).toBeVisible({ timeout: 30000 })
    const abstractStyle = await abstractElement.evaluate((element) => {
      return window.getComputedStyle(element).webkitLineClamp
    })
    expect(abstractStyle).toBe('3')
  })

  test('should navigate to the talk page and display the correct information', async ({
    page,
  }) => {
    await page.goto('/talks/')
    await page.waitForURL('/talks/')

    await page.waitForSelector('article[talk-card-id="talk-1"]')

    // Click on the first talk card
    const firstTalkCard = page.locator('article[talk-card-id="talk-1"]')
    await firstTalkCard.click()
    await page.waitForURL(/\/talks\/.+/)

    // Verify that the URL is correct
    await expect(page).toHaveURL(/\/talks\/.+/)

    // Verify that the talk title is displayed
    await expect(page.getByRole('heading', { name: 'Talk 1' })).toBeVisible()

    // Verify that the speaker name is displayed
    await expect(page.getByRole('heading', { name: 'Speaker 1' })).toBeVisible()
  })

  test('should navigate to the correct pages when clicking the action buttons', async ({
    page,
  }) => {
    await page.goto('/talks/talk-1/')

    // Click on the connpass button
    const connpassPromise = page.waitForEvent('popup')
    await page.getByText('今すぐ参加登録').click()
    const connpassPage = await connpassPromise
    await expect(connpassPage).toHaveURL(/connpass.com/)

    // Click on the timetable button
    await page.getByText('タイムテーブルに戻る').click()
    await expect(page).toHaveURL(/\/timetable\//)

    // Go back to the talk page
    await page.goBack()

    // Click on the talk directory button
    await page.getByText('トーク一覧に戻る').click()
    await expect(page).toHaveURL(/\/talks\//)
  })
})
