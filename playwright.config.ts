import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  webServer: {
    command: 'npm run start -- -p 3000', // 事前に next build 済みを前提
    port: 3000, // url ではなく port 指定に寄せる
    reuseExistingServer: true, // 既に3000があれば使う（競合防止）
    timeout: 120_000, // 起動が遅い環境対策
  },
  use: {
    baseURL: 'http://localhost:3000',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // CI向けおまけ（任意）
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? 'github' : 'list',
})
