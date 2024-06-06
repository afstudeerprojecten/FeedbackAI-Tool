import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  component: React.ComponentType;
  requiredRole: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, requiredRole, ...rest }) => {
  const token = sessionStorage.getItem('token');
  const user = sessionStorage.getItem('user');
  const role = user ? JSON.parse(user).role : null;
  console.log(role);

  const isTokenExpired = (token: string): boolean => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const decodedToken = JSON.parse(jsonPayload);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };

  const isLoggedIn = token && !isTokenExpired(token);

  if (!isLoggedIn || !requiredRole.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
