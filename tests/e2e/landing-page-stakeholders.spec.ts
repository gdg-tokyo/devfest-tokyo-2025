import { test, expect } from '@playwright/test'

test.describe('Landing Page Stakeholders Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the Organizers and Partners section', async ({
    page,
  }) => {
    await expect(
      page.getByRole('heading', {
        name: 'Organizers and Partners',
        exact: true,
      })
    ).toBeVisible()
  })

  test('should display organizers', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Organizers', exact: true })
    ).toBeVisible()
    const gdgTokyoLink = page.getByRole('link', { name: /GDG Tokyo/i })
    await expect(gdgTokyoLink).toBeVisible()
    await expect(
      gdgTokyoLink.getByRole('img', { name: 'GDG Tokyo' })
    ).toBeVisible()
  })

  test('should display partners', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Partners', exact: true })
    ).toBeVisible()
    const googleDevelopersLink = page.getByRole('link', {
      name: /Google Developers/i,
    })
    await expect(googleDevelopersLink).toBeVisible()
    await expect(
      googleDevelopersLink.getByRole('img', { name: 'Google Developers' })
    ).toBeVisible()
  })

  test('organizer links should be valid', async ({ page }) => {
    const gdgTokyoLink = page.getByRole('link', { name: /GDG Tokyo/i })
    await expect(gdgTokyoLink).toHaveAttribute(
      'href',
      'https://gdg.community.dev/gdg-tokyo/'
    )
    await expect(gdgTokyoLink).toHaveAttribute('target', '_blank')
  })

  test('partner links should be valid', async ({ page }) => {
    const googleDevelopersLink = page.getByRole('link', {
      name: /Google Developers/i,
    })
    await expect(googleDevelopersLink).toHaveAttribute(
      'href',
      'https://developers.google.com/'
    )
    await expect(googleDevelopersLink).toHaveAttribute('target', '_blank')
  })
})
