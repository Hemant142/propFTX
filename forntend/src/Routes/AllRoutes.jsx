import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import PrivateRoutes from './PrivateRoutes';
import AdminDashboard from '../Pages/AdminDashboard';
import UserDashboard from '../Pages/UserDashboard';

export default function AllRoutes({ search, setSearch }) {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* Admin routes */}
      <Route element={<PrivateRoutes role="admin" />}> 
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
      {/* User routes */}
      <Route element={<PrivateRoutes role="user" />}> 
        <Route path="/user" element={<UserDashboard search={search} setSearch={setSearch} />} />
      </Route>
      {/* Default route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
