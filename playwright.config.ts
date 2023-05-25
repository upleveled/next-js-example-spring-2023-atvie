import { devices, PlaywrightTestConfig } from '@playwright/test';

// config file reference - https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
  webServer: {
    command: 'pnpm start',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
  testIgnore: '**/util/__tests__/**',
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI
    ? 'list'
    : [['html', { outputFolder: 'playwright/report/' }]],
  outputDir: 'playwright/test-results/',

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    testIdAttribute: 'data-test-id',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
};

export default config;
