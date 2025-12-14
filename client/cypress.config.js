const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
      timestamp: 'mmddyyyy_HHMMss',
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
      
      // Generate test reports
      on('after:run', (results) => {
        if (results) {
          console.log('Test run completed');
          console.log(`Total tests: ${results.totalTests}`);
          console.log(`Passed: ${results.totalPassed}`);
          console.log(`Failed: ${results.totalFailed}`);
        }
      });
    },
    env: {
      apiUrl: 'http://localhost:5001/api',
      // Cypress Dashboard recording key (set via environment variable)
      // CYPRESS_RECORD_KEY=your-key-here
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
  },
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});

