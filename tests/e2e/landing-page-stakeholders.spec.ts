import { expect, test } from '@playwright/test'

test.describe('Landing Page Stakeholders Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display organizers section with Japanese heading and logo', async ({
    page,
  }) => {
    await expect(
      page.getByRole('heading', { name: '主催', exact: true })
    ).toBeVisible()
    const gdgTokyoLink = page.getByRole('link', { name: /GDG Tokyo/i })
    await expect(gdgTokyoLink).toBeVisible()
    await expect(gdgTokyoLink.locator('img[alt="GDG Tokyo"]')).toBeVisible()
    await expect(gdgTokyoLink.getByText('GDG Tokyo')).not.toBeVisible() // Name should not be visible if logo is present
  })

  test('should display co-organizers section with Japanese heading and logo', async ({
    page,
  }) => {
    await expect(
      page.getByRole('heading', { name: '共催', exact: true })
    ).toBeVisible()
    const googleDevelopersLink = page.getByRole('link', {
      name: /Google Developers/i,
    })
    await expect(googleDevelopersLink).toBeVisible()
    await expect(
      googleDevelopersLink.locator('img[alt="Google Developers"]')
    ).toBeVisible()
    await expect(
      googleDevelopersLink.getByText('Google Developers')
    ).not.toBeVisible() // Name should not be visible if logo is present
  })

  test('should display sponsors section with Japanese heading and logo', async ({
    page,
  }) => {
    await expect(
      page.getByRole('heading', { name: '協賛', exact: true })
    ).toBeVisible()
    const iputLink = page.getByRole('link', { name: /IPUT/i })
    await expect(iputLink).toBeVisible()
    await expect(iputLink.locator('img[alt="IPUT"]')).toBeVisible()
    await expect(iputLink.getByText('IPUT')).not.toBeVisible() // Name should not be visible if logo is present
  })

  test('organizer links should be valid', async ({ page }) => {
    const gdgTokyoLink = page.getByRole('link', { name: /GDG Tokyo/i })
    await expect(gdgTokyoLink).toHaveAttribute(
      'href',
      'https://gdg.community.dev/gdg-tokyo/'
    )
    await expect(gdgTokyoLink).toHaveAttribute('target', '_blank')
  })

  test('co-organizer links should be valid', async ({ page }) => {
    const googleDevelopersLink = page.getByRole('link', {
      name: /Google Developers/i,
    })
    await expect(googleDevelopersLink).toHaveAttribute(
      'href',
      'https://developers.google.com/'
    )
    await expect(googleDevelopersLink).toHaveAttribute('target', '_blank')
  })

  test('sponsor links should be valid', async ({ page }) => {
    const iputLink = page.getByRole('link', { name: /IPUT/i })
    await expect(iputLink).toHaveAttribute('href', 'https://www.iput.ac.jp/')
    await expect(iputLink).toHaveAttribute('target', '_blank')
  })

  test('partner links should be valid', async ({ page }) => {
    const communityPartnerText = page.getByText('Partner Community')
    const communityPartnerLink = communityPartnerText.locator('..') // Get the parent element (the <a> tag)
    await expect(communityPartnerLink).toHaveAttribute(
      'href',
      'https://community.example.com/'
    )
    await expect(communityPartnerLink).toHaveAttribute('target', '_blank')
  })
})
