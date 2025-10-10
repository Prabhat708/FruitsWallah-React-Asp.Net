import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import useAuthStore from '../Stores/AuthStore';
import jwtDecode from 'jwt-decode';

const AdminRoutes = ({ children }) => {
    const { token } = useAuthStore.getState();
    const decode = jwtDecode(token);
    const isAdmin = decode.isAdmin;
  return token && isAdmin ? children : <Navigate to="/" replace />;
};

export default AdminRoutes
