// tests/e2e/speaker-gallery.spec.ts

import { test, expect } from '@playwright/test'

test.describe('Speaker Gallery Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the "Speakers & Session Chairs" heading', async ({
    page,
  }) => {
    await expect(
      page.getByRole('heading', { name: 'Speakers & Session Chairs' })
    ).toBeVisible()
  })

  test('should display speaker images and names', async ({ page }) => {
    // We expect at least one speaker to be visible
    const firstSpeakerImage = page.locator('.grid img').first()
    await expect(firstSpeakerImage).toBeVisible()
    await expect(firstSpeakerImage).toHaveAttribute('alt')
    await expect(firstSpeakerImage).toHaveAttribute('src')

    const firstSpeakerName = page.locator('.grid p').first()
    await expect(firstSpeakerName).toBeVisible()
    await expect(firstSpeakerName).not.toBeEmpty()
  })

  test('should apply mobile grid styles on small viewports', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 }) // iPhone SE viewport
    const gridContainer = page.getByTestId('speaker-gallery-grid')
    // Expect 4 columns of roughly equal width (e.g., "73.75px 73.75px 73.75px 73.75px")
    await expect(gridContainer).toHaveCSS(
      'grid-template-columns',
      /^(\d+(\.\d+)?px\s){3}\d+(\.\d+)?px$/
    )
    const gridStyle = await gridContainer.evaluate(
      (el) => window.getComputedStyle(el).gridTemplateColumns
    )
    const columns = gridStyle.split(' ').length
    expect(columns).toBe(4)
  })

  test('should apply desktop grid styles on large viewports', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 }) // Desktop viewport
    const gridContainer = page.getByTestId('speaker-gallery-grid')
    // Expect 8 columns of roughly equal width (e.g., "138px 138px 138px 138px 138px 138px 138px 138px")
    await expect(gridContainer).toHaveCSS(
      'grid-template-columns',
      /^(\d+(\.\d+)?px\s){7}\d+(\.\d+)?px$/
    )
    const gridStyle = await gridContainer.evaluate(
      (el) => window.getComputedStyle(el).gridTemplateColumns
    )
    const columns = gridStyle.split(' ').length
    expect(columns).toBe(8)
  })

  test('should link to Twitter profile if twitter_handle is present', async ({
    page,
    context,
  }) => {
    // This test assumes there is at least one speaker with a twitter_handle
    // and one without in the loaded data.
    // It's brittle if mock data changes.
    // A more robust solution would be to generate specific test data for E2E.

    // Find a speaker icon that has a link (assuming first one with a link)
    const twitterLink = page.locator('a[href*="x.com"]').first()
    await expect(twitterLink).toBeVisible()

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      twitterLink.click(),
    ])

    await expect(newPage).toHaveURL(/x.com\/\w+/) // Check if it navigates to x.com with a handle
    await newPage.close()
  })

  test('should not link for speakers without twitter_handle', async ({
    page,
  }) => {
    // Find a speaker image that is NOT inside an anchor tag
    // This requires inspecting the DOM structure closely.
    // Assuming the Image component without a twitter_handle has a direct parent that is NOT 'a'.
    const nonTwitterSpeakerImage = page.locator('div > img:not(a img)').first() // Select img whose direct parent is div, not a. This is a bit fragile.
    await expect(nonTwitterSpeakerImage).toBeVisible()

    // Verify its parent is not an anchor tag
    const parentElement = await nonTwitterSpeakerImage.evaluateHandle(
      (img) => img.parentElement?.tagName
    )
    expect(await parentElement.jsonValue()).not.toBe('A')

    // Attempting to click should not open a new page or change URL (excluding internal navigation)
    const currentUrl = page.url()
    await nonTwitterSpeakerImage.click()
    await expect(page).toHaveURL(currentUrl) // URL should not change to an external site
  })
})
