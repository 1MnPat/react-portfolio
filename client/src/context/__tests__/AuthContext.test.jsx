import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';

// Test component that uses the auth context
const TestComponent = () => {
  const { user, token, isAuthenticated, isAdmin, login, logout, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div data-testid="user">{user ? JSON.stringify(user) : 'null'}</div>
      <div data-testid="token">{token || 'null'}</div>
      <div data-testid="isAuthenticated">{isAuthenticated ? 'true' : 'false'}</div>
      <div data-testid="isAdmin">{isAdmin ? 'true' : 'false'}</div>
      <button
        data-testid="login-btn"
        onClick={() => login({ id: '1', name: 'Test User', email: 'test@example.com', role: 'user' }, 'test-token')}
      >
        Login
      </button>
      <button
        data-testid="login-admin-btn"
        onClick={() => login({ id: '2', name: 'Admin User', email: 'admin@example.com', role: 'admin' }, 'admin-token')}
      >
        Login Admin
      </button>
      <button data-testid="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    jest.clearAllMocks();
  });

  const renderWithAuth = () => {
    return render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
  };

  test('provides initial state with no user', async () => {
    renderWithAuth();

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByTestId('user')).toHaveTextContent('null');
    expect(screen.getByTestId('token')).toHaveTextContent('null');
    expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('isAdmin')).toHaveTextContent('false');
  });

  test('loads user from localStorage on mount', async () => {
    const userData = { id: '1', name: 'Stored User', email: 'stored@example.com', role: 'user' };
    localStorage.setItem('token', 'stored-token');
    localStorage.setItem('user', JSON.stringify(userData));

    renderWithAuth();

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(userData));
    expect(screen.getByTestId('token')).toHaveTextContent('stored-token');
    expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
    expect(screen.getByTestId('isAdmin')).toHaveTextContent('false');
  });

  test('login function updates state and localStorage', async () => {
    renderWithAuth();

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const loginButton = screen.getByTestId('login-btn');
    
    await act(async () => {
      fireEvent.click(loginButton);
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const userData = { id: '1', name: 'Test User', email: 'test@example.com', role: 'user' };
    expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(userData));
    expect(screen.getByTestId('token')).toHaveTextContent('test-token');
    expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
    expect(screen.getByTestId('isAdmin')).toHaveTextContent('false');

    // Check localStorage
    expect(localStorage.getItem('token')).toBe('test-token');
    expect(JSON.parse(localStorage.getItem('user'))).toEqual(userData);
  });

  test('login with admin role sets isAdmin to true', async () => {
    renderWithAuth();

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const loginAdminButton = screen.getByTestId('login-admin-btn');
    
    await act(async () => {
      fireEvent.click(loginAdminButton);
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const adminData = { id: '2', name: 'Admin User', email: 'admin@example.com', role: 'admin' };
    expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(adminData));
    expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
    expect(screen.getByTestId('isAdmin')).toHaveTextContent('true');
  });

  test('logout function clears state and localStorage', async () => {
    // Set initial state
    const userData = { id: '1', name: 'Test User', email: 'test@example.com', role: 'user' };
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('user', JSON.stringify(userData));

    renderWithAuth();

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Verify initial state
    expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');

    // Logout
    const logoutButton = screen.getByTestId('logout-btn');
    
    await act(async () => {
      fireEvent.click(logoutButton);
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByTestId('user')).toHaveTextContent('null');
    expect(screen.getByTestId('token')).toHaveTextContent('null');
    expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('isAdmin')).toHaveTextContent('false');

    // Check localStorage is cleared
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });

  test('handles invalid JSON in localStorage gracefully', async () => {
    localStorage.setItem('token', 'valid-token');
    localStorage.setItem('user', 'invalid-json');

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    renderWithAuth();

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByTestId('user')).toHaveTextContent('null');
    expect(screen.getByTestId('token')).toHaveTextContent('null');
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();

    consoleErrorSpy.mockRestore();
  });

  test('isAuthenticated returns false when user or token is missing', async () => {
    // Only token, no user
    localStorage.setItem('token', 'token-only');
    const { unmount } = renderWithAuth();

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('false');

    // Clean up
    unmount();
    localStorage.clear();

    // Clear and set only user
    localStorage.setItem('user', JSON.stringify({ id: '1', name: 'User' }));

    renderWithAuth();

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('false');
  });

  test('isAdmin returns false for non-admin users', async () => {
    const userData = { id: '1', name: 'Regular User', email: 'user@example.com', role: 'user' };
    localStorage.setItem('token', 'token');
    localStorage.setItem('user', JSON.stringify(userData));

    renderWithAuth();

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByTestId('isAdmin')).toHaveTextContent('false');
  });
});

