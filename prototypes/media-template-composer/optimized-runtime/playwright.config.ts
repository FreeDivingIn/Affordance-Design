import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: false,
  retries: 0,
  reporter: 'line',
  use: {
    baseURL: 'http://127.0.0.1:4177',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'python3 -m http.server 4177 --directory dist-web',
    url: 'http://127.0.0.1:4177',
    reuseExistingServer: false,
  },
  projects: [
    {
      name: 'mobile-touch',
      use: {
        browserName: 'chromium',
        viewport: { width: 430, height: 860 },
        hasTouch: true,
        isMobile: true,
      },
    },
  ],
})
