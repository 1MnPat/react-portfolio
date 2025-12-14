import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ContactForm from '../ContactForm';
import api from '../../utils/api';

// Mock the API module
jest.mock('../../utils/api', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    MemoryRouter: actual.MemoryRouter,
  };
});

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
  });

  const renderContactForm = () => {
    return render(
      <MemoryRouter>
        <ContactForm />
      </MemoryRouter>
    );
  };

  test('renders contact form with all fields', () => {
    renderContactForm();
    
    expect(screen.getByText('Add Contact')).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create contact/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  test('displays validation errors for empty fields', async () => {
    renderContactForm();
    
    const submitButton = screen.getByRole('button', { name: /create contact/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });

    expect(api.post).not.toHaveBeenCalled();
  });

  test('displays validation error for invalid email', async () => {
    renderContactForm();
    
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /create contact/i });

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });

    expect(api.post).not.toHaveBeenCalled();
  });

  test('submits form with valid data', async () => {
    api.post.mockResolvedValue({ success: true });
    
    renderContactForm();
    
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /create contact/i });

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/contacts', {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
      });
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/contacts');
    });
  });

  test('displays error message on API failure', async () => {
    const errorMessage = 'Failed to create contact';
    api.post.mockRejectedValue({
      response: {
        data: {
          message: errorMessage,
        },
      },
    });
    
    renderContactForm();
    
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /create contact/i });

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test('disables form fields and button while submitting', async () => {
    api.post.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    renderContactForm();
    
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /create contact/i });

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Creating...');
    expect(firstNameInput).toBeDisabled();
    expect(lastNameInput).toBeDisabled();
    expect(emailInput).toBeDisabled();
  });

  test('navigates to contacts list when cancel button is clicked', () => {
    renderContactForm();
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockNavigate).toHaveBeenCalledWith('/contacts');
  });
});

