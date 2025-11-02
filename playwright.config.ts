import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  webServer: {
    command: 'NEXT_PUBLIC_DEVFEST_TOKYO_2025_TARGET_ENV=DEV npm run dev:e2e', // Start the development server
    reuseExistingServer: false, // Do not reuse existing server, let Playwright start it
    timeout: 120_000, // Longer timeout for slower environments
    url: 'http://localhost:3030',
  },
  use: {
    baseURL: 'http://localhost:3030',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chromium' },
    },
  ],
  // Optional CI settings
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? 'github' : 'list',
})
