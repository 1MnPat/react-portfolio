import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProjectsList from '../ProjectsList';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

// Mock the API module
jest.mock('../../utils/api', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    delete: jest.fn(),
  },
}));

// Mock AuthContext
jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn(),
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

// Mock window.confirm
const mockConfirm = jest.fn();
window.confirm = mockConfirm;

describe('ProjectsList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
    mockConfirm.mockReturnValue(true);
  });

  const mockProjects = [
    {
      _id: '1',
      title: 'Project 1',
      firstname: 'John',
      lastname: 'Doe',
      description: 'This is a test project description',
      completion: '2024-01-15',
    },
    {
      _id: '2',
      title: 'Project 2',
      firstname: 'Jane',
      lastname: 'Smith',
      description: 'Another project description',
      completion: '2024-02-20',
    },
  ];

  const renderProjectsList = (isAdmin = false) => {
    useAuth.mockReturnValue({
      isAdmin,
      isAuthenticated: true,
      user: { role: isAdmin ? 'admin' : 'user' },
    });

    return render(
      <MemoryRouter>
        <ProjectsList />
      </MemoryRouter>
    );
  };

  test('renders loading state initially', () => {
    api.get.mockImplementation(() => new Promise(() => {})); // Never resolves
    
    renderProjectsList();
    
    expect(screen.getByText(/loading projects/i)).toBeInTheDocument();
  });

  test('renders projects list for regular user', async () => {
    api.get.mockResolvedValue(mockProjects);
    
    renderProjectsList(false);
    
    await waitFor(() => {
      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByText('View projects')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Project 1')).toBeInTheDocument();
      expect(screen.getByText('Project 2')).toBeInTheDocument();
    });

    // Regular users should not see admin controls
    expect(screen.queryByText(/add project/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /edit/i })).not.toBeInTheDocument();
  });

  test('renders projects list with admin controls for admin user', async () => {
    api.get.mockResolvedValue(mockProjects);
    
    renderProjectsList(true);
    
    await waitFor(() => {
      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByText('Manage your projects')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Project 1')).toBeInTheDocument();
      expect(screen.getByText(/add project/i)).toBeInTheDocument();
    });
  });

  test('displays error message when API call fails', async () => {
    const errorMessage = 'Failed to fetch projects';
    api.get.mockRejectedValue({
      response: {
        data: {
          message: errorMessage,
        },
      },
    });
    
    renderProjectsList();
    
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test('displays empty state when no projects exist', async () => {
    api.get.mockResolvedValue([]);
    
    renderProjectsList(true);
    
    await waitFor(() => {
      expect(screen.getByText(/no projects found/i)).toBeInTheDocument();
    });
  });

  test('displays empty state with add button for admin', async () => {
    api.get.mockResolvedValue([]);
    
    renderProjectsList(true);
    
    await waitFor(() => {
      expect(screen.getByText(/add your first project/i)).toBeInTheDocument();
    });
  });

  test('formats dates correctly', async () => {
    api.get.mockResolvedValue(mockProjects);
    
    renderProjectsList();
    
    await waitFor(() => {
      expect(screen.getByText('Project 1')).toBeInTheDocument();
    });

    // Check if dates are displayed (they should be formatted)
    const dateElements = screen.getAllByText(/completion:/i);
    expect(dateElements.length).toBeGreaterThan(0);
  });

  test('allows admin to delete a project', async () => {
    api.get.mockResolvedValue(mockProjects);
    api.delete.mockResolvedValue({ success: true });
    mockConfirm.mockReturnValue(true);
    
    renderProjectsList(true);
    
    await waitFor(() => {
      expect(screen.getByText('Project 1')).toBeInTheDocument();
    });

    // Find delete button (using title attribute or icon)
    const deleteButtons = screen.getAllByTitle('Delete');
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(mockConfirm).toHaveBeenCalledWith('Are you sure you want to delete this project?');
      expect(api.delete).toHaveBeenCalledWith('/projects/1');
    });

    await waitFor(() => {
      expect(screen.queryByText('Project 1')).not.toBeInTheDocument();
    });
  });

  test('does not delete project if user cancels confirmation', async () => {
    api.get.mockResolvedValue(mockProjects);
    mockConfirm.mockReturnValue(false);
    
    renderProjectsList(true);
    
    await waitFor(() => {
      expect(screen.getByText('Project 1')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByTitle('Delete');
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(mockConfirm).toHaveBeenCalled();
    });

    expect(api.delete).not.toHaveBeenCalled();
    expect(screen.getByText('Project 1')).toBeInTheDocument();
  });

  test('navigates to edit page when edit button is clicked', async () => {
    api.get.mockResolvedValue(mockProjects);
    
    renderProjectsList(true);
    
    await waitFor(() => {
      expect(screen.getByText('Project 1')).toBeInTheDocument();
    });

    const editButtons = screen.getAllByTitle('Edit');
    fireEvent.click(editButtons[0]);

    expect(mockNavigate).toHaveBeenCalledWith('/projects/edit/1');
  });

  test('displays project description truncated to 100 characters', async () => {
    const longDescription = 'a'.repeat(150);
    const projectWithLongDesc = {
      ...mockProjects[0],
      description: longDescription,
    };
    
    api.get.mockResolvedValue([projectWithLongDesc]);
    
    renderProjectsList();
    
    await waitFor(() => {
      const description = screen.getByText(/^a{100}\.\.\.$/);
      expect(description).toBeInTheDocument();
    });
  });
});

