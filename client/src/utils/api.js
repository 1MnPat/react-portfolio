import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized (but not for login/register POST requests)
    const isAuthEndpoint = error.config?.url?.includes('/users/login') || 
                          (error.config?.url?.includes('/users') && error.config?.method === 'post');
    
    if (error.response?.status === 401 && !isAuthEndpoint) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to sign in if not already there
      if (window.location.pathname !== '/signin' && window.location.pathname !== '/signup') {
        window.location.href = '/signin';
      }
    }
    return Promise.reject(error);
  }
);

// API methods
export const api = {
  get: (endpoint) => apiClient.get(endpoint).then((res) => res.data),
  post: (endpoint, data) => apiClient.post(endpoint, data).then((res) => res.data),
  put: (endpoint, data) => apiClient.put(endpoint, data).then((res) => res.data),
  delete: (endpoint) => apiClient.delete(endpoint).then((res) => res.data),
};

// Auth API endpoints
export const authAPI = {
  login: (email, password) => api.post('/users/login', { email, password }),
  register: (name, email, password) => api.post('/users', { name, email, password }),
};

export default api;




