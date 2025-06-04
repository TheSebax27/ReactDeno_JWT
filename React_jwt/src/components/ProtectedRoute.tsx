import React, { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    const loadingStyles = {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontSize: '1.2rem',
      fontFamily: 'Arial, sans-serif'
    };

    return (
      <div style={loadingStyles}>
        <div>Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // El componente App se encargará de mostrar el Login
  }

  return <>{children}</>;
};