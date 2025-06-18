import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null; // or a loading spinner
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default ProtectedRoute; 