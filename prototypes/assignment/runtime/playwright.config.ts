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
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'python3 -m http.server 4173 --directory dist-web',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: false,
  },
  projects: [
    {
      name: 'desktop-pointer',
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 800 },
        hasTouch: false,
        isMobile: false,
      },
    },
    {
      name: 'touch-mobile',
      use: {
        browserName: 'chromium',
        viewport: { width: 390, height: 844 },
        hasTouch: true,
        isMobile: true,
      },
    },
  ],
})
