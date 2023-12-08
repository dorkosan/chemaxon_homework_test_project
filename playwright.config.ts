import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  projects: [
    {
      name: "Idokep test",
      use: {
        baseURL: process.env.IDOKEP_URL,
      },
    },
    
  ],
  use: {
    headless: false,
    ignoreHTTPSErrors: true,
    // Artifacts
    screenshot: 'on',
    video: 'on',
    contextOptions: {
      locale: 'hu-HU',
    }
  },
  timeout: 60 * 1000,
};
export default config;

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */


