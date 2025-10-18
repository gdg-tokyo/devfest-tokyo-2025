import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  webServer: {
    command: 'npm run start -- -p 3000', // Assumes next build has been run
    port: 3000, // Use port instead of url
    reuseExistingServer: true, // Reuse existing server to prevent conflicts
    timeout: 120_000, // Longer timeout for slower environments
  },
  use: {
    baseURL: 'http://localhost:3000',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Optional CI settings
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? 'github' : 'list',
})
