import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <p className="muted">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (adminOnly && !isAdmin) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="card-body">
            <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>Access Denied</h2>
            <p className="muted">
              You don't have permission to access this page. Admin access required.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;



