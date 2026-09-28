import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  // forbidOnly: Boolean(process.env.CI),
  // retries: process.env.CI ? 2 : 0,
  // workers: process.env.CI ? 1 : undefined,
  forbidOnly: Boolean((globalThis as any).process?.env?.CI),
  retries: (globalThis as any).process?.env?.CI ? 2 : 0,
  workers: (globalThis as any).process?.env?.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['html', {outputFolder: 'playwright-report', open: 'never'}]],

  use: {
    baseURL: 'https://qaplayground.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  outputDir: 'test-results'
});
