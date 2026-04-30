import { defineConfig } from 'cypress';

/**
 * E2E tests run against Storybook’s preview iframe
 */
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:6006',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on) {}
  }
});
