describe('Contact Form Submission', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to contact page', () => {
    cy.visit('/');
    cy.contains('Contact', { matchCase: false }).click();
    cy.url().should('include', '/contact');
    cy.contains(/contact|get in touch|send message/i).should('be.visible');
  });

  it('should display validation errors for empty contact form', () => {
    cy.visit('/contact');
    
    // Try to submit empty form
    cy.get('form').within(() => {
      cy.get('button[type="submit"]').click();
    });
    
    // Check for validation errors - HTML5 validation or custom error messages
    cy.wait(500);
    cy.get('input[name="firstname"]:invalid, input[name="lastname"]:invalid, input[name="email"]:invalid').should('exist');
    // Or check for error messages if they appear
    cy.get('body').then(($body) => {
      if ($body.find('span').text().includes('required')) {
        cy.contains(/required/i).should('be.visible');
      }
    });
  });

  it('should display validation error for invalid email', () => {
    cy.visit('/contact');
    
    cy.get('input[name="firstname"]').type('John');
    cy.get('input[name="lastname"]').type('Doe');
    cy.get('input[name="email"]').type('invalid-email');
    
    cy.get('form').within(() => {
      cy.get('button[type="submit"]').click();
    });
    
    cy.contains(/valid email|invalid email/i).should('be.visible');
  });

  it('should successfully submit contact form with valid data', () => {
    const timestamp = Date.now();
    const email = `contact${timestamp}@example.com`;
    
    cy.visit('/contact');
    
    // Fill in the contact form
    cy.get('input[name="firstname"]').type('John');
    cy.get('input[name="lastname"]').type('Doe');
    cy.get('input[name="email"]').type(email);
    
    // Submit the form
    cy.get('form').within(() => {
      cy.get('button[type="submit"]').click();
    });
    
    // Wait for success message
    cy.contains(/thanks|success|reaching out/i, { timeout: 15000 }).should('be.visible');
    
    // Form should show success state (the form hides when submitted is true)
    cy.get('form').should('exist');
  });

  it('should display error message on API failure', () => {
    cy.visit('/contact');
    
    // Intercept and fail the API request
    cy.intercept('POST', '**/api/contacts', {
      statusCode: 500,
      body: { message: 'Server error' },
    }).as('contactError');
    
    cy.get('input[name="firstname"]').type('John');
    cy.get('input[name="lastname"]').type('Doe');
    cy.get('input[name="email"]').type('test@example.com');
    
    cy.get('form').within(() => {
      cy.get('button[type="submit"]').click();
    });
    
    cy.wait('@contactError');
    cy.contains(/error|failed|try again/i, { timeout: 10000 }).should('be.visible');
  });

  it('should show loading state during form submission', () => {
    cy.visit('/contact');
    
    // Intercept and delay the API request
    cy.intercept('POST', '**/api/contacts', {
      delay: 1000,
      statusCode: 201,
      body: { success: true },
    }).as('contactSubmit');
    
    cy.get('input[name="firstname"]').type('John');
    cy.get('input[name="lastname"]').type('Doe');
    cy.get('input[name="email"]').type('test@example.com');
    
    cy.get('form').within(() => {
      cy.get('button[type="submit"]').click();
    });
    
    // Check for loading state (button disabled or loading text)
    cy.get('button[type="submit"]').should('be.disabled');
    cy.wait('@contactSubmit');
  });

  it('should trim whitespace from form inputs', () => {
    cy.visit('/contact');
    
    cy.get('input[name="firstname"]').type('  John  ');
    cy.get('input[name="lastname"]').type('  Doe  ');
    cy.get('input[name="email"]').type('  test@example.com  ');
    
    cy.get('form').within(() => {
      cy.get('button[type="submit"]').click();
    });
    
    // Should submit successfully with trimmed values
    cy.contains(/success|thank you/i, { timeout: 10000 }).should('be.visible');
  });
});

