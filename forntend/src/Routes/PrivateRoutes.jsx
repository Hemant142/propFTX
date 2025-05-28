import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// Usage: <PrivateRoutes role="admin" />
export default function PrivateRoutes({ role }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
console.log("PrivateRoutes user:", user);
  if (!user || !storedToken) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    // If role is specified and doesn't match, redirect
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
