import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  webServer: {
    command: 'npm run dev-e2e-test', // Start the development server
    port: 3030,
    reuseExistingServer: false, // Do not reuse existing server, let Playwright start it
    timeout: 120_000, // Longer timeout for slower environments
  },
  use: {
    baseURL: 'http://localhost:3030',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Optional CI settings
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? 'github' : 'list',
})
