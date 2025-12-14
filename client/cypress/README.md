# Cypress E2E Testing

This directory contains end-to-end tests for the React Portfolio application.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Start the backend server (in a separate terminal):
   ```bash
   cd ../server
   npm run dev
   ```

## Running Tests

### Open Cypress Test Runner (Interactive)
```bash
npm run test:e2e:open
```

### Run Tests Headless
```bash
npm run test:e2e
```

### Run Tests with Browser Visible
```bash
npm run cypress:run:headed
```

### Run Tests and Generate Report
```bash
npm run test:e2e:report
```

## Test Files

- `cypress/e2e/user-registration.cy.js` - User registration flow tests
- `cypress/e2e/contact-form.cy.js` - Contact form submission tests
- `cypress/e2e/admin-project-creation.cy.js` - Admin project CRUD tests

## Test Recording

To record tests to Cypress Dashboard:

1. Get your project ID and record key from [Cypress Dashboard](https://dashboard.cypress.io)
2. Set environment variable:
   ```bash
   export CYPRESS_RECORD_KEY=your-record-key
   ```
3. Run with recording:
   ```bash
   npm run cypress:run:record
   ```

Or add to `cypress.config.js`:
```javascript
env: {
  recordKey: 'your-record-key'
}
```

## Test Reports

Test reports are generated in `cypress/reports/` directory:
- HTML reports: `cypress/reports/mochawesome.html`
- JSON reports: `cypress/reports/mochawesome.json`

## Custom Commands

Custom Cypress commands are available in `cypress/support/commands.js`:
- `cy.login(email, password)` - Login a user
- `cy.register(name, email, password)` - Register a new user
- `cy.loginAsAdmin()` - Login as admin user
- `cy.logout()` - Logout current user

## Configuration

Cypress configuration is in `cypress.config.js`:
- Base URL: `http://localhost:3000`
- API URL: `http://localhost:5001/api`
- Videos and screenshots are enabled
- Mochawesome reporter is configured

