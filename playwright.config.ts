import { existsSync } from 'fs';
import { join } from 'path';

import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from .env.test if it exists
if (existsSync(join(__dirname, '.env.test'))) {
  dotenv.config({ path: join(__dirname, '.env.test') });
}

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Take screenshot on failure */
    screenshot: 'only-on-failure',

    /* Record video on failure */
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'auth',
      testMatch: /global\.auth\.ts/,
      use: {
        ...devices['Desktop Chrome'],

        headless: false,

        launchOptions: {
          args: [
            '--disable-blink-features=AutomationControlled',
            '--disable-features=VizDisplayCompositor',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu',
          ],
        },
      },
      timeout: 5 * 60 * 1000,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        ...(existsSync(join(__dirname, 'tests', 'state.json')) && {
          storageState: './tests/state.json',
        }),
      },
      dependencies: ['auth'],
      timeout: 5 * 60 * 1000,
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        ...(existsSync(join(__dirname, 'tests', 'state.json')) && {
          storageState: './tests/state.json',
        }),
      },
      dependencies: ['auth'],
      timeout: 5 * 60 * 1000,
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        ...(existsSync(join(__dirname, 'tests', 'state.json')) && {
          storageState: './tests/state.json',
        }),
      },
      dependencies: ['auth'],
      timeout: 5 * 60 * 1000,
    },

    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
        ...(existsSync(join(__dirname, 'tests', 'state.json')) && {
          storageState: './tests/state.json',
        }),
      },
      dependencies: ['auth'],
      timeout: 5 * 60 * 1000,
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12'],
        ...(existsSync(join(__dirname, 'tests', 'state.json')) && {
          storageState: './tests/state.json',
        }),
      },
      dependencies: ['auth'],
      timeout: 5 * 60 * 1000,
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
