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
    cy.contains('Create Account').should('be.visible');
  });

  it('should display validation errors for empty form', () => {
    cy.visit('/signup');
    
    // Try to submit empty form
    cy.get('button[type="submit"]').click();
    
    // Check for validation errors
    cy.contains(/name is required/i).should('be.visible');
    cy.contains(/email is required/i).should('be.visible');
    cy.contains(/password is required/i).should('be.visible');
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
    
    // Wait for successful registration
    cy.contains(/success|registered|welcome/i, { timeout: 10000 }).should('be.visible');
    
    // Should redirect to home page or show success message
    cy.url().should('not.include', '/signup');
    
    // Check if user is logged in (navbar should show user info or logout)
    cy.get('nav').should('be.visible');
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

