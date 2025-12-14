describe('Admin Project Creation', () => {
  beforeEach(() => {
    // Login as admin before each test
    cy.loginAsAdmin();
    cy.visit('/');
  });

  afterEach(() => {
    cy.logout();
  });

  it('should show admin navigation links when logged in as admin', () => {
    cy.visit('/');
    
    // Check for admin-specific navigation items
    cy.get('nav').should('be.visible');
    cy.contains('Contacts').should('be.visible');
    cy.contains('Projects').should('be.visible');
    cy.contains('Education').should('be.visible');
  });

  it('should navigate to projects list page', () => {
    cy.visit('/');
    cy.contains('Projects').click();
    cy.url().should('include', '/projects-list');
    cy.contains(/projects|manage projects/i).should('be.visible');
  });

  it('should show add project button for admin', () => {
    cy.visit('/projects-list');
    cy.contains(/add project|new project|\+ project/i).should('be.visible');
  });

  it('should navigate to project creation form', () => {
    cy.visit('/projects-list');
    cy.contains(/add project|new project|\+ project/i).click();
    cy.url().should('include', '/projects/new');
    cy.contains(/create project|add project|new project/i).should('be.visible');
  });

  it('should display validation errors for empty project form', () => {
    cy.visit('/projects/new');
    
    // Try to submit empty form
    cy.get('form').within(() => {
      cy.get('button[type="submit"]').click();
    });
    
    // Check for validation errors
    cy.contains(/required/i, { timeout: 5000 }).should('be.visible');
  });

  it('should successfully create a new project', () => {
    const timestamp = Date.now();
    const projectTitle = `Test Project ${timestamp}`;
    const projectDescription = `This is a test project description created at ${timestamp}`;
    
    cy.visit('/projects/new');
    
    // Fill in the project form
    cy.get('input[name="title"]').type(projectTitle);
    cy.get('input[name="firstname"]').type('John');
    cy.get('input[name="lastname"]').type('Doe');
    cy.get('input[name="completion"]').type('2024-12-31');
    cy.get('textarea[name="description"]').type(projectDescription);
    
    // Submit the form
    cy.get('form').within(() => {
      cy.get('button[type="submit"]').click();
    });
    
    // Wait for successful creation and redirect
    cy.url().should('include', '/projects-list', { timeout: 10000 });
    
    // Verify project appears in the list
    cy.contains(projectTitle).should('be.visible');
  });

  it('should show edit and delete buttons for projects when admin', () => {
    // First create a project
    const timestamp = Date.now();
    const projectTitle = `Project to Edit ${timestamp}`;
    
    cy.visit('/projects/new');
    cy.get('input[name="title"]').type(projectTitle);
    cy.get('input[name="firstname"]').type('John');
    cy.get('input[name="lastname"]').type('Doe');
    cy.get('input[name="completion"]').type('2024-12-31');
    cy.get('textarea[name="description"]').type('Test description');
    
    cy.get('form').within(() => {
      cy.get('button[type="submit"]').click();
    });
    
    cy.url().should('include', '/projects-list', { timeout: 10000 });
    
    // Check for edit and delete buttons
    cy.contains(projectTitle).parent().within(() => {
      cy.get('button[title="Edit"], button[aria-label*="edit" i]').should('exist');
      cy.get('button[title="Delete"], button[aria-label*="delete" i]').should('exist');
    });
  });

  it('should allow admin to edit a project', () => {
    // Create a project first
    const timestamp = Date.now();
    const originalTitle = `Original Title ${timestamp}`;
    const updatedTitle = `Updated Title ${timestamp}`;
    
    cy.visit('/projects/new');
    cy.get('input[name="title"]').type(originalTitle);
    cy.get('input[name="firstname"]').type('John');
    cy.get('input[name="lastname"]').type('Doe');
    cy.get('input[name="completion"]').type('2024-12-31');
    cy.get('textarea[name="description"]').type('Original description');
    
    cy.get('form').within(() => {
      cy.get('button[type="submit"]').click();
    });
    
    cy.url().should('include', '/projects-list', { timeout: 10000 });
    
    // Click edit button
    cy.contains(originalTitle).parent().within(() => {
      cy.get('button[title="Edit"], button[aria-label*="edit" i]').click();
    });
    
    // Should navigate to edit page
    cy.url().should('include', '/projects/edit/', { timeout: 10000 });
    
    // Update the title
    cy.get('input[name="title"]').clear().type(updatedTitle);
    
    // Submit the form
    cy.get('form').within(() => {
      cy.get('button[type="submit"]').click();
    });
    
    // Should redirect back to projects list
    cy.url().should('include', '/projects-list', { timeout: 10000 });
    
    // Verify updated title appears
    cy.contains(updatedTitle).should('be.visible');
  });

  it('should allow admin to delete a project', () => {
    // Create a project first
    const timestamp = Date.now();
    const projectTitle = `Project to Delete ${timestamp}`;
    
    cy.visit('/projects/new');
    cy.get('input[name="title"]').type(projectTitle);
    cy.get('input[name="firstname"]').type('John');
    cy.get('input[name="lastname"]').type('Doe');
    cy.get('input[name="completion"]').type('2024-12-31');
    cy.get('textarea[name="description"]').type('This project will be deleted');
    
    cy.get('form').within(() => {
      cy.get('button[type="submit"]').click();
    });
    
    cy.url().should('include', '/projects-list', { timeout: 10000 });
    
    // Verify project exists
    cy.contains(projectTitle).should('be.visible');
    
    // Click delete button and confirm
    cy.contains(projectTitle).parent().within(() => {
      cy.get('button[title="Delete"], button[aria-label*="delete" i]').click();
    });
    
    // Confirm deletion in alert/confirm dialog
    cy.on('window:confirm', (str) => {
      expect(str).to.include('delete');
      return true;
    });
    
    // Wait for deletion to complete
    cy.contains(projectTitle).should('not.exist', { timeout: 10000 });
  });

  it('should not show admin controls for regular users', () => {
    // Logout admin
    cy.logout();
    
    // Register and login as regular user
    const timestamp = Date.now();
    const email = `regularuser${timestamp}@example.com`;
    cy.register(`Regular User ${timestamp}`, email, 'password123');
    
    cy.visit('/projects-list');
    
    // Regular users should not see add/edit/delete buttons
    cy.contains(/add project|\+ project/i).should('not.exist');
    
    // If projects exist, they should not have edit/delete buttons
    cy.get('body').then(($body) => {
      if ($body.find('[title="Edit"], [aria-label*="edit" i]').length > 0) {
        cy.get('[title="Edit"], [aria-label*="edit" i]').should('not.exist');
      }
    });
  });

  it('should show loading state during project creation', () => {
    cy.visit('/projects/new');
    
    // Intercept and delay the API request
    cy.intercept('POST', '**/api/projects', {
      delay: 1000,
      statusCode: 201,
      body: { success: true },
    }).as('createProject');
    
    cy.get('input[name="title"]').type('Loading Test Project');
    cy.get('input[name="firstname"]').type('John');
    cy.get('input[name="lastname"]').type('Doe');
    cy.get('input[name="completion"]').type('2024-12-31');
    cy.get('textarea[name="description"]').type('Test description');
    
    cy.get('form').within(() => {
      cy.get('button[type="submit"]').click();
    });
    
    // Check for loading state
    cy.get('button[type="submit"]').should('be.disabled');
    cy.wait('@createProject');
  });
});

