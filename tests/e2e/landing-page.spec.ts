import { test, expect } from '@playwright/test'

test.describe('Landing Page Hero Panel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the DevFest Tokyo logo', async ({ page }) => {
    const logo = page.getByAltText('DevFest Tokyo 2025 Logo')
    await expect(logo).toBeVisible()
    await expect(logo).toHaveAttribute(
      'src',
      '/images/devfest25-tokyo-logo-with-gdg-bracket.png'
    )
  })

  test('should display the event theme with main title and subtitle', async ({
    page,
  }) => {
    const mainTitle = page.getByRole('heading', { name: 'Fine your new eyes' })
    await expect(mainTitle).toBeVisible()
    const subTitle = page.getByText('~3つの新たな視点に出会える一日~')
    await expect(subTitle).toBeVisible()
    // Optionally, check for styling of the subtitle if Playwright allows
    // await expect(subTitle).toHaveCSS('font-size', '1.125rem'); // Example for text-lg
    // await expect(subTitle).toHaveCSS('color', 'rgb(75, 85, 99)'); // Example for text-gray-600
  })

  test('should navigate to connpass on "参加登録" button click', async ({
    page,
  }) => {
    const registerButton = page
      .locator('section[aria-labelledby="event-title"]')
      .getByRole('link', { name: '参加登録' })
    await expect(registerButton).toBeVisible()
    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),
      registerButton.click(),
    ])
    await expect(newPage).toHaveURL(
      'https://gdg-tokyo.connpass.com/event/369416/'
    )
  })

  test('should navigate to timetable page on "タイムテーブル" button click', async ({
    page,
  }) => {
    const timetableButton = page
      .locator('section[aria-labelledby="event-title"]')
      .getByRole('link', { name: 'タイムテーブル' })
    await expect(timetableButton).toBeVisible()
    await timetableButton.click()
    await expect(page).toHaveURL('/timetable', { timeout: 10000 })
  })

  test('should navigate to talk directory page on "Talk Directory" button click', async ({
    page,
  }) => {
    const talkDirectoryButton = page.getByRole('link', {
      name: 'Talk Directory',
    })
    await expect(talkDirectoryButton).toBeVisible()
    await talkDirectoryButton.click()
    await expect(page).toHaveURL('/talks')
  })
})
