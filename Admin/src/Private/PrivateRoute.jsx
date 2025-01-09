import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // If there is no token, redirect to the login page
  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  // If there is a token, render the children (protected route)
  return children;
};

export default PrivateRoute;
