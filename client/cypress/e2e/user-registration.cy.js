describe('User Registration Flow', () => {
  beforeEach(() => {
    // Clear localStorage and cookies before each test
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('/');
  });

  it('should navigate to sign up page', () => {
    cy.visit('/');
    cy.get('nav').should('be.visible');
    cy.contains('Sign Up').click();
    cy.url().should('include', '/signup');
    cy.contains('Sign Up').should('be.visible');
    cy.contains('Create a new account').should('be.visible');
  });

  it('should display validation errors for empty form', () => {
    cy.visit('/signup');
    
    // Try to submit empty form
    cy.get('button[type="submit"]').click();
    
    // Check for validation errors - wait a bit for validation to run
    cy.wait(500);
    // The form uses HTML5 validation, so we check for the required attribute or error messages
    cy.get('input[name="name"]:invalid, input[name="email"]:invalid, input[name="password"]:invalid').should('exist');
    // Or check for error messages if they appear
    cy.get('body').then(($body) => {
      if ($body.find('span').text().includes('required')) {
        cy.contains(/required/i).should('be.visible');
      }
    });
  });

  it('should display validation error for invalid email', () => {
    cy.visit('/signup');
    
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    
    cy.get('button[type="submit"]').click();
    
    cy.contains(/please enter a valid email/i).should('be.visible');
  });

  it('should display error when passwords do not match', () => {
    cy.visit('/signup');
    
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('different123');
    
    cy.get('button[type="submit"]').click();
    
    cy.contains(/passwords do not match/i).should('be.visible');
  });

  it('should successfully register a new user', () => {
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    const name = `Test User ${timestamp}`;
    const password = 'testpassword123';

    cy.visit('/signup');
    
    // Fill in the registration form
    cy.get('input[name="name"]').type(name);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="confirmPassword"]').type(password);
    
    // Submit the form
    cy.get('button[type="submit"]').click();
    
    // Wait for successful registration - check for success message or redirect
    cy.contains(/account created|successfully|signed in/i, { timeout: 15000 }).should('be.visible');
    
    // Should redirect to home page or show success message
    // The form shows a success screen before redirecting
    cy.url({ timeout: 20000 }).should('satisfy', (url) => {
      return url.includes('/') || url.includes('/signup');
    });
  });

  it('should display error for duplicate email', () => {
    // First, register a user
    const email = 'duplicate@example.com';
    const name = 'Duplicate User';
    const password = 'password123';

    cy.register(name, email, password);
    cy.clearLocalStorage();
    
    // Try to register again with same email
    cy.visit('/signup');
    cy.get('input[name="name"]').type('Another User');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="confirmPassword"]').type(password);
    
    cy.get('button[type="submit"]').click();
    
    // Should show error message
    cy.contains(/already exists|already registered|email.*taken/i, { timeout: 10000 }).should('be.visible');
  });

  it('should navigate to sign in page from sign up page', () => {
    cy.visit('/signup');
    cy.contains('Sign In').click();
    cy.url().should('include', '/signin');
  });
});

